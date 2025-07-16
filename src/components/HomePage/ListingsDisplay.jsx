import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, PlusCircle } from 'lucide-react';
import { categories as appCategories } from '@/data/mockData';
import ListingCard from './ListingCard';
import { Button } from '@/components/ui/button';


const ListingsDisplay = ({ listings, selectedCategory, listingsLoading, isFavorite, handleFavoriteToggle }) => {
  const getPageTitle = () => {
    if (selectedCategory === 'all') return 'Dernières annonces';
    let categoryDetails = appCategories.find(c => c.id === selectedCategory);
    if (categoryDetails) return categoryDetails.name;
    for (const mainCat of appCategories) {
      if (mainCat.subCategories) {
        const subCatDetails = mainCat.subCategories.find(sc => sc.id === selectedCategory);
        if (subCatDetails) return subCatDetails.name;
      }
    }
    return 'Annonces'; 
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="my-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 font-poppins">
          {getPageTitle()}
          <span className="text-orange-500"> dans le Médoc</span>
        </h2>
        <span className="text-gray-600 font-medium">{listings.length} annonce{listings.length !== 1 ? 's' : ''} trouvée{listings.length !== 1 ? 's' : ''}</span>
      </div>
      {listingsLoading && (
          <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="ml-4 text-gray-600">Chargement des annonces...</p>
          </div>
      )}
      {!listingsLoading && listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
          <SearchIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Aucune annonce pour le moment</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Soyez le premier à publier dans "{getPageTitle()}" ou élargissez votre recherche.
          </p>
          <Button asChild variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link to="/create">
              <PlusCircle size={20} className="mr-2" />
              Déposer une annonce
            </Link>
          </Button>
        </div>
      ) : (
        !listingsLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {listings.map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              isFavorite={isFavorite} 
              onFavoriteToggle={handleFavoriteToggle} 
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ListingsDisplay;