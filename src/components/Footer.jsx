import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, CreditCard, ShieldCheck, ExternalLink } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://static.wixstatic.com/media/a138d7_7182032073c44368bf8bcc19a5bd47c8~mv2.png";
  const { user } = useUser();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img src={logoUrl} alt="VENDOKAZ Logo" className="h-28 w-auto" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Votre marché local en ligne dans le Médoc. Achetez, vendez, et connectez-vous avec votre communauté.
            </p>
            <Link 
              to="/pricing" 
              className="inline-flex items-center text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300 py-2 px-4 border border-orange-400 hover:border-orange-300 rounded-lg group"
            >
              Voir nos tarifs
              <CreditCard className="w-4 h-4 ml-2 group-hover:animate-pulse" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="font-semibold text-gray-100 text-lg mb-5">Navigation</p>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-orange-400 transition-colors duration-300 text-sm">Accueil</Link></li>
              <li>
                 <Link 
                  to="/create" 
                  className="hover:text-orange-400 transition-colors duration-300 text-sm"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      window.location.href = '/auth?mode=login&redirect=/create';
                    }
                  }}
                >
                  Déposer une annonce
                </Link>
              </li>
              <li><Link to="/#categories-section" onClick={(e) => { e.preventDefault(); document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-orange-400 transition-colors duration-300 text-sm">Catégories</Link></li>
              <li><Link to="/pricing" className="hover:text-orange-400 transition-colors duration-300 text-sm">Nos Tarifs</Link></li>
              <li><Link to="/events-medoc" className="hover:text-orange-400 transition-colors duration-300 text-sm">Événements Médoc</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <p className="font-semibold text-gray-100 text-lg mb-5">Mon Compte</p>
            <ul className="space-y-3">
              {!user && (
                <>
                  <li><Link to="/auth?mode=login" className="hover:text-orange-400 transition-colors duration-300 text-sm">Se connecter</Link></li>
                  <li><Link to="/auth?mode=signup" className="hover:text-orange-400 transition-colors duration-300 text-sm">S'inscrire</Link></li>
                </>
              )}
              {user && (
                 <li><Link to={`/profile/${user.id}`} className="hover:text-orange-400 transition-colors duration-300 text-sm">Mon Profil</Link></li>
              )}
              <li><Link to="/favorites" className="hover:text-orange-400 transition-colors duration-300 text-sm">Mes favoris</Link></li>
              <li><Link to="/messages" className="hover:text-orange-400 transition-colors duration-300 text-sm">Mes messages</Link></li>
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div>
            <p className="font-semibold text-gray-100 text-lg mb-5">Support & Légal</p>
            <ul className="space-y-3">
              <li><Link to="/faq" className="hover:text-orange-400 transition-colors duration-300 text-sm">FAQ & Aide</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors duration-300 text-sm">Nous contacter</Link></li>
              <li><Link to="/terms" className="hover:text-orange-400 transition-colors duration-300 text-sm">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400 transition-colors duration-300 text-sm">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} VENDOKAZ. Tous droits réservés. Conçu avec <span role="img" aria-label="love" className="text-red-400">❤️</span> dans le Médoc pour le Médoc.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/hostinger" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-xs">
            <p className="font-medium text-gray-400 mb-2">Paiements sécurisés pour les options payantes via Stripe :</p>
            <div className="flex justify-center items-center space-x-3 mb-2">
              <img  alt="Visa Logo" class="h-6 opacity-80" src="https://images.unsplash.com/photo-1654714009937-acf4ffba1202" />
              <img  alt="Mastercard Logo" class="h-6 opacity-80" src="https://images.unsplash.com/photo-1611416811039-e326d73a68d3" />
              <img  alt="CB Logo" class="h-5 opacity-80" src="https://images.unsplash.com/photo-1649734929640-d0c0f79da545" />
              <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-orange-400 transition-colors">
                <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
                Stripe Secure
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>
            </div>
            <p className="mt-1">VENDOKAZ utilise Stripe pour traiter les paiements des annonces payantes et des options. Nous ne stockons aucune information de carte bancaire.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;