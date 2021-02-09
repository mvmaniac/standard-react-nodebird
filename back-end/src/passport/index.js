const passport = require('passport');

const local = require('./localStrategy');
const {User} = require('../models');

// 프론트에서 서버로는 cookie만 보냄
// 서버가 cookie-parser, express-session으로 쿠키 검사 후 id 값을 발견
// id 값이 deserializeUser에 들어가서 해당 id로 사용자 정보를 조회함

// 요청 보낼 때 마다 deserializeUser가 실행됨
// 이렇게 되면 매번 db 에서 사용자 정보를 찾음
// 실무에서는 deserializeUser 결과를 캐싱

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser!!!');

    // 사용자를 대표하는 아이디와 프론트에 보내는 쿠키값을 저장함
    // ex) [{id: 3, cookie: 'dbgmltlr'}]
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log('deserializeUser!!!');

    try {
      const findUser = await User.findOne({where: {id}});
      done(null, findUser); // req.user로 사용할 수 있음
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
