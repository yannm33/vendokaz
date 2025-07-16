import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Eye, Heart, Clock, CalendarDays as CalendarIcon } from 'lucide-react';

const ListingCard = ({ listing, isFavorite, onFavoriteToggle }) => {
  const formatPrice = (price, listingType, categoryId, eventAdmission) => {
    if (categoryId === 'events-medoc') {
      if (eventAdmission === 'Gratuite' || eventAdmission === 'Prix libre' || eventAdmission === 'Sur inscription') return "Entrée libre";
      if (price === 0 || price === undefined || price === null) return "À préciser"; 
    } else {
      if (listingType === 'gratuit' || price === 0 || price === undefined || price === null) return "Gratuit";
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: (price % 1 === 0) ? 0 : 2, maximumFractionDigits: 2 }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  const formatEventDate = (startDateStr, endDateStr, startTimeStr) => {
    if (!startDateStr) return "Date à venir";
    const startDate = new Date(startDateStr);
    let dateDisplay = startDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    if (startTimeStr) dateDisplay += ` à ${startTimeStr.replace(':', 'h')}`;
    if (endDateStr && endDateStr !== startDateStr) {
      const endDate = new Date(endDateStr);
      dateDisplay += ` au ${endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`;
    }
    return dateDisplay;
  };

  const defaultImage = "https://images.unsplash.com/photo-1595872018818-97555653a011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";
  const imageUrl = listing.images && listing.images.length > 0 && listing.images[0] ? listing.images[0] : defaultImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="listing-card flex flex-col"
    >
      <Link to={`/listing/${listing.id}`} className="block h-full flex flex-col">
        <div className="relative">
          <img 
            src={imageUrl}
            alt={listing.title}
            className="w-full h-52 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
          />
          <button
            onClick={(e) => onFavoriteToggle(listing.id, e)}
            aria-label={isFavorite(listing.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 ${
              isFavorite(listing.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500 backdrop-blur-sm'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite(listing.id) ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-3">
            <span className="text-lg font-bold text-white drop-shadow-md">
              {formatPrice(listing.price, listing.listing_type, listing.category, listing.additional_fields?.eventAdmission)}
            </span>
          </div>
          {(listing.listing_type === 'gratuit' && listing.price === 0 && listing.category !== 'events-medoc') && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">GRATUIT</span>
            )}
            {listing.category === 'events-medoc' && (listing.additional_fields?.eventAdmission === 'Gratuite' || listing.additional_fields?.eventAdmission === 'Prix libre' || listing.additional_fields?.eventAdmission === 'Sur inscription') && (
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">ENTRÉE LIBRE</span>
            )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg leading-tight line-clamp-2 h-[3.2em]">
              {listing.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-orange-500" />
              <span className="truncate">{listing.location}</span>
            </div>
            {listing.category === 'events-medoc' && (
              <div className="flex items-center text-sm text-orange-600 font-medium mb-3">
                  <CalendarIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{formatEventDate(listing.additional_fields?.eventDateStart, listing.additional_fields?.eventDateEnd, listing.additional_fields?.eventTimeStart)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
              {formatDate(listing.created_at)}
            </div>
            <div className="flex items-center">
              <Eye className="w-3.5 h-3.5 mr-1 text-gray-400" />
              {listing.views || 0}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;