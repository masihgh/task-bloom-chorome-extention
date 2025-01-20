import React from 'react';

const HomePage = ({ translations }) => {
  return (
    <div className="homepage">
      <h1>{translations.welcome || 'Welcome to Your New Tab!'}</h1>
      <p>{translations.description || 'This is a custom homepage built with React and Vite.'}</p>
    </div>
  );
};

export default HomePage;