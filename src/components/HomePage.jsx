import React, { useState } from 'react';

const HomePage = ({ translations }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else {
      alert(translations.enterSearch || 'Please enter a search query.');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
      {/* Logo */}
      <h1 className="text-6xl font-bold mb-8 text-primary">
        {translations.title || 'Better Search'}
      </h1>

      {/* Search Box */}
      <div className="flex items-center w-full max-w-md gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input bg-base-300 w-full "
          placeholder={translations.placeholder || 'Search...'}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary "
        >
          {translations.search || 'Search'}
        </button>
      </div>

      {/* Optional Buttons */}
      <div className="mt-4 space-x-4">
        <button
          onClick={handleSearch}
          className="btn btn-secondary"
        >
          {translations.feelingLucky || "I'm Feeling Lucky"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
