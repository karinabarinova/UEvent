'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('../models/user')(sequelize, Sequelize);
db.role = require('../models/role')(sequelize, Sequelize);
db.company = require('../models/company')(sequelize, Sequelize);
db.event = require('../models/event')(sequelize, Sequelize);
db.comment = require('../models/comment')(sequelize, Sequelize);
db.format = require('../models/format')(sequelize, Sequelize);
db.theme = require('../models/theme')(sequelize, Sequelize);
db.promocode = require('../models/promocode')(sequelize, Sequelize);
db.subscription = require('../models/subscription')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

db.user.belongsTo(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

db.user.belongsToMany(db.company, {
  through: "user_companies",
  foreignKey: "userId",
  otherKey: "companyId"
})

db.company.belongsTo(db.user, {
  through: "user_companies",
  foreignKey: "companyId",
  otherKey: "userId"
})

db.event.belongsToMany(db.company, {
  through: "company_events",
  foreignKey: "eventId",
  otherKey: "companyId"
})

db.company.belongsToMany(db.event, {
  through: "company_events",
  foreignKey: "companyId",
  otherKey: "eventId"
})
db.comment.belongsToMany(db.event, {
  through: "event_comments",
  foreignKey: "commentId",
  otherKey: "eventId"
})

db.event.belongsToMany(db.comment, {
  through: "event_comments",
  foreignKey: "eventId",
  otherKey: "commentId"
})

db.theme.belongsToMany(db.event, {
  through: "theme_events",
  foreignKey: "themeId",
  otherKey: "eventId"
})
db.event.belongsTo(db.theme, {
  through: "theme_events",
  foreignKey: "eventId",
  otherKey: "themeId"
})

db.format.belongsToMany(db.event, {
  through: "theme_events",
  foreignKey: "formatId",
  otherKey: "eventId"
})
db.event.belongsTo(db.format, {
  through: "theme_events",
  foreignKey: "eventId",
  otherKey: "formatId"
})
//event belong to company

db.ROLES = ["user", "admin", "company"]

module.exports = db;
