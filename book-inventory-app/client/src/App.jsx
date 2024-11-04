import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookData from './components/BookData';
import './index.css';

function App() {
  const [isbn, setIsbn] = useState('');

  const handleIsbnInput = (e) => {
    setIsbn(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isbn) {
      console.log('ISBN entered:', isbn);
    } else {
      alert("Please enter an ISBN number.");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1>Book Information</h1>
        <form onSubmit={handleSubmit} className="isbn-form">
          <label htmlFor="isbn-input">Enter ISBN:</label>
          <input
            id="isbn-input"
            type="text"
            value={isbn}
            onChange={handleIsbnInput}
            placeholder="Enter ISBN number"
          />
          <button type="submit">Fetch Book Data</button>
        </form>
        <BookData isbn={isbn} />
      </div>
    </div>
  );
}

export default App;
