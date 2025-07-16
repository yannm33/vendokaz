import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const InlinePromotionBanner = () => {
  const { isPromotionActiveForAnyone, getSitePromotionEndDate } = useUser();
  
  if (typeof isPromotionActiveForAnyone !== 'function' || typeof getSitePromotionEndDate !== 'function') {
    return null;
  }

  const promotionIsGenerallyActive = isPromotionActiveForAnyone();
  const promotionEndDateISO = getSitePromotionEndDate(); 

  if (!promotionIsGenerallyActive || !promotionEndDateISO) return null;
  
  const promotionEndDate = new Date(promotionEndDateISO);
  const formattedEndDate = promotionEndDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-lg shadow-md my-6 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
    >
      <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0" />
      <p className="text-sm md:text-base font-medium">
        <span className="font-semibold">Offre de lancement :</span> 10 annonces gratuites (10 photos/annonce) pour les particuliers jusqu'au {formattedEndDate} !
      </p>
      <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
        <Link to="/create">
          J'en profite
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default InlinePromotionBanner;