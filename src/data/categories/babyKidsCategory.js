export const babyKidsCategory = {
  id: 'baby-kids',
  name: 'Enfance',
  icon: '🍼',
  color: 'bg-purple-100 text-purple-600',
  placeholders: {
    title: 'Ex: Poussette Yoyo Babyzen complète',
    description: 'Décrivez l\'article pour enfant : marque, âge, état, accessoires...'
  },
  subCategories: [
    { 
      id: 'baby-clothing', 
      name: 'Vêtements Bébé', 
      icon: '👶',
      placeholders: {
        title: 'Ex: Lot de pyjamas Petit Bateau 3 mois',
        description: 'Vends lot de 5 pyjamas en coton bio, marque Petit Bateau. Taille 3 mois. Très bon état, maison non-fumeur.'
      },
      fields: [
        { name: 'itemType', label: 'Type de vêtement', type: 'text', required: true, placeholder: 'Ex: Body, Pyjama, Ensemble' },
        { name: 'size', label: 'Taille/Âge', type: 'text', required: true, placeholder: 'Ex: 3 mois, 6-9 mois, 74cm'},
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'kids-clothing', 
      name: 'Vêtements Enfants', 
      icon: '👧',
      placeholders: {
        title: 'Ex: Manteau d\'hiver Catimini fille 4 ans',
        description: 'Superbe manteau chaud Catimini pour fille, taille 4 ans. Doublé polaire, capuche amovible. Excellent état.'
      },
      fields: [
        { name: 'itemType', label: 'Type de vêtement', type: 'text', required: true, placeholder: 'Ex: T-shirt, Pantalon, Robe, Manteau' },
        { name: 'size', label: 'Taille/Âge', type: 'text', required: true, placeholder: 'Ex: 4 ans, 8-10 ans, 128cm'},
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'childcare-equipment', 
      name: 'Puériculture', 
      icon: '🍼',
      placeholders: {
        title: 'Ex: Siège auto Cybex Sirona (0-4 ans)',
        description: 'Vends siège auto pivotant Cybex Sirona, groupe 0+/1. Très sécurisé et confortable. Utilisable dos et face route. Bon état, housse lavable.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'article', type: 'text', required: true, placeholder: 'Ex: Poussette, Siège auto, Lit parapluie, Transat' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Bébé Confort, Chicco'},
        { name: 'ageRange', label: 'Âge recommandé', type: 'text', required: false, placeholder: 'Ex: Naissance à 3 ans'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'toys-early-learning', 
      name: 'Jouets & Éveil', 
      icon: '🧩',
      placeholders: {
        title: 'Ex: Cuisine en bois Janod complète',
        description: 'Vends cuisine enfant en bois marque Janod, avec nombreux accessoires (dinette, aliments). Très bon état. Idéal pour développer l\'imagination.'
      },
      fields: [
        { name: 'itemType', label: 'Type de jouet', type: 'text', required: true, placeholder: 'Ex: Jeu de construction, Peluche, Livre d\'éveil, Draisienne' },
        { name: 'ageRange', label: 'Âge recommandé', type: 'text', required: true, placeholder: 'Ex: 1-3 ans, 6 mois et +'},
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Lego Duplo, Vtech'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (emballé)', 'Très bon état (complet)', 'Bon état', 'Usagé'], required: true },
      ]
    },
    { 
      id: 'kids-furniture', 
      name: 'Mobilier Enfant', 
      icon: '🛏️',
      placeholders: {
        title: 'Ex: Lit évolutif Vertbaudet avec matelas',
        description: 'Vends lit enfant évolutif marque Vertbaudet, couleur blanc. Dimensions 70x140cm. Vendu avec matelas et sommier. Bon état général.'
      },
      fields: [
        { name: 'itemType', label: 'Type de meuble', type: 'text', required: true, placeholder: 'Ex: Lit enfant, Commode à langer, Bureau, Chaise haute' },
        { name: 'material', label: 'Matériau', type: 'text', required: false, placeholder: 'Ex: Bois, Plastique'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
  ]
};