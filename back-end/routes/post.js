const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const {isLoggedIn} = require('./middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const findPosts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'ASC']
      ]
    });
    return res.json(findPosts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// /api/posts
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const savedPost = await db.Post.create({
      content: req.body.content,
      userId: req.user.id
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase()
            }
          })
        )
      );

      console.log(result);

      await savedPost.addHashtags(result.map(r => r[0]));
    }

    // 첫번째 방법
    //const user = await newPost.getUser();
    //newPost.user = user;
    //res.json(newPost);

    // 두번쨰 방법
    const findPost = await db.Post.findOne({
      where: {
        id: savedPost.id
      },
      include: [
        {
          model: db.User
        }
      ]
    });

    return res.json(findPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id}
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    const findComments = await db.Comment.findAll({
      where: {postId: req.params.id},
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    return res.json(findComments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/comments', isLoggedIn, async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id}
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    const savedComment = await db.Comment.create({
      postId: findPost.id,
      userId: req.user.id,
      content: req.body.content
    });

    await findPost.addComment(savedComment.id);

    const findComment = await db.Comment.findOne({
      where: {
        id: savedComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ]
    });

    return res.json(findComment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: {fileSize: 20 * 1024 * 1024} // 20MB
});
router.post('/images', upload.array('images'), (req, res) => { // upload.single, upload.array, upload.fields 등등
  return res.json(req.files.map(file => file.filename));
});

module.exports = router;
