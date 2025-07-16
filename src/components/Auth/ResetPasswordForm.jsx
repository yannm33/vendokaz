import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Key, Eye, EyeOff } from 'lucide-react';

const ResetPasswordForm = ({ handleResetPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, isLoading, errors, showPassword, setShowPassword }) => (
  <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
    <p className="mt-2 text-center text-sm text-gray-600">
      Veuillez entrer votre nouveau mot de passe.
    </p>
    <div>
      <label htmlFor="new-password" className="sr-only">Nouveau mot de passe</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <Input
          id="new-password"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`input-field pl-10 ${errors.newPassword ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
          placeholder="Nouveau mot de passe"
          disabled={isLoading}
        />
         <button 
            type="button" 
            onClick={() => setShowPassword(prev => !prev)} 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20}/> : <Eye size={20} />}
        </button>
      </div>
      {errors.newPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.newPassword}</p>}
    </div>
    <div>
      <label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <Input
          id="confirm-password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500'}`}
          placeholder="Confirmer le mot de passe"
          disabled={isLoading}
        />
      </div>
      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 px-1">{errors.confirmPassword}</p>}
    </div>
    <div className="mt-6">
      <Button type="submit" className="group relative w-full flex justify-center btn-primary text-lg py-3" disabled={isLoading}>
        {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Key className="h-5 w-5 text-orange-100 mr-2" aria-hidden="true" />Réinitialiser</>}
      </Button>
    </div>
  </form>
);

export default ResetPasswordForm;