const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // ------------------------------------
    // CREATE (C) - Add a new product
    // POST /api/products
    // ------------------------------------
    router.post('/', async (req, res) => {
        const { product_name, vendor, price, stock_quantity } = req.body;
        if (!product_name || !price) {
            return res.status(400).json({ error: 'Product name and price are required.' });
        }
        try {
            const [result] = await pool.query(
                'INSERT INTO Products (product_name, vendor, price, stock_quantity) VALUES (?, ?, ?, ?)',
                [product_name, vendor, price, stock_quantity]
            );
            res.status(201).json({ 
                message: 'Product created successfully', 
                productId: result.insertId 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create product' });
        }
    });

    // ------------------------------------
    // READ (R) - Get all products
    // GET /api/products
    // ------------------------------------
    router.get('/', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Products');
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve products' });
        }
    });

    // ------------------------------------
    // READ (R) - Get a single product by ID
    // GET /api/products/:id
    // ------------------------------------
    router.get('/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const [rows] = await pool.query('SELECT * FROM Products WHERE product_id = ?', [productId]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve product' });
        }
    });

    // ------------------------------------
    // UPDATE (U) - Update a product
    // PUT /api/products/:id
    // ------------------------------------
    router.put('/:id', async (req, res) => {
        const productId = req.params.id;
        const { product_name, vendor, price, stock_quantity } = req.body;
        
        try {
            const [result] = await pool.query(
                'UPDATE Products SET product_name = ?, vendor = ?, price = ?, stock_quantity = ? WHERE product_id = ?',
                [product_name, vendor, price, stock_quantity, productId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found or no change made' });
            }
            res.json({ message: `Product ${productId} updated successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update product' });
        }
    });

    // ------------------------------------
    // DELETE (D) - Delete a product
    // DELETE /api/products/:id
    // ------------------------------------
    router.delete('/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const [result] = await pool.query('DELETE FROM Products WHERE product_id = ?', [productId]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: `Product ${productId} deleted successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete product' });
        }
    });

    return router;
};