import React from 'react';

const ThemeSelector = ({ theme, onThemeChange, translations }) => {
  const themes = [
    { code: 'auto', name: translations.auto || 'Auto' },
    { code: 'light', name: translations.light || 'Light' },
    { code: 'dark', name: translations.dark || 'Dark' },
  ];

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{translations.selectTheme || 'Select Theme'}</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
      >
        {themes.map((themeOption) => (
          <option key={themeOption.code} value={themeOption.code}>
            {themeOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;