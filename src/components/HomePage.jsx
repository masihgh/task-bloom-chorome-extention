import React, { useState, useEffect } from 'react';

const HomePage = ({ translations }) => {
  const [query, setQuery] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('https://random-image-pepebigotes.vercel.app/api/random-image');

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else {
      alert(translations.enterSearch || 'Please enter a search query.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content */}
      <div className="z-10 text-center text-white">
        {/* Logo */}
        <h1 className="text-6xl font-bold mb-8">
          {translations.title || 'Better Search'}
        </h1>

        {/* Search Box */}
        <div className="flex items-center w-full max-w-md gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input bg-base-300 w-full text-black"
            placeholder={translations.placeholder || 'Search...'}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary"
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
    </div>
  );
};

export default HomePage;
