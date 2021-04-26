'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CompanyEvent.init({
    CompanyId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompanyEvent',
  });
  return CompanyEvent;
};