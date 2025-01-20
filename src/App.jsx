import React from 'react';
import HomePage from './components/HomePage';
import useTranslations from './hooks/useTranslations';
import useTheme from './hooks/useTheme';

const App = () => {
  const { translations } = useTranslations();
  const { theme } = useTheme();

  return (
    <div className="App" data-theme={theme}>
      <HomePage translations={translations} />
    </div>
  );
};

export default App;