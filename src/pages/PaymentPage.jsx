import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Paiement réussi !",
        description: "Votre annonce a été publiée avec succès."
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="gradient-bg p-6 text-white">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Finaliser votre publication</h1>
              <p className="text-orange-100">Quota d'annonces gratuites dépassé</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tarification</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Publication d'une annonce</span>
              <span className="text-2xl font-bold text-gray-900">2,99 €</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Votre annonce restera active pendant 30 jours
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Inclus dans votre publication :</h3>
            <div className="space-y-2">
              {[
                'Visibilité maximale pendant 30 jours',
                'Jusqu\'à 5 photos haute qualité',
                'Messagerie intégrée avec les acheteurs',
                'Statistiques de vues en temps réel'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Paiement sécurisé</span>
            </div>
            <p className="text-sm text-blue-700">
              Vos données de paiement sont protégées par un chiffrement SSL 256 bits
            </p>
          </div>

          {/* Payment Form Simulation */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input-field"
                disabled
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="input-field"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="input-field"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Simulation Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Mode démonstration :</strong> Il s'agit d'une simulation de paiement. 
              Aucun montant ne sera débité de votre compte.
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Traitement...</span>
                </div>
              ) : (
                `Payer 2,99 €`
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;