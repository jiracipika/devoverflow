// models/Question.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: '',
  },
  time: {
    type: Date,
    default: Date.now,
  },
  userInformation: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  numberOfAnswers: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  questionID: {
    type: Number,
    unique: true
  },
  lastEditedTime: {
    type: Date,
    default: null,
  },
});


module.exports = mongoose.model('Question', questionSchema);
