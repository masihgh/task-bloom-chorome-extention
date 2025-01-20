import React from 'react';
import ReactDOM from 'react-dom';
import LanguageSelector from './components/LanguageSelector';
import useTranslations from './hooks/useTranslations';
import './assets/index.css'

const Popup = () => {
  const { language, translations } = useTranslations();

  // Save language setting
  const handleLanguageChange = (newLanguage) => {
    chrome.storage.sync.set({ language: newLanguage }, () => {
      alert(translations.save || 'Settings saved!');
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
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));