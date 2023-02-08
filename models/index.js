const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Apply = require('./apply');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Apply=Apply;

User.init(sequelize);
Apply.init(sequelize);

User.associate(db);
Apply.associate(db);

module.exports = db;