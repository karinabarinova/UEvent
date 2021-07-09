'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Subscription.belongsToMany(models.User, { through: 'UserSubscriptions' });
    }
  };
  Subscription.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    send_notification: DataTypes.BOOLEAN,
    promoCode: DataTypes.STRING,
    startDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};