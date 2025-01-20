import React from 'react';
import HomePage from './components/HomePage';
import useTranslations from './hooks/useTranslations';
import useTheme from './hooks/useTheme';
import Loader from './components/Loader';

const App = () => {
  const { translations, language, isLoading: isTranslationsLoading } = useTranslations();
  const { theme, primaryColor, isLoading: isThemeLoading } = useTheme();

  // Show loader if either translations or theme is loading
  const isLoading = isTranslationsLoading || isThemeLoading;

  return (
    <div className="App" data-theme={theme} lang={language}>
      {isLoading ? (
        <Loader />
      ) : (
        <HomePage translations={translations} theme={theme} primaryColor={primaryColor} />
      )}
    </div>
  );
};

export default App;