'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Company, { through: 'UserCompanies' });
      models.User.belongsToMany(models.Role, { through: 'UserRoles' });
      models.User.belongsToMany(models.Event, { through: 'UserEvents' });
      models.User.belongsToMany(models.Subscription, { through: 'UserSubscriptions' });
      models.User.belongsToMany(models.Order, { through: 'UserOrders' });
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    validation_str: {
      type: DataTypes.STRING,
    },
    resetToken: {
      type: DataTypes.STRING,
    },
    resetTokenExpires: {
      type: DataTypes.DATE
    },
    passwordReset: {
      type: DataTypes.DATE
    },
    email_validated: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    hasCompany: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};