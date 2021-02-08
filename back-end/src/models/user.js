const {DataTypes, Model} = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    // ID가 기본적으로 들어가 있음
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true
        },
        nickname: {type: DataTypes.STRING(10), allowNull: false},
        password: {type: DataTypes.STRING(100), allowNull: false}
      },
      {
        sequelize,
        modelName: 'user',
        tableName: 'user',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {through: 'post_like', as: 'liked'});
    db.User.belongsToMany(db.User, {
      through: 'follow',
      as: 'followers',
      foreignKey: 'followingId'
    });
    db.User.belongsToMany(db.User, {
      through: 'follow',
      as: 'followings',
      foreignKey: 'followerId'
    });
  }
};
