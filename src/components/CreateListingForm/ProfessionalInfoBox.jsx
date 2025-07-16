import React from 'react';
import { Briefcase } from 'lucide-react';

const ProfessionalInfoBox = ({ price }) => {
  return (
    <div className="mb-8 p-5 rounded-lg border-2 bg-sky-50 border-sky-500">
      <div className="flex items-start sm:items-center">
        <Briefcase className="w-7 h-7 text-sky-600 mr-4 flex-shrink-0" />
        <div>
          <p className="font-semibold text-lg text-sky-800">
            Annonce professionnelle : {price.toFixed(2)}€
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Inclut jusqu'à 15 photos et une visibilité accrue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoBox;