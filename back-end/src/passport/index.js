const passport = require('passport');

const db = require('../models');
const local = require('./local');

// 프론트에서 서버로는 cookie만 보냄(dbgmltlr)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id:3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼 때 마다 deserializeUser가 실행됨
// 이렇게 되면 매번 db 에서 사용자 정보를 찾음
// 실무에서는 deserializeUser 결과를 캐싱

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
        where: {id},
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
        ]
      });

      return done(null, findUser); // req.user에 담겨짐
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
