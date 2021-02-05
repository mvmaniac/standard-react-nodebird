const {DataTypes, Model} = require('sequelize');

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: DataTypes.STRING(200),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'image',
        tableName: 'image',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {}
};
