const express = require('express');

const {Post, Comment, Image, User} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

// POST /posts
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const savedPost = await Post.create({
      content: req.body.content,
      userId: req.user.id
    });

    const findPost = await Post.findOne({
      where: {id: savedPost.postId},
      include: [
        {model: Image},
        {model: Comment, attributes: ['id']},
        {model: User, attributes: ['id', 'nickname']}
      ]
    });

    res.status(201).json(findPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /posts/:postId/comments
router.post('/:postId/comments', isLoggedIn, async (req, res, next) => {
  try {
    const findPost = await Post.findOne({where: {id: req.params.postId}});
    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    const savedComment = await Comment.create({
      content: req.body.content,
      postId: req.params.postId,
      userId: req.user.id
    });

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {});

module.exports = router;
