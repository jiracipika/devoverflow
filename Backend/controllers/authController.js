const User = require('../models/User');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// create access token（Access Token）
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' }); 
  // access token will expire after 15 mins
};

// create Refresh Token（Refresh Token）
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); 
  // Refresh Token will expire after 7 days
};

// user register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    
    await Token.findOneAndDelete({ userId: user._id });

    
    await Token.create({ userId: user._id, refreshToken });


    
    return res.status(200).cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      //partitioned: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
      path: '/',
    }).cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      //partitioned: true,
      maxAge: 15 * 60 * 1000, // 15分钟
      path: '/',
    }).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// refresh the tokens
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    // 1. 检查 Refresh Token 是否存在于数据库
    const storedToken = await Token.findOne({ refreshToken });
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // 2. 验证 Refresh Token 有效性
    let userData;
    try {
      userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      // 如果 Token 过期或非法，清除数据库记录
      await Token.findOneAndDelete({ refreshToken });
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // 3. 生成新的 Access Token 和 Refresh Token（实现轮换）
    const newAccessToken = generateAccessToken(userData.id);
    const newRefreshToken = generateRefreshToken(userData.id);

    // 4. 更新数据库中的 Refresh Token
    await Token.findOneAndUpdate(
      { userId: userData.id },
      { refreshToken: newRefreshToken }
    );

    // 6. 返回新 Access Token
    return res.status(200).res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      //partitioned: true,
      maxAge: 15 * 60 * 1000,
      path: '/',
    }).res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      //partitioned: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    }).json({
      message: 'Access token refreshed',
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// user logout
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // 从 Cookie 获取
  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token found' });
  }

  try {
    // 1. 删除数据库中的 Refresh Token
    await Token.findOneAndDelete({ refreshToken });

    // 2. 强制清除客户端的 Access Token 和 Refresh Token Cookie
    const clearCookies = [
      'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None; Partitioned',
      'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None; Partitioned'
    ];
    res.setHeader('Set-Cookie', clearCookies);

    // 3. 返回成功响应
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
