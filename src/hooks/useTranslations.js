import { useEffect, useState } from 'react';

const useTranslations = () => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Load translations for the selected language
  const loadTranslations = async (lang) => {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.statusText}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  // Load saved language setting and translations
  useEffect(() => {
    chrome.storage.sync.get(['language'], (result) => {
      const lang = result.language || 'en';
      setLanguage(lang);
      loadTranslations(lang);
    });

    // Listen for language changes from the popup
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'LANGUAGE_CHANGED') {
        setLanguage(message.language);
        loadTranslations(message.language);
      }
    });
  }, []);

  return { language, translations };
};

export default useTranslations;