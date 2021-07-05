'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsToMany(models.User, { through: 'UserOrders' });
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    charge: DataTypes.STRING,
    items: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};