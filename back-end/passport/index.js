const passport = require('passport');

const db = require('../models');
const local = require('./local');

// 함수형 exports
module.exports = () => {
  // 사용자를 대표하는 아이디와 프론트에 보내는 쿠키값을 저장함
  // ex) [{id: 3, cookie: 'dbgmltlr'}]
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  // 저장해 놓은 id로 사용자정보를 조회함
  // 조회 정보는 req.user 에 저장됨
  passport.deserializeUser(async (id, done) => {
    try {
      const findUser = await db.User.findOne({
        where: {id}
      });

      return done(null, findUser);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
