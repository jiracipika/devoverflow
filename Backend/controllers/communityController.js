// controllers/communityController.js
const Community = require('../models/Community');
const User = require('../models/User');

exports.createCommunity = async (req, res) => {
  try {
    const { Tagname, NumberofUsers } = req.body;
    if (!Tagname) {
      return res.status(400).json({ message: 'Tagname is required.' });
    }

    // Create a new Community
    const community = await Community.create({
      tagName: Tagname.trim(),
      numberOfUsers: NumberofUsers || 0
    });

    // Format the response
    const result = {
      Id: community._id,
      Tagname: community.tagName,
      NumberofUsers: community.numberOfUsers
    };

    return res.status(201).json(result);
  } catch (error) {
    console.error('createCommunity error:', error);
    return res.status(500).json({ message: 'Failed to create community', error });
  }
};


exports.addUserToCommunity = async (req, res) => {
  try {
    const { id, Name, Username, Tags } = req.body;
    if (!id || !Tags || Tags.length === 0) {
      return res.status(400).json({ message: 'Missing id or tags array in request.' });
    }


    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found.' });
    }

    let user = await User.findOne({ name: Name });
    if (!user) {
      // If user doesn't exist, create a new user record. 
      user = await User.create({
        name: Name,
        email: `${Username || Name}@example.com`,
        password: 'Password123', // Or handle this properly
        about: `Community user with tags: ${Tags.join(', ')}`
      });
    } else {
      // If the user already exists, maybe update about or some other field
      user.about = `Updated in community with tags: ${Tags.join(', ')}`;
      await user.save();
    }

    //  Add the user to the Community's 'users' array if they're not already present
    const isUserInCommunity = community.users.some(u => u.equals(user._id));
    if (!isUserInCommunity) {
      community.users.push(user._id);
      community.numberOfUsers = community.numberOfUsers + 1; // increment
      await community.save();
    }

    //  Return the updated Community info, populating user data if desired
    const updated = await Community.findById(community._id)
      .populate('users', ['_id', 'name', 'about', 'email']); // choose fields to show

    return res.status(200).json({
      message: 'User added to community successfully.',
      community: {
        id: updated._id,
        tagName: updated.tagName,
        numberOfUsers: updated.numberOfUsers,
        users: updated.users
      }
    });

  } catch (error) {
    console.error('addUserToCommunity error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
