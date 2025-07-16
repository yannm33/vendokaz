import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Search as SearchIcon, Building, Car, Shirt, Tv, Home as HomeIconLucide, Bike, Palette, Baby, Wrench as ToolIcon, ChevronDown, Users, HeartHandshake as Handshake, Wrench as ToolIconAlias, CalendarDays as CalendarIcon, Gift, Tractor, Waves, Waves as Surf, Briefcase as BriefcaseIcon, Sparkles } from 'lucide-react';
import { categoriesData as appCategories } from '@/data/categoriesData';

export const categoryIcons = {
  'vehicles': Car,
  'real-estate': Building,
  'multimedia': Tv,
  'fashion': Shirt,
  'home-garden': HomeIconLucide,
  'agri-viti': Tractor,
  'seasonal-jobs': BriefcaseIcon,
  'hobbies-leisure': Palette, 
  'surfing-skating': Surf,
  'baby-kids': Baby, 
  'services': ToolIcon,
  'rentals-various': ToolIconAlias, 
  'community': Users, 
  'events-medoc': CalendarIcon,
  'wellness-therapies': Sparkles,
  'all': SearchIcon,
  
  'cars': Car, 'motorcycles': Car, 'scooters': Car, 'bicycles': Bike, 'utility-vehicles': Car, 'caravaning': Car, 'nautisme': Car, 'vehicle-parts': ToolIcon,
  'rentals': Building, 'sales': Building, 'colocations': Building, 'offices-shops': Building, 'vacation-rentals': Building,
  'computers': Tv, 'laptops': Tv, 'tablets': Tv, 'phones': Tv, 'consoles-games': Tv, 'photo-video': Tv, 'accessories-multi': Tv,
  'furniture': HomeIconLucide, 'appliances': HomeIconLucide, 'decoration': HomeIconLucide, 'tableware': HomeIconLucide, 'diy': HomeIconLucide, 'gardening': HomeIconLucide, 'linens': HomeIconLucide,
  'womens-clothing': Shirt, 'mens-clothing': Shirt, 'childrens-clothing': Shirt, 'shoes': Shirt, 'bags-luggage': Shirt, 'accessories-fashion': Shirt, 'watches-jewelry': Shirt,
  
  'tractors-machinery': Tractor, 'vineyard-tools': Tractor, 'treatments-products': Palette, 'plants-nursery': Palette, 'seasonal-labor': Users, 'other-agri-viti': Tractor,
  
  'jobs-catering-hospitality': ToolIcon, 
  'jobs-harvest-vineyards': Tractor, 
  'jobs-animation-childcare': Users, 
  'jobs-sales-commerce': Tag, 
  'jobs-other-seasonal': BriefcaseIcon,

  'sports-equipment': Bike, 'bikes': Bike, 'musical-instruments': Palette, 'books-comics': Palette, 'games-toys': Palette, 'collectibles': Palette, 'creative-hobbies': Palette, 'camping-hiking': Palette,
  
  'surfboards': Surf, 
  'bodyboards-fins': Waves, 
  'skateboards-longboards': Waves, 
  'wetsuits-accessories': Shirt, 
  'stand-up-paddle': Waves, 
  'lessons-schools': Users,
  
  'baby-clothing': Baby, 'kids-clothing': Baby, 'childcare-equipment': Baby, 'toys-early-learning': Palette, 'kids-furniture': HomeIconLucide,
  'lessons': Users, 'home-services': ToolIcon, 'repairs': ToolIcon, 'babysitting': Baby, 'events-services': ToolIcon, 'wellness': Users, 'animal-services': Users,
  'tool-rental': ToolIconAlias, 'equipment-rental': ToolIconAlias, 'vehicle-rental-short': Car, 'party-equipment-rental': ToolIconAlias,
  'donations': Gift, 'exchanges': Handshake, 'volunteering': Users, 'carpooling': Car,
  'concerts-festivals': CalendarIcon, 'markets-fairs': CalendarIcon, 'sports-events': CalendarIcon, 'cultural-events': CalendarIcon, 'workshops-courses': CalendarIcon, 'community-gatherings': CalendarIcon, 'other-events': CalendarIcon,
  
  'osteopathy': Sparkles, 'yoga': Sparkles, 'meditation': Sparkles, 'sophrology': Sparkles, 'naturopathy': Sparkles, 'hypnotherapy': Sparkles, 'reflexology': Sparkles, 'chiropractic': Sparkles, 'shiatsu': Sparkles, 'reiki': Sparkles,

  'placeholder-1': Tag, 'placeholder-2': Tag, 'placeholder-3': Tag, 'placeholder-4': Tag,
};

const CategoryGrid = ({ selectedCategory, filterByCategory, expandedCategory, setExpandedCategory, allListings }) => {
  const handleCategoryClick = (categoryId) => {
    const category = appCategories.find(c => c.id === categoryId);
    if (category?.subCategories && category.subCategories.length > 0) {
      setExpandedCategory(prev => (prev === categoryId ? null : categoryId));
    } else {
      filterByCategory(categoryId);
      setExpandedCategory(null);
    }
  };
  
  const handleSubCategoryClick = (mainCategoryId, subCategoryId, e) => {
    e.stopPropagation(); 
    filterByCategory(subCategoryId); 
    setExpandedCategory(null); 
  };

  const getCategoryListingsCount = (categoryId) => {
    if (!allListings) return 0;
    return allListings.filter(l => l.category === categoryId).length;
  };
  const getSubCategoryListingsCount = (mainCategoryId, subCategoryId) => {
    if (!allListings) return 0;
    return allListings.filter(l => l.category === mainCategoryId && l.sub_category === subCategoryId).length;
  };
  
  const displayedCategories = appCategories; 

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="my-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left font-poppins">Explorer par catégories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        <button
          onClick={() => filterByCategory('all')}
          className={`category-button group ${selectedCategory === 'all' ? 'active' : ''}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <SearchIcon className="category-icon text-orange-500" />
            <span className="category-name">Toutes</span>
            <span className="category-count">{allListings ? allListings.length : 0}</span>
          </div>
        </button>
        
        {displayedCategories.map((category) => {
          const IconComponent = categoryIcons[category.id] || Tag;
          const hasSubcategories = category.subCategories && category.subCategories.length > 0;
          const isExpanded = expandedCategory === category.id;

          return (
            <div key={category.id} className="relative">
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`category-button group w-full ${selectedCategory === category.id && !isExpanded ? 'active' : ''} ${isExpanded ? 'active-expanded' : ''}`}
              >
                <div className="flex flex-col items-center justify-between h-full">
                  <IconComponent className={`category-icon ${category.color ? category.color.replace('bg-', 'text-').replace('-100', '-600') : 'text-gray-600'}`} />
                  <span className="category-name">{category.name}</span>
                  <div className="flex items-center justify-center w-full">
                    <span className="category-count">{getCategoryListingsCount(category.id)}</span>
                    {hasSubcategories && (
                      <ChevronDown className={`ml-auto w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </div>
                {(category.id === 'events-medoc' || category.id === 'surfing-skating' || category.id === 'community' || category.id === 'seasonal-jobs' || category.id === 'services') && (
                  <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow-sm">Gratuit</span>
                )}
              </button>
              <AnimatePresence>
              {hasSubcategories && isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md border border-orange-300 z-20 overflow-hidden py-1 max-h-60 overflow-y-auto"
                >
                  {category.subCategories.map(subCat => {
                    const SubIcon = categoryIcons[subCat.id] || Tag;
                    return (
                      <button
                        key={subCat.id}
                        onClick={(e) => handleSubCategoryClick(category.id, subCat.id, e)}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                      >
                        <SubIcon className="w-4 h-4 mr-3 text-gray-500" />
                        {subCat.name}
                        <span className="ml-auto text-xs text-gray-400">{getSubCategoryListingsCount(category.id, subCat.id)}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default CategoryGrid;