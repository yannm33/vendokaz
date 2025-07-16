import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Heart, MessageCircle, Menu, X, User as UserIcon, LogIn, UserPlus, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useListings } from '@/contexts/ListingsContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { searchListings, filterByCategory } = useListings(); 
  const logoUrl = "https://static.wixstatic.com/media/a138d7_f1671926da474549b32ddea51a99025e~mv2.png";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchListings(searchQuery);
      navigate('/'); 
    } else {
      filterByCategory('all'); 
      navigate('/');
    }
  };
  
  const handleLogoClick = () => {
    setSearchQuery('');
    filterByCategory('all'); 
    setIsMenuOpen(false); 
    navigate('/');
  }

  const navItems = [];
  if (user) {
    navItems.push({ icon: Heart, label: 'Favoris', path: '/favorites', count: user?.favorites?.length || 0 });
    navItems.push({ icon: MessageCircle, label: 'Messages', path: '/messages', count: user?.unreadMessages || 0 });
    navItems.push({ icon: UserIcon, label: 'Profil', path: `/profile/${user.id}`, count: 0 });
  }


  return (
    <header className="bg-white text-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-3 cursor-pointer" aria-label="Page d'accueil">
            <img src={logoUrl} alt="VENDOKAZ Logo" className="h-14 w-auto" />
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans le Médoc (ex: vélo électrique, maison Soulac)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 shadow-sm"
                />
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center space-x-2 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))
            ) : (
              <>
                <Button variant="ghost" asChild className="text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                  <Link to="/auth?mode=login">
                    <LogIn className="w-4 h-4 mr-2" /> Connexion
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700">
                   <Link to="/auth?mode=signup">
                    <UserPlus className="w-4 h-4 mr-2" /> Inscription
                  </Link>
                </Button>
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-md hover:shadow-lg ml-3 px-5 py-2.5">
                  <Plus className="w-5 h-5 mr-2" />
                  Déposer une annonce
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mr-4 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 p-2">
                <DropdownMenuLabel className="font-semibold text-gray-700 px-3 py-2 text-md">Quel type d'annonce ?</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem asChild>
                  <Link 
                    to="/create?type=particulier" 
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg cursor-pointer text-base transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mr-3 text-orange-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">Annonce Particulier</span>
                      <span className="text-xs text-gray-500">Pour vendre vos objets du quotidien.</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to="/create?type=professionnel" 
                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-lg cursor-pointer text-base transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="w-5 h-5 mr-3 text-sky-500" />
                     <div className="flex flex-col">
                      <span className="font-medium">Annonce Professionnel</span>
                      <span className="text-xs text-gray-500">Pour les entreprises et services.</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-3">
                <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }} className="w-full mb-3 px-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 shadow-sm"
                    />
                  </div>
                </form>
                <div className="px-2 py-2 space-y-1">
                  {user ? (
                    navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        {item.count > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link to="/auth?mode=login" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium">
                        <LogIn className="w-5 h-5" /> <span>Connexion</span>
                      </Link>
                      <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium">
                        <UserPlus className="w-5 h-5" /> <span>Inscription</span>
                      </Link>
                    </>
                  )}
                  
                  <div className="pt-4 border-t border-gray-100 mt-3">
                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Déposer une annonce</p>
                    <Link
                      to="/create?type=particulier"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                    >
                      <UserIcon className="w-5 h-5 text-orange-500" />
                      <span>Annonce Particulier</span>
                    </Link>
                    <Link
                      to="/create?type=professionnel"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-sky-50 hover:text-sky-600 font-medium"
                    >
                      <Briefcase className="w-5 h-5 text-sky-500" />
                      <span>Annonce Professionnel</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;