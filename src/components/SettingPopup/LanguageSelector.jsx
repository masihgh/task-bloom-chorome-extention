import React from 'react';

const LanguageSelector = ({ language, onLanguageChange, translations = {} }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'فارسی' },
  ];

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{translations.selectLanguage || 'Select Language'}</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;