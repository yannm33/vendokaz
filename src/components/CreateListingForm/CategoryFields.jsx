import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Link as LinkIcon, ChevronDown, Check } from 'lucide-react';
import FormField from './FormField';

const CategoryFields = ({ selectedCategoryData, selectedSubCategoryData, categorySpecificFields, handleInputChange, errors, isEventCategory }) => {
  const fieldsSource = selectedSubCategoryData || selectedCategoryData;

  if (!fieldsSource?.fields || fieldsSource.fields.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pt-6 border-t border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        Détails {isEventCategory ? "de l'événement" : (selectedCategoryData?.id === 'seasonal-jobs' ? "de l'offre" : "pour : " + fieldsSource.name)}
      </h3>
      {fieldsSource.fields.map((field) => (
        <FormField
          key={field.name}
          id={`categorySpecific_${field.name}`}
          label={field.label}
          error={errors[`categorySpecific_${field.name}`]}
          required={field.required}
        >
          {field.type === 'select' ? (
            <div className="relative">
              <select
                id={`categorySpecific_${field.name}`}
                name={`categorySpecific_${field.name}`}
                value={categorySpecificFields[field.name] || (field.defaultValue || '')}
                onChange={handleInputChange}
                className={`input-field appearance-none pr-8 ${errors[`categorySpecific_${field.name}`] ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
              >
                <option value="">{field.placeholder || 'Sélectionner...'}</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          ) : field.type === 'checkbox' ? (
            <label className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer">
              <input
                type="checkbox"
                id={`categorySpecific_${field.name}`}
                name={`categorySpecific_${field.name}`}
                checked={categorySpecificFields[field.name] || false}
                onChange={handleInputChange}
                className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{field.label}</span>
              {errors[`categorySpecific_${field.name}`] && <Check className="h-5 w-5 text-red-500 ml-auto" />}
            </label>
          ) : field.type === 'date' || field.type === 'time' || field.type === 'url' ? (
            <div className="relative">
              {field.type === 'date' && <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />}
              {field.type === 'time' && <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />}
              {field.type === 'url' && <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />}
              <input
                type={field.type}
                id={`categorySpecific_${field.name}`}
                name={`categorySpecific_${field.name}`}
                value={categorySpecificFields[field.name] || ''}
                onChange={handleInputChange}
                className={`input-field pl-10 ${errors[`categorySpecific_${field.name}`] ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                placeholder={field.placeholder || field.label}
              />
            </div>
          ) : field.type === 'textarea' ? (
            <textarea
              id={`categorySpecific_${field.name}`}
              name={`categorySpecific_${field.name}`}
              value={categorySpecificFields[field.name] || ''}
              onChange={handleInputChange}
              rows={field.rows || 3}
              className={`input-field ${errors[`categorySpecific_${field.name}`] ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
              placeholder={field.placeholder || field.label}
            />
          ) : (
            <input
              type={field.type}
              id={`categorySpecific_${field.name}`}
              name={`categorySpecific_${field.name}`}
              value={categorySpecificFields[field.name] || ''}
              onChange={handleInputChange}
              className={`input-field ${errors[`categorySpecific_${field.name}`] ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
              placeholder={field.placeholder || field.label}
              min={field.min}
              step={field.step}
            />
          )}
        </FormField>
      ))}
    </motion.div>
  );
};

export default CategoryFields;