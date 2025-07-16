import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Shield, AlertTriangle, MessageSquare, MapPin, ShoppingBag, CalendarDays, Info, Tag, Edit, Settings, CreditCard, UserCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
  const VENDOKAZ_NAME = "VENDOKAZ";
  const VENDOKAZ_LEGAL_NAME = "VENDOKAZ SAS (Exemple d'entité légale)"; 
  const VENDOKAZ_ADDRESS_LINE1 = "123 Rue du Médoc";
  const VENDOKAZ_ADDRESS_LINE2 = "33250 Pauillac, France";
  const WEBSITE_URL = "www.vendokaz-medoc.fr"; 
  const HOSTING_PROVIDER_NAME = "Hostinger International Ltd."; 
  const HOSTING_PROVIDER_ADDRESS = "61 Lordou Vironos Street, 6023 Larnaca, Chypre";

  const TermSection = ({ icon: Icon, title, children }) => (
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
            <FileText className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl">
            Bienvenue sur {VENDOKAZ_NAME} ! Veuillez lire attentivement nos CGU avant d'utiliser nos services.
          </p>
           <p className="text-sm text-gray-500 mt-3">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="space-y-8">
          <TermSection icon={Info} title="Article 1 : Définitions et Objet">
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'accès et l'utilisation du site web {VENDOKAZ_NAME} (accessible à l'adresse <a href={`https://${WEBSITE_URL}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">{WEBSITE_URL}</a>) et des services associés (ci-après "le Service"), proposés par {VENDOKAZ_LEGAL_NAME} (ci-après "l'Éditeur", "Nous").
            </p>
            <p>
              Le Service consiste en une plateforme de mise en relation permettant aux utilisateurs (ci-après "Utilisateur(s)", "Vous") de publier, consulter des petites annonces de biens et services, et d'interagir, prioritairement dans la région du Médoc (Gironde, France).
            </p>
            <p>
              L'utilisation du Service implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces CGU, vous ne devez pas utiliser le Service.
            </p>
          </TermSection>

          <TermSection icon={MapPin} title="Article 2 : Mentions Légales">
            <p>
              Le site {VENDOKAZ_NAME} est édité par : <strong className="font-semibold">{VENDOKAZ_LEGAL_NAME}</strong>.
            </p>
            <address className="not-italic my-3">
              Siège social : {VENDOKAZ_ADDRESS_LINE1}, {VENDOKAZ_ADDRESS_LINE2}<br />
              Numéro SIRET/RCS : [À compléter par l'exploitant du site]<br />
              Capital Social : [À compléter si applicable]
            </address>
            <ul className="list-none space-y-1">
              <li>Directeur de la publication : [Nom du responsable à compléter]</li>
              <li>Pour nous contacter : <Link to="/contact" className="text-orange-600 hover:underline">Contacter VENDOKAZ via notre formulaire</Link></li>
              <li>Hébergement : {HOSTING_PROVIDER_NAME}, {HOSTING_PROVIDER_ADDRESS}. Pour contacter l'hébergeur : [Lien vers la page de contact de Hostinger ou information pertinente]</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Note : Les informations entre crochets ([...]) sont des placeholders et doivent être complétées par les informations légales réelles de l'entité exploitant {VENDOKAZ_NAME}.</p>
          </TermSection>

          <TermSection icon={Users} title="Article 3 : Accès au Service et Compte Utilisateur">
            <h4 className="font-semibold text-gray-800 text-xl mb-2">3.1. Conditions d'accès</h4>
            <p>Le Service est accessible gratuitement à toute personne physique majeure et capable, ou personne morale. Certaines fonctionnalités, comme le dépôt d'annonces ou la messagerie, nécessitent la création d'un compte.</p>
            <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">3.2. Création de compte</h4>
            <p>L'Utilisateur s'engage à fournir des informations exactes, actuelles et complètes lors de son inscription et à les mettre à jour si nécessaire. Il existe deux types de comptes :</p>
            <ul>
              <li><strong className="font-semibold">Compte Particulier (<UserCircle className="inline w-5 h-5 mr-1 text-orange-500" />) :</strong> Pour les non-professionnels souhaitant vendre/échanger des biens personnels ou proposer/chercher des services occasionnels.</li>
              <li><strong className="font-semibold">Compte Professionnel (<Briefcase className="inline w-5 h-5 mr-1 text-orange-500" />) :</strong> Pour les entreprises, artisans, commerçants, associations, etc., proposant des biens ou services dans le cadre de leur activité.</li>
            </ul>
            <p>L'Utilisateur est responsable de la confidentialité de ses identifiants. L'Éditeur ne saurait être tenu responsable de toute utilisation non autorisée du compte.</p>
             <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">3.3. Suspension ou suppression de compte</h4>
             <p>L'Éditeur se réserve le droit de suspendre ou supprimer un compte, sans préavis ni indemnité, en cas de violation des présentes CGU, de fraude, ou de comportement préjudiciable.</p>
          </TermSection>

          <TermSection icon={FileText} title="Article 4 : Dépôt et Gestion des Annonces">
            <h4 className="font-semibold text-gray-800 text-xl mb-2">4.1. Contenu des annonces</h4>
            <p>L'Utilisateur est seul responsable du contenu (textes, photos, prix, etc.) des annonces qu'il publie. Il s'engage à ce que ses annonces :</p>
            <ul>
              <li>Soient conformes à la législation française et aux présentes CGU.</li>
              <li>Ne portent pas sur des biens ou services illicites, contrefaits, dangereux, ou interdits. (Une liste non exhaustive sera disponible sur le site).</li>
              <li>Ne contiennent pas d'informations fausses, trompeuses ou diffamatoires.</li>
              <li>Respectent les droits des tiers (propriété intellectuelle, droit à l'image, etc.).</li>
              <li>Soient classées dans la catégorie la plus appropriée.</li>
              <li>Comportent des photos (5 gratuites, plus en option) représentant fidèlement le bien/service.</li>
            </ul>
             <p>Les annonces pour la catégorie "Événements Médoc" doivent concerner des événements se déroulant dans la zone géographique du Médoc ou d'intérêt direct pour ses habitants.</p>
            <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">4.2. Modération</h4>
            <p>L'Éditeur se réserve le droit de modérer a priori ou a posteriori, de refuser, ou de supprimer toute annonce non conforme, sans avoir à justifier sa décision et sans que cela n'ouvre droit à une quelconque indemnité.</p>
            <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">4.3. Durée de validité et renouvellement</h4>
            <p>Les annonces sont publiées pour une durée standard (ex: 60 jours), renouvelable. Les annonces "Événements Médoc" expirent après la date de fin de l'événement. L'Utilisateur peut supprimer ses annonces à tout moment.</p>
            <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">4.4. Liens externes</h4>
            <p>L'insertion de liens hypertextes dans les annonces est généralement interdite, sauf pour le champ "Site web / Lien billetterie" dans la catégorie "Événements Médoc" et potentiellement dans des champs dédiés pour les profils professionnels. Tout lien doit être pertinent et ne pas pointer vers du contenu illicite ou concurrentiel déloyal.</p>
          </TermSection>
          
          <TermSection icon={Tag} title="Article 5 : Tarifs et Paiement">
            <p>La consultation des annonces et la création d'un compte sont gratuites.</p>
            <ul>
              <li><strong className="font-semibold">Annonces Gratuites :</strong> Les Utilisateurs Particuliers bénéficient d'un quota d'annonces gratuites (ex: 10 dans le cadre de l'offre de lancement). Les catégories "Événements Médoc", "Communauté", et "Emplois Saisonniers" sont toujours gratuites pour tous.</li>
              <li><strong className="font-semibold">Annonces Payantes :</strong> Les annonces au-delà du quota gratuit pour Particuliers, les annonces pour Professionnels (hors catégories gratuites), et certaines options de visibilité (ex: "À la une", photos supplémentaires) sont payantes.</li>
            </ul>
            <p>Les tarifs applicables sont ceux en vigueur au moment du dépôt ou de la souscription à une option, et sont clairement indiqués sur le site (voir page <Link to="/pricing" className="text-orange-600 hover:underline">"Nos Tarifs"</Link>). Les paiements sont effectués via notre prestataire sécurisé Stripe. Les conditions de remboursement sont précisées sur la page Tarifs ou au cas par cas.</p>
          </TermSection>

          <TermSection icon={Shield} title="Article 6 : Propriété Intellectuelle">
            <p>
              L'ensemble des éléments constituant le Service (structure, design, textes, images, logos, base de données, etc.) est la propriété exclusive de l'Éditeur ou de ses concédants et est protégé par les lois relatives à la propriété intellectuelle.
            </p>
            <p>
              En publiant du contenu sur le Service (textes, photos de vos annonces), Vous concédez à l'Éditeur une licence non exclusive, gratuite, mondiale, et pour la durée légale de protection des droits, d'utiliser, reproduire, représenter, modifier, adapter, publier, distribuer ce contenu sur le Service et pour sa promotion. Vous garantissez détenir tous les droits nécessaires sur ce contenu.
            </p>
          </TermSection>

          <TermSection icon={AlertTriangle} title="Article 7 : Responsabilité et Garanties">
            <h4 className="font-semibold text-gray-800 text-xl mb-2">7.1. Responsabilité de l'Éditeur</h4>
            <p>L'Éditeur met tout en œuvre pour assurer un Service fonctionnel et sécurisé, mais ne peut garantir une disponibilité ou une performance sans faille. Le Service est fourni "en l'état". L'Éditeur n'est pas responsable des interruptions, bugs, ou dommages indirects.</p>
            <p>L'Éditeur n'intervient pas dans les transactions ou relations entre Utilisateurs. Il ne garantit pas la qualité, la sécurité, la légalité des biens/services proposés, ni la véracité des annonces ou la capacité des Utilisateurs à conclure une transaction. La prudence est recommandée.</p>
            <h4 className="font-semibold text-gray-800 text-xl mt-4 mb-2">7.2. Responsabilité de l'Utilisateur</h4>
            <p>L'Utilisateur est seul responsable de l'utilisation qu'il fait du Service, du contenu qu'il publie, et des interactions qu'il a avec d'autres Utilisateurs. Il s'engage à indemniser l'Éditeur contre toute réclamation résultant de son utilisation du Service ou de la violation des CGU.</p>
          </TermSection>

           <TermSection icon={MessageSquare} title="Article 8 : Messagerie Interne">
            <p>
              Le Service inclut une messagerie interne pour faciliter la communication. Son utilisation doit être courtoise, respectueuse, et en lien avec les annonces. Tout abus (spam, harcèlement, propos illicites) est interdit et peut entraîner des sanctions. L'Éditeur peut accéder aux messages en cas de signalement ou de litige, conformément à la <Link to="/privacy" className="text-orange-600 hover:underline">Politique de Confidentialité</Link>.
            </p>
          </TermSection>

          <TermSection icon={Settings} title="Article 9 : Protection des Données Personnelles">
            <p>
              La collecte et le traitement de vos données personnelles sont régis par notre <Link to="/privacy" className="text-orange-600 hover:underline">Politique de Confidentialité</Link>, qui fait partie intégrante des présentes CGU. En utilisant le Service, vous consentez à cette collecte et à ce traitement.
            </p>
          </TermSection>
          
          <TermSection icon={Edit} title="Article 10 : Modification des CGU">
            <p>
              L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les nouvelles CGU seront publiées sur le site et entreront en vigueur immédiatement. Il est de votre responsabilité de les consulter régulièrement. L'utilisation continue du Service après modification vaut acceptation.
            </p>
          </TermSection>

          <TermSection icon={MapPin} title="Article 11 : Droit Applicable et Juridiction">
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution relèvera, à défaut de résolution amiable, de la compétence exclusive des tribunaux français compétents.
            </p>
          </TermSection>

          <TermSection icon={ShoppingBag} title="Article 12 : Dispositions Diverses">
             <p>Si une ou plusieurs stipulations des présentes CGU sont tenues pour non valides ou déclarées telles en application d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.</p>
            <p>Le fait pour l'une des parties de ne pas se prévaloir d'un manquement par l'autre partie à l'une quelconque des obligations visées dans les présentes CGU ne saurait être interprété pour l'avenir comme une renonciation à l'obligation en cause.</p>
          </TermSection>

          <TermSection icon={MessageSquare} title="Article 13 : Contact">
            <p>
              Pour toute question concernant les présentes CGU, ou pour signaler une violation, veuillez nous joindre via notre <Link to="/contact" className="text-orange-600 hover:underline">formulaire de contact</Link>.
            </p>
          </TermSection>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;