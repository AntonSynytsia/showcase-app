const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connect');

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
  },
  { sequelize, modelName: 'employee' }
);

module.exports = User;
