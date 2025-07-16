import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const ListingsContext = createContext();

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      toast({ title: "Erreur", description: "Impossible de charger les annonces.", variant: "destructive" });
      setListings([]);
    } else if (data) {
      const listingsWithDate = data.map(l => ({ ...l, createdAt: l.created_at, sellerName: l.seller_name, sellerAvatarUrl: l.seller_avatar_url, userId: l.user_id }));
      setListings(listingsWithDate);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const filterAndSortListings = useCallback(() => {
    let currentListings = [...listings];

    if (selectedCategory !== 'all') {
      currentListings = currentListings.filter(listing => 
        listing.category === selectedCategory || 
        listing.sub_category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      currentListings = currentListings.filter(listing =>
        (listing.title && listing.title.toLowerCase().includes(query)) ||
        (listing.description && listing.description.toLowerCase().includes(query)) ||
        (listing.location && listing.location.toLowerCase().includes(query)) ||
        (listing.category && listing.category.toLowerCase().includes(query)) ||
        (listing.sub_category && listing.sub_category.toLowerCase().includes(query))
      );
    }
    setFilteredListings(currentListings);
  }, [listings, selectedCategory, searchQuery]);

  useEffect(() => {
    filterAndSortListings();
  }, [filterAndSortListings]);

  const addListing = async (listingData) => {
    const listingPayload = {
      user_id: listingData.sellerId,
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      category: listingData.category,
      sub_category: listingData.subCategory,
      images: listingData.images,
      location: listingData.location,
      seller_name: listingData.sellerName,
      seller_avatar_url: listingData.sellerAvatarUrl,
      listing_type: listingData.listingType,
      is_paid: listingData.isPaid,
      cost: listingData.cost,
      photo_tier: listingData.photoTier,
      additional_fields: listingData.additionalFields
    };
    
    const { data: newListing, error } = await supabase
      .from('listings')
      .insert(listingPayload)
      .select()
      .single();

    if (error) {
      console.error('Error adding listing:', error);
      toast({ title: "Erreur", description: "Impossible de créer l'annonce.", variant: "destructive" });
      return null;
    }
    if (newListing) {
      const processedNewListing = {...newListing, createdAt: newListing.created_at, sellerName: newListing.seller_name, sellerAvatarUrl: newListing.seller_avatar_url, userId: newListing.user_id };
      setListings(prev => [processedNewListing, ...prev]);
      setSelectedCategory('all'); 
      setSearchQuery('');
      return processedNewListing;
    }
    return null;
  };

  const getListingById = (id) => {
    return listings.find(listing => listing.id === id);
  };

  const incrementViews = async (id) => {
    const listing = listings.find(l => l.id === id);
    if (!listing) return;

    const newViews = (listing.views || 0) + 1;
    const { error } = await supabase
      .from('listings')
      .update({ views: newViews })
      .eq('id', id);

    if (error) {
      console.error('Error incrementing views:', error);
    } else {
      setListings(prevListings =>
        prevListings.map(l =>
          l.id === id ? { ...l, views: newViews } : l
        )
      );
    }
  };

  const searchListings = (query) => {
    setSearchQuery(query);
    setSelectedCategory('all'); 
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); 
  };

  const getFavoriteListings = (favoriteIds) => {
    if (!favoriteIds || favoriteIds.length === 0) return [];
    return listings.filter(listing => favoriteIds.includes(listing.id));
  };

  const getUserListings = (userListingIds) => {
    if (!userListingIds || userListingIds.length === 0) return [];
    return listings.filter(listing => userListingIds.includes(listing.id));
  };


  const value = {
    listings: filteredListings,
    allListings: listings, 
    selectedCategory,
    searchQuery,
    loading,
    addListing,
    getListingById,
    incrementViews,
    searchListings,
    filterByCategory,
    getFavoriteListings,
    getUserListings,
    refreshListings: fetchListings
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
};