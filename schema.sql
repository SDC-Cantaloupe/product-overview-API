CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  slogan VARCHAR(200),
  description VARCHAR(1000),
  category VARCHAR(50),
  default_price VARCHAR(10)
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR(50),
  value VARCHAR(50)
);

CREATE INDEX features_product_id_index
ON features (product_id);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(50),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style BOOLEAN
);

CREATE INDEX styles_product_id_index
ON styles (product_id);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  url TEXT,
  thumbnail_url TEXT
);

CREATE INDEX photos_style_id_index
ON photos (style_id);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  size VARCHAR(10),
  quantity INTEGER
);

CREATE INDEX skus_style_id_index
ON skus (style_id);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

CREATE INDEX related_current_product_id_index
ON related (current_product_id);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session INTEGER,
  product_id INTEGER,
  active BOOLEAN
);