const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');
const {isLoggedIn} = require('./middleware');

const router = express.Router();

// /api/users
router.get('/', isLoggedIn, (req, res) => {
  const user = {...req.user.toJSON()};
  delete user.password;

  return res.json(user);
});

// /api/users
router.post('/', async (req, res, next) => {
  try {
    const bodyData = req.body;
    const findUser = await db.User.findOne({
      where: {
        userId: bodyData.userId
      }
    });

    if (findUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }

    const hashedPassword = await bcrypt.hash(bodyData.password, 12); // salt는 10 ~ 13 사이로

    const savedUser = await db.User.create({
      userId: bodyData.userId,
      password: hashedPassword,
      nickname: bodyData.nickname
    });

    // console.log('savedUser: %o', savedUser);
    return res.status(200).json(savedUser);
  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e); // next는 최후의 수단
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {id: parseInt(req.params.id, 10)},
      include: [
        {
          model: db.Post,
          as: 'posts',
          attributes: ['id']
        },
        {
          model: db.User,
          as: 'followings',
          attributes: ['id']
        },
        {
          model: db.User,
          as: 'followers',
          attributes: ['id']
        }
      ],
      attributes: ['id', 'nickname']
    });

    const jsonUser = findUser.toJSON();
    jsonUser.posts = jsonUser.posts ? jsonUser.posts.length : 0;
    jsonUser.followings = jsonUser.followings ? jsonUser.followings.length : 0;
    jsonUser.followers = jsonUser.followers ? jsonUser.followers.length : 0;

    return res.json(jsonUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout 성공!!');
});

// 로그인-1. 프론트에서 /login req.body 에 정보를 실어서 보냄
router.post('/login', (req, res, next) => {
  // 로그인-2. passport의 LocalStrategy를 실행
  // e, user, info는 passport쪽의 done()에서 받은 정보
  passport.authenticate('local', (e, user, info) => {
    // 로그인-4. LocalStrategy에서 에러가 없다면 실행되는 콜백 함수
    if (e) {
      console.error(e);
      return next(e);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    // 로그인-5. req.login을 할 때 passport.serializeUser가 실행됨
    return req.login(user, async (loginError) => {
      try {
        if (loginError) {
          return next(loginError);
        }

        const findUser = await db.User.findOne({
          where: {id: user.id},
          include: [
            {
              model: db.Post,
              as: 'posts',
              attributes: ['id']
            },
            {
              model: db.User,
              as: 'followings',
              attributes: ['id']
            },
            {
              model: db.User,
              as: 'followers',
              attributes: ['id']
            }
          ],
          attributes: ['id', 'nickname', 'userId']
        });

        // 사용자 정보에 비밀번호 제거
        // const filteredUser = Object.assign({}, user.toJSON());
        // delete filteredUser.password;

        return res.json(findUser);
      } catch (err) {
        return next(err);
      }
    });
  })(req, res, next);
});

router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });

    const followings = await findUser.getFollowings({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10)
    });

    return res.json(followings);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });

    await findUser.addFollowings(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });

    await findUser.removeFollowings(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });

    const followers = await findUser.getFollowers({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10)
    });

    return res.json(followers);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });

    await findUser.removeFollowers(req.params.id);
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const findPosts = await db.Post.findAll({
      where: {
        userId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        retweetId: null
      },
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

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname
      },
      {
        where: {id: req.user.id}
      }
    );

    return res.send(req.body.nickname);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
