const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/posts', postController.createPost);
router.get('/posts/:slug', postController.getPostBySlug);
router.get('/posts', postController.getPosts);
router.put('/posts/:slug', postController.updatePost);
router.delete('/posts/:slug', postController.deletePost);

module.exports = router;
