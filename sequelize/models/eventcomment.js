'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EventComment.init({
    EventId: DataTypes.INTEGER,
    CommentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventComment',
  });
  return EventComment;
};