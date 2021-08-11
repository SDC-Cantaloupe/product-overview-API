const router = require('express').Router();
const db = require('./db');


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


module.exports = router;

