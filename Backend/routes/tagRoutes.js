const express = require('express');
const { getAllTags } = require('../controllers/tagController');
const router = express.Router();

// 2.1 /api/tags -> Get all tags
router.get('/', getAllTags);

module.exports = router;
