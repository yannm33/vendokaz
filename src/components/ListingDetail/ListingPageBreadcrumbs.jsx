import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useListings } from '@/contexts/ListingsContext';

const ListingPageBreadcrumbs = ({ mainCategoryDetails, subCategoryDetails }) => {
  const navigate = useNavigate();
  const { filterByCategory } = useListings();

  const handleBreadcrumbCategoryClick = (categoryId) => {
    filterByCategory(categoryId);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="hover:bg-orange-50 text-orange-600"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
      <div className="text-sm text-gray-500 flex items-center flex-wrap justify-end">
        {mainCategoryDetails && (
           <button onClick={() => handleBreadcrumbCategoryClick(mainCategoryDetails.id)} className="hover:text-orange-500">
            {mainCategoryDetails.name}
          </button>
        )}
        {subCategoryDetails && (
          <>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400 flex-shrink-0" />
            <button onClick={() => handleBreadcrumbCategoryClick(subCategoryDetails.id)} className="hover:text-orange-500">
              {subCategoryDetails.name}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingPageBreadcrumbs;