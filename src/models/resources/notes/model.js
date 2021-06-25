'use strict';

const noteModel = (sequelize, DataTypes) => sequelize.define('notes', {
  customerId: { type: DataTypes.INTEGER, required: true },
  text: { type: DataTypes.STRING, required: true },
});

module.exports = noteModel;
