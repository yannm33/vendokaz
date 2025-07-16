import { useState, useCallback } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useListings } from '@/contexts/ListingsContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { validateFormFields } from '@/components/CreateListingForm/utils/formUtils.js';

export const useFormSubmission = (onSubmit, formData, categorySpecificFields, imageFiles, userAccountType) => {
  const { user, incrementFreeListingsUsed, canCreateFreeListing: canUserCreateFreeListing, isPromotionActive, addUserListing } = useUser();
  const { addListing } = useListings();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateAndSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const tempErrors = validateFormFields(formData, categorySpecificFields, imageFiles, userAccountType);
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const dataToSubmit = {
          title: formData.title,
          description: formData.description,
          price: formData.price ? parseFloat(formData.price) : null,
          category: formData.category,
          sub_category: formData.subCategory,
          location: formData.location === 'Autre' ? formData.customLocation : formData.location,
          listing_type: formData.listingType,
          photo_tier: formData.photoTier,
          user_id: user.id,
          seller_name: user.name,
          seller_avatar_url: user.avatar_url,
          additional_fields: categorySpecificFields,
        };

        if (formData.category === 'events-medoc') {
          dataToSubmit.event_date_start = categorySpecificFields.eventDateStart;
          dataToSubmit.event_date_end = categorySpecificFields.eventDateEnd;
          dataToSubmit.event_time_start = categorySpecificFields.eventTimeStart;
          dataToSubmit.event_admission = categorySpecificFields.eventAdmission;
        }
        
        const createdListing = await onSubmit(dataToSubmit, imageFiles);

        if (createdListing && !createdListing.error) {
          await addUserListing(createdListing.id);
          
          const promoIsActive = isPromotionActive ? isPromotionActive() : false;
          const canCreateFree = canUserCreateFreeListing ? canUserCreateFreeListing() : false;

          if (userAccountType === 'particulier' && promoIsActive && canCreateFree && createdListing.cost === 0) {
            await incrementFreeListingsUsed();
          }

          toast({
            title: "Annonce publiée ! 🎉",
            description: "Votre annonce est maintenant en ligne.",
            className: "bg-green-500 text-white",
          });
          navigate(`/listing/${createdListing.id}`);
        } else {
          toast({
            title: "Erreur de publication",
            description: createdListing?.error || "Une erreur s'est produite. Veuillez réessayer.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast({
          title: "Erreur inattendue",
          description: "Une erreur inattendue s'est produite.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Champs manquants ou invalides",
        description: "Veuillez vérifier les erreurs dans le formulaire.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }, [
    formData, 
    categorySpecificFields, 
    imageFiles, 
    user, 
    onSubmit, 
    addListing, 
    navigate, 
    incrementFreeListingsUsed, 
    canUserCreateFreeListing, 
    isPromotionActive,
    addUserListing,
    userAccountType
  ]);

  return { handleSubmit: validateAndSubmit, errors, setErrors, isSubmitting };
};