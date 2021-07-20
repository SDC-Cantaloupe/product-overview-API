const express = require('express');
const db = require('./db.js');
const app = express();
const port = 3001;


// routes
app.get('/products', (req, res) => {
// addtional parameters - page (INT, default 1) / count (INT, default 5)  - might not be needed
  console.log('get request for /products');
});

app.get('/products/:product_id', (req, res) => {
  console.log('get request for /products/:product_id');
});

app.get('/products/:product_id/styles', (req, res) => {
  console.log('get request for /products/:product_id/styles');
});

app.get('/products/:product_id/related', (req, res) => {
  console.log('get request for /products/:product_id/related');
});

app.get('/cart', (req, res) => {
  console.log('get request for /cart');
});

app.post('/cart', (req, res) => {
  // body parameter sku_id INT ID for the product being added to the cart
  console.log('post request for /cart');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});