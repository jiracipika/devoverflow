const Blog = require('../models/Blog');
const User = require('../models/User');


exports.getAllBlogs = async (req, res) => {
  try {
    const { tag, search } = req.query;
    let query = {};

    // 如果有 tag，则按 tags 字段进行过滤
    if (tag) {
      // 不区分大小写时，可以用正则
      query.tags = { $regex: new RegExp(tag, 'i') };
    }

    
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { content: { $regex: new RegExp(search, 'i') } }
      ];
    }

    const blogs = await Blog.find(query)
      .populate('author', ['_id', 'name', 'image']) 
      .sort({ postedDate: -1 }); // 按发布日期倒序

    
    const formatted = blogs.map(blog => ({
      id: blog._id,
      title: blog.title,
      image: blog.image,
      content: blog.content,
      postedDate: blog.postedDate,
      editedDate: blog.editedDate,
      author: {
        id: blog.author._id,
        name: blog.author.name,
        image: blog.author.image
      },
      tags: blog.tags
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch blogs.', error });
  }
};

/**
 * --- Get Blog by ID
 */
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate('author', ['_id', 'name', 'image']);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const formatted = {
      id: blog._id,
      title: blog.title,
      image: blog.image,
      content: blog.content,
      postedDate: blog.postedDate,
      editedDate: blog.editedDate,
      author: {
        id: blog.author._id,
        name: blog.author.name,
        image: blog.author.image
      },
      tags: blog.tags
    };

    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Blog not found.', error });
  }
};


exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;


    const tagIds = [];
    for (const tagName of tags) {

      const trimmedTagName = tagName.trim();


      let existingTag = await Tag.findOne({ name: trimmedTagName });
      if (!existingTag) {
        // 不存在则创建
        existingTag = await Tag.create({ name: trimmedTagName });
      }
      tagIds.push(existingTag._id);
    }

    
    const newBlog = await Blog.create({
      title,
      content,
      tags: tagIds, 

    });

    
    const populatedBlog = await newBlog.populate('tags', 'name');
    return res.status(201).json(populatedBlog);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create blog', error });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags = [] } = req.body;

    
    const tagIds = [];
    for (const tagName of tags) {
      const trimmedTagName = tagName.trim();
      let existingTag = await Tag.findOne({ name: trimmedTagName });
      if (!existingTag) {
        existingTag = await Tag.create({ name: trimmedTagName });
      }
      tagIds.push(existingTag._id);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags: tagIds, editedDate: new Date() },
      { new: true } // 返回更新后的文档
    ).populate('tags', 'name');

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update blog', error });
  }
};

exports.getBlogsByTagName = async (req, res) => {
  try {
    const { tag } = req.query; 
    if (!tag) {
      
      return res.status(400).json({ message: 'Tag is required.' });
    }

    
    const tagDoc = await Tag.findOne({ name: tag.trim() });
    if (!tagDoc) {
      
      return res.status(200).json([]); 
    }

    
    const blogs = await Blog.find({ tags: { $in: [tagDoc._id] } })
      .populate('tags', 'name')     
      .populate('author', 'name image')
      .sort({ postedDate: -1 });

    
    const formatted = blogs.map(b => ({
      id: b._id,
      title: b.title,
      image: b.image,
      content: b.content,
      postedDate: b.postedDate,
      editedDate: b.editedDate,
      author: {
        id: b.author._id,
        name: b.author.name,
        image: b.author.image
      },
      
      tags: b.tags.map(t => ({ id: t._id, name: t.name }))
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch blogs by tag', error });
  }
};
