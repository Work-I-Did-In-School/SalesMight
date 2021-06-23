'use strict';

// 3rd party resources
const { Sequelize, DataTypes } = require('sequelize');

// schemas
const clothesModel = require('./resources/clothes/model');
const foodModel = require('./resources/food/model');
const userModel = require('./auth/users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

// create tables
const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: food,
  clothes: clothes,
  users: users,
};
