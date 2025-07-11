// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');


router.post('/AskAQuestion', async (req, res) => {
  try {
    const {
      title,
      body,
      tag,
      time,
      userInformation, 
      likes,
      numberOfAnswers,
      views,
      lastEditedTime,
    } = req.body;
    
    
    const newQuestion = new Question({
      title,
      body,
      tag,
      time: time ? new Date(time) : new Date(), // fallback to 'now'
      userInformation,
      likes: likes || 0,
      numberOfAnswers: numberOfAnswers || 0,
      views: views || 0,
      lastEditedTime: lastEditedTime ? new Date(lastEditedTime) : null,
    });
    
    // Save to the database
    const savedQuestion = await newQuestion.save();
    
    return res.status(201).json({
      message: 'Question created successfully.',
      questionID: savedQuestion.questionID || savedQuestion._id, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to create question.',
      error: error.message,
    });
  }
});

module.exports = router;
