const {DataTypes, Model} = require('sequelize');

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'post',
        tableName: 'post',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, {as: 'retweet'});
    db.Post.belongsToMany(db.Hashtag, {through: 'post_hashtag'});
    db.Post.belongsToMany(db.User, {through: 'post_like', as: 'likers'});
  }
};
