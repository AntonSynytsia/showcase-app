const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize('sample_app', 'root', 'anton1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
