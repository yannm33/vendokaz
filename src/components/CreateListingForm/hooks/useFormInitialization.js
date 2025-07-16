import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { categoriesData as categories } from '@/data/categoriesData';
import { getInitialFormData, getCategorySpecificDefaultFields, determineDefaultListingType } from '@/components/CreateListingForm/utils/formUtils.js';

export const useFormInitialization = (userAccountType, updatePlaceholdersCallback, resetCategorySpecificFieldsCallback) => {
  const location = useLocation();
  const [formData, setFormData] = useState(getInitialFormData(userAccountType));
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [showCustomLocationInput, setShowCustomLocationInput] = useState(false);

  const selectedCategoryData = categories.find(c => c.id === formData.category);
  const isEventCategory = selectedCategoryData?.id === 'events-medoc';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const subCategoryFromUrl = params.get('subcategory');

    let initialCategory = categoryFromUrl;
    let initialSubCategory = subCategoryFromUrl;

    if (initialCategory) {
      const catData = categories.find(c => c.id === initialCategory);
      if (catData) {
        setFormData(prev => ({
          ...prev,
          category: initialCategory,
          subCategory: (initialSubCategory && catData.subCategories?.find(sc => sc.id === initialSubCategory)) ? initialSubCategory : '',
          listingType: determineDefaultListingType(catData, userAccountType),
          photoTier: userAccountType === 'professionnel' ? 'premium' : 'standard',
        }));
        setAvailableSubcategories(catData.subCategories || []);
        
        const fieldsSourceForUrl = (initialSubCategory && catData.subCategories?.find(sc => sc.id === initialSubCategory)) 
          ? catData.subCategories.find(sc => sc.id === initialSubCategory) 
          : catData;
        resetCategorySpecificFieldsCallback(fieldsSourceForUrl);
        updatePlaceholdersCallback(initialCategory, initialSubCategory);

      }
    } else {
      setFormData(getInitialFormData(userAccountType));
      setAvailableSubcategories([]);
      resetCategorySpecificFieldsCallback(null);
      updatePlaceholdersCallback('', '');
    }
  }, [location.search, userAccountType, resetCategorySpecificFieldsCallback, updatePlaceholdersCallback]);

  useEffect(() => {
    if (formData.location === 'Autre') {
      setShowCustomLocationInput(true);
    } else {
      setShowCustomLocationInput(false);
      setFormData(prev => ({ ...prev, customLocation: '' }));
    }
  }, [formData.location]);

  useEffect(() => {
    const currentCategoryData = categories.find(c => c.id === formData.category);
    let currentSubCategoryData;
    if (currentCategoryData?.subCategories && formData.subCategory) {
      currentSubCategoryData = currentCategoryData.subCategories.find(sc => sc.id === formData.subCategory);
    }
    const fieldsSource = currentSubCategoryData || currentCategoryData;
    
    const newDefaultListingType = determineDefaultListingType(currentCategoryData, userAccountType);

    setFormData(prev => ({
      ...prev,
      listingType: newDefaultListingType,
      price: newDefaultListingType === 'gratuit' && !isEventCategory ? '' : prev.price,
    }));

    if (fieldsSource) {
        resetCategorySpecificFieldsCallback(fieldsSource);
    }
    updatePlaceholdersCallback(formData.category, formData.subCategory);

    if (currentCategoryData) {
      setAvailableSubcategories(currentCategoryData.subCategories || []);
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.category, formData.subCategory, userAccountType, resetCategorySpecificFieldsCallback, updatePlaceholdersCallback, isEventCategory]);

  return {
    formData,
    setFormData,
    availableSubcategories,
    showCustomLocationInput,
    selectedCategoryData,
    isEventCategory
  };
};