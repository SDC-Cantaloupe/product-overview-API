const router = require('express').Router();
const e = require('express');
const redis = require('redis');
const db = require('./db');
require('dotenv').config();

const client = redis.createClient(process.env.REDIS_PORT);

client.on('error', (err) => {
  console.log('ERROR: ', err.message);
});

router.get('/products/:product_id', (req, res) => {
  let productID = req.params['product_id'];
  client.get(`productInfo_${productID}`, (err, cachedData) => {
    if (err) {
      res.sendStatus(500);
    } else if (cachedData) {
      res.status(200).send(JSON.parse(cachedData));
    } else {
      db.getProductInfo(productID, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else if (data) {
          client.setex(`productInfo_${productID}`, 600, JSON.stringify(data));
          res.status(200).send(data);
        } else {
          res.sendStatus(404);
        }
      });
    }
  });
});

router.get('/products/:product_id/styles', (req, res) => {
  let productID = req.params['product_id'];
  client.get(`productStyles_${productID}`, (err, cachedData) => {
    if (err) {
      res.sendStatus(500);
    } else if (cachedData) {
      res.status(200).send(JSON.parse(cachedData));
    } else {
      db.getProductStyles(productID, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else if (data) {
          client.setex(`productStyles_${productID}`, 600, JSON.stringify(data));
          res.status(200).send(data);
        } else {
          res.sendStatus(404);
        }
      });
    }
  });
});

router.get('/products/:product_id/related', (req, res) => {
  let productID = req.params['product_id'];
  client.get(`relatedProducts_${productID}`, (err, cachedData) => {
    if (err) {
      res.sendStatus(500);
    } else if (cachedData) {
      res.status(200).send(JSON.parse(cachedData));
    } else {
      db.getRelatedProducts(productID, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else if (data) {
          client.setex(`relatedProducts_${productID}`, 600, JSON.stringify(data));
          res.status(200).send(data);
        } else {
          res.sendStatus(404);
        }
      });
    }
  });
});

// verification for loader.io
router.get('/' + process.env.LOADERIO_TOKEN, (req, res) => {
  res.send(process.env.LOADERIO_TOKEN);
});


module.exports = router;

