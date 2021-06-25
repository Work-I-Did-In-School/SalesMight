'use strict';

const inquirer = require('inquirer');
const axios = require('axios');



require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models/index.js');

db.sync().then(() => {
  app.start(process.env.PORT || 3001);
});

inquirer
  .prompt([
    {
      type: 'string',
      message: 'enter a username',
      name: 'username',
    },
    {
      type: 'password',
      message: 'enter your password',
      name: 'password',
    },
    {
      type: 'list',
      message: 'what is your role',
      name: 'role',
      choices: ['salesPerson', 'accountManager'],
    },
  ])
  .then(answers => {
    try {
      const body = answers;
      axios.post('http://localhost:3001/signup', body)
        .then(function (response) {
          console.log(response);
          // axios.get('http://localhost:3001/users', bearer token)
        },
        );
    }
    catch (e) {
      console.error(e);
    }
  },
  );