import React from 'react';
import { motion } from 'framer-motion';

const logoUrl = "https://static.wixstatic.com/media/a138d7_f1671926da474549b32ddea51a99025e~mv2.png";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full text-center pt-8 md:pt-10 pb-4 md:pb-6" 
    >
      <img src={logoUrl} alt="VENDOKAZ Logo" className="h-20 md:h-24 w-auto mx-auto mb-6" />
      
      <div className="inline-block bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 p-6 md:p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-4 drop-shadow-md font-poppins">
          Votre nouvelle place de marché conviviale en Gironde
        </h1>
        <div className="space-y-2">
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Acheter, vendre, échanger localement et rester connecté à votre communauté !
          </p>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Proposez vos objets à la vente, dénichez de bonnes affaires ou découvrez les événements près de chez vous.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;