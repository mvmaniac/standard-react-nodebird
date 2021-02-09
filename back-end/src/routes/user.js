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
          exclude: ['password']
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

module.exports = router;
