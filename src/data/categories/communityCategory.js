export const communityCategory = {
  id: 'community',
  name: 'Communauté',
  icon: '🤝',
  color: 'bg-fuchsia-100 text-fuchsia-600',
  placeholders: {
    title: 'Ex: Don de vêtements bébé 0-6 mois',
    description: 'Proposez un don, un échange, du bénévolat, ou un covoiturage. Soyez précis dans votre description.'
  },
  subCategories: [
    { 
      id: 'donations', 
      name: 'Dons', 
      icon: '🎁',
      placeholders: {
        title: 'Ex: Donne canapé d\'angle en bon état (à venir chercher)',
        description: 'Donne canapé d\'angle convertible, couleur gris. Dimensions : 240x160cm. Quelques traces d\'usure mais encore très confortable. À récupérer sur place (prévoir véhicule adapté).'
      },
      fields: [
          { name: 'itemToDonate', label: 'Objet/Service à donner', type: 'text', required: true, placeholder: 'Ex: Vêtements enfant, Meuble, Temps pour aider' },
          { name: 'condition', label: 'État (si objet)', type: 'select', options: ['Neuf', 'Bon état', 'À réparer/nettoyer'], required: false },
      ]
    },
    { 
      id: 'exchanges', 
      name: 'Échanges', 
      icon: '🔄',
      placeholders: {
        title: 'Ex: Échange légumes du jardin contre bricolage',
        description: 'Propose tomates, courgettes, salades de mon potager en échange d\'aide pour petits travaux de bricolage (peinture, étagères...).'
      },
      fields: [
          { name: 'itemOffered', label: 'Objet/Service proposé à l\'échange', type: 'text', required: true, placeholder: 'Ex: Confitures maison, Cours de guitare' },
          { name: 'itemSought', label: 'Objet/Service recherché en échange', type: 'text', required: true, placeholder: 'Ex: Légumes du jardin, Aide bricolage' },
      ]
    },
    { 
      id: 'volunteering', 
      name: 'Bénévolat', 
      icon: '🙋',
      placeholders: {
        title: 'Ex: Recherche bénévoles pour nettoyage de plage (Soulac)',
        description: 'Association locale organise une opération de nettoyage de la plage. Rejoignez-nous pour un geste citoyen ! Matériel fourni. RDV à [lieu/heure].'
      },
      fields: [
          { name: 'missionType', label: 'Type de mission/aide proposée ou recherchée', type: 'text', required: true, placeholder: 'Ex: Aide aux devoirs, Nettoyage de plage, Distribution alimentaire' },
          { name: 'organizationName', label: 'Nom de l\'association/groupe (si applicable)', type: 'text', required: false },
          { name: 'availability', label: 'Disponibilités pour le bénévolat', type: 'text', required: false, placeholder: 'Ex: Samedis matin, Quelques heures par semaine' },
      ]
    },
    { 
      id: 'carpooling', 
      name: 'Covoiturage', 
      icon: '🚗💨',
      placeholders: {
        title: 'Ex: Covoiturage Lesparre - Bordeaux tous les lundis matin',
        description: 'Propose trajet Lesparre (départ 7h) vers Bordeaux centre (arrivée 8h30) tous les lundis. 2 places disponibles. Participation aux frais souhaitée.'
      },
      fields: [
          { name: 'departurePoint', label: 'Lieu de départ', type: 'text', required: true, placeholder: 'Ex: Soulac-sur-Mer Centre' },
          { name: 'arrivalPoint', label: 'Lieu d\'arrivée', type: 'text', required: true, placeholder: 'Ex: Bordeaux Gare St Jean' },
          { name: 'travelDate', label: 'Date du trajet', type: 'date', required: true },
          { name: 'travelTime', label: 'Heure de départ (approximative)', type: 'time', required: false },
          { name: 'seatsAvailable', label: 'Nombre de places disponibles', type: 'number', required: false, placeholder: 'Ex: 2' },
          { name: 'participationCost', label: 'Participation aux frais (€) (si applicable)', type: 'number', required: false, placeholder: 'Ex: 5' },
      ]
    },
  ]
};