const csrf = require('csurf');
const config = require('../config/config');

exports.csrfOptions = {
  cookie: {
    key: 'csrf',
    httpOnly: true
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
};

if (config.isProd) {
  this.csrfOptions.cookie.secure = true;
  this.csrfOptions.cookie.domain = '.devfactory.me';
}

exports.csrfHandler = csrf({cookie: true});
