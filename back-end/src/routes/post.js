const express = require('express');

const {Post, Comment, Image, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const findPosts = await Post.findAll({
      attributes: {
        exclude: ['updated_at']
      },
      limit: 10,
      order: [
        ['created_at', 'DESC'],
        [Comment, 'created_at', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['nickname']
        },
        {
          model: Image
        },
        {
          model: Comment,
          attributes: {
            exclude: ['updated_at']
          },
          include: [
            {
              model: User,
              attributes: ['nickname']
            }
          ]
        }
      ]
    });

    res.status(200).json(findPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /posts
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const savedPost = await Post.create({
      content: req.body.content,
      userId: req.user.id
    });

    const findPost = await Post.findOne({
      where: {id: savedPost.id},
      attributes: {
        exclude: ['updated_at']
      },
      include: [
        {model: Image},
        {model: Comment, attributes: ['id']},
        {model: User, attributes: ['nickname']}
      ]
    });

    res.status(201).json(findPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {});

// PATCH /posts/:postId/like
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const findPost = await Post.findOne({where: {id: postId}});
    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    await findPost.addLikers(req.user.id);
    res.status(200).json({postId, userId: req.user.id});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /posts/:postId/like
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const findPost = await Post.findOne({where: {id: postId}});
    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    await findPost.removeLikers(req.user.id);
    res.status(200).json({postId, userId: req.user.id});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
