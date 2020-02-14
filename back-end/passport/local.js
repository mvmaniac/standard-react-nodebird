const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

// 함수형 exports
module.exports = () => {
  passport.use(
    // 로그인-3. 에러가 없다면 LocalStrategy를 실행한 콜백 함수로 감
    new LocalStrategy(
      {
        usernameField: 'userId',
        passwordField: 'password'
      },
      async (userId, password, done) => {
        try {
          const findUser = await db.User.findOne({
            where: {userId}
          });

          if (!findUser) {
            return done(null, false, {reason: '존재하지 않는 사용자입니다.'});
          }

          const isMatch = await bcrypt.compare(password, findUser.password);
          if (isMatch) {
            return done(null, findUser);
          }

          return done(null, false, {reason: '비밀번호가 틀립니다.'});
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
