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

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(50),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style BOOLEAN
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  size VARCHAR(10),
  quantity INTEGER
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session INTEGER,
  product_id INTEGER,
  active BOOLEAN
);