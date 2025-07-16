import { categoriesData as categories } from '@/data/categoriesData';

export const getInitialFormData = (userAccountType) => ({
  title: '',
  description: '',
  price: '',
  category: '',
  subCategory: '',
  location: '',
  customLocation: '',
  listingType: 'gratuit',
  photoTier: userAccountType === 'professionnel' ? 'premium' : 'standard',
  images: [],
});

export const getCategorySpecificDefaultFields = (categoryData) => {
  const defaultSpecificFields = categoryData?.fields?.reduce((acc, field) => {
    if (field.type === 'checkbox') acc[field.name] = field.defaultValue || false;
    else if (field.type === 'select' && field.defaultValue) acc[field.name] = field.defaultValue;
    else if (field.name === 'eventAdmission' && categoryData?.id === 'events-medoc') acc[field.name] = 'Gratuite';
    else acc[field.name] = '';
    return acc;
  }, {}) || {};
  return defaultSpecificFields;
};

export const determineDefaultListingType = (categoryData, userAccountType) => {
  if (!categoryData) return 'payant';
  
  if (['events-medoc', 'community', 'seasonal-jobs'].includes(categoryData.id)) {
    return 'gratuit';
  }
  if (categoryData.id === 'services' && userAccountType === 'particulier') {
    return 'gratuit';
  }
  if (categoryData.id === 'wellness-therapies' && userAccountType === 'particulier') {
    return 'payant'; 
  }
  return 'payant';
};


export const calculateListingCost = (formData, userAccountType, freeListingsUsed = 0, maxFreeListings = 0, isPromoActiveForUser = false) => {
  let cost = 0;
  const isSpecialFreeCategory = ['events-medoc', 'community', 'seasonal-jobs'].includes(formData.category);
  const isParticulierClassicServiceGratuit = formData.category === 'services' && userAccountType === 'particulier' && formData.listingType === 'gratuit';
  const isWellnessTherapies = formData.category === 'wellness-therapies';

  if (isSpecialFreeCategory || isParticulierClassicServiceGratuit) {
    cost = 0; 
    if (formData.photoTier === 'premium') {
      cost = 2; 
    }
  } else if (userAccountType === 'professionnel') {
    cost = 10; 
  } else if (userAccountType === 'particulier') {
    const hasFreeListingsLeft = freeListingsUsed < maxFreeListings;
    if (isPromoActiveForUser && hasFreeListingsLeft) { 
      cost = 0; 
      if (formData.photoTier === 'premium') {
        cost = 2; 
      }
    } else { 
      cost = isWellnessTherapies ? 5 : 5; 
      if (formData.photoTier === 'premium') {
        cost += 2; 
      }
    }
  }
  return cost;
};

export const validateFormFields = (formData, categorySpecificFields, imageFiles, userAccountType) => {
  const tempErrors = {};
  if (!formData.title.trim()) tempErrors.title = 'Le titre est requis';
  else if (formData.title.trim().length < 5) tempErrors.title = 'Le titre doit faire au moins 5 caractères';
  if (!formData.description.trim()) tempErrors.description = 'La description est requise';
  else if (formData.description.trim().length < 15) tempErrors.description = 'La description doit faire au moins 15 caractères';
  
  const isEventCategory = formData.category === 'events-medoc';
  const isCommunityOrJobsCategory = ['community', 'seasonal-jobs'].includes(formData.category);
  const isParticulierServiceGratuit = formData.category === 'services' && userAccountType === 'particulier' && formData.listingType === 'gratuit';

  const requiresPrice = 
    (userAccountType === 'professionnel' && !isEventCategory && !isCommunityOrJobsCategory) || 
    (userAccountType === 'particulier' && formData.listingType === 'payant' && !isEventCategory && !isCommunityOrJobsCategory && !isParticulierServiceGratuit) || 
    (isEventCategory && categorySpecificFields.eventAdmission === 'Payante');

  if (requiresPrice && (formData.price === '' || formData.price === null || parseFloat(formData.price) <= 0)) {
      tempErrors.price = 'Le prix doit être un nombre positif.';
  } else if (requiresPrice && isNaN(parseFloat(formData.price))) {
      tempErrors.price = 'Le prix doit être un nombre valide.';
  }

  if (!formData.category) tempErrors.category = 'La catégorie est requise';
  
  const currentCategoryData = categories.find(c => c.id === formData.category);
  if (currentCategoryData && currentCategoryData.subCategories && currentCategoryData.subCategories.length > 0 && !formData.subCategory) {
      tempErrors.subCategory = 'La sous-catégorie est requise';
  }

  if (!formData.location) tempErrors.location = 'La commune est requise';
  if (formData.location === 'Autre' && !formData.customLocation.trim()) tempErrors.customLocation = 'Veuillez préciser la localisation';
  
  const maxPhotos = userAccountType === 'professionnel' ? 15 : (formData.photoTier === 'premium' ? 10 : 5);
  if (imageFiles.length === 0) {
    tempErrors.images = 'Au moins une image est requise';
  } else if (imageFiles.length > maxPhotos) {
    tempErrors.images = `Vous ne pouvez téléverser que ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''} maximum.`;
  }

  const fieldsSource = currentCategoryData?.subCategories?.find(sc => sc.id === formData.subCategory) || currentCategoryData;

  if (fieldsSource?.fields) {
    fieldsSource.fields.forEach(field => {
      if (field.required) {
        const fieldValue = categorySpecificFields[field.name];
        if (field.type !== 'checkbox' && (fieldValue === undefined || fieldValue === null || String(fieldValue).trim() === '')) {
          tempErrors[`categorySpecific_${field.name}`] = `${field.label} est requis`;
        }
      }
      if (field.name === 'eventWebsite' && categorySpecificFields[field.name]) {
          try {
              const url = new URL(categorySpecificFields[field.name]);
              if (url.protocol !== "http:" && url.protocol !== "https:") {
                  throw new Error("Invalid protocol");
              }
          } catch (_) {
              tempErrors[`categorySpecific_${field.name}`] = `L'URL du site web n'est pas valide. Assurez-vous qu'elle commence par http:// ou https://`;
          }
      }
    });
  }
  return tempErrors;
};