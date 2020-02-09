const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  
});

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

    const newUser = await db.User.create({
      userId: bodyData.userId,
      password: hashedPassword,
      nickname: bodyData.nickname
    });

    console.log("newUser: %o", newUser);
    return res.status(200).json(newUser);

  } catch (e) {
    console.error(e);
    // 에러 처리를 여기서
    return next(e); // next는 최후의 수단
  }
});

router.get('/:id', (req, res) => {
  
});

router.post('/logout', (req, res) => {
  
});

router.post('/login', (e, res, next) => {
  // err, user, info는 passport쪽의 done()에서 받은 정보
  passport.authenticate('local', (err, user, info) => {
    if (e) {
      console.error(e);
      return next(e);
    }

    if (info) {
      res.status(401).send(info.reason);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        next(loginError);
      }

      // 사용자 정보에 비밀번호 제거
      const filteredUser = Object.assign({}, user);
      delete filteredUser.password;

      return res.json(filteredUser);
    });
  })(req, res, next);
});

router.get('/:id/follow', (req, res) => {
  
});

router.post('/:id/follow', (req, res) => {
  
});

router.delete('/:id/follow', (req, res) => {
  
});

router.delete('/:id/follower', (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  
});

module.exports = router;
