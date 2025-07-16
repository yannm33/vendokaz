import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import FormSection from '@/components/CreateListingForm/FormSection.jsx';
import FormField from '@/components/CreateListingForm/FormField.jsx';
import ImageUploadField from '@/components/CreateListingForm/ImageUploadField.jsx';
import ListingTypeSelector from '@/components/CreateListingForm/ListingTypeSelector.jsx';
import PhotoTierSelector from '@/components/CreateListingForm/PhotoTierSelector.jsx';
import PromotionInfoBox from '@/components/CreateListingForm/PromotionInfoBox.jsx';
import ProfessionalInfoBox from '@/components/CreateListingForm/ProfessionalInfoBox.jsx';
import CategoryFields from '@/components/CreateListingForm/CategoryFields.jsx';
import FormHeader from '@/components/CreateListingForm/FormHeader.jsx';
import FormActions from '@/components/CreateListingForm/FormActions.jsx';
import { useFormInitialization } from '@/components/CreateListingForm/hooks/useFormInitialization.js';
import { useFormPlaceholders } from '@/components/CreateListingForm/hooks/useFormPlaceholders.js';
import { useFormSubmission } from '@/components/CreateListingForm/hooks/useFormSubmission.js';
import { getCategorySpecificDefaultFields, calculateListingCost, determineDefaultListingType } from '@/components/CreateListingForm/utils/formUtils.js';
import { categoriesData as categories } from '@/data/categoriesData';
import { medocCommunes } from '@/data/communesData';
import { MapPin as MapPinIcon, ChevronDown } from 'lucide-react';


const CreateListingForm = ({ onSubmit, isSubmitting, selectedListingTypeForForm }) => {
  const navigate = useNavigate();
  const { user, isPromotionActive: isUserPromoActiveHook, getPromotionEndDate, getCurrentMaxFreeListings } = useUser();
  
  const effectiveUserAccountType = selectedListingTypeForForm || user?.account_type || 'particulier';
  const currentUserFreeListingsUsed = user?.free_listings_used || 0;
  const promotionActiveForUser = isUserPromoActiveHook ? isUserPromoActiveHook() : false;

  const { placeholders, updatePlaceholders } = useFormPlaceholders(effectiveUserAccountType);
  
  const resetCategorySpecificFields = useCallback((categoryData) => {
    setCategorySpecificFields(getCategorySpecificDefaultFields(categoryData));
  }, []);

  const {
    formData,
    setFormData,
    availableSubcategories,
    showCustomLocationInput,
    selectedCategoryData,
    isEventCategory
  } = useFormInitialization(effectiveUserAccountType, updatePlaceholders, resetCategorySpecificFields);

  const [imageFiles, setImageFiles] = useState([]); 
  const [categorySpecificFields, setCategorySpecificFields] = useState({});
  const [listingCost, setListingCost] = useState(0);
  
  const maxPhotos = effectiveUserAccountType === 'professionnel' ? 15 : (formData.photoTier === 'premium' ? 10 : 5);

  const { handleSubmit, errors, setErrors } = useFormSubmission(
    (dataToSubmit, filesToUpload) => onSubmit(dataToSubmit, listingCost, filesToUpload),
    formData,
    categorySpecificFields,
    imageFiles,
    effectiveUserAccountType
  );

  useEffect(() => {
    const currentCategoryData = categories.find(c => c.id === formData.category);
    const newDefaultListingType = determineDefaultListingType(currentCategoryData, effectiveUserAccountType);
    
    if (isEventCategory) {
      const admission = categorySpecificFields.eventAdmission;
      if (admission === 'Gratuite' || admission === 'Prix libre' || admission === 'Sur inscription') {
        setFormData(prev => ({ ...prev, listingType: 'gratuit', price: '' }));
      } else if (admission === 'Payante') {
        setFormData(prev => ({ ...prev, listingType: 'payant' }));
      } else { 
         setFormData(prev => ({...prev, listingType: 'gratuit', price: ''}));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        listingType: newDefaultListingType,
        price: newDefaultListingType === 'gratuit' ? '' : prev.price,
      }));
    }
  }, [categorySpecificFields.eventAdmission, isEventCategory, formData.category, effectiveUserAccountType, setFormData]);

  useEffect(() => {
    const maxFree = getCurrentMaxFreeListings ? getCurrentMaxFreeListings() : 0;
    setListingCost(calculateListingCost(formData, effectiveUserAccountType, currentUserFreeListingsUsed, maxFree, promotionActiveForUser));
  }, [formData, effectiveUserAccountType, currentUserFreeListingsUsed, getCurrentMaxFreeListings, promotionActiveForUser]);


  useEffect(() => {
    // When listingCost is calculated, if it's 0 due to promo for a particulier,
    // but the category is 'wellness-therapies' and listingType was 'payant', set it to 'gratuit'
    // This makes the UI consistent: if cost is 0, it's a "free" listing for the user.
    if (effectiveUserAccountType === 'particulier' && 
        formData.category === 'wellness-therapies' && 
        listingCost === 0 && 
        formData.listingType === 'payant') {
      setFormData(prev => ({ ...prev, listingType: 'gratuit', price: '' }));
    }
  }, [listingCost, formData.category, effectiveUserAccountType, setFormData, formData.listingType]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let currentErrors = { ...errors };

    if (name === 'category') {
      const catData = categories.find(c => c.id === value);
      setFormData(prev => ({ ...prev, [name]: value, subCategory: '' })); 
      resetCategorySpecificFields(catData);
      updatePlaceholders(value, '');
      Object.keys(errors).forEach(key => {
        if (key.startsWith('categorySpecific_')) delete currentErrors[key];
      });
    } else if (name === 'subCategory') {
        const catData = categories.find(c => c.id === formData.category);
        const subCatData = catData?.subCategories?.find(sc => sc.id === value);
        setFormData(prev => ({ ...prev, [name]: value }));
        resetCategorySpecificFields(subCatData || catData);
        updatePlaceholders(formData.category, value);
    } else if (type === 'checkbox' && name.startsWith('categorySpecific_')) { 
      setCategorySpecificFields(prev => ({ ...prev, [name.replace('categorySpecific_', '')]: checked }));
    } else if (name.startsWith('categorySpecific_')) {
      const fieldName = name.replace('categorySpecific_', '');
      setCategorySpecificFields(prev => ({ ...prev, [fieldName]: value }));
    } else if (name === 'listingType') {
       setFormData(prev => ({ ...prev, listingType: value }));
       if (value === 'gratuit' && !isEventCategory && formData.category !== 'wellness-therapies') { // Don't clear price for wellness if it was payant
         setFormData(prev => ({ ...prev, price: '' })); 
       }
    } else if (name === 'photoTier') {
        setFormData(prev => ({...prev, photoTier: value}));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (currentErrors[name]) delete currentErrors[name];
    const specificFieldName = name.startsWith('categorySpecific_') ? name.replace('categorySpecific_', '') : name;
    if (currentErrors[`categorySpecific_${specificFieldName}`]) {
      delete currentErrors[`categorySpecific_${specificFieldName}`];
    }
    setErrors(currentErrors);
  };

  const handleImageUpload = (uploadedImageFiles, uploadedImagePreviews) => {
    setImageFiles(uploadedImageFiles);
    setFormData(prev => ({ ...prev, images: uploadedImagePreviews }));
    if (errors.images) setErrors(prev => ({ ...prev, images: '' }));
  };
  
  const promotionEndDate = getPromotionEndDate ? getPromotionEndDate() : null;
  const maxFree = getCurrentMaxFreeListings ? getCurrentMaxFreeListings() : 0;
  const usedFree = currentUserFreeListingsUsed || 0;
  const remainingFree = Math.max(0, maxFree - usedFree);
  
  const isSpecialCategory = isEventCategory || formData.category === 'community' || formData.category === 'seasonal-jobs';
  const canOfferFreeParticulierService = formData.category === 'services' && effectiveUserAccountType === 'particulier';

  // Determine if ListingTypeSelector should be shown
  // Show for 'services' for particuliers (as it's a choice).
  // Don't show for special free categories.
  // Don't show for 'wellness-therapies' for particuliers if it's going to be free due to promo.
  // Show for 'wellness-therapies' for particuliers if promo is not active or no free listings left (i.e. it will be payant).
  const showListingTypeSelectorForParticulier = 
    effectiveUserAccountType === 'particulier' &&
    !isSpecialCategory &&
    (
      formData.category === 'services' || // Always show for 'services' to choose
      (formData.category === 'wellness-therapies' && listingCost > 0 ) // Show for wellness if it's going to be paid
    );


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sm:p-10"
      >
        <FormHeader isEventCategory={isEventCategory} userAccountType={effectiveUserAccountType} category={formData.category} />
        
           {isSpecialCategory && (
             <div className="mb-6 inline-flex items-center bg-blue-50 border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm">
                <Tag className="w-5 h-5 mr-2" />
                <span>La publication {isEventCategory ? "d'événements" : (formData.category === 'seasonal-jobs' ? "d'offres d'emploi saisonnier" : "d'annonces communautaires")} est <strong>gratuite</strong> !</span>
             </div>
           )}

        {user && !isSpecialCategory && effectiveUserAccountType === 'particulier' && (
            <PromotionInfoBox
                remainingFree={remainingFree}
                promotionActive={promotionActiveForUser}
                promotionEndDate={promotionEndDate}
                maxFree={maxFree}
            />
        )}
        
        {user && effectiveUserAccountType === 'professionnel' && !isSpecialCategory && (
            <ProfessionalInfoBox price={10} />
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset disabled={isSubmitting}>
            <FormSection>
              <FormField
                id="title"
                label={`Titre de ${isEventCategory ? "l'événement" : (formData.category === 'seasonal-jobs' ? "l'offre d'emploi" : "l'annonce")}`}
                error={errors.title}
              >
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`input-field ${errors.title ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                  placeholder={placeholders.title}
                />
              </FormField>
            </FormSection>
            
            <FormSection grid={true}>
              <FormField id="category" label="Catégorie" error={errors.category}>
                 <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`input-field appearance-none pr-8 ${errors.category ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                  >
                    <option value="">Choisir une catégorie...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </FormField>

              {availableSubcategories && availableSubcategories.length > 0 && (
                <FormField id="subCategory" label={`Sous-catégorie ${isEventCategory ? "du type d'événement" : (formData.category === 'seasonal-jobs' ? "du type de poste" : "de l'article/service")}`} error={errors.subCategory}>
                   <div className="relative">
                    <select
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      className={`input-field appearance-none pr-8 ${errors.subCategory ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                    >
                      <option value="">Choisir une sous-catégorie...</option>
                      {availableSubcategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.icon} {subCat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                </FormField>
              )}
            </FormSection>
            
            {showListingTypeSelectorForParticulier && (
                <ListingTypeSelector
                    listingType={formData.listingType}
                    onListingTypeChange={(value) => handleInputChange({ target: { name: 'listingType', value } })}
                    error={errors.listingType}
                />
            )}

            {((effectiveUserAccountType === 'professionnel' && !isSpecialCategory) || 
              (!isSpecialCategory && effectiveUserAccountType === 'particulier' && (formData.listingType === 'payant' || !showListingTypeSelectorForParticulier || formData.category === 'wellness-therapies')) || 
              (isEventCategory && categorySpecificFields.eventAdmission === 'Payante')) && (
              <FormSection>
                <FormField id="price" label="Prix (€)" error={errors.price}>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`input-field ${errors.price ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                    placeholder={isEventCategory ? "Ex: 15 (entrée)" : (effectiveUserAccountType === 'professionnel' ? "Ex: 1200" : (formData.category === 'wellness-therapies' ? "Ex: 50 (séance)" : "Ex: 250"))}
                    min="0"
                    step="0.01"
                    disabled={!isEventCategory && effectiveUserAccountType === 'particulier' && formData.listingType === 'gratuit' && (formData.category !== 'wellness-therapies' || listingCost === 0)}
                  />
                </FormField>
              </FormSection>
            )}

            <FormSection>
              <FormField
                id="location"
                label={`${isEventCategory ? "Lieu de l'événement" : (formData.category === 'seasonal-jobs' ? "Lieu de travail (Médoc)" : "Commune (Médoc)")}`}
                error={errors.location}
              >
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`input-field pl-10 appearance-none pr-8 ${errors.location ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                  >
                    <option value="">Sélectionner une commune...</option>
                    {medocCommunes.map(commune => (
                      <option key={commune} value={commune}>{commune}</option>
                    ))}
                    <option value="Autre">Autre (Préciser)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </FormField>
            </FormSection>

            {showCustomLocationInput && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                <FormSection>
                  <FormField id="customLocation" label="Préciser la localisation" error={errors.customLocation}>
                    <input
                      type="text"
                      id="customLocation"
                      name="customLocation"
                      value={formData.customLocation}
                      onChange={handleInputChange}
                      className={`input-field ${errors.customLocation ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                      placeholder={isEventCategory ? "Ex: Plage centrale, Salle des fêtes..." : (formData.category === 'seasonal-jobs' ? "Ex: Restaurant Le Phare, Camping Les Flots Bleus" : "Ex: Hameau de ..., Lieu-dit ...")}
                    />
                  </FormField>
                </FormSection>
              </motion.div>
            )}
            
            <FormSection>
              <FormField id="description" label={`Description ${isEventCategory ? "de l'événement" : (formData.category === 'seasonal-jobs' ? "de l'offre" : "")}`} error={errors.description}>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={effectiveUserAccountType === 'professionnel' ? 8 : 6}
                  className={`input-field ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
                  placeholder={placeholders.description}
                />
              </FormField>
            </FormSection>

            <CategoryFields 
                selectedCategoryData={selectedCategoryData}
                selectedSubCategoryData={availableSubcategories.find(sc => sc.id === formData.subCategory)}
                categorySpecificFields={categorySpecificFields}
                handleInputChange={handleInputChange}
                errors={errors}
                isEventCategory={isEventCategory}
            />
            
            <ImageUploadField
                maxPhotos={maxPhotos}
                images={formData.images}
                onImageUpload={handleImageUpload}
                error={errors.images}
                isEventCategory={isEventCategory}
                category={formData.category}
            />
          </fieldset>

          {effectiveUserAccountType === 'particulier' && !isSpecialCategory && (
              <PhotoTierSelector
                photoTier={formData.photoTier}
                onPhotoTierChange={(value) => handleInputChange({ target: { name: 'photoTier', value } })}
                remainingFree={remainingFree}
                isSubmitting={isSubmitting}
              />
          )}

          <FormActions 
            listingCost={listingCost}
            isSubmitting={isSubmitting}
            onCancel={() => navigate(-1)}
            isEventCategory={isEventCategory}
            category={formData.category}
            userAccountType={effectiveUserAccountType}
          />
        </form>
      </motion.div>
    </div>
  );
};
export default CreateListingForm;