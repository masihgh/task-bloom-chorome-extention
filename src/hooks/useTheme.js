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

    // Listen for theme changes from the popup
    const handleMessage = (message) => {
      if (message.type === 'THEME_CHANGED') {
        setTheme(message.theme);
        applyTheme(message.theme);
      } else if (message.type === 'COLOR_CHANGED') {
        setPrimaryColor(message.color);
        applyColor(message.color);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup the message listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // Watch for system theme changes in auto mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  return { theme, setTheme, primaryColor, setPrimaryColor };
};

export default useTheme;