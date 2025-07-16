export const fashionCategory = {
  id: 'fashion',
  name: 'Mode & Vêtements',
  icon: '👕',
  color: 'bg-pink-100 text-pink-600',
  placeholders: {
    title: 'Ex: Robe d\'été fleurie taille M',
    description: 'Décrivez le vêtement : marque, taille, état, matière...'
  },
  subCategories: [
    { 
      id: 'womens-clothing', 
      name: 'Vêtements Femme', 
      icon: '👗',
      placeholders: {
        title: 'Ex: Veste en jean Levi\'s taille S',
        description: 'Veste en jean Levi\'s authentique, modèle trucker. Taille S. Très bon état, portée quelques fois. Couleur bleu brut.'
      },
      fields: [
        { name: 'itemType', label: 'Type de vêtement', type: 'text', required: true, placeholder: 'Ex: Robe, Pantalon, Pull, Manteau' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Zara, Mango' },
        { name: 'size', label: 'Taille', type: 'text', required: true, placeholder: 'Ex: M, 38, Unique' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf avec étiquettes', 'Neuf sans étiquettes', 'Très bon état (porté quelques fois)', 'Bon état', 'Satisfaisant'], required: true },
        { name: 'color', label: 'Couleur dominante', type: 'text', required: false, placeholder: 'Ex: Noir, Bleu marine' }
      ]
    },
    { 
      id: 'mens-clothing', 
      name: 'Vêtements Homme', 
      icon: '👔',
      placeholders: {
        title: 'Ex: Chemise en lin Celio taille L',
        description: 'Chemise homme en lin, idéale pour l\'été. Marque Celio, taille L. Couleur blanc cassé. Très peu portée, excellent état.'
      },
      fields: [
        { name: 'itemType', label: 'Type de vêtement', type: 'text', required: true, placeholder: 'Ex: Chemise, Jean, Veste, Costume' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Celio, Jules' },
        { name: 'size', label: 'Taille', type: 'text', required: true, placeholder: 'Ex: L, 42, M/L' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf avec étiquettes', 'Neuf sans étiquettes', 'Très bon état', 'Bon état', 'Satisfaisant'], required: true },
        { name: 'color', label: 'Couleur dominante', type: 'text', required: false, placeholder: 'Ex: Gris, Kaki' }
      ]
    },
    { 
      id: 'childrens-clothing', 
      name: 'Vêtements Enfant', 
      icon: '👶',
      placeholders: {
        title: 'Ex: Lot de bodies Petit Bateau 6 mois',
        description: 'Vends lot de 5 bodies manches longues Petit Bateau, taille 6 mois. Coton bio. Très bon état, sans taches.'
      },
      fields: [
        { name: 'itemType', label: 'Type de vêtement', type: 'text', required: true, placeholder: 'Ex: Body, Pyjama, Pantalon, Robe enfant' },
        { name: 'ageRange', label: 'Tranche d\'âge/Taille', type: 'text', required: true, placeholder: 'Ex: 3 mois, 6 ans, 116cm'},
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Petit Bateau, Okaïdi' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf avec étiquettes', 'Neuf sans étiquettes', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'shoes', 
      name: 'Chaussures', 
      icon: '👟',
      placeholders: {
        title: 'Ex: Baskets Nike Air Max taille 40',
        description: 'Vends paire de Nike Air Max, modèle 270. Pointure 40. Portées mais en bon état général. Couleur noir et blanc.'
      },
      fields: [
        { name: 'shoeType', label: 'Type de chaussures', type: 'text', required: true, placeholder: 'Ex: Baskets, Escarpins, Bottes, Sandales' },
        { name: 'gender', label: 'Pour', type: 'select', options:['Femme', 'Homme', 'Enfant (Fille)', 'Enfant (Garçon)', 'Mixte'], required: false},
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Nike, Adidas, Minelli' },
        { name: 'size', label: 'Pointure', type: 'text', required: true, placeholder: 'Ex: 39, 43, 28' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuves avec boîte', 'Neuves sans boîte', 'Très bon état', 'Bon état (portées)', 'Satisfaisant (usure visible)'], required: true },
      ]
    },
    { 
      id: 'bags-luggage', 
      name: 'Sacs & Bagages', 
      icon: '👜',
      placeholders: {
        title: 'Ex: Sac à dos Herschel Little America',
        description: 'Sac à dos Herschel en toile résistante, modèle Little America. Nombreux rangements, compartiment ordinateur. Très bon état.'
      },
      fields: [
        { name: 'itemType', label: 'Type', type: 'text', required: true, placeholder: 'Ex: Sac à main, Sac à dos, Valise, Pochette' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Longchamp, Samsonite' },
        { name: 'material', label: 'Matière', type: 'text', required: false, placeholder: 'Ex: Cuir, Toile, Synthétique'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'accessories-fashion', 
      name: 'Accessoires', 
      icon: '👒',
      placeholders: {
        title: 'Ex: Ceinture en cuir marron homme',
        description: 'Ceinture en cuir véritable, couleur marron foncé. Boucle argentée. Taille 95cm. Jamais portée.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'accessoire', type: 'text', required: true, placeholder: 'Ex: Ceinture, Foulard, Chapeau, Gants' },
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'material', label: 'Matière', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'watches-jewelry', 
      name: 'Montres & Bijoux', 
      icon: '💍',
      placeholders: {
        title: 'Ex: Montre Cluse femme bracelet maille milanaise',
        description: 'Montre Cluse dorée rose, bracelet en maille milanaise. Cadran blanc. Très élégante. Excellent état, pile neuve.'
      },
      fields: [
        { name: 'itemType', label: 'Type', type: 'select', options: ['Montre', 'Collier', 'Bracelet', 'Bague', 'Boucles d\'oreilles', 'Autre'], required: true },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Fossil, Pandora'},
        { name: 'material', label: 'Matière principale', type: 'text', required: false, placeholder: 'Ex: Argent, Or, Acier inoxydable, Cuir'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
  ]
};