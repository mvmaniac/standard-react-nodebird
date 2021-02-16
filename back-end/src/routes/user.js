const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const {User, Post} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

// POST /users/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, exception) => {
    if (authError) {
      console.error(authError);
      next(authError);
      return;
    }

    // 예외 정보가 있다면
    if (exception) {
      const {status, message} = exception;
      res.status(status).json({message});
      return;
    }

    // req.login 실행 시
    // passport의 serializeUser로 같이 실행 됨
    req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
        return;
      }

      const findUser = await User.findOne({
        where: {id: user.id},
        attributes: {
          exclude: ['password', 'updated_at']
        },
        include: [
          {model: Post, attributes: ['id']},
          {model: User, as: 'followers', attributes: ['id']},
          {model: User, as: 'followings', attributes: ['id']}
        ]
      });

      res.json(findUser);
    });
  })(req, res, next);
}); // 미들웨어를 확장하는 방법

// POST /users/logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();

  res.json();
});

// GET /users
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const findUser = await User.findOne({
        where: {id: req.user.id},
        attributes: {
          exclude: ['password', 'updated_at']
        },
        include: [
          {model: Post, attributes: ['id']},
          {model: User, as: 'followers', attributes: ['id']},
          {model: User, as: 'followings', attributes: ['id']}
        ]
      });

      res.status(200).json(findUser);
      return;
    }

    res.status(204).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 숫자 정규표현식을 하지 않으면
// /users/followers, /users/followings URL로 여기를 탐...
// 아니면 URL를 완전히 다르게 하던가 해야 할 듯...
// GET /users/:userId
router.get('/:userId(\\d+)', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const findUser = await User.findOne({
      where: {id: userId},
      attributes: {
        exclude: ['password', 'updated_at']
      },
      include: [
        {model: Post, attributes: ['id']},
        {model: User, as: 'followers', attributes: ['id']},
        {model: User, as: 'followings', attributes: ['id']}
      ]
    });

    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    // posts, followers, followings 의 아이디 값도 안나오게 하기 위해서...
    const result = findUser.toJSON();
    result.posts = result.posts.length;
    result.followers = result.followers.length;
    result.followings = result.followings.length;

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /users
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (findUser) {
      res.status(409).send('이미 사용 중인 아이디 입니다.');
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });

    res.status(201).json();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /users/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname
      },
      {where: {id: req.user.id}}
    );

    res.status(200).json({nickname: req.body.nickname});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /users/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await User.findOne({where: {id: req.user.id}});
    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    const followings = await findUser.getFollowings();
    res.status(200).json({followings});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /users/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const findUser = await User.findOne({where: {id: req.user.id}});
    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    const followers = await findUser.getFollowers();
    res.status(200).json({followers});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /users/:followingId/follow
router.patch('/:followingId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const followingId = parseInt(req.params.followingId, 10);

    const findUser = await User.findOne({where: {id: followingId}});
    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    await findUser.addFollowers(req.user.id);
    res.status(200).json({followingId});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /users/:followingId/follow
router.delete('/:followingId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const followingId = parseInt(req.params.followingId, 10);

    const findUser = await User.findOne({where: {id: followingId}});
    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    await findUser.removeFollowers(req.user.id);
    res.status(200).json({followingId});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /users/followers/:followerId
router.delete('/followers/:followerId', isLoggedIn, async (req, res, next) => {
  try {
    const followerId = parseInt(req.params.followerId, 10);

    const findUser = await User.findOne({where: {id: followerId}});
    if (!findUser) {
      res.status(404).json({message: '존재하지 않는 사용자입니다.'});
      return;
    }

    await findUser.removeFollowings(req.user.id);
    res.status(200).json({followerId});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
