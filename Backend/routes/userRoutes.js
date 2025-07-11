// routes/user.js
const express = require('express');
const {
  createProfile,
  editProfile
} = require('../controllers/userController');

const router = express.Router();

router.post('/createProfile', createProfile);
router.put('/editProfile', editProfile);

module.exports = router;
