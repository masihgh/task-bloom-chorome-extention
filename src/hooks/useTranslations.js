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
    const fetchInitialLanguage = async () => {
      const result = await chrome.storage.sync.get(['language']);
      const lang = result.language || 'en';
      setLanguage(lang);
      await loadTranslations(lang);
    };

    fetchInitialLanguage();

    // Listen for language changes from the popup
    const handleMessage = (message) => {
      if (message.type === 'LANGUAGE_CHANGED') {
        setLanguage(message.language);
        loadTranslations(message.language);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup the message listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // Update the <html> lang and dir attributes when the language changes
  useEffect(() => {
    document.documentElement.lang = language;

    // Set dir="rtl" for Arabic (ar) and Persian (fa)
    if (language === 'ar' || language === 'fa') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr'; // Default to left-to-right for other languages
    }
  }, [language]);

  return { language, translations };
};

export default useTranslations;