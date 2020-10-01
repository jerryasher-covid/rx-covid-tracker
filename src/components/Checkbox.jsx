import React from 'react';

export const Checkbox = ({ id, className, checked, onChange, label }) => {
  return (
    <label className="cb-container">
      <input
        type="checkbox"
        id={id}
        className={className}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />{' '}
      <span className="cb-mark"></span>{' '}
      <span className="cb-label">{label}</span>
    </label>
  );
};
