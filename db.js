const { Client } = require('pg');
require('dotenv').config();

console.log(process.cwd() + '/.env' );

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: 5432,
});

client.connect((err, res) => {
  if (err) {
    console.log('ERROR: ' + err.message);
  } else {
    console.log('PostgreSQL database connected!');
  }
});

const getProductInfo = (productID, callback) => {
  client.query(`SELECT * FROM products WHERE id=${productID}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      var productInfo = res.rows[0];
      client.query(`SELECT feature, value FROM features WHERE product_id=${productID}`, (err, res) => {
        if (err) {
          callback(err);
        } else {
          productInfo['features'] = res.rows;
          callback(null, productInfo);
        }
      });
    }
  });
};

const getProductStyles = (productID, callback) => {
  client.query(`SELECT id as style_id, name, original_price, sale_price, default_style as "default?" FROM styles WHERE product_id=${productID}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      var styleInfo = { 'product_id': productID };
      var styles = res.rows;
      var styleRequests = [];
      for (let i = 0; i < styles.length; i++) {
        var styleRequest = new Promise((resolve, reject) => {
          client.query(`SELECT thumbnail_url, url FROM photos WHERE style_id=${styles[i]['style_id']}`, (err, res) => {
            if (err) {
              reject(err);
            } else {
              styles[i]['photos'] = res.rows;

              client.query(`SELECT id, quantity, size FROM skus WHERE style_id=${styles[i]['style_id']}`, (err, res) => {
                if (err) {
                  reject(err);
                } else {
                  var skus = {};
                  res.rows.forEach((element) => {
                    skus[element['id']] = { quantity: element['quantity'], size: element['size'] };
                  });
                  styles[i]['skus'] = skus;
                  resolve(styles[i]);
                }
              });
            }
          });
        });
        styleRequests.push(styleRequest);
      }
      Promise.all(styleRequests)
        .then((value) => {
          styleInfo['results'] = value;
          callback(null, styleInfo);
        })
        .catch((err) => {
          callback(err);
        });
    }
  });
};

const getRelatedProducts = (productID, callback) => {
  client.query(`SELECT related_product_id FROM related WHERE current_product_id=${productID}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      var relatedProducts = [];
      res.rows.forEach((element) => {
        relatedProducts.push(Object.values(element)[0]);
      });
      callback(null, relatedProducts);
    }
  });
};

module.exports = {
  client,
  getProductInfo,
  getProductStyles,
  getRelatedProducts
};