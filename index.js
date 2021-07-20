const express = require('express');
const app = express();
const port = 3001;


// Routes
app.get('/products', (req, res) => {
// addtional parameters - page (INT, default 1) / count (INT, default 5)  - might not be needed

});

app.get('/products/:product_id', (req, res) => {

});

app.get('/products/:product_id/styles', (req, res) => {

});

app.get('products/:product_id/related', (req, res) => {

});

app.get('/cart', (req, res) => {

});

app.post('/cart', (req, res) => {
  // body parameter sku_id INT ID for the product being added to the cart

});