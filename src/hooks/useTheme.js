import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('auto'); // Default theme is 'auto'

  // Apply the theme to the <html> element
  const applyTheme = (theme) => {
    let resolvedTheme = theme;
    if (theme === 'auto') {
      // Use browser's preference for auto mode
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  };

  // Load saved theme setting
  useEffect(() => {
    const fetchInitialTheme = async () => {
      const result = await chrome.storage.sync.get(['theme']);
      const savedTheme = result.theme || 'auto';
      setTheme(savedTheme);
      applyTheme(savedTheme); // Apply the saved theme
    };

    fetchInitialTheme();

    // Listen for theme changes from the popup
    const handleMessage = (message) => {
      if (message.type === 'THEME_CHANGED') {
        setTheme(message.theme);
        applyTheme(message.theme);
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

  return { theme, setTheme };
};

export default useTheme;