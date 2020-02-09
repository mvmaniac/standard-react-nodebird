const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

// 함수형 exports
module.exports = () => {
  passport.use(
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
            return done(null, user);
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
