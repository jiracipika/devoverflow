// routes/communityRoutes.js
const express = require('express');
const { createCommunity, addUserToCommunity } = require('../controllers/communityController');

const router = express.Router();

router.post('/', createCommunity);

router.post('/usersInCommunity', addUserToCommunity);

module.exports = router;
