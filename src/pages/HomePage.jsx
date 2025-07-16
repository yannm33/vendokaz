import React, { useState } from 'react';
import { useListings } from '@/contexts/ListingsContext';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';

import HeroSection from '@/components/HomePage/HeroSection';
import InlinePromotionBanner from '@/components/HomePage/InlinePromotionBanner';
import CategoryGrid from '@/components/HomePage/CategoryGrid';
import ListingsDisplay from '@/components/HomePage/ListingsDisplay';

const HomePage = () => {
  const { listings, selectedCategory, filterByCategory, allListings, loading: listingsLoading } = useListings();
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useUser();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleFavoriteToggle = async (listingId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({ title: "Connexion requise", description: "Veuillez vous connecter pour gérer vos favoris.", variant: "destructive", duration: 3000 });
      return;
    }

    if (isFavorite(listingId)) {
      await removeFromFavorites(listingId);
      toast({ title: "Retiré des favoris", description: "L'annonce a été retirée de vos favoris.", duration: 2000 });
    } else {
      await addToFavorites(listingId);
      toast({ title: "Ajouté aux favoris!", description: "L'annonce est maintenant dans vos favoris.", className: "bg-green-500 text-white", duration: 2000 });
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <InlinePromotionBanner />
        <CategoryGrid 
          selectedCategory={selectedCategory}
          filterByCategory={filterByCategory}
          expandedCategory={expandedCategory}
          setExpandedCategory={setExpandedCategory}
          allListings={allListings || []}
        />
        <ListingsDisplay 
          listings={listings || []}
          selectedCategory={selectedCategory}
          listingsLoading={listingsLoading}
          isFavorite={isFavorite}
          handleFavoriteToggle={handleFavoriteToggle}
        />
      </div>
    </div>
  );
};

export default HomePage;