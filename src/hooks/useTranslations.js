import { useEffect, useState } from 'react';

const useTranslations = () => {
  const [language, setLanguage] = useState('en'); // Default language is 'en'
  const [translations, setTranslations] = useState({}); // Default to an empty object
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
      setTranslations({}); // Fallback to an empty object
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  // Set the language and direction attributes of the <html> and <body> elements
  const setLanguageAndDirection = (lang) => {
    document.documentElement.lang = lang;
    const isRTL = lang === 'fa' || lang === 'ar'; // Add other RTL languages if needed
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  };

  // Load saved language setting and translations
  useEffect(() => {
    const fetchInitialLanguage = async () => {
      const result = await chrome.storage.sync.get(['language']);
      const lang = result.language || 'en';
      setLanguage(lang);
      setLanguageAndDirection(lang);
      await loadTranslations(lang);
    };

    fetchInitialLanguage();
  }, []);

  // Save language to storage
  const saveLanguage = (newLanguage) => {
    chrome.storage.sync.set({ language: newLanguage }, () => {
      setLanguage(newLanguage);
      setLanguageAndDirection(newLanguage);
      loadTranslations(newLanguage);
    });
  };

  return { language, setLanguage: saveLanguage, translations, isLoading };
};

export default useTranslations;