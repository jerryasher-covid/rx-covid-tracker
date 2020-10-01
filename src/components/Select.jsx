import React from 'react';

export const Select = ({ id, className, defaultValue, onChange, options }) => {
  return (
    <select
      id={id}
      className={className}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
