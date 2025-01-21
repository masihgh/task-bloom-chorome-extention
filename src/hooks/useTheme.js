import { useEffect, useState } from 'react';
import { parse as parseHex, oklch } from 'culori';

// Converts HEX color to OKLCH format
function hexToOklch(hex) {
  const color = parseHex(hex); // Parse hex to a color object
  if (!color) {
    throw new Error('Invalid hex color provided.');
  }

  const oklchColor = oklch(color); // Convert to OKLCH color space
  return {
    l: oklchColor.l,
    c: oklchColor.c,
    h: oklchColor.h,
  };
}

// Gets a contrasting OKLCH color
function getContrastingColor(oklchColor) {
  if (!oklchColor || typeof oklchColor.l !== 'number' || typeof oklchColor.c !== 'number' || typeof oklchColor.h !== 'number') {
    throw new Error('Invalid OKLCH color provided.');
  }

  // Adjust the lightness (`l`) to ensure contrast
  const contrastingLightness = oklchColor.l > 0.5 ? 0.2 : 0.8;

  // Create the contrasting OKLCH color object
  return {
    l: contrastingLightness,
    c: oklchColor.c,
    h: oklchColor.h,
  };
}

// Custom hook for managing theme and primary color
const useTheme = () => {
  const [theme, setTheme] = useState('auto'); // Default theme is 'auto'
  const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Default primary color
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Apply the theme to the <html> element
  const applyTheme = (theme) => {
    let resolvedTheme = theme;
    if (theme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  };

  // Apply the primary color and its contrast to the <html> element
  const applyColor = (color) => {
    try {
      const oklchColor = hexToOklch(color); // Convert HEX to OKLCH
      const contrastingColor = getContrastingColor(oklchColor); // Get the contrasting OKLCH color

      // Convert OKLCH to CSS-compatible format
      const oklchCss = `${oklchColor.l.toFixed(3)} ${oklchColor.c.toFixed(3)} ${oklchColor.h.toFixed(1)}deg`;
      const contrastingCss = `${contrastingColor.l.toFixed(3)} ${contrastingColor.c.toFixed(3)} ${contrastingColor.h.toFixed(1)}deg`;

      // Apply colors to CSS variables
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--p', oklchCss);
      document.documentElement.style.setProperty('--pc', contrastingCss);
    } catch (error) {
      console.error('Failed to apply color:', error.message);
    }
  };

  // Load saved theme and color settings
  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        const result = await chrome.storage.sync.get(['theme', 'primaryColor']);
        const savedTheme = result.theme || 'auto';
        const savedColor = result.primaryColor || '#3b82f6';
        setTheme(savedTheme);
        setPrimaryColor(savedColor);
        applyTheme(savedTheme);
        applyColor(savedColor);
      } catch (error) {
        console.error('Error fetching initial settings:', error.message);
      } finally {
        setIsLoading(false); // Set loading to false
      }
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

  return { theme, setTheme: saveTheme, primaryColor, setPrimaryColor: savePrimaryColor, isLoading };
};

export default useTheme;
