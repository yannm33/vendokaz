import React from 'react';
import { Gift, Info, AlertTriangle } from 'lucide-react';

const PromotionInfoBox = ({ remainingFree, promotionActive, promotionEndDate, maxFree }) => {
  const Icon = remainingFree > 0 ? Gift : (promotionActive && !remainingFree ? AlertTriangle : Info) ;
  const bgColor = remainingFree > 0 ? 'bg-green-50 border-green-500' : (promotionActive && !remainingFree ? 'bg-yellow-50 border-yellow-500' : 'bg-orange-50 border-orange-500');
  const textColor = remainingFree > 0 ? 'text-green-800' : (promotionActive && !remainingFree ? 'text-yellow-800' : 'text-orange-800');
  const iconColor = remainingFree > 0 ? 'text-green-600' : (promotionActive && !remainingFree ? 'text-yellow-600' : 'text-orange-600');

  return (
    <div className={`mb-8 p-5 rounded-lg border-2 ${bgColor}`}>
      <div className="flex items-start sm:items-center">
        <Icon className={`w-7 h-7 ${iconColor} mr-4 flex-shrink-0`} />
        <div>
          <p className={`font-semibold text-lg ${textColor}`}>
            {remainingFree > 0 
              ? `Bonne nouvelle ! Il vous reste ${remainingFree} annonce${remainingFree > 1 ? 's' : ''} gratuite${remainingFree > 1 ? 's' : ''} (5 photos).`
              : (promotionActive ? "Quota promotionnel d'annonces gratuites atteint." : "Vous avez utilisé toutes vos annonces gratuites.")
            }
          </p>
          {promotionActive && promotionEndDate && (
            <p className="text-sm text-gray-700 mt-1">
              L'offre promotionnelle de {maxFree} annonces gratuites est valable jusqu'au {new Date(promotionEndDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
            </p>
          )}
           {!promotionActive && (
            <p className="text-sm text-gray-700 mt-1">
              Votre quota standard est de {maxFree} annonce{maxFree > 1 ? 's' : ''} gratuite{maxFree > 1 ? 's' : ''}.
            </p>
           )}
           <p className="text-sm text-gray-700 mt-1">
             Option Premium (10 photos) : +2€ (même si l'annonce est dans votre quota gratuit).
           </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionInfoBox;