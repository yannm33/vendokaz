import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthFormHeader = ({ mode, accountType }) => {
  const logoUrl = "https://static.wixstatic.com/media/a138d7_419234fb4989483a8240ac5e4bd63067~mv2.png"; 
  let title = "Authentification";

  if (mode === 'login') {
    title = "Connectez-vous";
  } else if (mode === 'signup') {
    title = `Inscription ${accountType === 'professionnel' ? 'Professionnel' : 'Particulier'}`;
  } else if (mode === 'forgot_password') {
    title = "Mot de passe oublié";
  } else if (mode === 'reset_password') {
    title = "Réinitialiser le mot de passe";
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-2xl -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 mb-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <Link to="/" className="flex justify-center mb-1">
          <img src={logoUrl} alt="VendOkaz Logo" className="h-32 w-auto filter drop-shadow-md" />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center font-poppins mt-1">{title}</h1>
      </motion.div>
    </div>
  );
};

export default AuthFormHeader;