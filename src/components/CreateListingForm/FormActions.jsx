import React from 'react';
import { Button } from '@/components/ui/button';
import { Send, XCircle, Loader2, Info } from 'lucide-react';

const FormActions = ({ listingCost, isSubmitting, onCancel, isEventCategory, category, userAccountType }) => {
  
  const isFreeListing = isEventCategory || category === 'community' || category === 'seasonal-jobs' || (category === 'services' && userAccountType === 'particulier');

  const getSubmitButtonText = () => {
    if (isSubmitting) return "Publication en cours...";
    if (isFreeListing || listingCost === 0) return "Publier gratuitement";
    return `Payer et Publier (${listingCost.toFixed(2)}€)`;
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {!(isFreeListing || listingCost === 0) && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-800 text-sm flex items-start">
          <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-yellow-600" />
          <div>
            <p className="font-semibold">Information de paiement</p>
            <p>
              Votre annonce sera publiée après validation du paiement de <strong>{listingCost.toFixed(2)}€</strong>. 
              Vous serez redirigé vers une page de paiement sécurisée.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full sm:w-auto text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto btn-primary"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          {getSubmitButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;