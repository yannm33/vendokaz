import React from 'react';
import { Gift, DollarSign } from 'lucide-react';

const ListingTypeSelector = ({ listingType, onListingTypeChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Type d'annonce <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => onListingTypeChange('gratuit')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${listingType === 'gratuit' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'}`}
        >
          <Gift className={`w-5 h-5 mr-2 ${listingType === 'gratuit' ? 'text-orange-500' : 'text-gray-500'}`} />
          Gratuit / Don / Échange
        </button>
        <button
          type="button"
          onClick={() => onListingTypeChange('payant')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${listingType === 'payant' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'}`}
        >
          <DollarSign className={`w-5 h-5 mr-2 ${listingType === 'payant' ? 'text-orange-500' : 'text-gray-500'}`} />
          Payant / Rémunéré
        </button>
      </div>
      {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default ListingTypeSelector;