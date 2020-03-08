const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId, 10);
    let where = {};

    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId
        }
      }
    } 

    const findPosts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.Hashtag,
          where: {name: decodeURIComponent(req.params.tag)}
        },
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

module.exports = router;
