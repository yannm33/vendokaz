import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';

const LoginForm = ({ handleSubmit, formData, handleInputChange, errors, showPassword, setShowPassword, isLoading, setShowForgotPassword }) => (
  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={handleInputChange}
        className={`input-field rounded-md pl-10 ${errors.password ? 'border-red-500' : ''}`}
        placeholder="Mot de passe"
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
    <div className="flex items-center justify-end mt-4">
      <div className="text-sm">
        <button type="button" onClick={() => setShowForgotPassword(true)} className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none" disabled={isLoading}>
          Mot de passe oublié ?
        </button>
      </div>
    </div>
    <div className="mt-6">
      <Button type="submit" className="group relative w-full flex justify-center btn-primary text-lg py-3" disabled={isLoading}>
        {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><LogIn className="h-5 w-5 text-orange-100 mr-2" aria-hidden="true" />Se connecter</>}
      </Button>
    </div>
  </form>
);

export default LoginForm;