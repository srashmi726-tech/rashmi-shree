CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(20) DEFAULT 'buyer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  seller_id UUID,
  title VARCHAR(255),
  description TEXT,
  price NUMERIC(12, 2),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY,
  user_id UUID,
  product_id UUID,
  quantity INTEGER DEFAULT 1
);

CREATE TABLE wishlist (
  id UUID PRIMARY KEY,
  user_id UUID,
  product_id UUID
);

CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID,
  total NUMERIC(12, 2),
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  product_id UUID,
  user_id UUID,
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
