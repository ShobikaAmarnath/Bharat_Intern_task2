const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!removedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted', post: removedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
