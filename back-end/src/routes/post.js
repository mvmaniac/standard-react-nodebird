const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const dayjs = require('dayjs');
const {Op} = require('sequelize');

const {Post, Comment, Image, User, Hashtag, sequelize} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

const uploadImages = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      const folderPath = dayjs().format('YYYY/MM/DD');
      const imagePath = `uploads/${folderPath}`;
      const uploadPath = `src/${imagePath}`;

      req.imagePath = imagePath;

      fs.access(uploadPath, (error) => {
        if (error) {
          console.log(`directory does not exist. ${uploadPath}`);

          fs.mkdir(uploadPath, {recursive: true}, (fsError) => {
            done(fsError, uploadPath);
          });

          return;
        }
        done(null, uploadPath);
      });
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, `${basename}_${new Date().getTime()}${ext}`); // 제로초15184712891.png
    }
  }),
  limits: {fileSize: 20 * 1024 * 1024} // 20MB
});

// GET /posts
router.get('/', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId, 10);
    const userId = parseInt(req.query?.userId ?? 0, 10);
    const hashtag = req.query?.hashtag ?? '';

    const where = {};
    const include = [
      {
        model: User,
        attributes: ['id', 'nickname']
      },
      {
        model: Image,
        attributes: ['id', 'src']
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
      },
      {
        model: User,
        as: 'likers',
        attributes: ['id']
      },
      {
        model: Post,
        as: 'retweet',
        attributes: {
          exclude: ['user_id', 'updated_at']
        },
        include: [
          {
            model: User,
            attributes: ['id', 'nickname']
          },
          {
            model: Image,
            attributes: ['id', 'src']
          }
        ]
      }
    ];

    if (lastId) {
      where.id = {[Op.lt]: lastId};
    }

    if (userId) {
      where.userId = {[Op.eq]: userId};
    }

    if (hashtag) {
      include.push({
        model: Hashtag,
        where: {name: decodeURIComponent(hashtag)}
      });
    }

    const findPosts = await Post.findAll({
      where,
      attributes: {
        exclude: ['user_id', 'updated_at']
      },
      limit: 10,
      order: [
        ['created_at', 'DESC'],
        [Comment, 'created_at', 'DESC']
      ],
      include
    });

    res.status(200).json(findPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /posts/:postId
router.get('/:postId', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const findPost = await Post.findOne({
      where: {id: postId},
      attributes: {
        exclude: ['user_id', 'updated_at']
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        },
        {
          model: Image,
          attributes: ['id', 'src']
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
        },
        {
          model: User,
          as: 'likers',
          attributes: ['id']
        },
        {
          model: Post,
          as: 'retweet',
          attributes: {
            exclude: ['user_id', 'updated_at']
          },
          include: [
            {
              model: User,
              attributes: ['id', 'nickname']
            },
            {
              model: Image,
              attributes: ['id', 'src']
            }
          ]
        }
      ]
    });

    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    res.status(200).json(findPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /posts
router.post('/', isLoggedIn, async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const {content, imagePaths} = req.body;
    const hashtags = content.match(/#[^\s#]+/g);

    const savedPost = await Post.create(
      {
        content,
        userId: req.user.id
      },
      {transaction}
    );

    if (imagePaths) {
      const savedImages = await Promise.all(
        imagePaths.map((imagePath) =>
          Image.create({src: imagePath}, {transaction})
        )
      );
      // TODO: transaction
      await savedPost.addImages(savedImages, {transaction}); // 여기서 update문이 날라감...
    }

    if (hashtags) {
      // [[노드, true], [리액트, true]]
      const savedHashtags = await Promise.all(
        hashtags.map((hashtag) =>
          Hashtag.findOrCreate({
            where: {name: hashtag.slice(1).toLowerCase()},
            transaction
          })
        )
      );

      // TODO: transaction
      await savedPost.addHashtags(
        savedHashtags.map((value) => value[0]),
        {transaction}
      );
    }

    const findPost = await Post.findOne({
      where: {id: savedPost.ids},
      attributes: {
        exclude: ['user_id', 'updated_at']
      },
      include: [
        {model: User, attributes: ['id', 'nickname']},
        {model: Comment, attributes: ['id']},
        {model: Image, attributes: ['id', 'src']},
        {
          model: User,
          as: 'likers',
          attributes: ['id']
        }
      ],
      transaction
    });

    await transaction.commit();
    res.status(201).json(findPost);
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    console.error(error);
    next(error);
  }
});

// POST /posts/images
// uploadImages.single, uploadImages.array, uploadImages.fields 등이 있음
router.post('/images', isLoggedIn, uploadImages.array('image'), (req, res) => {
  // console.log(req.files);
  // console.log(req.imagePath);
  res.json(req.files.map((value) => `${req.imagePath}/${value.filename}`));
});

// DELETE /posts/:postId
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const postId = parseInt(req.params.postId, 10);

    await Image.destroy({where: {postId}, transaction});
    await Comment.destroy({where: {postId}, transaction});
    await Post.destroy({where: {id: postId, userId: req.user.id}, transaction});

    await transaction.commit();

    res.status(200).json({postId});
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    console.error(error);
    next(error);
  }
});

// POST /posts/:postId/comments
router.post('/:postId/comments', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const findPost = await Post.findOne({where: {id: postId}});
    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    const savedComment = await Comment.create({
      content: req.body.content,
      postId,
      userId: req.user.id
    });

    const findComment = await Comment.findOne({
      where: {id: savedComment.id},
      attributes: {
        exclude: ['user_id', 'updated_at']
      },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        }
      ]
    });

    res.status(201).json(findComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /posts/:postId/comments/:commentId
router.delete(
  '/:postId/comments/:commentId',
  isLoggedIn,
  async (req, res, next) => {
    try {
      const postId = parseInt(req.params.postId, 10);
      const commentId = parseInt(req.params.commentId, 10);

      const findPost = await Post.findOne({where: {id: postId}});
      if (!findPost) {
        res.status(404).json({message: '존재하지 않는 게시글입니다.'});
        return;
      }

      const findComment = await Comment.findOne({where: {id: commentId}});
      if (!findComment) {
        res.status(404).json({message: '존재하지 않는 댓글입니다.'});
        return;
      }

      await Comment.destroy({
        where: {id: commentId, postId, userId: req.user.id}
      });

      res.status(200).json({commentId});
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// PATCH /posts/:postId/retweet
router.patch('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const findPost = await Post.findOne({
      where: {id: postId},
      include: [
        {
          model: Post,
          as: 'retweet'
        }
      ]
    });

    if (!findPost) {
      res.status(404).json({message: '존재하지 않는 게시글입니다.'});
      return;
    }

    if (
      req.user.id === findPost.userId ||
      (findPost.retweet && findPost.retweet.userId === req.user.id)
    ) {
      res.status(400).json({message: '자신의 게시글을 리트윗 할 수 없습니다.'});
      return;
    }

    const retweetTargetId = findPost.retweetId || findPost.id;
    const existPost = await Post.findOne({
      where: {
        userId: req.user.id,
        retweetId: retweetTargetId
      }
    });

    if (existPost) {
      res.status(400).json({message: '이미 해당 게시글을 리트윗 했습니다.'});
      return;
    }

    const savedRetweet = await Post.create({
      userId: req.user.id,
      retweetId: retweetTargetId,
      content: 'retweet'
    });

    const retweetWithPrevPost = await Post.findOne({
      where: {
        id: savedRetweet.id
      },
      attributes: {
        exclude: ['user_id', 'updated_at']
      },
      include: [
        {model: User, attributes: ['id', 'nickname']},
        {model: Comment, attributes: ['id']},
        {model: Image, attributes: ['id', 'src']},
        {
          model: User,
          as: 'likers',
          attributes: ['id']
        },
        {
          model: Post,
          as: 'retweet',
          attributes: {
            exclude: ['user_id', 'updated_at']
          },
          include: [
            {
              model: User,
              attributes: ['id', 'nickname']
            },
            {
              model: Image,
              attributes: ['id', 'src']
            }
          ]
        }
      ]
    });

    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
