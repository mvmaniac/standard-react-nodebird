const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const {User} = require('../models');

const router = express.Router();

// POST /users/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
      return;
    }

    if (info) {
      res.status(info.status).send(info.message);
      return;
    }

    req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
        return;
      }

      res.json(user);
    });
  })(req, res, next);
}); // 미들웨어를 확장하는 방버

// POST /users
router.post('/', async (req, res, next) => {
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

    res.status(201).send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
