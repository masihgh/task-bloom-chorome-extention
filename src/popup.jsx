import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ThemeSelector from './components/ThemeSelector';
import ColorPicker from './components/ColorPicker';
import LanguageSelector from './components/LanguageSelector';
import useTheme from './hooks/useTheme';
import useTranslations from './hooks/useTranslations';
import './assets/index.css';

const Popup = () => {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
  const { language, setLanguage, translations } = useTranslations();
  const [isSaved, setIsSaved] = useState(false); // State for success message

  // Save all settings
  const handleSaveSettings = () => {
    // Save theme
    setTheme(theme);
    // Save primary color
    setPrimaryColor(primaryColor);
    // Save language
    setLanguage(language);

    // Show success message
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{translations.settings || 'Settings'}</h2>
      <LanguageSelector
        language={language}
        onLanguageChange={setLanguage}
        translations={translations}
      />
      <ThemeSelector
        theme={theme}
        onThemeChange={setTheme}
        translations={translations}
      />
      <ColorPicker
        primaryColor={primaryColor}
        onColorChange={setPrimaryColor}
        translations={translations}
      />
      <button
        className="btn btn-primary w-full mt-4"
        onClick={handleSaveSettings}
      >
        {translations.saveSettings || 'Save Settings'}
      </button>
      {isSaved && (
        <div className="text-green-500 text-center mt-2">
          {translations.save || 'Settings saved!'}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));