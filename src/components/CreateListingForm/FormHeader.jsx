import React from 'react';
import { Briefcase, User as UserIcon } from 'lucide-react';

const FormHeader = ({ isEventCategory, userAccountType, category }) => {
  const getTitle = () => {
    if (isEventCategory) return "Publier un événement";
    if (category === 'seasonal-jobs') return "Publier une offre d'emploi";
    if (userAccountType === 'professionnel') return "Annonce Professionnelle";
    return "Déposer votre annonce";
  };

  const getDescription = () => {
    if (isEventCategory) return "Faites connaître votre manifestation à toute la communauté du Médoc !";
    if (category === 'seasonal-jobs') return "Trouvez les talents saisonniers pour votre activité dans le Médoc.";
    if (userAccountType === 'professionnel') return "Présentez vos produits ou services aux acheteurs du Médoc.";
    return "Partagez vos trésors avec la communauté du Médoc !";
  };

  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
        {userAccountType === 'professionnel' ? <Briefcase className="w-8 h-8 mr-3 text-orange-500" /> : <UserIcon className="w-8 h-8 mr-3 text-orange-500" />}
        {getTitle()}
      </h1>
      <p className="text-gray-600 text-md">
        {getDescription()}
      </p>
    </div>
  );
};

export default FormHeader;