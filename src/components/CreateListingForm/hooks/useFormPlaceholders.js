import { useState, useCallback } from 'react';
import { categoriesData as categories } from '@/data/categoriesData';

export const useFormPlaceholders = (userAccountType, isEventCategoryProp) => {
  const [placeholders, setPlaceholders] = useState({
    title: "Ex: Superbe VTT électrique, comme neuf",
    description: "Décrivez votre article en détail : état, caractéristiques, dimensions, raison de la vente, etc."
  });

  const updatePlaceholders = useCallback((category, subCategory) => {
    const mainCategoryData = categories.find(c => c.id === category);
    const subCategoryData = mainCategoryData?.subCategories?.find(sc => sc.id === subCategory);

    let currentPlaceholders = {
      title: "Ex: Superbe VTT électrique, comme neuf",
      description: "Décrivez votre article en détail : état, caractéristiques, dimensions, raison de la vente, etc."
    };

    if (subCategoryData?.placeholders) {
      currentPlaceholders = subCategoryData.placeholders;
    } else if (mainCategoryData?.placeholders) {
      currentPlaceholders = mainCategoryData.placeholders;
    }

    if (category === 'seasonal-jobs') {
      currentPlaceholders.title = subCategoryData?.placeholders?.title || mainCategoryData?.placeholders?.title || "Ex: Cherche Serveur(se) pour Juillet-Août";
      currentPlaceholders.description = subCategoryData?.placeholders?.description || mainCategoryData?.placeholders?.description || "Décrivez le poste, les missions, le profil recherché, les conditions...";
    } else if (category === 'events-medoc') {
      currentPlaceholders.title = subCategoryData?.placeholders?.title || mainCategoryData?.placeholders?.title || "Ex: Fête de la Musique à Soulac";
      currentPlaceholders.description = subCategoryData?.placeholders?.description || mainCategoryData?.placeholders?.description || "Décrivez votre événement : programme, ambiance, informations pratiques...";
    } else if (userAccountType === 'professionnel' && !isEventCategoryProp && category !== 'seasonal-jobs') {
      currentPlaceholders.description = subCategoryData?.placeholders?.description || mainCategoryData?.placeholders?.description || "Décrivez en détail votre produit/service, ses avantages, caractéristiques techniques...";
    }

    setPlaceholders(currentPlaceholders);
  }, [userAccountType, isEventCategoryProp]);

  return { placeholders, updatePlaceholders };
};