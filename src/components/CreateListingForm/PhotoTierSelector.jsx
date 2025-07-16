import React from 'react';
import { Camera, PlusCircle } from 'lucide-react';

const PhotoTierSelector = ({ photoTier, onPhotoTierChange, remainingFree, isSubmitting }) => {
  return (
    <fieldset disabled={isSubmitting}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Options de photos
      </label>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => onPhotoTierChange('standard')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${photoTier === 'standard' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'}`}
        >
          <Camera className={`w-5 h-5 mr-2 ${photoTier === 'standard' ? 'text-orange-500' : 'text-gray-500'}`} />
          Standard (5 photos) - {remainingFree > 0 ? 'Inclus' : '+0€'}
        </button>
        <button
          type="button"
          onClick={() => onPhotoTierChange('premium')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${photoTier === 'premium' ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400'}`}
        >
          <PlusCircle className={`w-5 h-5 mr-2 ${photoTier === 'premium' ? 'text-orange-500' : 'text-gray-500'}`} />
          Premium (10 photos) - +2€
        </button>
      </div>
    </fieldset>
  );
};

export default PhotoTierSelector;