'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserOrder.init({
    UserId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserOrder',
  });
  return UserOrder;
};