'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Company.belongsToMany(models.User, { through: 'UserCompanies' });
      models.Company.belongsToMany(models.Event, { through: 'CompanyEvents' });
    }
  };
  Company.init({
    name: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
    description: DataTypes.STRING(1234),
    owner: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};