const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Estimate = require("./estimate")(sequelize, Sequelize);
db.Platform = require("./platform")(sequelize, Sequelize);
db.Type = require("./type")(sequelize, Sequelize);

db.Platform.belongsToMany(db.Estimate, { through: 'EstimatePlatform' });
db.Estimate.belongsToMany(db.Platform, { through: 'EstimatePlatform' });
// db.Type.belongs  To(db.Estimate, { through: 'EstimateType' }); 

db.Estimate.belongsToMany(db.Type, { through: 'EstimateType' });
db.Estimate.hasOne(db.Type); // 하나의 Type이 여러개의 Estimate를 가질 순 있지만, 하나의 Estimate가 여러개의 Type을 가질 순 없다.
module.exports = db; 