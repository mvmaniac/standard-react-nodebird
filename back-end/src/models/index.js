const Sequelize = require('sequelize');

const {db} = require('../config/config');

const sequelize = new Sequelize(db.database, db.username, db.password, db);
const database = {};

database.Comment = require('./comment')(sequelize, Sequelize);
database.Hashtag = require('./hashtag')(sequelize, Sequelize);
database.Image = require('./image')(sequelize, Sequelize);
database.Post = require('./post')(sequelize, Sequelize);
database.User = require('./user')(sequelize, Sequelize);

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
