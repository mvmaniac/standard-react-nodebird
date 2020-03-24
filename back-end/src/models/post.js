module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'post',
    {
      // 테이블명은 posts
      content: {
        type: DataTypes.TEXT, // 긴글
        allowNull: false
      }
    },
    {
      charset: 'utf8mb4', // 한글 + 이모티콘
      collate: 'utf8mb4_unicode_ci'
    }
  );

  Post.associate = (db) => {
    // many to one + 연관관계 주인?
    db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생김

    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);

    db.Post.belongsTo(db.Post, {as: 'retweet'}); // RetweetId 컬럼 생김

    db.Post.belongsToMany(db.Hashtag, {through: 'postHashtag'});
    db.Post.belongsToMany(db.User, {through: 'like', as: 'likers'});
  };

  return Post;
};
