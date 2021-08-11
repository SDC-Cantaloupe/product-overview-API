const express = require('express');
const router = require('./routes.js');
const app = express();
const port = 3001;

app.use('/', router);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = {
  app,
  server
};