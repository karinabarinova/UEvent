'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1234)
      },
      startDate: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.GEOMETRY('POINT')
      },
      price: {
        type: Sequelize.INTEGER
      },
      promoCodes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      organizer: {
        type: Sequelize.INTEGER
      },
      theme: {
        type: Sequelize.STRING,
      },
      format: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};