module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'image',
    {
      src: {
        // S3 저장
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};
