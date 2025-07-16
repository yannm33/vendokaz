import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, Check, Briefcase, User as UserIcon, Camera, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

const PaymentModal = ({ isOpen, onClose, onSuccess, price, listingData }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  if (!listingData) return null;

  const isProfessional = user?.accountType === 'professionnel';
  const isPhotoPremium = listingData.photoTier === 'premium';
  
  let title = "Publication payante";
  let subtitle = "Finalisez votre annonce";
  let features = [];

  if (isProfessional) {
    title = "Publication Professionnelle";
    subtitle = "Mettez en avant votre expertise";
    features = [
      'Visibilité maximale pendant 30 jours',
      `Jusqu'à 15 photos haute qualité`,
      'Messagerie intégrée avec les clients',
      'Idéal pour les entreprises et services'
    ];
  } else { // Particulier
    if (price === 2 && !isPhotoPremium) { // Standard paid listing
      title = "Publication Standard";
      subtitle = "Quota d'annonces gratuites dépassé";
      features = [
        'Visibilité pendant 30 jours',
        `Jusqu'à 5 photos`,
        'Messagerie intégrée'
      ];
    } else if (price === 2 && isPhotoPremium) { // Photo premium on a free slot
        title = "Option Photos Premium";
        subtitle = "Boostez la visibilité de votre annonce gratuite";
        features = [
            'Annonce gratuite + Option Premium',
            `Jusqu'à 10 photos`,
            'Meilleure présentation visuelle'
        ];
    } else if (price === 4 && isPhotoPremium) { // Standard paid + Photo premium
        title = "Publication Premium";
        subtitle = "Quota gratuit dépassé + Photos Premium";
        features = [
            'Visibilité pendant 30 jours',
            `Jusqu'à 10 photos`,
            'Messagerie intégrée',
            'Attirez plus d\'acheteurs'
        ];
    } else { // Fallback/default for other particular scenarios if any
        title = "Publication d'annonce";
        subtitle = "Quelques détails avant de publier";
         features = [
            'Visibilité pendant 30 jours',
            `Jusqu'à ${isPhotoPremium ? 10 : 5} photos`,
            'Messagerie intégrée'
        ];
    }
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-gradient-to-br from-gray-800 via-slate-900 to-black rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-gray-700"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {isProfessional ? <Briefcase className="w-7 h-7 text-orange-400" /> : <UserIcon className="w-7 h-7 text-orange-400" />}
                  <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-sm text-orange-200">{subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={isProcessing}
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white/5 rounded-lg p-5 mb-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Montant à payer</span>
                  <span className="text-3xl font-bold text-white">{price.toFixed(2)} €</span>
                </div>
                {listingData.title && (
                    <p className="text-xs text-gray-400 mt-1 truncate">Pour : {listingData.title}</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-200 mb-3">Ce que vous obtenez :</h3>
                <div className="space-y-2.5">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {isProfessional && (
                    <div className="flex items-start space-x-2.5">
                         <Camera className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Jusqu'à 15 photos pour présenter vos produits/services.</span>
                    </div>
                  )}
                  {!isProfessional && listingData.photoTier === 'premium' && (
                     <div className="flex items-start space-x-2.5">
                         <PlusCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Jusqu'à 10 photos pour une annonce plus attractive.</span>
                    </div>
                  )}
                   {!isProfessional && listingData.photoTier === 'standard' && (
                     <div className="flex items-start space-x-2.5">
                         <Camera className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Jusqu'à 5 photos pour votre annonce.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-500/10 rounded-lg p-4 mb-6 border border-blue-400/30">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium text-blue-200">Paiement sécurisé via Stripe</span>
                </div>
                 <p className="text-xs text-blue-300/80 mt-1">Vos informations sont protégées.</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mb-8">
                <p className="text-xs text-yellow-200">
                  <strong>Mode démonstration :</strong> Ceci est une simulation. 
                  Aucun débit réel ne sera effectué.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white"
                  disabled={isProcessing}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg focus:ring-orange-400"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Traitement...</span>
                    </div>
                  ) : (
                    `Payer ${price.toFixed(2)} €`
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;