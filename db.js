const { Client } = require('pg');

const client = new Client({
  database: 'sdc',
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('ERROR: ' + err.message);
  } else {
    console.log('CONNECTED!');
  }
  client.end();
});