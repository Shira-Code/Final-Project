// server/routes/bookRoutes.js
const express = require('express');
const pool = require('../config/db'); // Adjust path as needed
const router = express.Router();

// POST: Add a new book
router.post('/books', async (req, res) => {
    const { title, author, isbn, cover } = req.body;

    if (!title || !author || !isbn) {
        return res.status(400).json({ message: 'Title, author, and ISBN are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, isbn, cover) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, isbn, cover]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error saving book:', error);
        res.status(500).json({ message: 'Error saving book', error: error.message });
    }
});

module.exports = router;
