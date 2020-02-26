'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const test = 'production';
const config = require(__dirname + '/../config/config.json')[env];
// const config2 = require(__dirname + '/../config/config.json')[test];
const db = {};

let sequelize;
if (process.env.JAWSDB_URL) {
  // sequelize = new Sequelize(process.env.JAWSDB_URL, config2);
  sequelize = new Sequelize(process.env.JAWSDB_URL, process.env.JAWSDB_DATABASE, process.env.JAWSDB_USER, process.env.JAWSDB_PASS, config.production);
}
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// }
else {
  sequelize = new Sequelize(config.database, process.env.DB_USER, process.env.DB_PASS, config);
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
