const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc');

const productSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'name': String,
  'slogan': String,
  'description': String,
  'category': String,
  'default_price': String
});

const featureSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'product_id': Number,
  'feature': String,
  'value': String
});

const styleSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'product_id': Number,
  'name': String,
  'original_price': String,
  'sale_price': String,
  'default_style': Boolean
});

const photoSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'style_id': Number,
  'url': String,
  'thumbnail_url': String
});

const skuSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'style_id': Number,
  'size': String,
  'quantity': Number
});

const relatedSchema = new mongoose.Schema({
  '_id': {type: Number, unique: true},
  'current_product_id': Number,
  'related_product_id': Number
});

let Product = mongoose.model('Product', productSchema);
let Feature = mongoose.model('Feature', featureSchema);
let Style = mongoose.model('Style', styleSchema);
let Photo = mongoose.model('Photo', photoSchema);
let Sku = mongoose.model('Sku', skuSchema);
let Related = mongoose.model('Related', relatedSchema);