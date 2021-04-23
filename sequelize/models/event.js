'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    location: DataTypes.GEOMETRY('POINT'),
    price: DataTypes.INTEGER,
    promoCodes: DataTypes.ARRAY(DataTypes.STRING),
    organizer: DataTypes.INTEGER,
    theme: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};