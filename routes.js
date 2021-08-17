const router = require('express').Router();
const db = require('./db');
require('dotenv').config();


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

// verification for loader.io
router.get('/' + process.env.LOADERIO_TOKEN, (req, res) => {
  res.send(process.env.LOADERIO_TOKEN);
});


module.exports = router;

