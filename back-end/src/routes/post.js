const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const db = require('../models');
const {isLoggedIn} = require('./middleware');

const router = express.Router();

const isProd = process.env.NODE_ENV === 'production';

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID
});

// 로컬에서는 그냥 로컬PC에서 하는걸로...
const multerStorage = isProd
  ? multerS3({
      s3: new AWS.S3(),
      bucket: 'react-node-bird',
      key(req, file, cb) {
        cb(null, `origin/${+new Date()}${path.basename(file.originalname)}`);
      }
    })
  : multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        done(null, basename + new Date().valueOf() + ext);
      }
    });

const upload = multer({
  storage: multerStorage,
  limits: {fileSize: 20 * 1024 * 1024} // 20MB
});

router.get('/', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId, 10);
    let where = {};

    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId
        }
      };
    }

    const findPosts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: 'like',
          as: 'likers',
          attributes: ['id']
        },
        {
          model: db.Post,
          as: 'retweet',
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname']
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'ASC']
      ],
      limit: parseInt(req.query.limit, 10)
    });
    return res.json(findPosts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id},
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Image
        }
      ]
    });

    return res.json(findPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// /api/posts
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
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

    // 이미지 주소 처리
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map(image =>
            db.Image.create({
              src: image,
              postId: savedPost.id
            })
          )
        );
        await savedPost.addImages(images);
      } else {
        const image = db.Image.create({
          src: req.body.image,
          postId: savedPost.id
        });
        await savedPost.addImage(image);
      }
    }

    // 첫번째 방법
    //const user = await newPost.getUser();
    //newPost.user = user;
    //res.json(newPost);

    // 두번째 방법
    const findPost = await db.Post.findOne({
      where: {
        id: savedPost.id
      },
      include: [{model: db.User}, {model: db.Image}]
    });

    return res.json(findPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    // TODO: 중복코드를 미들웨어로 빼기
    const findPost = await db.Post.findOne({
      where: {id: req.params.id}
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    await db.Post.destroy({
      where: {id: req.params.id}
    });

    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
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
      order: [['createdAt', 'DESC']]
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

router.post('/images', upload.array('images'), (req, res) => {
  // upload.single, upload.array, upload.fields 등등
  return res.json(req.files.map(file => (isProd ? file.location : file.filename)));
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id}
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    await findPost.addLikers(req.user.id);
    return res.json({userId: req.user.id});
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id}
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    await findPost.removeLikers(req.user.id);
    return res.json({userId: req.user.id});
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {id: req.params.id},
      include: [
        {
          model: db.Post,
          as: 'retweet'
        }
      ]
    });

    if (!findPost) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }

    if (
      req.user.id === findPost.UserId ||
      (findPost.retweet && findPost.retweet.userId === req.user.id)
    ) {
      return res.status(403).send('자신의 글을 리트윗 할 수 없습니다.');
    }

    const retweetTargetId = findPost.retweetId || findPost.id;
    const existPost = await db.Post.findOne({
      where: {
        userId: req.user.id,
        retweetId: retweetTargetId
      }
    });

    if (existPost) {
      return res.status(403).send('이미 리트윗 했습니다.');
    }

    const savedRetweet = await db.Post.create({
      userId: req.user.id,
      retweetId: retweetTargetId,
      content: 'retweet'
    });

    const retweetWithPrevPost = await db.Post.findOne({
      where: {
        id: savedRetweet.id
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        },
        {
          model: db.Post,
          as: 'retweet',
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname']
            },
            {
              model: db.Image
            }
          ]
        }
      ]
    });

    return res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
