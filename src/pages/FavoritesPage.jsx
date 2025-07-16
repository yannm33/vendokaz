import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Eye, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useListings } from '@/contexts/ListingsContext';
import { toast } from '@/components/ui/use-toast';

const FavoritesPage = () => {
  const { user, removeFromFavorites, loading: userLoading } = useUser();
  const { getFavoriteListings, loading: listingsLoading } = useListings();

  if (userLoading || listingsLoading) {
    return <div className="text-center py-10 font-poppins">Chargement des favoris...</div>;
  }

  const favoriteListings = getFavoriteListings(user?.favorites || []);

  const handleRemoveFavorite = async (listingId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    await removeFromFavorites(listingId);
    toast({
      title: "Retiré des favoris",
      description: "L'annonce a été retirée de vos favoris."
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Aujourd\'hui'; // Adjusted for simplicity, consider more granular later
    if (diffDays === 2) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-gray-900">Mes favoris</h1>
        </div>
        <p className="text-gray-600">
          {favoriteListings.length} annonce{favoriteListings.length !== 1 ? 's' : ''} en favori{favoriteListings.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {favoriteListings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aucun favori pour le moment</h2>
          <p className="text-gray-600 mb-6">
            Parcourez les annonces et ajoutez celles qui vous intéressent à vos favoris
          </p>
          <Button asChild className="btn-primary">
            <Link to="/">Découvrir les annonces</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/listing/${listing.id}`} className="block">
                <div className="listing-card">
                  <div className="relative">
                    <img
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                       onError={(e) => { e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1595872018818-97555653a011"; }}
                    />
                    <button
                      onClick={(e) => handleRemoveFavorite(listing.id, e)}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                      {formatPrice(listing.price)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(listing.created_at)}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {listing.views || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;