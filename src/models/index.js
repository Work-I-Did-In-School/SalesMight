'use strict';

// 3rd party resources
const { Sequelize, DataTypes } = require('sequelize');

// schemas
const customerModel = require('./resources/customers/model');
const noteModel = require('./resources/notes/model');
const userModel = require('./auth/users.js');
const { Model } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

// create tables
const sequelize = new Sequelize(DATABASE_URL);
const notes = noteModel(sequelize, DataTypes);
const customers = customerModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

users.hasMany(customers, {foreignKey: 'salesPerson', sourceKey: 'id'});
customers.belongsTo(users, {foreignKey: 'salesPerson', targetKey: 'id'});

// ? still confused about the difference between target key and source key
customers.hasMany(notes, {foreignKey: 'customerId', sourceKey: 'id'});
notes.belongsTo(customers, {foreignKey: 'customerId', targetKey: 'id'});

module.exports = {
  db: sequelize,
  notes: notes,
  customers: customers,
  users: users,
};
