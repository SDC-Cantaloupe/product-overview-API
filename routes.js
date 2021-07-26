const router = require('express').Router();
const db = require('./db');

// router.get('/products', (req, res) => {
// // addtional parameters - page (INT, default 1) / count (INT, default 5)  - might not be needed
//   res.status(200).send('get request to /products');
// });

router.get('/products/:product_id', (req, res) => {
  db.getProductInfo(req.params['product_id'], (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  db.getProductStyles(req.params['product_id'], (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/products/:product_id/related', (req, res) => {
  db.getRelatedProducts(req.params['product_id'], (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }
  });
});

// router.get('/cart', (req, res) => {
//   res.status(200).send('get request for /cart');
// });

// router.post('/cart', (req, res) => {
//   // body parameter sku_id INT ID for the product being added to the cart
//   res.status(201).send('post request for /cart');
// });

module.exports = router;

