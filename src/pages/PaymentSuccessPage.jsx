import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Loader2, AlertTriangle, Home, ListPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@/contexts/UserContext';
import { useListings } from '@/contexts/ListingsContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, incrementFreeListingsUsed, addUserListing: addUserListingToProfile } = useUser();
  const { addListing: addListingToDb, filterByCategory } = useListings();
  const [status, setStatus] = useState('loading');
  const [newListingId, setNewListingId] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    const pendingListingDataString = localStorage.getItem('pendingListingData');
    const pendingImageFilesString = localStorage.getItem('pendingImageFiles'); 
    const currentListingCostString = localStorage.getItem('currentListingCost');

    if (!sessionId || !pendingListingDataString || !pendingImageFilesString || !currentListingCostString) {
      setStatus('error');
      setErrorDetails('Données de session ou d\'annonce manquantes. Impossible de finaliser.');
      toast({ title: "Erreur de Transaction", description: "Données de session ou d'annonce manquantes.", variant: "destructive" });
      return;
    }

    const pendingListingData = JSON.parse(pendingListingDataString);
    const pendingImageFiles = JSON.parse(pendingImageFilesString); 
    const currentListingCost = parseFloat(currentListingCostString);

    const verifyPaymentAndCreateListing = async () => {
      try {
        const { data: functionData, error: functionError } = await supabase.functions.invoke('stripe-verify-session', {
          body: JSON.stringify({ sessionId }),
        });

        if (functionError) {
          throw new Error(`Erreur de la fonction Supabase: ${functionError.message}`);
        }

        if (functionData.payment_status === 'paid') {
          setStatus('processing');
          
          let uploadedImageUrls = [];
          if (pendingImageFiles && pendingImageFiles.length > 0) {
            
            const imageFileObjects = await Promise.all(
              pendingImageFiles.map(async (dataUrl) => {
                const res = await fetch(dataUrl);
                const blob = await res.blob();
                return new File([blob], `image_${Date.now()}.png`, { type: blob.type });
              })
            );
            
            uploadedImageUrls = await uploadImagesForFinalize(imageFileObjects, user.auth_id, sessionId); 
            if (uploadedImageUrls.length === 0 && imageFileObjects.length > 0) {
              throw new Error("Aucune image n'a pu être téléversée.");
            }
          }

          const listingToSubmit = {
            ...pendingListingData,
            images: uploadedImageUrls,
            sellerId: user.id,
            sellerName: user.name,
            sellerAvatarUrl: user.avatar_url,
            isPaid: true,
            cost: currentListingCost,
          };
          
          const newListing = await addListingToDb(listingToSubmit);

          if (newListing) {
            await addUserListingToProfile(newListing.id);
            setStatus('success');
            setNewListingId(newListing.id);
            toast({ title: "Paiement Réussi & Annonce Publiée!", description: `Votre annonce "${newListing.title}" est en ligne.`, className: "bg-green-500 text-white", duration: 5000 });
            filterByCategory('all');
          } else {
            throw new Error("La création de l'annonce a échoué après le paiement.");
          }
        } else {
          setStatus('error');
          setErrorDetails(`Statut du paiement : ${functionData.payment_status}. L'annonce ne sera pas créée.`);
          toast({ title: "Paiement Non Confirmé", description: "Le paiement n'a pas pu être confirmé.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification ou création:", error);
        setStatus('error');
        setErrorDetails(error.message || "Une erreur inconnue est survenue.");
        toast({ title: "Erreur Critique", description: error.message, variant: "destructive" });
      } finally {
        localStorage.removeItem('pendingListingData');
        localStorage.removeItem('pendingImageFiles');
        localStorage.removeItem('currentListingCost');
      }
    };
    
    if (user) {
      verifyPaymentAndCreateListing();
    } else {
      setStatus('error');
      setErrorDetails('Utilisateur non authentifié pour finaliser la transaction.');
      toast({title: "Utilisateur non connecté", description: "Impossible de finaliser sans authentification.", variant: "destructive"})
    }

  }, [location.search, user, addListingToDb, addUserListingToProfile, filterByCategory]);

  const uploadImagesForFinalize = async (imageFiles, userId, listingId) => {
    const imageUrls = [];
    for (const file of imageFiles) {
      const fileName = `${userId}/${listingId}/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading image for finalize:', error);
        toast({ title: "Erreur d'upload image (finalisation)", description: `L'image ${file.name} n'a pas pu être téléversée.`, variant: "destructive" });
        continue;
      }
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('listing-images').getPublicUrl(data.path);
        imageUrls.push(publicUrl);
      }
    }
    return imageUrls;
  };


  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.15,
        ease: "easeOut",
        duration: 0.4 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };


  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-stone-50 to-slate-100 p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-4 border-orange-500"
      >
        {status === 'loading' && (
          <>
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Vérification du Paiement...</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600">Veuillez patienter, nous finalisons votre transaction.</motion.p>
          </>
        )}
        {status === 'processing' && (
          <>
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Traitement de l'annonce...</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600">Votre paiement est confirmé, nous publions votre annonce.</motion.p>
          </>
        )}
        {status === 'success' && (
          <>
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">Paiement Réussi !</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-700 text-lg mb-6">Votre annonce a été publiée avec succès.</motion.p>
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
              {newListingId && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link to={`/listing/${newListingId}`}>
                    <ListPlus className="mr-2 h-5 w-5" /> Voir mon annonce
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" /> Retour à l'accueil
                </Link>
              </Button>
            </motion.div>
          </>
        )}
        {status === 'error' && (
          <>
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <AlertTriangle className="w-20 h-20 text-red-500" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">Erreur de Paiement</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-700 text-lg mb-2">Une erreur est survenue lors du traitement de votre paiement ou de la création de l'annonce.</motion.p>
            {errorDetails && <motion.p variants={itemVariants} className="text-sm text-gray-500 mb-6">{errorDetails}</motion.p>}
            <motion.div variants={itemVariants}>
              <Button asChild variant="outline">
                <Link to="/create">
                  <ListPlus className="mr-2 h-5 w-5" /> Réessayer de publier
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;