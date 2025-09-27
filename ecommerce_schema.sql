-- WEEK 8 FINAL PROJECT: QUESTION 1
-- Database Management System for an E-commerce Store

-- 1. CREATE DATABASE
-- -------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS EcommerceDB;
USE EcommerceDB;

-- 2. CREATE TABLES AND CONSTRAINTS
-- -------------------------------------------------------------------

-- Table 1: Customers (Parent table for Orders)
-- Demonstrates PRIMARY KEY and NOT NULL
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Ensures email is unique
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: CustomerAddresses
-- Demonstrates a ONE-TO-ONE relationship with Customers
CREATE TABLE CustomerAddresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNIQUE NOT NULL, -- UNIQUE ensures 1:1 relationship
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    -- FOREIGN KEY constraint linking back to Customers
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE CASCADE -- If a customer is deleted, their address is also deleted
);

-- Table 3: Products
-- Demonstrates PRIMARY KEY, NOT NULL, and CHECK constraint
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL UNIQUE,
    vendor VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    -- CHECK constraint ensures stock is never negative
    CHECK (stock_quantity >= 0)
);

-- Table 4: Orders (Stores general order details)
-- Demonstrates ONE-TO-MANY relationship with Customers
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    -- FOREIGN KEY constraint linking back to Customers
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Table 5: OrderItems (Junction table for M:N relationship)
-- Demonstrates a MANY-TO-MANY relationship between Orders and Products
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_each DECIMAL(10, 2) NOT NULL,
    -- Composite UNIQUE constraint ensures a product is only listed once per order
    UNIQUE KEY unique_order_product (order_id, product_id),
    
    -- FOREIGN KEY linking to Orders
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE, -- If an order is deleted, its items are also deleted
    
    -- FOREIGN KEY linking to Products
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);