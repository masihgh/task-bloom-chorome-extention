import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('auto'); // Default theme is 'auto'
  const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Default primary color

  // Apply the theme to the <html> element
  const applyTheme = (theme) => {
    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  };

  // Apply the primary color to the <html> element
  const applyColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
  };

  // Load saved theme and color settings
  useEffect(() => {
    const fetchInitialSettings = async () => {
      const result = await chrome.storage.sync.get(['theme', 'primaryColor']);
      const savedTheme = result.theme || 'auto';
      const savedColor = result.primaryColor || '#3b82f6';
      setTheme(savedTheme);
      setPrimaryColor(savedColor);
      applyTheme(savedTheme);
      applyColor(savedColor);
    };

    fetchInitialSettings();
  }, []);

  // Save theme to storage
  const saveTheme = (newTheme) => {
    chrome.storage.sync.set({ theme: newTheme }, () => {
      setTheme(newTheme);
      applyTheme(newTheme);
    });
  };

  // Save primary color to storage
  const savePrimaryColor = (color) => {
    chrome.storage.sync.set({ primaryColor: color }, () => {
      setPrimaryColor(color);
      applyColor(color);
    });
  };

  return { theme, setTheme: saveTheme, primaryColor, setPrimaryColor: savePrimaryColor };
};

export default useTheme;