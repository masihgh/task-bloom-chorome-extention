import React from 'react';
import ReactDOM from 'react-dom';
import ThemeSelector from './components/ThemeSelector';
import ColorPicker from './components/ColorPicker';
import LanguageSelector from './components/LanguageSelector';
import useTheme from './hooks/useTheme';
import useTranslations from './hooks/useTranslations';
import './assets/index.css'

const Popup = () => {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
  const { language, translations } = useTranslations();

  // Save theme setting
  const handleThemeChange = (newTheme) => {
    chrome.storage.sync.set({ theme: newTheme }, () => {
      chrome.runtime.sendMessage({ type: 'THEME_CHANGED', theme: newTheme });
      setTheme(newTheme);
    });
  };

  // Save color setting
  const handleColorChange = (color) => {
    chrome.storage.sync.set({ primaryColor: color }, () => {
      chrome.runtime.sendMessage({ type: 'COLOR_CHANGED', color });
      setPrimaryColor(color);
    });
  };

  // Save language setting
  const handleLanguageChange = (newLanguage) => {
    chrome.storage.sync.set({ language: newLanguage }, () => {
      chrome.runtime.sendMessage({ type: 'LANGUAGE_CHANGED', language: newLanguage });
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
      <ColorPicker
        primaryColor={primaryColor}
        onColorChange={handleColorChange}
        translations={translations}
      />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));