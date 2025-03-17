const Tag = require('../models/Tag');


exports.getAllTags = async (req, res) => {
  try {
    // if using individual tag
    const tags = await Tag.find({}, { _id: 0, name: 1 });
    const allTags = tags.map(t => t.name);
    return res.status(200).json(allTags);


  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tags.' });
  }
};
