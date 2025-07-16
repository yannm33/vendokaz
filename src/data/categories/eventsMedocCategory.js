export const eventsMedocCategory = {
  id: 'events-medoc',
  name: 'Événements Médoc',
  icon: '🗓️',
  color: 'bg-rose-100 text-rose-600',
  placeholders: {
    title: 'Ex: Festival de musique "Les Estivales" à Hourtin Port',
    description: 'Annoncez votre événement : dates, lieu, programme, organisateur, tarifs...'
  },
  subCategories: [
    { 
      id: 'concerts-festivals', 
      name: 'Concerts & Festivals', 
      icon: '🎶',
      placeholders: {
        title: 'Ex: Concert de Jazz en plein air à Pauillac',
        description: 'Soirée concert de jazz avec le groupe "Médoc Swing" sur les quais de Pauillac. Ambiance conviviale, buvette sur place. Entrée libre.'
      },
      fields: [
          { name: 'eventType', label: 'Type d\'événement', type: 'select', options: ['Concert', 'Festival', 'Spectacle musical', 'Autre'], required: true },
          { name: 'artistName', label: 'Nom de l\'artiste/groupe principal', type: 'text', required: false },
          { name: 'musicGenre', label: 'Genre musical', type: 'text', required: false, placeholder: 'Ex: Rock, Jazz, Musique classique' },
          { name: 'eventDateStart', label: 'Date de début', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'eventDateEnd', label: 'Date de fin (si applicable)', type: 'date', required: false },
          { name: 'eventOrganizer', label: 'Organisateur', type: 'text', required: false },
          { name: 'eventWebsite', label: 'Site web / Billetterie', type: 'url', required: false, placeholder: 'https://example.com' },
          { name: 'eventAdmission', label: 'Entrée', type: 'select', options: ['Gratuite', 'Payante', 'Sur inscription', 'Prix libre'], required: true, defaultValue: 'Gratuite' },
      ]
    },
    { 
      id: 'markets-fairs', 
      name: 'Marchés & Foires', 
      icon: '🛍️',
      placeholders: {
        title: 'Ex: Marché nocturne artisanal de Montalivet',
        description: 'Grand marché nocturne avec artisans locaux, produits du terroir et animations musicales. Tous les mardis soirs en été. Ambiance festive garantie !'
      },
      fields: [
          { name: 'marketType', label: 'Type de marché/foire', type: 'select', options: ['Marché traditionnel', 'Marché nocturne', 'Marché de producteurs', 'Foire artisanale', 'Brocante', 'Vide-grenier', 'Autre'], required: true },
          { name: 'eventDateStart', label: 'Date de début', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure d\'ouverture', type: 'time', required: true },
          { name: 'eventDateEnd', label: 'Date de fin (si applicable)', type: 'date', required: false },
          { name: 'eventTimeEnd', label: 'Heure de fermeture (si applicable)', type: 'time', required: false },
          { name: 'frequency', label: 'Fréquence (si régulier)', type: 'text', required: false, placeholder: 'Ex: Tous les dimanches matin, Le 1er samedi du mois' },
          { name: 'eventOrganizer', label: 'Organisateur', type: 'text', required: false },
          { name: 'eventAdmission', label: 'Entrée', type: 'select', options: ['Gratuite', 'Payante (rare)', 'Autre'], required: true, defaultValue: 'Gratuite' },
      ]
    },
    { 
      id: 'sports-events', 
      name: 'Événements Sportifs', 
      icon: '🏆',
      placeholders: {
        title: 'Ex: Compétition de surf "Lacanau Pro Junior"',
        description: 'Venez assister à la compétition de surf regroupant les meilleurs jeunes talents. Spectacle garanti sur les vagues de Lacanau Océan. Accès libre.'
      },
      fields: [
          { name: 'sportType', label: 'Sport concerné', type: 'text', required: true, placeholder: 'Ex: Surf, Course à pied, Pétanque' },
          { name: 'eventType', label: 'Type d\'événement', type: 'select', options: ['Compétition', 'Démonstration', 'Tournoi', 'Initiation', 'Randonnée groupée', 'Autre'], required: true },
          { name: 'eventName', label: 'Nom de l\'événement (si spécifique)', type: 'text', required: false },
          { name: 'eventDateStart', label: 'Date', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'level', label: 'Niveau (si compétition/tournoi)', type: 'text', required: false, placeholder: 'Ex: Amateur, Professionnel, Tous niveaux' },
          { name: 'eventOrganizer', label: 'Organisateur', type: 'text', required: false },
          { name: 'eventAdmission', label: 'Participation/Entrée', type: 'select', options: ['Gratuite', 'Payante', 'Sur inscription'], required: true, defaultValue: 'Gratuite' },
      ]
    },
    { 
      id: 'cultural-events', 
      name: 'Culture & Patrimoine', 
      icon: '🏛️',
      placeholders: {
        title: 'Ex: Exposition de peinture "Lumières du Médoc" à Lesparre',
        description: 'Découvrez les œuvres d\'artistes locaux inspirés par les paysages médocains. Exposition à la salle culturelle, entrée gratuite.'
      },
      fields: [
          { name: 'eventType', label: 'Type d\'événement', type: 'select', options: ['Exposition', 'Visite guidée', 'Conférence', 'Projection', 'Spectacle', 'Autre'], required: true },
          { name: 'theme', label: 'Thème/Sujet', type: 'text', required: false },
          { name: 'eventDateStart', label: 'Date de début', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'eventDateEnd', label: 'Date de fin (si exposition/festival)', type: 'date', required: false },
          { name: 'eventOrganizer', label: 'Organisateur/Lieu', type: 'text', required: false },
          { name: 'eventAdmission', label: 'Entrée', type: 'select', options: ['Gratuite', 'Payante', 'Sur réservation'], required: true, defaultValue: 'Gratuite' },
      ]
    },
    { 
      id: 'workshops-courses', 
      name: 'Ateliers & Stages', 
      icon: '🧑‍🎨',
      placeholders: {
        title: 'Ex: Stage de poterie pour adultes (initiation)',
        description: 'Apprenez les bases du tournage et du modelage lors d\'un stage de poterie convivial. Matériel fourni. Inscription obligatoire, places limitées.'
      },
      fields: [
          { name: 'activityType', label: 'Type d\'atelier/stage', type: 'text', required: true, placeholder: 'Ex: Cuisine, Poterie, Yoga, Informatique' },
          { name: 'targetAudience', label: 'Public cible', type: 'text', required: false, placeholder: 'Ex: Adultes, Enfants, Tous publics' },
          { name: 'eventDateStart', label: 'Date de début', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'duration', label: 'Durée', type: 'text', required: false, placeholder: 'Ex: 2 heures, 1 journée, 5 jours' },
          { name: 'instructorName', label: 'Nom de l\'intervenant/structure', type: 'text', required: false },
          { name: 'eventAdmission', label: 'Tarif/Modalités', type: 'select', options: ['Payant', 'Gratuit', 'Sur inscription', 'Prix libre'], required: true, defaultValue: 'Gratuit' },
      ]
    },
    { 
      id: 'community-gatherings', 
      name: 'Rassemblements Locaux', 
      icon: '👨‍👩‍👧‍👦',
      placeholders: {
        title: 'Ex: Fête annuelle du port de Goulée',
        description: 'Grande fête populaire avec animations pour enfants, repas champêtre, bal et feu d\'artifice. Venez nombreux célébrer l\'été !'
      },
      fields: [
          { name: 'gatheringType', label: 'Type de rassemblement', type: 'text', required: true, placeholder: 'Ex: Fête de village, Repas de quartier, Bal populaire' },
          { name: 'eventDateStart', label: 'Date', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'eventOrganizer', label: 'Organisateur', type: 'text', required: false },
          { name: 'eventAdmission', label: 'Accès', type: 'select', options: ['Libre et gratuit', 'Payant', 'Sur invitation/inscription'], required: true, defaultValue: 'Libre et gratuit' },
      ]
    },
    { 
      id: 'other-events', 
      name: 'Autres Événements', 
      icon: '🌟',
      placeholders: {
        title: 'Ex: Portes ouvertes Château viticole',
        description: 'Le Château [Nom] vous ouvre ses portes pour une journée dégustation et découverte de ses installations. Visites guidées, animations. Entrée libre.'
      },
      fields: [ 
          { name: 'eventType', label: 'Type d\'événement', type: 'text', required: true },
          { name: 'eventDateStart', label: 'Date de début', type: 'date', required: true },
          { name: 'eventTimeStart', label: 'Heure de début', type: 'time', required: true },
          { name: 'eventDateEnd', label: 'Date de fin (si applicable)', type: 'date', required: false },
          { name: 'eventTimeEnd', label: 'Heure de fin (si applicable)', type: 'time', required: false },
          { name: 'eventOrganizer', label: 'Organisateur', type: 'text', required: false },
          { name: 'eventWebsite', label: 'Site web / Lien', type: 'url', required: false, placeholder: 'https://example.com' },
          { name: 'eventAdmission', label: 'Entrée/Participation', type: 'select', options: ['Gratuite', 'Payante', 'Sur inscription', 'Prix libre'], required: true, defaultValue: 'Gratuite' },
      ]
    },
  ]
};