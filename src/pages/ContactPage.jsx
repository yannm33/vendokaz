import React, { useState } from 'react';
import { Mail, Send, Info, Phone, MapPin, MessageSquare, Building, UserCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const VENDOKAZ_LEGAL_NAME = "VENDOKAZ SAS (Exemple)";
  const VENDOKAZ_PHONE = "+33 5 56 00 00 00"; 
  const VENDOKAZ_ADDRESS_LINE1 = "123 Rue du Médoc";
  const VENDOKAZ_ADDRESS_LINE2 = "33250 Pauillac, France"; 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Votre nom est requis.";
    if (!formData.email.trim()) {
      newErrors.email = "Votre adresse e-mail est requise.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Le sujet de votre message est requis.";
    else if (formData.subject.trim().length < 5) newErrors.subject = "Le sujet doit contenir au moins 5 caractères.";
    if (!formData.message.trim()) newErrors.message = "Votre message ne peut pas être vide.";
    else if (formData.message.trim().length < 10) newErrors.message = "Votre message doit contenir au moins 10 caractères.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
       toast({
        title: "Erreur dans le formulaire",
        description: "Veuillez corriger les champs en surbrillance.",
        variant: "destructive",
        duration: 4000
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Formulaire de contact soumis (simulation) :", formData);
    toast({
      title: "Message envoyé avec succès !",
      description: "Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les plus brefs délais.",
      className: "bg-green-600 text-white border-green-700",
      duration: 6000,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: MessageSquare, 
      title: "Via notre formulaire (Recommandé)",
      content: <p className="text-gray-700">Le moyen le plus simple, rapide et sécurisé pour nous joindre.</p>,
      details: "Idéal pour les demandes détaillées. Réponse sous 24 à 48 heures ouvrées via ce formulaire.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-600"
    },
    {
      icon: Phone,
      title: "Par téléphone",
      content: <a href={`tel:${VENDOKAZ_PHONE.replace(/\s/g, '')}`} className="text-red-700 hover:text-red-800 hover:underline">{VENDOKAZ_PHONE}</a>,
      details: "Pour une assistance directe. Lundi - Vendredi, 9h-17h. (Numéro fictif pour exemple)",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-600"
    },
    {
      icon: MapPin,
      title: "Adresse Postale (Siège)",
      content: <p className="text-gray-700">{VENDOKAZ_ADDRESS_LINE1}<br/>{VENDOKAZ_ADDRESS_LINE2}</p>,
      details: "Pour les courriers officiels. (Adresse fictive pour exemple)",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      textColor: "text-yellow-700"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="p-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full inline-block mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Mail className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins mb-4">
            Contactez VENDOKAZ
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto">
            Une question, une suggestion, besoin d'assistance ou envie de discuter d'un partenariat ? Nous sommes à votre écoute. Utilisez notre formulaire pour une réponse rapide et efficace.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          {/* Contact Form */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white flex items-center font-poppins">
                  <MessageSquare className="w-8 h-8 mr-3" /> Envoyez-nous un message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet <span className="text-red-500">*</span></label>
                <Input 
                  type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Ex: Jean Dupont" 
                  className={`py-3 text-base rounded-lg ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500 border-gray-300'}`}
                />
                {errors.name && <p className="text-red-600 text-xs mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Adresse e-mail <span className="text-red-500">*</span></label>
                <Input 
                  type="email" name="email" id="email" value={formData.email} onChange={handleInputChange}
                  placeholder="Ex: jean.dupont@email.com"
                  className={`py-3 text-base rounded-lg ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500 border-gray-300'}`}
                />
                {errors.email && <p className="text-red-600 text-xs mt-1.5">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Sujet <span className="text-red-500">*</span></label>
                <Input 
                  type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange}
                  placeholder="Ex: Question sur une annonce"
                  className={`py-3 text-base rounded-lg ${errors.subject ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500 border-gray-300'}`}
                />
                {errors.subject && <p className="text-red-600 text-xs mt-1.5">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Votre message <span className="text-red-500">*</span></label>
                <Textarea 
                  name="message" id="message" rows={6} value={formData.message} onChange={handleInputChange}
                  placeholder="Décrivez votre demande en détail ici... Plus vous donnez d'informations, mieux nous pourrons vous aider."
                  className={`text-base rounded-lg ${errors.message ? 'border-red-500 ring-1 ring-red-500' : 'focus:ring-orange-500 border-gray-300'}`}
                />
                {errors.message && <p className="text-red-600 text-xs mt-1.5">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full btn-primary py-3.5 text-lg group" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Envoi en cours...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:translate-x-1" /> Envoyer le message</>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
             <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 flex items-center font-poppins">
                <Info className="w-8 h-8 mr-3 text-orange-500" /> Autres moyens de nous joindre
            </h2>
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className={`${method.bgColor} p-6 rounded-xl border-2 ${method.borderColor} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
                  <div className="flex items-start">
                    <IconComponent className={`w-7 h-7 ${method.textColor} mr-5 mt-1 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold text-gray-800 text-xl mb-1">{method.title}</p>
                      <div className="text-gray-700 text-base">{method.content}</div>
                      <p className="text-sm text-gray-600 mt-1.5">{method.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="mt-10 text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
              <p className="mb-2">
                <strong className="font-semibold">{VENDOKAZ_LEGAL_NAME}</strong><br/>
                {VENDOKAZ_ADDRESS_LINE1}, {VENDOKAZ_ADDRESS_LINE2}<br/>
                <Link to="/terms" className="text-orange-600 hover:underline">Conditions d'utilisation</Link> | <Link to="/privacy" className="text-orange-600 hover:underline">Politique de confidentialité</Link>
              </p>
              <p className="text-xs">
                Les informations de contact (téléphone, adresse) sont fournies à titre d'exemple et devront être remplacées par les coordonnées réelles de VENDOKAZ.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;