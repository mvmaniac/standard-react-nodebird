const {DataTypes, Model} = require('sequelize');

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'hashtag',
        tableName: 'hashtag',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {}
};
