const express = require('express');
const router = require('./routes.js');
const db = require('./db.js');
const app = express();
const port = 3001;

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


