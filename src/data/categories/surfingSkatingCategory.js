export const surfingSkatingCategory = {
  id: 'surfing-skating',
  name: 'Sports de Glisse',
  icon: '🏄',
  color: 'bg-sky-100 text-sky-600',
  placeholders: {
    title: 'Ex: Planche de surf shortboard Al Merrick 6\'0"',
    description: 'Décrivez votre matériel de glisse : marque, dimensions, état, accessoires...'
  },
  subCategories: [
    { 
      id: 'surfboards', 
      name: 'Planches de Surf', 
      icon: '🏄‍♂️',
      placeholders: {
        title: 'Ex: Longboard NSP 9\'2" excellent état',
        description: 'Vends longboard NSP en epoxy, dimensions 9\'2". Idéal pour débuter ou pour petites vagues. Très stable et facile à la rame. Vendu avec dérives et leash.'
      },
      fields: [
          { name: 'boardType', label: 'Type de planche', type: 'select', options: ['Shortboard', 'Longboard', 'Fish', 'Evolutive', 'Mini-malibu', 'Gun', 'Mousse', 'Autre'], required: true },
          { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Al Merrick, Lost' },
          { name: 'dimensions', label: 'Dimensions (pieds/pouces ou cm)', type: 'text', required: true, placeholder: 'Ex: 6\'2" x 19" x 2 1/2"' },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuve', 'Comme neuve', 'Très bon état', 'Bon état (quelques pets)', 'Usagée (réparations à prévoir)'], required: true },
          { name: 'finsIncluded', label: 'Dérives incluses', type: 'checkbox', required: false },
      ]
    },
    { 
      id: 'bodyboards-fins', 
      name: 'Bodyboards & Palmes', 
      icon: '🌊',
      placeholders: {
        title: 'Ex: Bodyboard Pride Stereo taille 41.5',
        description: 'Vends bodyboard Pride modèle Stereo, taille 41.5 pouces. Très bon état, peu servi. Idéal pour riders intermédiaires. Vendu sans leash.'
      },
      fields: [
          { name: 'itemType', label: 'Type d\'équipement', type: 'select', options: ['Bodyboard', 'Palmes', 'Leash bodyboard', 'Housse bodyboard'], required: true },
          { name: 'brand', label: 'Marque', type: 'text', required: false },
          { name: 'size', label: 'Taille (si applicable)', type: 'text', required: false, placeholder: 'Ex: M, 42 pouces' },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'skateboards-longboards', 
      name: 'Skateboards & Longboards', 
      icon: '🛹',
      placeholders: {
        title: 'Ex: Longboard Loaded Tan Tien complet',
        description: 'Vends longboard Loaded Tan Tien, flex 2. Trucks Paris, roues Orangatang. Parfait pour carving et dancing. Bon état général, quelques rayures d\'usage.'
      },
      fields: [
          { name: 'boardType', label: 'Type', type: 'select', options: ['Skateboard', 'Longboard', 'Cruiser', 'Surfskate'], required: true },
          { name: 'brand', label: 'Marque', type: 'text', required: false },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état', 'Usagé'], required: true },
      ]
    },
    { 
      id: 'wetsuits-accessories', 
      name: 'Combinaisons & Accessoires', 
      icon: '🧤',
      placeholders: {
        title: 'Ex: Combinaison Rip Curl E-Bomb 4/3mm taille L',
        description: 'Vends combinaison intégrale Rip Curl E-Bomb, épaisseur 4/3mm, taille L homme. Très souple et chaude. Bon état, quelques traces de wax.'
      },
      fields: [
          { name: 'itemType', label: 'Type', type: 'select', options: ['Combinaison intégrale', 'Shorty', 'Top néoprène', 'Chaussons', 'Gants', 'Cagoule', 'Poncho', 'Autre accessoire'], required: true },
          { name: 'brand', label: 'Marque', type: 'text', required: false },
          { name: 'thickness', label: 'Épaisseur (mm) (pour combinaisons)', type: 'text', required: false, placeholder: 'Ex: 3/2mm, 4/3mm, 5/4/3mm' },
          { name: 'size', label: 'Taille', type: 'text', required: true, placeholder: 'Ex: M, L, S Homme, MT Femme' },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état (petits accrocs possibles)'], required: true },
      ]
    },
    { 
      id: 'stand-up-paddle', 
      name: 'Stand Up Paddle', 
      icon: '🛶',
      placeholders: {
        title: 'Ex: Paddle gonflable Red Paddle Co Ride 10\'6"',
        description: 'Vends SUP gonflable Red Paddle Co, modèle Ride 10\'6". Très stable et polyvalent. Excellent état, vendu avec sac de transport, pompe, pagaie et leash.'
      },
      fields: [
          { name: 'boardType', label: 'Type de SUP', type: 'select', options: ['Gonflable', 'Rigide', 'Race', 'Touring', 'Surf', 'Autre'], required: true },
          { name: 'brand', label: 'Marque', type: 'text', required: false },
          { name: 'dimensions', label: 'Dimensions (pieds/pouces ou cm)', type: 'text', required: false, placeholder: 'Ex: 10\'6" x 32"' },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
          { name: 'accessoriesIncluded', label: 'Accessoires inclus', type: 'text', required: false, placeholder: 'Ex: Pagaie, Leash, Pompe, Sac' }
      ]
    },
    { 
      id: 'lessons-schools', 
      name: 'Cours & Écoles', 
      icon: '🧑‍🏫',
      placeholders: {
        title: 'Ex: Cours de surf débutant à Hourtin Plage',
        description: 'École de surf propose cours pour débutants et intermédiaires. Matériel fourni. Moniteurs diplômés. Ambiance conviviale garantie !'
      },
      fields: [
          { name: 'serviceType', label: 'Type de cours/service', type: 'select', options: ['Cours de surf', 'Cours de skate', 'Location matériel glisse', 'Stage de surf', 'Autre'], required: true },
          { name: 'schoolName', label: 'Nom de l\'école/moniteur', type: 'text', required: false },
          { name: 'level', label: 'Niveau(x) proposé(s)', type: 'text', required: false, placeholder: 'Ex: Débutant, Intermédiaire, Perfectionnement' },
          { name: 'duration', label: 'Durée type d\'un cours/stage', type: 'text', required: false, placeholder: 'Ex: 1h30, 5 jours' }
      ]
    },
  ]
};