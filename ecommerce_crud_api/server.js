// Load environment variables from .env file
require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// ------------------------------------
// 1. DATABASE CONNECTION POOL
// ------------------------------------
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); // Use .promise() for async/await support

// ------------------------------------
// 2. HEALTH CHECK ROUTE
// ------------------------------------
app.get('/', (req, res) => {
    res.send('E-commerce CRUD API is running!');
});

// ------------------------------------
// 3. API ROUTES (CRUD for Products and Customers)
// ------------------------------------
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');

// Pass the database pool to the routers
app.use('/api/products', productsRouter(pool));
app.use('/api/customers', customersRouter(pool));

// ------------------------------------
// 4. START SERVER
// ------------------------------------
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});