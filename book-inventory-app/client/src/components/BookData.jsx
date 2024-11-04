import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookScanner from './BookScanner';

const BookData = ({ isbn }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (isbn) {
      fetchBookData(isbn);
    }
  }, [isbn]);

  const fetchBookData = async (isbn) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/books/isbn/${isbn}`);
      setBook(data);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const handleSaveBook = async () => {
    if (!book) return;

    try {
      await axios.post('http://localhost:5000/api/books/save', { isbn, book });
      alert('Book saved to database');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book');
    }
  };

  return (
    <div className="book-data">
      <BookScanner onBookFound={fetchBookData} />
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.authors ? book.authors[0].name : 'Unknown'}</p>
          <p><strong>Publisher:</strong> {book.publishers ? book.publishers[0].name : 'Unknown'}</p>
          <button onClick={handleSaveBook}>Save Book</button>
        </div>
      ) : (
        <p>No book data found. Please enter a valid ISBN or scan a book.</p>
      )}
    </div>
  );
};

export default BookData;
