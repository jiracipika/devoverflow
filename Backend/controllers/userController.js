const User = require('../models/User');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // return to the front end needed info, need more stuff in the future, this just a template
    const result = {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'User not found.', error });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { Id, name } = req.body;

    // 1. 查找用户（这里用 _id 替换真实数据库 _id 格式）
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. 设置用户信息
    //   如果只允许更新 about，不要改 name；如果需要更新 name，可以覆盖
    user.name = name;  
    user.about = '';   // 创建时默认 “Empty”(或直接空字符串)

    await user.save();

    // 3. 返回响应
    return res.status(200).json({
      name: user.name,
      About: 'Empty'
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { Id, name, About } = req.body;
    
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 更新用户资料
    user.name = name;   // 如果不想修改 name，可以省略
    user.about = About; // 前端传的字符串

    await user.save();

    return res.status(200).json({
      name: user.name,
      About: user.about
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
};
