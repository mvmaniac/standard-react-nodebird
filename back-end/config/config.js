const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'dev',
    password: process.env.DB_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  test: {
    username: 'dev',
    password: process.env.DB_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: 'dev',
    password: process.env.DB_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }
};
