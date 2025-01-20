import React from 'react';
import ReactDOM from 'react-dom';
import LanguageSelector from './components/LanguageSelector';
import ThemeSelector from './components/ThemeSelector';
import useTranslations from './hooks/useTranslations';
import useTheme from './hooks/useTheme'; 
import './assets/index.css';

const Popup = () => {
  const { language, translations } = useTranslations();
  const { theme, setTheme } = useTheme(); // Use the theme hook

  // Save language setting
  const handleLanguageChange = (newLanguage) => {
    chrome.storage.sync.set({ language: newLanguage }, () => {
      alert(translations.save || 'Settings saved!');
      chrome.runtime.sendMessage({ type: 'LANGUAGE_CHANGED', language: newLanguage });
    });
  };

  // Save theme setting
  const handleThemeChange = (newTheme) => {
    chrome.storage.sync.set({ theme: newTheme }, () => {
      alert(translations.save || 'Settings saved!');
      chrome.runtime.sendMessage({ type: 'THEME_CHANGED', theme: newTheme });
      setTheme(newTheme);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{translations.settings || 'Settings'}</h2>
      <LanguageSelector
        language={language}
        onLanguageChange={handleLanguageChange}
        translations={translations}
      />
      <ThemeSelector
        theme={theme}
        onThemeChange={handleThemeChange}
        translations={translations}
      />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));