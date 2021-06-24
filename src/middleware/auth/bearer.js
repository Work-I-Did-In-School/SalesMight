'use strict';

// Esoteric Resources
const { users } = require('../../models/index.js');

// expects
// req.header.authorization = Basic base64(username:password)

module.exports = async (req, res, next) => {
  try {
    console.log('hello from bearer auth');
    if (!req.headers.authorization) { _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};
