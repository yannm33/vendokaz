import React from 'react';
import { motion } from 'framer-motion';

const ListingCategorySpecificFields = ({ mainCategoryDetails, listing }) => {
  if (!mainCategoryDetails?.fields || !listing.additional_fields) return null;

  const fieldsToDisplay = mainCategoryDetails.fields.filter(field => 
    listing.additional_fields[field.name] !== undefined && 
    listing.additional_fields[field.name] !== null && 
    String(listing.additional_fields[field.name]).trim() !== '' &&
    !(field.type === 'checkbox' && listing.additional_fields[field.name] === false) 
  );

  if (fieldsToDisplay.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Détails {mainCategoryDetails.name === "Événements Médoc" ? "de l'événement" : (mainCategoryDetails.name === "Emplois Saisonniers" ? "de l'offre" : "supplémentaires")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
        {fieldsToDisplay.map((field) => {
          let value = listing.additional_fields[field.name];
          let displayValue = value;

          if (field.type === 'checkbox') {
            displayValue = value ? 'Oui' : 'Non';
          } else if (field.type === 'number') {
            if (field.name === 'mileage' && typeof value === 'number') displayValue = `${value.toLocaleString('fr-FR')} km`;
            else if (field.name === 'surface' && typeof value === 'number') displayValue = `${value} m²`;
            else if (field.name === 'rooms' && typeof value === 'number') displayValue = `${value} pièce${value > 1 ? 's' : ''}`;
          } else if (field.type === 'date') {
            displayValue = new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
          } else if (field.type === 'url') {
              displayValue = <a href={value} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline break-all">{value}</a>;
          }
          
          return (
            <div key={field.name} className="flex flex-col sm:flex-row sm:justify-between text-sm">
              <span className="text-gray-600 font-medium">{field.label}:</span>
              <span className="font-normal text-gray-800 sm:text-right">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ListingCategorySpecificFields;