
import React, { useState, useEffect } from 'react';
import CreateListingForm from '@/components/CreateListingForm';
import { useUser } from '@/contexts/UserContext';
import PaymentModal from '@/components/PaymentModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useListings } from '@/contexts/ListingsContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Loader2, User, Briefcase, ArrowLeft } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const CreateListingPageWrapper = () => {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialListingType = searchParams.get('type') || null;

  useEffect(() => {
    if (!userLoading && !user) {
      const redirectPath = initialListingType ? `/create?type=${initialListingType}` : '/create';
      navigate(`/auth?mode=login&redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [user, userLoading, navigate, initialListingType]);

  if (userLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
        <p className="text-lg text-gray-700 font-poppins">Chargement du profil utilisateur...</p>
      </div>
    );
  }

  return user ? <CreateListingPage initialListingTypeParam={initialListingType} /> : null;
};

const CreateListingPage = ({ initialListingTypeParam }) => {
  const { user, incrementFreeListingsUsed, addUserListing: addUserListingToProfile, getCurrentMaxFreeListings } = useUser();
  const { addListing: addListingToDb, filterByCategory } = useListings();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingListingData, setPendingListingData] = useState(null);
  const [pendingImageFiles, setPendingImageFiles] = useState([]);
  const [currentListingCost, setCurrentListingCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [selectedListingType, setSelectedListingType] = useState(initialListingTypeParam);

  useEffect(() => {
    if (initialListingTypeParam === null) {
      // If no type is in URL, show selection screen
      setSelectedListingType(null);
    } else {
      setSelectedListingType(initialListingTypeParam);
    }
  }, [initialListingTypeParam]);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.7
    };
    try {
      toast({ title: "Compression en cours...", description: `Compression de l'image ${file.name}.`, duration: 2000 });
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      toast({ title: "Erreur de compression", description: `L'image ${file.name} n'a pas pu être compressée. Elle sera téléversée en l'état si sa taille est inférieure à 5Mo.`, variant: "warning" });
      return file.size <= 5 * 1024 * 1024 ? file : null;
    }
  };

  const uploadImages = async (imageFiles, userId, listingId) => {
    const imageUrls = [];
    for (const file of imageFiles) {
      const compressedFile = await compressImage(file);
      if (!compressedFile) {
        toast({ title: "Image ignorée", description: `L'image ${file.name} est trop volumineuse et n'a pas pu être compressée ou téléversée.`, variant: "destructive" });
        continue;
      }
      const fileName = `${userId}/${listingId}/${uuidv4()}-${compressedFile.name}`;
      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, compressedFile, { cacheControl: '3600', upsert: false });
      if (error) {
        console.error('Error uploading image:', error);
        toast({ title: "Erreur d'upload", description: `L'image ${compressedFile.name} n'a pas pu être téléversée. Message: ${error.message}`, variant: "destructive" });
        continue;
      }
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('listing-images').getPublicUrl(data.path);
        imageUrls.push(publicUrl);
      }
    }
    return imageUrls;
  };

  const finalizeListingCreation = async (data, isPaid = false) => {
    if (!user) {
      setIsSubmitting(false);
      return;
    }
    let uploadedImageUrls = [];
    if (pendingImageFiles && pendingImageFiles.length > 0) {
      const tempListingId = uuidv4();
      uploadedImageUrls = await uploadImages(pendingImageFiles, user.auth_id || user.id, tempListingId);
      if (uploadedImageUrls.length === 0 && pendingImageFiles.length > 0) {
        toast({ title: "Erreur critique d'images", description: "Aucune image n'a pu être téléversée. L'annonce n'a pas été créée.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }
    }
    const listingToSubmit = {
      ...data,
      images: uploadedImageUrls,
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatarUrl: user.avatar_url,
      isPaid: isPaid,
      cost: currentListingCost,
      accountType: selectedListingType, 
    };

    const newListing = await addListingToDb(listingToSubmit);
    if (newListing) {
      await addUserListingToProfile(newListing.id);
      if (listingToSubmit.cost === 0 && selectedListingType === 'particulier') {
        await incrementFreeListingsUsed();
      }
      toast({
        title: "Annonce publiée avec succès !",
        description: `Votre annonce "${newListing.title}" est maintenant en ligne.`,
        className: "bg-green-500 text-white",
        duration: 5000
      });
      filterByCategory('all');
      navigate(`/listing/${newListing.id}`);
    } else {
      toast({
        title: "Échec de la publication",
        description: "Votre annonce n'a pas pu être publiée. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000
      });
    }
    setPendingListingData(null);
    setPendingImageFiles([]);
    setShowPaymentModal(false);
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (formDataFromComponent, listingCost, imageFilesToUpload) => {
    if (!user || !user.id) {
      const redirectPath = selectedListingType ? `/create?type=${selectedListingType}` : '/create';
      toast({ title: "Utilisateur non connecté", description: "Veuillez vous connecter pour déposer une annonce.", variant: "destructive", duration: 3000 });
      navigate(`/auth?mode=login&redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }
    setIsSubmitting(true);
    setPendingListingData(formDataFromComponent);
    setPendingImageFiles(imageFilesToUpload || []);
    setCurrentListingCost(listingCost);

    if (listingCost > 0) {
      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      let stripePriceId = '';

      if (selectedListingType === 'professionnel') {
        stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID_PRO_LISTING;
      } else if (selectedListingType === 'particulier') {
        if (listingCost === 2) stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID_PARTICULIER_PREMIUM_PHOTOS;
        else if (listingCost === 5) stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID_PARTICULIER_STANDARD;
        else if (listingCost === 7) stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID_PARTICULIER_STANDARD_PREMIUM;
      }
      
      if (!stripePriceId) {
         console.warn("Stripe Price ID not found for cost:", listingCost, "and type:", selectedListingType, ". Falling back to payment modal.");
         setShowPaymentModal(true);
         return;
      }

      if (stripePublishableKey && stripePriceId) {
        try {
          const imagePreviewsForStorage = await Promise.all(
            (imageFilesToUpload || []).map(file => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            })
          );
          localStorage.setItem('pendingListingData', JSON.stringify(formDataFromComponent));
          localStorage.setItem('pendingImageFiles', JSON.stringify(imagePreviewsForStorage));
          localStorage.setItem('currentListingCost', JSON.stringify(listingCost));
          localStorage.setItem('selectedListingType', selectedListingType);

          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: stripePriceId, quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/payment/cancel`,
            customerEmail: user.email,
            clientReferenceId: user.id,
          });
          if (error) {
            console.error("Erreur de redirection Stripe:", error);
            toast({ title: "Erreur Stripe", description: error.message, variant: "destructive" });
            setIsSubmitting(false);
            localStorage.removeItem('pendingListingData');
            localStorage.removeItem('pendingImageFiles');
            localStorage.removeItem('currentListingCost');
            localStorage.removeItem('selectedListingType');
          }
        } catch (e) {
          console.error("Erreur avant redirection Stripe:", e);
          toast({ title: "Erreur de préparation", description: "Impossible de préparer les données pour Stripe.", variant: "destructive" });
          setIsSubmitting(false);
          localStorage.removeItem('pendingListingData');
          localStorage.removeItem('pendingImageFiles');
          localStorage.removeItem('currentListingCost');
          localStorage.removeItem('selectedListingType');
        }
      } else {
        setShowPaymentModal(true);
      }
    } else {
      await finalizeListingCreation(formDataFromComponent, false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (pendingListingData) {
      await finalizeListingCreation(pendingListingData, true);
    } else {
      setIsSubmitting(false);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setPendingListingData(null);
    setPendingImageFiles([]);
    setIsSubmitting(false);
  };

  const handleTypeSelection = (type) => {
    if (user && user.account_type !== type && type === 'professionnel') {
        toast({
            title: "Type de compte",
            description: "Vous êtes enregistré comme Particulier. Pour poster une annonce Pro, veuillez mettre à jour votre type de compte dans votre profil ou contacter le support.",
            variant: "info",
            duration: 7000
        });
        setSelectedListingType('particulier'); 
        navigate('/create?type=particulier', { replace: true });
    } else if (user && user.account_type !== type && type === 'particulier') {
         toast({
            title: "Type de compte",
            description: "Vous êtes enregistré comme Professionnel. Vous pouvez poster une annonce Particulier, mais elle suivra les règles des particuliers.",
            variant: "info",
            duration: 7000
        });
        setSelectedListingType(type);
        navigate(`/create?type=${type}`, { replace: true });
    }
    else {
        setSelectedListingType(type);
        navigate(`/create?type=${type}`, { replace: true });
    }
  };

  if (!selectedListingType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center">
          <img src="https://static.wixstatic.com/media/a138d7_f1671926da474549b32ddea51a99025e~mv2.png" alt="VENDOKAZ Logo" className="h-20 w-auto mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-poppins mb-4">Déposer une Annonce</h1>
          <p className="text-md text-gray-600 mb-10">
            Choisissez le type d'annonce que vous souhaitez publier.
          </p>
          <div className="space-y-6">
            <Button 
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              onClick={() => handleTypeSelection('particulier')}
            >
              <User className="w-6 h-6" />
              <span>Annonce Particulier</span>
            </Button>
            <Button 
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              onClick={() => handleTypeSelection('professionnel')}
            >
              <Briefcase className="w-6 h-6" />
              <span>Annonce Professionnel</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button
            variant="ghost"
            onClick={() => {setSelectedListingType(null); navigate('/create', { replace: true });}} 
            className="mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Changer le type d'annonce
        </Button>
        {isSubmitting && !showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[200]">
            <Loader2 className="h-16 w-16 animate-spin text-orange-400 mb-4" />
            <p className="text-xl text-white font-semibold font-poppins">Publication de l'annonce en cours...</p>
            <p className="text-sm text-gray-300 font-poppins">Compression des images et téléversement, cela peut prendre quelques instants.</p>
          </div>
        )}
        <CreateListingForm 
            onSubmit={handleFormSubmit} 
            isSubmitting={isSubmitting} 
            selectedListingTypeForForm={selectedListingType}
        />
        {showPaymentModal && pendingListingData && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={handlePaymentClose}
            onSuccess={handlePaymentSuccess}
            price={currentListingCost}
            listingData={pendingListingData}
          />
        )}
      </div>
    </div>
  );
};

export default CreateListingPageWrapper;