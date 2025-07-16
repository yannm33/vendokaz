import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Star, ArrowRight, User, Briefcase, Gift, Camera, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

const PricingCard = ({ title, subtitle, price, priceSuffix, features, ctaText, ctaLink, icon, highlight, userAccountType }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleCTA = () => {
    if (userAccountType && user && user.accountType !== userAccountType) {
      // Potentially prompt user to switch account type or inform them
      // For now, just navigate
      navigate(ctaLink);
    } else if (userAccountType && !user) {
      navigate(`/auth?mode=signup&type=${userAccountType}&redirect=${ctaLink}`);
    } else {
      navigate(ctaLink);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl shadow-xl border ${highlight ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200 bg-white'} p-8 flex flex-col`}
    >
      <div className="flex items-center mb-6">
        {icon}
        <h3 className={`text-2xl font-bold ml-3 ${highlight ? 'text-orange-700' : 'text-gray-900'}`}>{title}</h3>
      </div>
      <p className={`text-sm mb-6 ${highlight ? 'text-orange-600' : 'text-gray-600'}`}>{subtitle}</p>
      
      <div className="mb-8">
        <span className={`text-5xl font-extrabold ${highlight ? 'text-orange-600' : 'text-gray-900'}`}>{price}</span>
        <span className={`text-lg font-medium ml-1 ${highlight ? 'text-orange-500' : 'text-gray-500'}`}>{priceSuffix}</span>
      </div>
      
      <ul className="space-y-3 mb-10 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${highlight ? 'text-orange-500' : 'text-green-500'}`} />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        onClick={handleCTA}
        size="lg"
        className={`w-full font-semibold ${highlight ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600' : 'btn-secondary text-orange-600 border-orange-500 border-2 hover:bg-orange-500 hover:text-white'}`}
      >
        {ctaText} <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

const PricingPage = () => {
  const { user } = useUser();
  const particulierFeatures = [
    "Jusqu'à 10 annonces gratuites par période de 60 jours (promo lancement).",
    "Standard: 5 photos par annonce gratuite.",
    "Option Premium Photos (10 photos) : +2€ (même sur annonce gratuite).",
    "Annonce supplémentaire (après quota gratuit) : 2€.",
    "Annonces Événements & Communauté : Toujours gratuites !"
  ];

  const professionnelFeatures = [
    "Publication d'annonce : 10€.",
    "Jusqu'à 15 photos par annonce.",
    "Visibilité accrue pour toucher plus de clients.",
    "Idéal pour les entreprises, artisans, et prestataires de services.",
    "Gestion simplifiée de vos annonces."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-stone-50 to-slate-100 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            Nos Offres VENDOKAZ
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez l'option qui correspond le mieux à vos besoins pour vendre et acheter dans le Médoc.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <PricingCard
            title="Pour les Particuliers"
            subtitle="Vendez ce que vous n'utilisez plus, trouvez des trésors !"
            price="Gratuit"
            priceSuffix="/ 10 annonces*"
            features={particulierFeatures}
            ctaText={user && user.accountType === 'particulier' ? "Déposer une annonce" : (user ? "Passer en Particulier" : "Créer un compte Particulier")}
            ctaLink={user && user.accountType === 'particulier' ? "/create" : "/auth?mode=signup&type=particulier&redirect=/create"}
            icon={<User className="w-10 h-10 text-orange-500" />}
            userAccountType="particulier"
          />
          <PricingCard
            title="Pour les Professionnels"
            subtitle="Boostez votre activité locale avec une visibilité optimale."
            price="10€"
            priceSuffix="/ annonce"
            features={professionnelFeatures}
            ctaText={user && user.accountType === 'professionnel' ? "Déposer une annonce Pro" : (user ? "Passer en Professionnel" : "Créer un compte Pro")}
            ctaLink={user && user.accountType === 'professionnel' ? "/create" : "/auth?mode=signup&type=professionnel&redirect=/create"}
            icon={<Briefcase className="w-10 h-10 text-red-500" />}
            highlight={true}
            userAccountType="professionnel"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pourquoi VENDOKAZ ?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-3">
              <Gift className="w-7 h-7 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700">Annonces Gratuites</h4>
                <p className="text-sm text-gray-600">Profitez de notre offre de lancement pour les particuliers.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Camera className="w-7 h-7 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700">Options Photos Avancées</h4>
                <p className="text-sm text-gray-600">Mettez en valeur vos articles avec plus de photos.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-7 h-7 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700">Focus Local Médoc</h4>
                <p className="text-sm text-gray-600">Transactions rapides et faciles près de chez vous.</p>
              </div>
            </div>
          </div>
          <Link to="/create">
            <Button size="lg" className="mt-10 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 py-4">
              Commencer à vendre maintenant
            </Button>
          </Link>
        </motion.div>
         <p className="text-center text-xs text-gray-500 mt-8">
            * L'offre de 10 annonces gratuites pour les particuliers est une promotion de lancement valable 60 jours après inscription. Voir les conditions générales pour plus de détails. Les annonces pour les Événements et la catégorie Communauté (dons, échanges, bénévolat) sont toujours gratuites pour tous.
          </p>
      </div>
    </div>
  );
};

export default PricingPage;