// client/src/components/BookScanner.jsx
import React from 'react';

const BookScanner = ({ onBookFound }) => {
  // Logic for scanning the book
  const handleScan = (isbn) => {
    if (onBookFound) {
      onBookFound(isbn);
    }
  };

  return (
    <div>
      <button onClick={() => handleScan('9780131101630')}>Scan Book</button>
    </div>
  );
};

export default BookScanner;
