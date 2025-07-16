export const seasonalJobsCategory = {
  id: 'seasonal-jobs',
  name: 'Emplois Saisonniers',
  icon: '💼',
  color: 'bg-cyan-100 text-cyan-700',
  placeholders: {
    title: 'Ex: Cherche serveur(se) pour saison estivale à Lacanau',
    description: 'Décrivez le poste : missions, type de contrat, durée, profil recherché, nom de l\'établissement...'
  },
  subCategories: [
    { 
      id: 'jobs-catering-hospitality', 
      name: 'Restauration & Hôtellerie', 
      icon: '🍽️',
      placeholders: {
        title: 'Ex: Cuisinier(e) expérimenté(e) pour restaurant bord de mer',
        description: 'Restaurant de plage à Carcans recherche cuisinier(e) autonome et créatif(ve) pour la saison. Expérience en gestion de poste chaud exigée. Contrat saisonnier, logement possible.'
      },
      fields: [
          { name: 'jobTitle', label: 'Intitulé du poste', type: 'text', required: true, placeholder: 'Ex: Serveur(se), Cuisinier(e)' },
          { name: 'contractType', label: 'Type de contrat', type: 'select', options: ['Saisonnier', 'CDD', 'Intérim', 'Extra', 'Autre'], required: true },
          { name: 'companyName', label: 'Nom de l\'établissement', type: 'text', required: false, placeholder: 'Ex: Restaurant Le Phare' },
          { name: 'jobDuration', label: 'Durée du contrat/mission', type: 'text', required: false, placeholder: 'Ex: 2 mois, Juillet-Août' },
          { name: 'jobStartDate', label: 'Date de début souhaitée', type: 'date', required: false },
          { name: 'experienceRequired', label: 'Expérience', type: 'select', options: ['Débutant accepté', 'Expérience souhaitée', 'Expérience exigée'], required: false },
          { name: 'salaryRange', label: 'Rémunération (indicative)', type: 'text', required: false, placeholder: 'Ex: SMIC, 12€/heure' },
      ]
    },
    { 
      id: 'jobs-harvest-vineyards', 
      name: 'Vendanges & Viticulture', 
      icon: '🍇',
      placeholders: {
        title: 'Ex: Vendangeurs(ses) pour château à Saint-Estèphe',
        description: 'Domaine viticole recherche équipe de vendangeurs motivés pour les vendanges (environ 3 semaines en septembre). Bonne condition physique requise. Possibilité de logement sur place.'
      },
      fields: [
          { name: 'jobTitle', label: 'Intitulé du poste', type: 'text', required: true, placeholder: 'Ex: Vendangeur(se), Tractoriste' },
          { name: 'contractType', label: 'Type de contrat', type: 'select', options: ['Saisonnier', 'CDD', 'Autre'], required: true },
          { name: 'companyName', label: 'Nom du domaine/château', type: 'text', required: false, placeholder: 'Ex: Château Médoc' },
          { name: 'jobDuration', label: 'Durée de la mission', type: 'text', required: false, placeholder: 'Ex: 15 jours, 3 semaines' },
          { name: 'jobStartDate', label: 'Date de début souhaitée', type: 'date', required: false },
          { name: 'experienceRequired', label: 'Expérience', type: 'select', options: ['Débutant accepté', 'Expérience souhaitée'], required: false },
      ]
    },
    { 
      id: 'jobs-animation-childcare', 
      name: 'Animation & Encadrement', 
      icon: '🤸',
      placeholders: {
        title: 'Ex: Animateur(trice) BAFA pour camping à Vendays-Montalivet',
        description: 'Camping familial recherche animateur(trice) dynamique et diplômé(e) BAFA pour club enfants (3-12 ans). Contrat saisonnier juillet-août. Anglais souhaité.'
      },
      fields: [
          { name: 'jobTitle', label: 'Intitulé du poste', type: 'text', required: true, placeholder: 'Ex: Animateur(trice) BAFA, Surveillant(e) de baignade' },
          { name: 'contractType', label: 'Type de contrat', type: 'select', options: ['Saisonnier', 'CDD', 'Vacataire', 'Autre'], required: true },
          { name: 'structureName', label: 'Nom de la structure', type: 'text', required: false, placeholder: 'Ex: Camping Les Pins, Centre de loisirs' },
          { name: 'jobDuration', label: 'Durée du contrat/mission', type: 'text', required: false, placeholder: 'Ex: Juillet et Août' },
          { name: 'diplomaRequired', label: 'Diplôme(s) requis/souhaité(s)', type: 'text', required: false, placeholder: 'Ex: BAFA, BNSSA' },
      ]
    },
    { 
      id: 'jobs-sales-commerce', 
      name: 'Vente & Commerce', 
      icon: '🛒',
      placeholders: {
        title: 'Ex: Vendeur(se) pour boutique de souvenirs à Soulac-sur-Mer',
        description: 'Boutique de souvenirs recherche vendeur(se) souriant(e) et motivé(e) pour la saison estivale. Bon contact client indispensable. CDD 2 mois.'
      },
      fields: [
          { name: 'jobTitle', label: 'Intitulé du poste', type: 'text', required: true, placeholder: 'Ex: Vendeur(se) en prêt-à-porter, Caissier(ère)' },
          { name: 'contractType', label: 'Type de contrat', type: 'select', options: ['Saisonnier', 'CDD', 'Intérim', 'Autre'], required: true },
          { name: 'shopName', label: 'Nom du magasin/commerce', type: 'text', required: false, placeholder: 'Ex: Boutique de la Plage' },
          { name: 'jobDuration', label: 'Durée du contrat/mission', type: 'text', required: false, placeholder: 'Ex: 1 mois, Saison estivale' },
          { name: 'experienceRequired', label: 'Expérience en vente', type: 'select', options: ['Non requise', 'Souhaitée', 'Exigée'], required: false },
      ]
    },
    { 
      id: 'jobs-other-seasonal', 
      name: 'Autres emplois saisonniers', 
      icon: '☀️',
      placeholders: {
        title: 'Ex: Agent d\'entretien pour camping (H/F)',
        description: 'Recherche agent d\'entretien polyvalent pour assurer la propreté des sanitaires et espaces communs d\'un camping. Contrat saisonnier, expérience appréciée.'
      },
      fields: [ 
          { name: 'jobTitle', label: 'Intitulé du poste', type: 'text', required: true, placeholder: 'Ex: Manutentionnaire, Agent d\'accueil' },
          { name: 'contractType', label: 'Type de contrat', type: 'select', options: ['Saisonnier', 'CDD', 'Intérim', 'Extra', 'Autre'], required: true },
          { name: 'companyName', label: 'Nom de l\'entreprise (si applicable)', type: 'text', required: false },
          { name: 'jobDuration', label: 'Durée du contrat/mission', type: 'text', required: false },
          { name: 'jobStartDate', label: 'Date de début souhaitée', type: 'date', required: false },
          { name: 'experienceRequired', label: 'Expérience', type: 'text', required: false, placeholder: 'Précisez si une expérience est nécessaire'},
          { name: 'salaryRange', label: 'Rémunération (indicative)', type: 'text', required: false },
      ]
    },
  ]
};