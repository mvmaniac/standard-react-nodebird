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
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {}
};
