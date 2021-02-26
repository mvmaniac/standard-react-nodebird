const path = require('path');
const dotenv = require('dotenv');

let dotenvPath;

switch (process.env.NODE_ENV) {
  case 'production':
    dotenvPath = path.join(__dirname, '../../', '.env.production');
    break;

  default:
    dotenvPath = path.join(__dirname, '../../', '.env');
    break;
}

const isProd = process.env.NODE_ENV === 'production';
dotenv.config({path: dotenvPath});

module.exports = {
  isProd,
  cookie: process.env.COOKIE_SECRET,
  httpPort: parseInt(process.env.HTTP_PORT, 10),
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '+09:00',
    operatorsAliases: false
  }
};
