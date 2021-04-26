'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserCompany.init({
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCompany',
  });
  return UserCompany;
};