import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, UserPlus, Briefcase, Mail, Lock, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SignupForm = ({ handleSubmit, formData, handleInputChange, errors, showPassword, setShowPassword, isLoading, accountType, setAccountType, avatarPreview, handleAvatarFileChange }) => {

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({ title: "Image trop lourde", description: "L'avatar ne doit pas dépasser 2MB.", variant: "destructive" });
        return;
      }
      handleAvatarFileChange(file); 
    }
  };
  
  return (
   <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
    <div className="flex flex-col items-center space-y-3 mb-6">
      <img 
        src={avatarPreview || `https://avatar.vercel.sh/${formData.email || 'default'}.png?text=${formData.name ? formData.name.substring(0,2).toUpperCase() : (accountType === 'professionnel' ? 'PRO' : 'VK') }`} 
        alt="Aperçu Avatar" 
        className="w-24 h-24 rounded-full object-cover border-4 border-orange-300 bg-gray-100 shadow-md"
      />
      <label htmlFor="avatarFile" className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors">
        <UploadCloud size={18} />
        <span>Changer l'avatar</span>
        <input type="file" id="avatarFile" accept="image/*" className="hidden" onChange={onAvatarChange} disabled={isLoading} />
      </label>
    </div>
    <div>
      <label htmlFor="name" className="sr-only">{accountType === 'professionnel' ? 'Nom de l\'entreprise / Enseigne' : 'Votre nom ou pseudo'}</label>
      <div className="relative">
        {accountType === 'professionnel' ? <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" /> : <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />}
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          className={`input-field rounded-md pl-10 ${errors.name ? 'border-red-500' : ''}`}
          placeholder={accountType === 'professionnel' ? 'Nom de l\'entreprise / Enseigne' : 'Votre nom ou pseudo'}
          disabled={isLoading}
        />
      </div>
      {errors.name && <p className="text-red-500 text-xs mt-1 px-1">{errors.name}</p>}
    </div>
    <div>
      <label htmlFor="email-address" className="sr-only">Adresse email</label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className={`input-field rounded-md pl-10 ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Adresse email"
          disabled={isLoading}
        />
      </div>
      {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
    </div>
    <div className="relative">
      <label htmlFor="password" className="sr-only">Mot de passe</label>
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
        value={formData.password}
        onChange={handleInputChange}
        className={`input-field rounded-md pl-10 ${errors.password ? 'border-red-500' : ''}`}
        placeholder="Mot de passe (min. 6 caractères)"
        disabled={isLoading}
      />
      <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        disabled={isLoading}
      >
        {showPassword ? <EyeOff size={20}/> : <Eye size={20} />}
      </button>
    </div>
    {errors.password && <p className="text-red-500 text-xs mt-1 px-1">{errors.password}</p>}
    <div className="mt-4 text-center">
      <span className="text-sm text-gray-600 mr-2">Vous êtes :</span>
      <div className="inline-flex rounded-lg shadow-sm">
        <button
          onClick={() => setAccountType('particulier')}
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors
                      ${accountType === 'particulier' ? 'bg-orange-500 text-white z-10 ring-2 ring-orange-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}`}
          disabled={isLoading}
        >
          Particulier
        </button>
        <button
          onClick={() => setAccountType('professionnel')}
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors -ml-px
                      ${accountType === 'professionnel' ? 'bg-red-500 text-white z-10 ring-2 ring-red-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}`}
          disabled={isLoading}
        >
          Professionnel
        </button>
      </div>
    </div>
    <div className="mt-6">
      <Button type="submit" className="group relative w-full flex justify-center btn-primary text-lg py-3" disabled={isLoading}>
        {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><UserPlus className="h-5 w-5 text-orange-100 mr-2" aria-hidden="true" />S'inscrire</>}
      </Button>
    </div>
  </form>
  );
};
export default SignupForm;