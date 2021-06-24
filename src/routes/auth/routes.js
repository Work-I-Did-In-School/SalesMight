'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../../models/index.js');
const basicAuth = require('../../middleware/auth/basic');
const bearerAuth = require('../../middleware/auth/bearer.js');
const permissions = require('../../middleware/auth/acl.js');

// creates credentials (registers basic auth) on signup
authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

// generates a new token provided the user signedup
authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

// returns all user records provided user is
// signedup
// signedin
// and has 'delete' permissions 
authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

module.exports = authRouter;