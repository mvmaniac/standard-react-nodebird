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
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }

  static associate(db) {}
};
