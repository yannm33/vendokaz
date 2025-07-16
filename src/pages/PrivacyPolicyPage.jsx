import React from 'react';
import { Shield, UserCircle, Info, Mail, MapPin, FileText, Server, CalendarDays, Users, Edit, Trash2, ExternalLink, HeartHandshake as Handshake, Settings, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  const VENDOKAZ_NAME = "VENDOKAZ";
  const VENDOKAZ_LEGAL_NAME = "VENDOKAZ SAS (Exemple)";
  const VENDOKAZ_ADDRESS_LINE1 = "123 Rue du Médoc";
  const VENDOKAZ_ADDRESS_LINE2 = "33250 Pauillac, France";
  const WEBSITE_URL = "www.vendokaz-medoc.fr"; 
  
  const PolicySection = ({ icon: Icon, title, children }) => (
    <motion.section 
      className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-lg"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 flex items-center font-poppins">
        <div className="p-2 bg-orange-100 rounded-full mr-4">
          <Icon className="w-7 h-7 text-orange-600" />
        </div>
        {title}
      </h2>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="p-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full inline-block mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Shield className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl">
            Chez {VENDOKAZ_NAME}, la protection de votre vie privée et de vos données personnelles est notre priorité.
          </p>
          <p className="text-sm text-gray-500 mt-3">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-8">
          <PolicySection icon={Info} title="1. Introduction et Engagement">
            <p>
              Bienvenue sur {VENDOKAZ_NAME} (<a href={`https://${WEBSITE_URL}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">{WEBSITE_URL}</a>), votre plateforme de petites annonces dédiée à la vitalité du Médoc. Cette Politique de Confidentialité détaille avec transparence comment {VENDOKAZ_LEGAL_NAME} collecte, utilise, protège et partage vos informations personnelles lorsque vous utilisez nos services. Nous nous engageons à respecter les réglementations en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).
            </p>
          </PolicySection>

          <PolicySection icon={UserCircle} title="2. Informations Personnelles Collectées">
            <p>Nous collectons différentes informations pour vous offrir une expérience optimale :</p>
            <ul>
              <li>
                <strong>Informations d'identification et de contact :</strong> Lorsque vous créez un compte, vous nous fournissez votre nom (ou pseudo), adresse e-mail, et mot de passe. Les professionnels peuvent fournir le nom de leur entreprise. Un numéro de téléphone peut être demandé optionnellement.
              </li>
              <li>
                <strong>Contenu des annonces :</strong> Titre, description, prix, catégorie, photos, localisation (commune du Médoc, précision optionnelle), et tout champ spécifique à la catégorie.
              </li>
              <li>
                <strong>Communications :</strong> Contenu des messages échangés via notre messagerie interne sécurisée.
              </li>
              <li>
                <strong>Données de navigation :</strong> Adresse IP (anonymisée autant que possible), type de navigateur, pages visitées, durée des visites, interactions. Ces données sont collectées via des cookies et technologies similaires. Voir section 6 pour plus de détails.
              </li>
              <li>
                <strong>Informations de transaction (pour options payantes) :</strong> Si vous utilisez des options payantes, notre prestataire de paiement Stripe collecte les informations nécessaires au paiement (nous ne stockons pas vos données de carte bancaire).
              </li>
            </ul>
          </PolicySection>

          <PolicySection icon={FileText} title="3. Utilisation de Vos Données Personnelles">
            <p>Vos informations sont utilisées pour les finalités suivantes :</p>
            <ul>
              <li><strong>Fourniture du service :</strong> Création et gestion de votre compte, publication de vos annonces, mise en relation entre utilisateurs.</li>
              <li><strong>Amélioration de la plateforme :</strong> Analyse de l'utilisation pour optimiser nos fonctionnalités et l'ergonomie.</li>
              <li><strong>Communication :</strong> Vous envoyer des notifications relatives à votre compte, vos annonces, ou des informations importantes sur {VENDOKAZ_NAME}. Répondre à vos demandes via le support.</li>
              <li><strong>Sécurité :</strong> Prévenir la fraude, les abus, et assurer la sécurité de notre communauté.</li>
              <li><strong>Personnalisation :</strong> Adapter le contenu et les recommandations (par exemple, les favoris).</li>
              <li><strong>Respect des obligations légales :</strong> Répondre aux demandes des autorités compétentes si nécessaire.</li>
            </ul>
          </PolicySection>
          
          <PolicySection icon={Handshake} title="4. Partage et Divulgation de Vos Données">
            <p>Nous ne commercialisons pas vos données personnelles. Leur partage est limité aux cas suivants :</p>
             <ul>
                <li><strong>Visibilité publique :</strong> Les informations de vos annonces (titre, description, photos, prix, localisation approximative) et une partie de votre profil (nom d'utilisateur/nom d'entreprise, avatar) sont visibles par les autres utilisateurs. Votre email et téléphone complets ne sont pas publics par défaut.</li>
                <li><strong>Messagerie interne :</strong> Pour faciliter les échanges, votre nom d'utilisateur est visible par votre interlocuteur.</li>
                <li><strong>Prestataires de services :</strong> Nous faisons appel à des tiers pour l'hébergement (ex: Hostinger), l'analyse (anonymisée), et le paiement (Stripe). Ils n'ont accès qu'aux données nécessaires à leurs missions et sont soumis à des obligations de confidentialité.</li>
                <li><strong>Obligations légales et protection :</strong> Si la loi l'exige, ou pour protéger nos droits, notre sécurité, ou celle de nos utilisateurs.</li>
            </ul>
          </PolicySection>
          
           <PolicySection icon={CalendarDays} title="5. Durée de Conservation des Données">
            <p>
              Nous conservons vos données personnelles tant que votre compte est actif ou aussi longtemps que nécessaire pour fournir nos services. Les annonces sont généralement conservées 60 jours après leur publication, sauf renouvellement ou suppression par vos soins. Les données liées à des obligations légales (ex: facturation) sont conservées selon les durées légales. Vous pouvez demander la suppression de votre compte et de vos données associées (voir section 7).
            </p>
          </PolicySection>

           <PolicySection icon={Settings} title="6. Cookies et Technologies Similaires">
            <p className="mb-3">
              {VENDOKAZ_NAME} utilise des cookies pour améliorer votre expérience. Un cookie est un petit fichier texte stocké sur votre appareil.
            </p>
            <h4 className="font-semibold mb-2 text-gray-800">Types de cookies utilisés :</h4>
            <ul className="mb-3">
              <li><strong className="font-medium">Cookies essentiels :</strong> Nécessaires au fonctionnement du site (ex: maintien de votre session, sécurité). Ils ne peuvent pas être désactivés.</li>
              <li><strong className="font-medium">Cookies de préférence :</strong> Mémorisent vos choix et préférences (ex: langue, paramètres d'affichage) pour personnaliser votre visite.</li>
              <li><strong className="font-medium">Cookies de performance et d'analyse :</strong> Nous aident à comprendre comment vous utilisez le site (pages visitées, temps passé) afin d'améliorer nos services. Ces données sont généralement agrégées et anonymisées.</li>
            </ul>
            <p className="mb-3">
              Lors de votre première visite, un bandeau vous informe de l'utilisation des cookies et vous permet de gérer vos préférences pour les cookies non essentiels. Vous pouvez modifier vos choix à tout moment via les paramètres de votre navigateur ou un lien dédié sur notre site. Refuser certains cookies peut affecter votre expérience utilisateur.
            </p>
          </PolicySection>

          <PolicySection icon={UserCircle} title="7. Vos Droits et Choix (RGPD)">
            <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
            <ul className="space-y-2">
              <li><Edit className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit d'accès :</strong> Demander une copie des données que nous détenons sur vous.</li>
              <li><UserCircle className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit de rectification :</strong> Corriger des informations inexactes ou incomplètes.</li>
              <li><Trash2 className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit à l'effacement ("droit à l'oubli") :</strong> Demander la suppression de vos données dans certains cas.</li>
              <li><Shield className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit à la limitation du traitement :</strong> Restreindre l'utilisation de vos données.</li>
              <li><ExternalLink className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et couramment utilisé.</li>
              <li><Info className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données, notamment à des fins de marketing.</li>
              <li><CalendarDays className="inline w-5 h-5 mr-2 text-orange-600" /><strong>Droit de définir des directives post-mortem :</strong> Concernant la conservation, l'effacement et la communication de vos données après votre décès.</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, ou pour toute question relative à vos données, veuillez nous joindre via notre <Link to="/contact" className="text-orange-600 hover:underline">formulaire de contact</Link>. Nous pourrons vous demander de justifier votre identité.
            </p>
            <p className="mt-2">Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).</p>
          </PolicySection>
          
           <PolicySection icon={MapPin} title="8. Transferts de Données Hors UE">
            <p>
              {VENDOKAZ_NAME} est principalement destiné aux utilisateurs en France (Médoc). Nos serveurs sont situés dans l'Union Européenne. Si des transferts de données hors UE devaient s'avérer nécessaires (par exemple, via certains prestataires de services), nous nous assurerions qu'ils sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission Européenne, etc.) pour maintenir un niveau de protection adéquat de vos données.
            </p>
          </PolicySection>

          <PolicySection icon={Users} title="9. Vie Privée des Enfants">
            <p>
              Nos services ne s'adressent pas aux enfants de moins de 16 ans (ou l'âge minimum requis par la loi locale). Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants sans le consentement parental. Si vous pensez que nous avons collecté des informations sur un enfant sans consentement, veuillez nous contacter immédiatement via notre <Link to="/contact" className="text-orange-600 hover:underline">formulaire de contact</Link>.
            </p>
          </PolicySection>
          
          <PolicySection icon={Info} title="10. Modifications de cette Politique">
            <p>
              Nous pouvons actualiser cette Politique de Confidentialité périodiquement pour refléter des changements dans nos pratiques ou pour des raisons légales. La date de "Dernière mise à jour" en haut de cette page sera modifiée. En cas de changements substantiels, nous vous en informerons par une notification sur le site ou par un autre moyen approprié. Nous vous encourageons à la consulter régulièrement.
            </p>
          </PolicySection>

          <PolicySection icon={MessageSquare} title="11. Nous Contacter">
            <p>
              Pour toute question, préoccupation ou demande concernant cette Politique de Confidentialité ou la gestion de vos données personnelles par {VENDOKAZ_NAME}, veuillez utiliser notre <Link to="/contact" className="text-orange-600 hover:underline">formulaire de contact</Link>.
            </p>
            <address className="not-italic mt-3 space-y-1">
              <strong className="font-semibold">{VENDOKAZ_LEGAL_NAME}</strong><br />
              Service Protection des Données / DPO<br />
              {VENDOKAZ_ADDRESS_LINE1}<br />
              {VENDOKAZ_ADDRESS_LINE2}
            </address>
             <p className="mt-3 text-sm text-gray-500">Veuillez noter que les informations de contact spécifiques (DPO, adresse) sont des exemples et doivent être remplacées par les informations réelles de VENDOKAZ.</p>
          </PolicySection>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;