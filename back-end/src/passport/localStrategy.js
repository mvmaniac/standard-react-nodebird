const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const findUser = await User.findOne({where: {email}});
          if (!findUser) {
            done(null, false, {
              status: 401,
              message: '가입되지 않은 회원입니다.'
            });
            return;
          }

          const isEqual = await bcrypt.compare(password, findUser.password);
          if (!isEqual) {
            done(null, false, {
              status: 401,
              message: '비밀번호가 일치하지 않습니다.'
            });
            return;
          }

          done(null, findUser);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
