import React from 'react';
import HomePage from './components/HomePage';
import useTranslations from './hooks/useTranslations';

const App = () => {
  const { translations } = useTranslations();

  return (
    <div className="App">
      <HomePage translations={translations} />
    </div>
  );
};

export default App;