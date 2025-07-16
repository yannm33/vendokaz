import React from 'react';

const FormField = ({ id, label, error, children, required = true }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default FormField;