const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname']
        }
      ],
      order: [['createdAt', 'DESC'], ['updatedAt', 'ASC']]
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// /api/posts
router.post('/', async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
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

      await newPost.addHashtags(result.map(r => r[0]));
    }

    // 첫번째 방법
    //const user = await newPost.getUser();
    //newPost.user = user;
    //res.json(newPost);

    // 두번쨰 방법
    const fullPost = await db.Post.findOne({
      where: {
        id: newPost.id
      },
      include: [
        {
          model: db.User
        }
      ]
    });

    return res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', (req, res) => {});

module.exports = router;
