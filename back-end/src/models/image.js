const {DataTypes, Model} = require('sequelize');

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        thumbnail: {
          type: DataTypes.STRING(200)
        }
      },
      {
        sequelize,
        modelName: 'image',
        tableName: 'image',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};
