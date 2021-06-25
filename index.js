'use strict';

// 3rd Party Resources
const inquirer = require('inquirer');
const axios = require('axios');
const boxen = require('boxen');


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
          console.log( boxen(`Welcome, ✨💕 ${response.data.user.username} ✨💕`, {padding: 1}));
          console.log( boxen(`These are your permissions ${response.data.user.capabilities}`, {padding: 1}));
          inquirer
            .prompt([
              {
                type: 'list',
                message: 'what would you like to do now?',
                name: 'operation',
                choices: ['open an account', 'see all open accounts', 'close accounts', 'see my accounts', 'add notes to an account'],
              },
            ])
            .then(answers => {
              console.log('\n', 'okay be right back', '\n');
              switch(answers.operation){
              case 'open an account':
                inquirer
                  .prompt([
                    {
                      type: 'string',
                      message: 'enter an account name',
                      name: 'name',
                    },
                    {
                      type: 'string',
                      message: 'enter their email address',
                      name: 'email',
                    },
                    {
                      type: 'string',
                      message: 'enter their phone number',
                      name: 'phone',
                    },
                    {
                      type: 'title',
                      message: 'enter their title',
                      name: 'title',
                    },
                  ])
                  .then(answers => {
                    answers.salesPerson = response.data.user.id;
                    const newUser = answers;
                    const auth = {
                      headers:{
                        'Authorization': `Bearer ${response.data.user.token}`,
                      },
                    };
                    try{
                      axios.post('http://localhost:3001/api/v2/customers', newUser, auth)
                        .then(function (response) {
                          console.log(response.data);
                        });
                    } catch(e) {
                      console.log(e);
                    }
                  });
                break;
              default:
                console.log(`🚧 that operation is under construction, sorry 🚧`);
              }
            });
        },
        );
    }
    catch (e) {
      console.error(e);
    }
  },
  );