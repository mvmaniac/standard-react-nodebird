const dotenv = require('dotenv');

let path;

switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/../../.env.prod`;
    break;

  default:
    path = `${__dirname}/../../.env.dev`;
    break;
}

dotenv.config({path});

module.exports = {
  isProd: process.env.NODE_ENV === 'production',
  cookie: process.env.COOKIE_SECRET,
  port: this.isProd ? process.env.PORT : 3065,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  }
};
