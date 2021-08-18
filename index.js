const express = require('express');
const router = require('./routes.js');
const app = express();
require('dotenv').config();

app.use('/', router);

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}!`);
});

module.exports = {
  app,
  server
};