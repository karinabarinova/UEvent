'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormatEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FormatEvent.init({
    EventId: DataTypes.INTEGER,
    FormatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FormatEvent',
  });
  return FormatEvent;
};