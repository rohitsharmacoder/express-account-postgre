const { Sequelize, DataTypes } = require('sequelize');

const config = require("../config/config.json");
const dbConfig = config['development'];

const {database, username, password, dialect, host, port} = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {sequelize, DataTypes};