create database eccomerce_mark3;
drop database eccomerce_mark3;
use eccomerce_mark3;
-- 1. USERS TABLE
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 2. PRODUCTS TABLE
CREATE TABLE products (
    pid VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. ORDERS TABLE
CREATE TABLE orders (
    order_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);


-- 4. ORDER ITEMS TABLE (VERY IMPORTANT)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    product_id VARCHAR(50),
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id) REFERENCES products(pid)
        ON DELETE CASCADE
);


-- 5. PAYMENTS TABLE
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    payment_method ENUM('COD', 'UPI', 'CARD'),
    payment_status VARCHAR(50),
    amount DECIMAL(10,2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
        ON DELETE CASCADE
);


-- 6. CART TABLE 
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50),
    product_id VARCHAR(50),
    quantity INT,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id) REFERENCES products(pid)
        ON DELETE CASCADE
);