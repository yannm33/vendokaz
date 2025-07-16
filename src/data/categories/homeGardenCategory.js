export const homeGardenCategory = {
  id: 'home-garden',
  name: 'Maison & Jardin',
  icon: '🏡',
  color: 'bg-yellow-100 text-yellow-600',
  placeholders: {
    title: 'Ex: Canapé d\'angle convertible gris',
    description: 'Décrivez l\'article : dimensions, état, matière, raison de la vente...'
  },
  subCategories: [
    { 
      id: 'furniture', 
      name: 'Ameublement', 
      icon: '🛋️',
      placeholders: {
        title: 'Ex: Table basse en chêne massif style industriel',
        description: 'Vends table basse robuste en chêne et métal. Dimensions : 120x60x45cm. Très bon état, quelques marques d\'usage discrètes. À venir chercher sur place.'
      },
      fields: [
        { name: 'furnitureType', label: 'Type de meuble', type: 'text', required: true, placeholder: 'Ex: Canapé, Table, Armoire, Lit' },
        { name: 'material', label: 'Matériau principal', type: 'text', required: false, placeholder: 'Ex: Bois massif, Tissu, Cuir' },
        { name: 'dimensions', label: 'Dimensions (LxlxH cm)', type: 'text', required: false, placeholder: 'Ex: 200x90x75' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état', 'À rénover/customiser'], required: true },
      ]
    },
    { 
      id: 'appliances', 
      name: 'Électroménager', 
      icon: '🔌',
      placeholders: {
        title: 'Ex: Lave-linge Bosch Serie 6, 8kg',
        description: 'Vends lave-linge Bosch en parfait état de fonctionnement. Capacité 8kg, classe A+++. Acheté il y a 2 ans. Cause déménagement.'
      },
      fields: [
        { name: 'applianceType', label: 'Type d\'appareil', type: 'text', required: true, placeholder: 'Ex: Réfrigérateur, Lave-linge, Four, Aspirateur' },
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'energyClass', label: 'Classe énergétique (si applicable)', type: 'text', required: false, placeholder: 'Ex: A++, B'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état (fonctionnel)', 'Bon état (quelques marques)', 'À réparer / Pour pièces'], required: true },
      ]
    },
    { 
      id: 'decoration', 
      name: 'Décoration', 
      icon: '🖼️',
      placeholders: {
        title: 'Ex: Grand miroir soleil en rotin vintage',
        description: 'Miroir vintage années 60 en rotin, forme soleil. Diamètre 70cm. Parfait pour une touche bohème. Très bon état.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'objet', type: 'text', required: true, placeholder: 'Ex: Cadre, Vase, Miroir, Luminaire' },
        { name: 'style', label: 'Style', type: 'text', required: false, placeholder: 'Ex: Industriel, Scandinave, Vintage'},
        { name: 'material', label: 'Matériau', type: 'text', required: false, placeholder: 'Ex: Céramique, Métal, Verre'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'tableware', 
      name: 'Arts de la table', 
      icon: '🍽️',
      placeholders: {
        title: 'Ex: Service de table en porcelaine Limoges (12 couverts)',
        description: 'Magnifique service de table ancien en porcelaine de Limoges, complet pour 12 personnes. Comprend assiettes plates, creuses, à dessert, plats de service. Excellent état.'
      },
      fields: [
        { name: 'itemType', label: 'Type', type: 'text', required: true, placeholder: 'Ex: Assiettes, Verres, Couverts, Plat de service' },
        { name: 'setPieces', label: 'Nombre de pièces (si ensemble)', type: 'number', required: false, placeholder: 'Ex: 12'},
        { name: 'material', label: 'Matériau', type: 'text', required: false, placeholder: 'Ex: Porcelaine, Grès, Inox'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état (petits éclats possibles)'], required: true },
      ]
    },
    { 
      id: 'diy', 
      name: 'Bricolage', 
      icon: '🔩',
      placeholders: {
        title: 'Ex: Perceuse-visseuse sans fil Bosch Pro',
        description: 'Vends perceuse Bosch professionnelle avec 2 batteries et chargeur. Très peu servie, en parfait état. Idéale pour tous travaux.'
      },
      fields: [
        { name: 'toolType', label: 'Type d\'outil/matériel', type: 'text', required: true, placeholder: 'Ex: Perceuse, Scie, Peinture, Vis' },
        { name: 'brand', label: 'Marque (si outil)', type: 'text', required: false, placeholder: 'Ex: Bosch, Makita'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état', 'Occasion'], required: true },
      ]
    },
    { 
      id: 'gardening', 
      name: 'Jardinage', 
      icon: '🌱',
      placeholders: {
        title: 'Ex: Tondeuse thermique Honda autotractée',
        description: 'Tondeuse Honda en bon état de fonctionnement, largeur de coupe 53cm. Idéale pour grands jardins. Révision faite récemment.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'article', type: 'text', required: true, placeholder: 'Ex: Tondeuse, Taille-haie, Plantes, Pots, Mobilier de jardin' },
        { name: 'brand', label: 'Marque (si outil)', type: 'text', required: false },
        { name: 'plantType', label: 'Type de plante (si applicable)', type: 'text', required: false, placeholder: 'Ex: Rosier, Tomate, Arbuste'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état', 'À entretenir'], required: true },
      ]
    },
    { 
      id: 'linens', 
      name: 'Linge de maison', 
      icon: '🧺',
      placeholders: {
        title: 'Ex: Parure de lit en lin lavé (240x260)',
        description: 'Vends parure de lit complète en lin lavé couleur terracotta. Comprend housse de couette et 2 taies d\'oreiller. Très bon état, peu utilisée.'
      },
      fields: [
        { name: 'itemType', label: 'Type de linge', type: 'text', required: true, placeholder: 'Ex: Draps, Serviettes, Nappes, Rideaux' },
        { name: 'material', label: 'Matière', type: 'text', required: false, placeholder: 'Ex: Coton, Lin, Microfibre'},
        { name: 'dimensions', label: 'Dimensions (si applicable)', type: 'text', required: false, placeholder: 'Ex: 240x260cm (drap)'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
  ]
};