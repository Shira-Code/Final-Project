const axios = require('axios');
const pool = require('../config/db');

const searchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const bookData = response.data[`ISBN:${isbn}`];
    if (!bookData) return res.status(404).json({ message: 'Book not found' });
    res.json(bookData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book data' });
  }
};

const saveBook = async (req, res) => {
  const { isbn, book } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (isbn, title, author, publisher) VALUES ($1, $2, $3, $4) RETURNING *',
      [isbn, book.title, book.authors ? book.authors[0].name : null, book.publishers ? book.publishers[0].name : null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error saving book to database' });
  }
};

module.exports = { searchBookByISBN, saveBook };
