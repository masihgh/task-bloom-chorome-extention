import React from 'react';
import HomePage from './components/HomePage';
import useTranslations from './hooks/useTranslations';
import useTheme from './hooks/useTheme';

const App = () => {
  const { translations } = useTranslations();
  const { theme, primaryColor } = useTheme();

  return (
    <div className="App" data-theme={theme} lang={translations.language || 'en'}>
      <HomePage translations={translations} theme={theme} primaryColor={primaryColor} />
    </div>
  );
};

export default App;