// models/Community.js
const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
    unique: true
  },
  numberOfUsers: {
    type: Number,
    default: 0
  },
  // Optionally store references to users in this community:
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Community', communitySchema);
