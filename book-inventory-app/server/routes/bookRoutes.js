const express = require('express');
const { searchBookByISBN, saveBook } = require('../controllers/bookController');
const router = express.Router();

router.get('/isbn/:isbn', searchBookByISBN);
router.post('/save', saveBook);

module.exports = router;
