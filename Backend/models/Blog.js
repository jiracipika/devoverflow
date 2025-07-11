// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  postedDate: {
    type: Date,
    default: Date.now
  },
  editedDate: {
    type: Date,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 改为引用 Tag 集合
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

module.exports = mongoose.model('Blog', blogSchema);
