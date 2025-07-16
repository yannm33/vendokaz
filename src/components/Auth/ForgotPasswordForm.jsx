import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Key } from 'lucide-react';

const ForgotPasswordForm = ({ handleForgotPasswordRequest, forgotPasswordEmail, setForgotPasswordEmail, isLoading, setShowForgotPassword }) => (
  <form className="mt-8 space-y-6" onSubmit={handleForgotPasswordRequest}>
    <p className="mt-2 text-center text-sm text-gray-600">
      Entrez votre adresse email pour recevoir un lien de réinitialisation.
    </p>
    <div>
      <label htmlFor="forgot-email" className="sr-only">Adresse email</label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <Input
          id="forgot-email"
          name="forgot-email"
          type="email"
          autoComplete="email"
          required
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
          className="input-field pl-10"
          placeholder="Adresse email"
          disabled={isLoading}
        />
      </div>
    </div>
    <div className="mt-6">
      <Button type="submit" className="group relative w-full flex justify-center btn-primary text-lg py-3" disabled={isLoading}>
        {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Key className="h-5 w-5 text-orange-100 mr-2" aria-hidden="true" />Envoyer le lien</>}
      </Button>
    </div>
    <div className="mt-4 text-center">
      <Button variant="link" onClick={() => setShowForgotPassword(false)} className="text-sm text-orange-600 hover:text-orange-500" disabled={isLoading}>
        Retour à la connexion
      </Button>
    </div>
  </form>
);

export default ForgotPasswordForm;