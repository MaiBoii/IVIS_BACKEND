const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user');
const Apply = require('./apply');
const Reserve = require('./interview');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Apply = Apply;
db.Reserve = Reserve;


User.init(sequelize);
Apply.init(sequelize);
Reserve.init(sequelize);

User.associate(db);
Apply.associate(db);
Reserve.associate(db);

module.exports = db;