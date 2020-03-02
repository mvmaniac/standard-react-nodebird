module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false,
        unique: true // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 50글자 이하
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );

  User.associate = db => {
    // one to many? 읽기전용?
    db.User.hasMany(db.Post, {as: 'posts'});
    db.User.hasMany(db.Comment);

    db.User.belongsToMany(db.Post, {through: 'Like', as: 'liked'});
    db.User.belongsToMany(db.User, {through: 'Follow', as: 'followers', foreignKey: 'followingId'});
    db.User.belongsToMany(db.User, {through: 'Follow', as: 'followings', foreignKey: 'followerId'});
  };

  return User;
};
