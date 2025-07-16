import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, User as UserIcon, Tag } from 'lucide-react';

const SellerInfoCard = ({ listing, user, isFavorite, handleContactSeller, handleFavoriteToggle, mainCategoryDetails, subCategoryDetails }) => {
  if (!listing) return null;

  return (
    <div className="space-y-6 sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl p-6 shadow-xl border border-gray-200"
      >
        <div className="space-y-3 mb-6">
          <Button
            onClick={handleContactSeller}
            className="w-full btn-primary text-base py-2.5"
            disabled={user && listing.user_id === user.id}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {user && listing.user_id === user.id ? 'Votre annonce' : 'Contacter le vendeur'}
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            variant="outline"
            className="w-full text-base py-2.5 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
          >
            <Heart className={`w-5 h-5 mr-2 transition-colors ${isFavorite ? 'fill-current text-red-500' : 'text-red-400'}`} />
            {isFavorite ? 'Retiré des favoris' : 'Ajouter aux favoris'}
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendeur</h3>
        <div className="flex items-center space-x-3">
          <img 
            src={listing.seller_avatar_url || `https://avatar.vercel.sh/${listing.user_id}.png?text=${listing.seller_name ? listing.seller_name.substring(0,2).toUpperCase() : 'VK' }`} 
            alt={`Avatar de ${listing.seller_name || 'Vendeur'}`} 
            className="w-12 h-12 rounded-full object-cover bg-gray-200 border border-gray-300"
            onError={(e) => { e.target.onerror = null; e.target.src=`https://avatar.vercel.sh/${listing.user_id}.png?text=VK`; }}
          />
          <div>
            <div className="font-medium text-gray-900">{listing.seller_name || 'Vendeur Anonyme'}</div>
             <Link to={`/profile/${listing.user_id}`} className="text-sm text-orange-600 hover:underline">Voir le profil</Link>
          </div>
        </div>
      </motion.div>

      {(mainCategoryDetails || subCategoryDetails) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-start space-x-3">
             <div className={`text-2xl p-2 rounded-lg bg-gradient-to-tr ${mainCategoryDetails?.color || 'from-orange-400 to-red-500'} text-white shadow-md`}>
                {React.createElement(mainCategoryDetails?.icon || subCategoryDetails?.icon || Tag, {size: 22})}
            </div>
            <div>
              <div className="font-semibold text-gray-800">Catégorie</div>
              <div className="text-sm text-gray-600">
                {mainCategoryDetails?.name}
                {subCategoryDetails && ` / ${subCategoryDetails.name}`}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SellerInfoCard;