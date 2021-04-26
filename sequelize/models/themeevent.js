'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThemeEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ThemeEvent.init({
    EventId: DataTypes.INTEGER,
    ThemeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ThemeEvent',
  });
  return ThemeEvent;
};