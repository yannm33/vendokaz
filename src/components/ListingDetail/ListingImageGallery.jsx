import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const ListingImageGallery = ({ listing, selectedImageIndex, onSelectImage, onToggleFavorite, isFavorite }) => {
  const defaultImage = "https://images.unsplash.com/photo-1587040976515-3c236978379d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200"
    >
      <div className="relative">
        <img 
          src={listing.images && listing.images.length > 0 ? listing.images[selectedImageIndex] : defaultImage}
          alt={listing.title}
          className="w-full h-80 md:h-96 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
         />
        {(listing.listing_type === 'gratuit' || listing.price === 0) && listing.category !== 'events-medoc' && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">GRATUIT</span>
        )}
        {listing.category === 'events-medoc' && (listing.additional_fields?.eventAdmission === 'Gratuite' || listing.additional_fields?.eventAdmission === 'Prix libre' || listing.additional_fields?.eventAdmission === 'Sur inscription') && (
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">ENTRÉE LIBRE</span>
        )}
        <button
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={`absolute top-4 right-4 p-2.5 sm:p-3 rounded-full transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 ${
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500 backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      {listing.images && listing.images.length > 1 && (
        <div className="p-4 flex space-x-2 overflow-x-auto bg-gray-50 border-t border-gray-200">
          {listing.images.map((image, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                selectedImageIndex === index ? 'border-orange-500 shadow-md scale-105' : 'border-gray-300 hover:border-orange-400'
              }`}
            >
              <img 
                src={image}
                alt={`${listing.title} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1587040976515-3c236978379d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=60"; }}
               />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ListingImageGallery;