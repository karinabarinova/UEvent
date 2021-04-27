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
      models.Event.belongsToMany(models.Theme, { through: 'ThemeEvent' });
      models.Event.belongsToMany(models.Format, { through: 'FormatEvent' });
      models.Event.belongsToMany(models.Company, { through: 'CompanyEvents' });
      models.Event.belongsToMany(models.Comment, { through: 'EventComments'});
      models.Event.belongsToMany(models.User, { through: 'UserEvents'});
    }
  };
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    location: DataTypes.GEOMETRY('POINT'),
    price: DataTypes.INTEGER,
    promoCodes: DataTypes.ARRAY(DataTypes.STRING),
    organizer: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    format: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};