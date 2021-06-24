'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js.js');
const errorHandler = require('./error-handlers/500.js.js');
const logger = require('./middleware/logger.js.js');

const v1Routes = require('./routes/v1.js.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
