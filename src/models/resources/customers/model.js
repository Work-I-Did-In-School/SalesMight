'use strict';

const customerModel = (sequelize, DataTypes) => sequelize.define('Customers', {
  salesPerson: { type: DataTypes.INTEGER, required: true },
  name: { type: DataTypes.STRING, required: true },
  email: { type: DataTypes.STRING, required: true },
  phone: { type: DataTypes.STRING, required: false },
  jobTitle: { type: DataTypes.STRING, required: true },
});

module.exports = customerModel;
