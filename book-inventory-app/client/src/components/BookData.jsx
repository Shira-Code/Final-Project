import React, { useState } from 'react';
import axios from 'axios';

const BookData = () => {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  // Handle ISBN input change
  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  // Fetch book data from Open Library
  const fetchBookData = async () => {
    setBook(null);
    setError(null);

    if (!isbn) {
      setError("Please enter a valid ISBN.");
      return;
    }

    try {
      const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const data = response.data[`ISBN:${isbn}`];

      if (data) {
        setBook({
          isbn,
          title: data.title,
          authors: data.authors || [],
          publisher: data.publishers ? data.publishers[0].name : 'Unknown',
          publishDate: data.publish_date || 'Unknown',
          pageCount: data.number_of_pages || 'Unknown',
          coverImage: data.cover ? data.cover.large : null,
        });
      } else {
        setError("No book found for this ISBN.");
      }
    } catch (err) {
      console.error("Error fetching book data:", err);
      setError("Error fetching book data. Please try again.");
    }
  };

  // Save book data to Neon DB
   // In your BookData.jsx where you're handling the save operation
const handleSaveBook = async () => {
  try {
      console.log('Sending book data:', { title, author, isbn, cover });
      const response = await axios.post('http://localhost:5000/api/books', {
          title,
          author,
          isbn,
          cover
      });
      console.log('Book saved successfully:', response.data);
  } catch (error) {
      console.error('Error saving book:', error);
  }
};


  return (
    <div>
      <h2>Book Data Fetcher</h2>
      
      <div>
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={handleInputChange} />
        </label>
        <button onClick={fetchBookData}>Fetch Book Data</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {saveMessage && <p style={{ color: 'green' }}>{saveMessage}</p>}

      {book && (
        <div>
          <h3>Book Information</h3>
          {book.coverImage && (
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`} 
              style={{ width: '200px', height: 'auto', marginBottom: '15px' }}
            />
          )}
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author(s):</strong> {book.authors.map(author => author.name).join(', ') || 'Unknown'}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Publish Date:</strong> {book.publishDate}</p>
          <p><strong>Number of Pages:</strong> {book.pageCount}</p>
          <button onClick={handleSaveBook}>Save Book</button>
        </div>
      )}
    </div>
  );
};

export default BookData;
