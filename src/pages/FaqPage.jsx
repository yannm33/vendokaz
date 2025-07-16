import React from 'react';
import { HelpCircle, UserPlus, FilePlus, MessageSquare, Edit3, Shield, Settings, Search, CalendarDays, Link as LinkIcon, Briefcase, User, Tag as TagIcon, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FaqPage = () => {
  const faqData = [
    {
      id: 'q1',
      icon: UserPlus,
      category: "Comptes & Inscription",
      question: "Comment créer un compte sur VENDOKAZ ?",
      answer: (
        <>
          <p className="mb-3">Créer un compte sur VENDOKAZ est simple et rapide !</p>
          <ol className="list-decimal list-inside space-y-2 pl-4 mb-3">
            <li>Cliquez sur <Link to="/auth?mode=signup" className="text-orange-600 hover:underline font-medium">"S'inscrire"</Link> en haut à droite de n'importe quelle page.</li>
            <li>Choisissez si vous êtes un <strong className="font-semibold">Particulier</strong> ou un <strong className="font-semibold">Professionnel</strong>.</li>
            <li>Remplissez le formulaire avec votre nom (ou nom d'entreprise), adresse e-mail et un mot de passe sécurisé.</li>
            <li>Optionnel : Ajoutez une URL pour votre avatar ou téléchargez une image depuis votre appareil.</li>
            <li>Acceptez nos <Link to="/terms" className="text-orange-600 hover:underline">Conditions d'Utilisation</Link> et notre <Link to="/privacy" className="text-orange-600 hover:underline">Politique de Confidentialité</Link>.</li>
            <li>Cliquez sur "Créer mon compte". Voilà, vous êtes prêt à explorer VENDOKAZ !</li>
          </ol>
          <p>Une fois inscrit, vous pourrez personnaliser votre profil, déposer des annonces, et interagir avec la communauté du Médoc.</p>
        </>
      )
    },
    {
      id: 'q1_bis',
      icon: User,
      category: "Comptes & Inscription",
      question: "Quelle est la différence entre un compte Particulier et Professionnel ?",
      answer: (
        <>
          <p className="mb-3">VENDOKAZ propose deux types de comptes pour mieux répondre à vos besoins :</p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-3">
            <li>
              <strong className="font-semibold">Compte Particulier :</strong> Idéal si vous souhaitez vendre des objets personnels, proposer des petits services occasionnels, ou participer à la vie communautaire (dons, échanges, covoiturage). Vous bénéficiez d'un certain nombre d'annonces gratuites (voir <Link to="/pricing" className="text-orange-600 hover:underline">nos tarifs</Link>).
            </li>
            <li>
              <strong className="font-semibold">Compte Professionnel :</strong> Destiné aux entreprises, artisans, commerçants, associations, et prestataires de services réguliers. Ce type de compte peut offrir des fonctionnalités spécifiques, un volume d'annonces plus important, et des options de visibilité adaptées à une activité professionnelle. Consultez notre page <Link to="/pricing" className="text-orange-600 hover:underline">Tarifs</Link> pour plus de détails sur les offres professionnelles.
            </li>
          </ul>
          <p>Vous choisissez votre type de compte lors de l'inscription. Si vos besoins évoluent, contactez notre support pour discuter des possibilités.</p>
        </>
      )
    },
    {
      id: 'q2',
      icon: FilePlus,
      category: "Annonces",
      question: "Comment déposer une annonce efficace ?",
      answer: (
        <>
          <p className="mb-3">Pour maximiser vos chances, suivez ces conseils :</p>
          <ol className="list-decimal list-inside space-y-2 pl-4 mb-3">
            <li><strong className="font-semibold">Connectez-vous</strong> et cliquez sur <Link to="/create" className="text-orange-600 hover:underline font-medium">"Déposer une annonce"</Link>.</li>
            <li><strong className="font-semibold">Choisissez la bonne catégorie :</strong> Une annonce bien classée est plus facile à trouver.</li>
            <li><strong className="font-semibold">Titre percutant :</strong> Soyez précis et donnez envie (ex: "Superbe Vélo VTT Homme Scott Aspect, Très Bon État").</li>
            <li><strong className="font-semibold">Description détaillée :</strong> Donnez toutes les informations utiles (état, marque, modèle, dimensions, année, caractéristiques spécifiques, raison de la vente/prestation). Soyez honnête !</li>
            <li><strong className="font-semibold">Prix juste :</strong> Renseignez-vous sur les prix du marché. Pour les services ou événements, soyez clair sur vos tarifs ou les conditions d'entrée.</li>
            <li><strong className="font-semibold">Localisation précise (Médoc) :</strong> Sélectionnez la commune. Si besoin, précisez le lieu-dit dans la description.</li>
            <li><strong className="font-semibold">Photos de qualité :</strong> C'est crucial ! Ajoutez jusqu'à 5 photos (10 pour les annonces Premium, 15 pour les Pros). Montrez l'objet sous différents angles, à la lumière du jour. Pour les services/événements, une image d'illustration est la bienvenue.</li>
            <li><strong className="font-semibold">Champs spécifiques :</strong> Remplissez-les attentivement, ils aident au filtrage.</li>
          </ol>
          <p>Relisez bien votre annonce avant de la publier. Une annonce claire et complète inspire confiance !</p>
        </>
      )
    },
    {
      id: 'q3',
      icon: CalendarDays,
      category: "Annonces",
      question: "Comment publier un événement dans la catégorie 'Événements Médoc' ?",
      answer: (
        <>
          <p className="mb-3">Faire connaître votre événement dans le Médoc est gratuit et simple sur VENDOKAZ :</p>
          <ol className="list-decimal list-inside space-y-2 pl-4 mb-3">
            <li>Lors du dépôt de votre annonce, sélectionnez la catégorie <strong className="font-semibold">"Événements Médoc"</strong>.</li>
            <li>Choisissez la <strong className="font-semibold">sous-catégorie</strong> qui correspond le mieux (Concert, Marché, Sport, Culture, etc.).</li>
            <li>Renseignez le <strong className="font-semibold">titre de l'événement</strong>, sa <strong className="font-semibold">description</strong>, les <strong className="font-semibold">dates et heures</strong> de début et de fin.</li>
            <li>Indiquez le <strong className="font-semibold">lieu</strong> exact (commune et adresse si possible).</li>
            <li>Mentionnez l'<strong className="font-semibold">organisateur</strong> et les <strong className="font-semibold">conditions d'admission</strong> (Gratuit, Payant, Sur inscription). Si c'est payant, vous pouvez indiquer le prix.</li>
            <li>Utilisez le champ <strong className="font-semibold">"Site web / Lien billetterie"</strong> pour diriger les intéressés vers plus d'informations ou l'achat de billets.</li>
            <li>Ajoutez une <strong className="font-semibold">photo ou une affiche</strong> attractive.</li>
          </ol>
          <p>Les événements bien détaillés sont plus susceptibles d'attirer du monde. Partagez la richesse de la vie locale médocaine !</p>
        </>
      )
    },
     {
      id: 'q4',
      icon: TagIcon,
      category: "Annonces",
      question: "Quels sont les tarifs pour déposer une annonce ?",
      answer: (
        <>
          <p className="mb-3">Sur VENDOKAZ, nous souhaitons favoriser les échanges locaux. C'est pourquoi :</p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-3">
            <li><strong className="font-semibold">Pour les Particuliers :</strong> Vous bénéficiez d'un certain nombre d'annonces gratuites (actuellement 10, dans le cadre de notre offre de lancement). Les annonces au-delà de ce quota, ou pour certaines catégories spécifiques de services (comme le bien-être), peuvent avoir un coût modique (ex: 5€).</li>
            <li><strong className="font-semibold">Pour les Professionnels :</strong> Les annonces de services ou de vente par des professionnels sont généralement payantes (ex: 10€ par annonce), offrant une meilleure visibilité et des options adaptées.</li>
            <li><strong className="font-semibold">Catégories toujours gratuites :</strong> Les annonces dans les catégories "Événements Médoc", "Communauté" (dons, échanges, bénévolat, covoiturage), et "Emplois Saisonniers" sont <strong className="font-semibold">toujours gratuites</strong> pour tous les utilisateurs.</li>
            <li><strong className="font-semibold">Options de visibilité :</strong> Des options payantes peuvent être proposées pour mettre en avant votre annonce (ex: "À la une", "Remonter en tête").</li>
          </ul>
          <p>Tous les tarifs sont clairement indiqués lors du processus de dépôt de l'annonce. Consultez notre page <Link to="/pricing" className="text-orange-600 hover:underline font-medium">"Nos Tarifs"</Link> pour un résumé complet.</p>
        </>
      )
    },
    {
      id: 'q5',
      icon: Edit3,
      category: "Annonces",
      question: "Comment modifier ou supprimer mon annonce ?",
      answer: (
        <>
          <p className="mb-3">C'est très simple de gérer vos annonces :</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Connectez-vous à votre compte VENDOKAZ.</li>
            <li>Allez sur votre <Link to={true ? `/profile/${'userId'}` : "/auth?mode=login"} className="text-orange-600 hover:underline font-medium">page de profil</Link> (le lien sera adapté si vous êtes connecté).</li>
            <li>Dans la section "Mes Annonces", vous verrez la liste de toutes vos publications.</li>
            <li>À côté de chaque annonce, des icônes ou boutons vous permettront de la <strong className="font-semibold">modifier</strong> (pour corriger une erreur, ajouter une info, changer le prix) ou de la <strong className="font-semibold">supprimer</strong> (si l'article est vendu ou le service n'est plus d'actualité).</li>
          </ol>
          <p className="mt-3">Pensez à supprimer vos annonces une fois la transaction effectuée pour garder le site à jour !</p>
        </>
      )
    },
    {
      id: 'q6',
      icon: MessageSquare,
      category: "Interactions",
      question: "Comment contacter un vendeur ou un acheteur intéressé ?",
      answer: (
        <p>Pour faciliter des échanges sécurisés, VENDOKAZ intègre un système de messagerie interne. Lorsque vous consultez une annonce qui vous intéresse, cliquez sur le bouton type "Contacter le vendeur" ou "Envoyer un message". Cela ouvrira une fenêtre de discussion directement avec le vendeur. De même, si un acheteur est intéressé par l'une de vos annonces, il utilisera ce même système pour vous joindre. Vous recevrez des notifications (sur le site et potentiellement par email, selon vos préférences) pour les nouveaux messages. Consultez régulièrement votre section "Mes Messages".</p>
      )
    },
     {
      id: 'q7',
      icon: Shield,
      category: "Sécurité & Confiance",
      question: "Que faire si je vois une annonce suspecte ou un comportement abusif ?",
      answer: (
        <>
          <p className="mb-3">Votre sécurité est notre priorité. Si une annonce vous semble frauduleuse, illégale, ou si un utilisateur a un comportement inapproprié (spam, harcèlement, etc.) via la messagerie :</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong className="font-semibold">Signaler l'annonce :</strong> Sur chaque page d'annonce, cherchez un bouton ou un lien "Signaler cette annonce". Expliquez brièvement la raison de votre signalement.</li>
            <li><strong className="font-semibold">Signaler un utilisateur / Comportement :</strong> Si le problème concerne un utilisateur ou un message, contactez-nous directement via notre <Link to="/contact" className="text-orange-600 hover:underline font-medium">page de contact</Link>. Fournissez un maximum de détails (nom d'utilisateur concerné, copie des messages si possible, description précise du problème).</li>
          </ul>
          <p className="mt-3">Nous examinons tous les signalements avec attention et prenons les mesures nécessaires (suppression de l'annonce, avertissement, suspension ou bannissement du compte utilisateur). N'hésitez pas, votre vigilance contribue à la sécurité de tous.</p>
        </>
      )
    },
    {
      id: 'q8',
      icon: Search,
      category: "Annonces",
      question: "Combien de temps mon annonce reste-t-elle en ligne ?",
      answer: (
        <p>Les annonces standard (biens et services) restent généralement actives pour une durée de <strong className="font-semibold">60 jours</strong>. Avant leur expiration, vous pourrez recevoir une notification vous invitant à les renouveler si l'article est toujours disponible ou le service toujours d'actualité. Les annonces "Événements Médoc" restent en ligne jusqu'à la date de fin de l'événement spécifiée, ou pour une durée standard (ex: 60 jours) si aucune date de fin n'est fournie. Vous pouvez bien sûr supprimer vos annonces à tout moment depuis votre profil si elles ne sont plus pertinentes.</p>
      )
    },
    {
      id: 'q9',
      icon: Settings,
      category: "Annonces",
      question: "Quelles sont les règles pour les photos des annonces ?",
      answer: (
        <>
          <p className="mb-3">Des photos claires et honnêtes sont essentielles ! Voici les règles :</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong className="font-semibold">Nombre :</strong> Vous pouvez ajouter gratuitement jusqu'à 5 photos (10 en option Premium, 15 pour les Pros).</li>
            <li><strong className="font-semibold">Contenu :</strong> Elles doivent montrer l'article réel, le lieu du service, ou illustrer l'événement.</li>
            <li><strong className="font-semibold">Qualité :</strong> Claires, bien éclairées, nettes. Évitez les photos floues ou sombres.</li>
            <li><strong className="font-semibold">Originalité :</strong> Utilisez vos propres photos. Pas de photos issues d'Internet ou de catalogues sans autorisation.</li>
            <li><strong className="font-semibold">Pas d'infos perso :</strong> Ne superposez pas de numéros de téléphone, e-mails, ou logos excessifs sur les images.</li>
            <li><strong className="font-semibold">Interdictions :</strong> Photos à caractère pornographique, violent, discriminatoire, ou illégal.</li>
          </ul>
          <p className="mt-3">Des photos de qualité augmentent considérablement l'attrait de votre annonce.</p>
        </>
      )
    },
    {
      id: 'q10',
      icon: CreditCard,
      category: "Paiements & Tarifs",
      question: "Quels sont les moyens de paiement acceptés pour les options payantes ?",
      answer: (
        <p>Pour les options payantes (dépôt d'annonces au-delà du quota gratuit pour particuliers, annonces professionnelles, options de visibilité), VENDOKAZ utilise <strong className="font-semibold">Stripe</strong>, une plateforme de paiement en ligne sécurisée et reconnue. Vous pourrez payer par carte bancaire (Visa, Mastercard, CB). Toutes les transactions sont cryptées et sécurisées. Nous ne stockons jamais vos informations de carte bancaire sur nos serveurs.</p>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full inline-block mb-6 shadow-lg">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-poppins mb-4">
            Foire Aux Questions (FAQ)
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl">
            Besoin d'aide ? Trouvez ici les réponses aux questions les plus fréquemment posées par la communauté VENDOKAZ.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-5">
          {faqData.map((item) => {
            const Icon = item.icon || HelpCircle;
            return (
              <AccordionItem value={item.id} key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="hover:no-underline px-6 py-5 text-left transition-colors duration-200 ease-in-out group data-[state=open]:bg-orange-50">
                  <div className="flex items-center w-full">
                    <div className="p-2 bg-orange-100 rounded-full mr-4 group-data-[state=open]:bg-orange-500 transition-colors duration-200 ease-in-out">
                      <Icon className="w-6 h-6 text-orange-500 group-data-[state=open]:text-white transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium text-gray-500 group-data-[state=open]:text-orange-600">{item.category}</span>
                      <p className="font-semibold text-gray-800 text-lg group-hover:text-orange-600 transition-colors duration-200 ease-in-out">{item.question}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed bg-white">
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <motion.div 
          className="mt-16 text-center bg-gradient-to-r from-orange-100 via-red-100 to-yellow-100 p-8 rounded-xl shadow-lg border border-orange-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 font-poppins mb-4">
            Vous n'avez pas trouvé la réponse que vous cherchiez ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter directement pour toute question spécifique.
          </p>
          <Button asChild className="btn-primary py-3 px-8 text-base transform hover:scale-105 transition-transform duration-300">
            <Link to="/contact">
              <MessageSquare className="w-5 h-5 mr-2.5" /> Nous Contacter
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaqPage;