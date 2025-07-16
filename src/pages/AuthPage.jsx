import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Briefcase, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import AuthFormHeader from '@/components/Auth/AuthFormHeader';
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signupUser, loginUser, user, loading: userLoading } = useUser();
  
  const params = new URLSearchParams(location.search);
  const initialMode = params.get('mode') || 'login';
  const initialAccountType = params.get('type') || 'particulier';
  const redirectPath = params.get('redirect') || '/';

  const [mode, setMode] = useState(initialMode); 
  const [accountType, setAccountType] = useState(initialAccountType);
  const [showForgotPasswordView, setShowForgotPasswordView] = useState(initialMode === 'forgot_password');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', avatarUrl: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialMode === 'reset_password') {
      setMode('reset_password');
      setShowForgotPasswordView(false);
    } else if (initialMode === 'forgot_password') {
      setShowForgotPasswordView(true);
      setMode('forgot_password'); // ensure mode is also set
    } else {
      setShowForgotPasswordView(false);
      setMode(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    if (!userLoading && user && mode !== 'reset_password') {
      navigate(redirectPath, { replace: true });
    }
  }, [user, userLoading, navigate, redirectPath, mode]);

  useEffect(() => {
    setAccountType(initialAccountType);
  }, [initialAccountType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'avatarUrl' && !value.startsWith('data:image')) setAvatarPreview(value); 
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleAvatarFileChange = (file) => { // Expects a File object
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result); // For immediate preview in img src
      setFormData(prev => ({ ...prev, avatarUrl: reader.result })); // Store as base64 data URI
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (currentMode) => {
    const newErrors = {};
    if (currentMode !== 'reset_password') {
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L\'email est invalide';
    }
    
    if (currentMode !== 'reset_password' && currentMode !== 'forgot_password' && !formData.password) newErrors.password = 'Le mot de passe est requis';
    else if (currentMode !== 'reset_password' && currentMode !== 'forgot_password' && formData.password.length < 6) newErrors.password = 'Le mot de passe doit faire au moins 6 caractères';

    if (currentMode === 'signup') {
      if (!formData.name.trim()) newErrors.name = accountType === 'professionnel' ? 'Le nom de l\'entreprise est requis' : 'Le nom ou pseudo est requis';
      // Avatar validation is optional, if URL is provided it should be valid, file upload handles itself.
      if (formData.avatarUrl.trim() && !formData.avatarUrl.startsWith('http') && !formData.avatarUrl.startsWith('data:image')) {
         try {
             new URL(formData.avatarUrl);
         } catch (_) {
             newErrors.avatarUrl = 'L\'URL de l\'avatar n\'est pas valide.';
         }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(mode)) {
      toast({ title: "Erreurs de validation", description: "Veuillez corriger les champs.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    let result;
    if (mode === 'signup') {
      result = await signupUser(formData.name, formData.email, formData.password, formData.avatarUrl, accountType);
    } else { 
      result = await loginUser(formData.email, formData.password);
    }
    setIsLoading(false);
    if (result && !result.error) {
      toast({ title: mode === 'signup' ? "Inscription réussie !" : "Connexion réussie !", description: `Bienvenue ${result.name || result.email} !`, className: "bg-green-500 text-white" });
      navigate(redirectPath === '/' && result.account_type === 'professionnel' ? '/profile/' + result.id : redirectPath, { replace: true });
    } else {
      toast({ title: "Échec", description: result?.error || "Email ou mot de passe incorrect.", variant: "destructive" });
    }
  };
  
  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim() || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      toast({ title: "Email invalide", description: "Veuillez entrer une adresse email valide.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
      redirectTo: `${window.location.origin}/auth?mode=reset_password`, 
    });
    setIsLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email envoyé", description: "Si un compte existe pour cet email, vous recevrez un lien de réinitialisation.", className: "bg-green-500 text-white" });
      setShowForgotPasswordView(false);
      setMode('login');
      navigate('/auth?mode=login');
      setForgotPasswordEmail('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!newPassword) tempErrors.newPassword = 'Le nouveau mot de passe est requis.';
    else if (newPassword.length < 6) tempErrors.newPassword = 'Le mot de passe doit faire au moins 6 caractères.';
    if (newPassword !== confirmPassword) tempErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length > 0) {
      toast({ title: "Erreurs de validation", description: "Veuillez corriger les champs.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);

    if (error) {
      toast({ title: "Erreur de réinitialisation", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Mot de passe réinitialisé !", description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.", className: "bg-green-500 text-white" });
      setNewPassword('');
      setConfirmPassword('');
      navigate('/auth?mode=login');
      setMode('login');
    }
  };

  const toggleAuthMode = (newAuthMode = null, newAccType = null) => {
    const targetMode = newAuthMode || (mode === 'login' ? 'signup' : 'login');
    const targetType = newAccType || accountType;
    setMode(targetMode);
    setAccountType(targetType); // Set account type if provided
    setShowForgotPasswordView(false);
    setErrors({});
    setFormData(prev => ({ name: '', email: newAuthMode === 'signup' && prev.email ? prev.email : '', password: '', avatarUrl: '' }));
    setAvatarPreview('');
    navigate(`/auth?mode=${targetMode}${newAccType ? `&type=${newAccType}` : (targetMode === 'signup' ? `&type=${targetType}`: '')}`);
  };

  const renderForm = () => {
    if (mode === 'reset_password') {
      return <ResetPasswordForm handleResetPassword={handleResetPassword} newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} isLoading={isLoading} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} />;
    }
    if (showForgotPasswordView || mode === 'forgot_password') {
      return <ForgotPasswordForm handleForgotPasswordRequest={handleForgotPasswordRequest} forgotPasswordEmail={forgotPasswordEmail} setForgotPasswordEmail={setForgotPasswordEmail} isLoading={isLoading} setShowForgotPassword={(val) => { setShowForgotPasswordView(val); if(!val) {setMode('login'); navigate('/auth?mode=login');}}} />;
    }
    if (mode === 'signup') {
      return <SignupForm handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} isLoading={isLoading} accountType={accountType} setAccountType={(type) => { setAccountType(type); navigate(`/auth?mode=signup&type=${type}`); }} avatarPreview={avatarPreview} handleAvatarFileChange={handleAvatarFileChange} />;
    }
    // Default to login form
    return <LoginForm handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} isLoading={isLoading} setShowForgotPassword={(val) => {setShowForgotPasswordView(val); if(val) { setMode('forgot_password'); navigate('/auth?mode=forgot_password');}}} />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl"
      >
        <AuthFormHeader mode={showForgotPasswordView ? 'forgot_password' : mode} accountType={accountType} />
        
        {mode === 'login' && !showForgotPasswordView && (
          <div className="mt-4 text-center space-y-3">
            <Button onClick={() => toggleAuthMode('signup', 'particulier')} variant="default" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3" disabled={isLoading}>
              <Users className="w-5 h-5 mr-2"/> Créer un compte Particulier
            </Button>
            <Button onClick={() => toggleAuthMode('signup', 'professionnel')} variant="outline" size="lg" className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold py-3" disabled={isLoading}>
              <Briefcase className="w-5 h-5 mr-2"/> Créer un compte Professionnel
            </Button>
            <Button onClick={() => navigate('/pricing')} variant="link" className="text-sm text-gray-600 hover:text-orange-500" disabled={isLoading}>
              <Tag className="w-4 h-4 mr-1.5"/> Voir nos tarifs et options
            </Button>
             <div className="relative mt-2 mb-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">Ou</span>
                </div>
            </div>
          </div>
        )}
       
        {renderForm()}

        {mode === 'signup' && (
           <p className="mt-6 text-center text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button onClick={() => toggleAuthMode('login')} className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" disabled={isLoading}>
                  Connectez-vous
              </button>
          </p>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
            En continuant, vous acceptez nos <Link to="/terms" className="underline hover:text-orange-600">Conditions d'utilisation</Link> et notre <Link to="/privacy" className="underline hover:text-orange-600">Politique de confidentialité</Link>.
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;