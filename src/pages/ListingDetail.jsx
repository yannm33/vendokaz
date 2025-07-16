import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Eye, Heart, MessageCircle, ArrowLeft, Calendar, User as UserIcon, Tag, Package, ChevronRight, Loader2, AlertTriangle, CheckSquare, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListings } from '@/contexts/ListingsContext';
import { useUser } from '@/contexts/UserContext';
import { useMessages } from '@/contexts/MessagesContext';
import { toast } from '@/components/ui/use-toast';
import { categoriesData as appCategories } from '@/data/categories'; 
import ListingImageGallery from '@/components/ListingDetail/ListingImageGallery';
import ListingHeaderInfo from '@/components/ListingDetail/ListingHeaderInfo';
import ListingDescriptionSection from '@/components/ListingDetail/ListingDescriptionSection';
import ListingCategorySpecificFields from '@/components/ListingDetail/ListingCategorySpecificFields';
import SellerInfoCard from '@/components/ListingDetail/SellerInfoCard';
import ListingPageBreadcrumbs from '@/components/ListingDetail/ListingPageBreadcrumbs';

const ListingDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-200 rounded-xl h-96"></div>
          <div className="flex space-x-2 mt-4 p-4 bg-gray-100 rounded-lg">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-100 rounded-xl p-6 mt-6">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-4/6"></div>
            <div className="h-10 bg-gray-300 rounded mb-3"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
          <div className="bg-gray-100 rounded-xl p-6">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-5 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingNotFound = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center bg-white p-10 rounded-xl shadow-lg">
      <Package className="w-20 h-20 text-orange-400 mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Annonce non trouvée</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Désolé, nous n'avons pas pu trouver l'annonce que vous cherchez. Elle a peut-être été supprimée ou l'URL est incorrecte.
      </p>
      <Button asChild className="btn-primary">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  </div>
);

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getListingById, incrementViews, loading: listingsLoading, filterByCategory } = useListings();
  const { user, addToFavorites, removeFromFavorites, isFavorite, loading: userLoading } = useUser();
  const { startConversation, loading: messagesLoading } = useMessages();
  
  const [listing, setListing] = useState(null);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchListingData = useCallback(async () => {
    if (!id) {
      setListing(null);
      setPageIsLoading(false);
      return;
    }
    
    setPageIsLoading(true); 
    try {
      const foundListing = await getListingById(id); 
      if (foundListing) {
        setListing(foundListing);
        await incrementViews(id);
      } else {
        setListing(null);
        toast({
          title: "Annonce introuvable",
          description: "Cette annonce n'existe plus ou l'URL est incorrecte.",
          variant: "destructive",
          duration: 4000
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Error fetching listing details:", error);
      setListing(null);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de l'annonce.",
        variant: "destructive",
        duration: 4000
      });
      navigate('/');
    } finally {
      setPageIsLoading(false);
    }
  }, [id, getListingById, incrementViews, navigate]);
  
  useEffect(() => {
    if (listingsLoading || userLoading || messagesLoading) {
      setPageIsLoading(true);
    } else {
      fetchListingData();
    }
  }, [id, listingsLoading, userLoading, messagesLoading, fetchListingData]);

  if (pageIsLoading || (!listing && !listingsLoading && !userLoading && !messagesLoading)) {
    return <ListingDetailSkeleton />;
  }
  
  if (!listing && !pageIsLoading) { 
     return <ListingNotFound />;
  }

  const mainCategoryDetails = appCategories.find(c => c.id === listing.category);
  const subCategoryDetails = mainCategoryDetails?.subCategories?.find(sc => sc.id === listing.sub_category);

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour gérer vos favoris.",
        variant: "destructive"
      });
      navigate('/auth?mode=login&redirect=' + window.location.pathname);
      return;
    }
    try {
      if (isFavorite(listing.id)) {
        await removeFromFavorites(listing.id);
        toast({
          title: "Retiré des favoris",
          description: "L'annonce a été retirée de vos favoris."
        });
      } else {
        await addToFavorites(listing.id);
        toast({
          title: "Ajouté aux favoris",
          description: "L'annonce a été ajoutée à vos favoris.",
          className: "bg-green-500 text-white"
        });
      }
    } catch (error) {
        toast({ title: "Erreur", description: "Impossible de mettre à jour les favoris.", variant: "destructive"});
    }
  };

  const handleContactSeller = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour contacter le vendeur.",
        variant: "destructive"
      });
      navigate('/auth?mode=login&redirect=' + window.location.pathname);
      return;
    }
    if (listing.user_id === user.id) {
      toast({
        title: "Information",
        description: "Vous ne pouvez pas vous contacter vous-même pour votre propre annonce."
      });
      return;
    }

    try {
      const conversation = await startConversation(
        listing.id,
        listing.user_id, 
        user.id, 
        listing.title
      );
      
      if (conversation) {
        navigate('/messages', { state: { conversationId: conversation.id } });
      } else {
         toast({ title: "Erreur", description: "Impossible de démarrer la conversation.", variant: "destructive"});
      }
    } catch (error) {
        toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive"});
    }
  };

  const formatPrice = (price, listingType, categoryId, eventAdmission) => {
    if (categoryId === 'events-medoc') {
        if (eventAdmission === 'Gratuite' || eventAdmission === 'Prix libre' || eventAdmission === 'Sur inscription' || price === 0 || price === undefined || price === null) {
            return "Entrée libre / à préciser";
        }
    } else {
        if (listingType === 'gratuit' || price === 0 || price === undefined || price === null) {
            return "Gratuit";
        }
    }
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR', 
      minimumFractionDigits: (price % 1 === 0) ? 0 : 2, 
      maximumFractionDigits: 2 
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isVehicleCategory = listing.category === 'vehicles' && (listing.sub_category === 'cars' || listing.sub_category === 'motorcycles');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ListingPageBreadcrumbs 
        mainCategory={mainCategoryDetails} 
        subCategory={subCategoryDetails} 
        onCategoryClick={(categoryId) => { filterByCategory(categoryId); navigate('/'); }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ListingImageGallery 
            listing={listing}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={setSelectedImageIndex}
            isFavorite={isFavorite(listing.id)}
            onToggleFavorite={handleFavoriteToggle}
          />
          <ListingDescriptionSection description={listing.description} />
          {mainCategoryDetails && (
            <ListingCategorySpecificFields 
              mainCategoryDetails={subCategoryDetails || mainCategoryDetails} 
              listing={listing}
            />
          )}
           {isVehicleCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-blue-50 p-4 rounded-lg shadow border border-blue-200"
            >
              <Button
                onClick={() => window.open('https://histovec.interieur.gouv.fr/histovec/accueil', '_blank')}
                variant="outline"
                className="w-full bg-white text-blue-600 border-blue-500 hover:bg-blue-100 hover:text-blue-700"
              >
                <History className="w-5 h-5 mr-2 text-blue-500" />
                Histovec
              </Button>
              <p className="text-xs text-blue-500 mt-2 text-center">
                Consultez l'historique officiel du véhicule (service public gratuit).
              </p>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ListingHeaderInfo 
            listing={listing}
            formatPrice={formatPrice}
            formatDate={formatDate}
          />
          <SellerInfoCard 
            listing={listing}
            user={user}
            isFavorite={isFavorite(listing.id)}
            handleContactSeller={handleContactSeller}
            handleFavoriteToggle={handleFavoriteToggle}
            mainCategoryDetails={mainCategoryDetails}
            subCategoryDetails={subCategoryDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;