const express = require('express');
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  getBlogsByTagName
} = require('../controllers/blogController');

const router = express.Router();


router.get('/', getAllBlogs);


router.get('/:id', getBlogById);


router.post('/', createBlog);


router.put('/:id', updateBlog);


router.get('/byTag', getBlogsByTagName);



module.exports = router;
