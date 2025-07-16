import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full"
      >
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Paiement Annulé</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Votre paiement a été annulé ou a échoué. Votre annonce n'a pas été publiée.
          Vous pouvez réessayer ou modifier votre annonce si nécessaire.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 justify-center">
          <Link to="/create">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700">
              <RefreshCcw className="w-5 h-5 mr-2" />
              Réessayer de publier
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;