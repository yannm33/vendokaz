import React from 'react';
import { MapPin, Eye, Calendar } from 'lucide-react';

const ListingHeaderInfo = ({ listing, formatPrice, formatDate }) => {
  if (!listing) return null;

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{listing.title}</h1>
      <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
        {formatPrice(listing.price, listing.listing_type, listing.category, listing.additional_fields?.eventAdmission)}
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
          {listing.location || "Lieu non spécifié"}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
          Publiée le {formatDate(listing.created_at)}
        </div>
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
          {listing.views || 0} vue{(listing.views || 0) !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ListingHeaderInfo;