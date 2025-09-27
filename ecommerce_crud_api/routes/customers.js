const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // ------------------------------------
    // CREATE (C) - Add a new customer
    // POST /api/customers
    // ------------------------------------
    router.post('/', async (req, res) => {
        const { first_name, last_name, email, phone_number } = req.body;
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: 'First name, last name, and email are required.' });
        }
        try {
            const [result] = await pool.query(
                'INSERT INTO Customers (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)',
                [first_name, last_name, email, phone_number]
            );
            res.status(201).json({ 
                message: 'Customer created successfully', 
                customerId: result.insertId 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create customer' });
        }
    });

    // ------------------------------------
    // READ (R) - Get all customers
    // GET /api/customers
    // ------------------------------------
    router.get('/', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM Customers');
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve customers' });
        }
    });

    // ------------------------------------
    // UPDATE (U) - Update a customer
    // PUT /api/customers/:id
    // ------------------------------------
    router.put('/:id', async (req, res) => {
        const customerId = req.params.id;
        const { first_name, last_name, email, phone_number } = req.body;
        
        try {
            const [result] = await pool.query(
                'UPDATE Customers SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE customer_id = ?',
                [first_name, last_name, email, phone_number, customerId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Customer not found or no change made' });
            }
            res.json({ message: `Customer ${customerId} updated successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update customer' });
        }
    });

    // ------------------------------------
    // DELETE (D) - Delete a customer
    // DELETE /api/customers/:id
    // ------------------------------------
    router.delete('/:id', async (req, res) => {
        const customerId = req.params.id;
        try {
            const [result] = await pool.query('DELETE FROM Customers WHERE customer_id = ?', [customerId]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.json({ message: `Customer ${customerId} deleted successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete customer' });
        }
    });

    return router;
};