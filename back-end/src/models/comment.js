const {DataTypes, Model} = require('sequelize');

module.exports = class Comment extends Model {
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
        modelName: 'comment',
        tableName: 'comment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {}
};
