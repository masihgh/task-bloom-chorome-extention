import React from 'react';

const ColorPicker = ({ primaryColor, onColorChange, translations = {} }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{translations.primaryColor || 'Select Primary Color'}</span>
      </label>
      <input
        type="color"
        value={primaryColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default ColorPicker;