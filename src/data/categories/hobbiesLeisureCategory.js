export const hobbiesLeisureCategory = {
  id: 'hobbies-leisure',
  name: 'Loisirs',
  icon: '🎨',
  color: 'bg-red-100 text-red-600',
  placeholders: {
    title: 'Ex: Guitare classique Yamaha C40',
    description: 'Décrivez l\'article de loisir : état, marque, particularités...'
  },
  subCategories: [
    { 
      id: 'sports-equipment', 
      name: 'Sports & Fitness', 
      icon: '⚽',
      placeholders: {
        title: 'Ex: Paire d\'haltères 10kg Décathlon',
        description: 'Vends paire d\'haltères de 10kg chacune, marque Domyos. Revêtement caoutchouc. Parfait pour musculation à domicile. Très bon état.'
      },
      fields: [
          { name: 'sportType', label: 'Type de sport', type: 'text', required: true, placeholder: 'Ex: Football, Fitness, Tennis, Vélo, Surf' },
          { name: 'itemType', label: 'Type d\'équipement', type: 'text', required: true, placeholder: 'Ex: Ballon, Haltères, Raquette, Planche de surf, Combinaison' },
          { name: 'brand', label: 'Marque', type: 'text', required: false },
          { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état'], required: true },
          { name: 'size', label: 'Taille/Dimensions (si applicable)', type: 'text', required: false, placeholder: 'Ex: M, 6\'2", 20kg'}
      ]
    },
    { 
      id: 'musical-instruments', 
      name: 'Instruments de Musique', 
      icon: '🎸',
      placeholders: {
        title: 'Ex: Piano numérique Yamaha P-45',
        description: 'Piano numérique 88 touches, modèle Yamaha P-45. Toucher lourd, son de qualité. Idéal pour débutants et confirmés. Vendu avec stand et pédale.'
      },
      fields: [
        { name: 'instrumentType', label: 'Type d\'instrument', type: 'text', required: true, placeholder: 'Ex: Guitare, Piano, Batterie, Violon' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Fender, Yamaha'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état (traces d\'usure)', 'À réviser'], required: true },
      ]
    },
    { 
      id: 'books-comics', 
      name: 'Livres & BD', 
      icon: '📚',
      placeholders: {
        title: 'Ex: Collection complète Harry Potter (Gallimard)',
        description: 'Vends l\'intégrale des 7 tomes de Harry Potter, édition Gallimard grand format. Très bon état, lus une fois.'
      },
      fields: [
        { name: 'itemType', label: 'Type', type: 'select', options:['Roman', 'BD', 'Manga', 'Livre jeunesse', 'Livre de cuisine', 'Livre d\'art', 'Autre'], required: true},
        { name: 'title', label: 'Titre', type: 'text', required: true },
        { name: 'author', label: 'Auteur', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état (lu)', 'Marques d\'usure (pages cornées, etc.)'], required: true },
      ]
    },
    { 
      id: 'games-toys', 
      name: 'Jeux & Jouets', 
      icon: '🧸',
      placeholders: {
        title: 'Ex: Jeu de société Les Aventuriers du Rail Europe',
        description: 'Jeu de plateau Les Aventuriers du Rail, version Europe. Complet et en excellent état. Idéal pour soirées jeux en famille ou entre amis.'
      },
      fields: [
        { name: 'itemType', label: 'Type de jeu/jouet', type: 'text', required: true, placeholder: 'Ex: Jeu de société, Puzzle, Peluche, Figurine' },
        { name: 'ageRange', label: 'Tranche d\'âge recommandée', type: 'text', required: false, placeholder: 'Ex: 3-6 ans, Ado, Adulte'},
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (emballé)', 'Très bon état (complet)', 'Bon état (peut manquer une pièce mineure)', 'Usagé'], required: true },
      ]
    },
    { 
      id: 'collectibles', 
      name: 'Collection', 
      icon: '🖼️',
      placeholders: {
        title: 'Ex: Collection de timbres rares de France',
        description: 'Vends album de timbres de collection, principalement France ancienne. Certaines pièces rares. À voir pour connaisseurs.'
      },
      fields: [
        { name: 'collectionType', label: 'Type de collection', type: 'text', required: true, placeholder: 'Ex: Timbres, Monnaies, Cartes postales, Figurines' },
        { name: 'era', label: 'Époque/Origine (si applicable)', type: 'text', required: false},
        { name: 'condition', label: 'État', type: 'select', options: ['Parfait état', 'Bon état', 'Avec défauts'], required: true },
      ]
    },
    { 
      id: 'creative-hobbies', 
      name: 'Loisirs Créatifs', 
      icon: '✂️',
      placeholders: {
        title: 'Ex: Lot de pelotes de laine Bergère de France',
        description: 'Vends important lot de pelotes de laine de différentes couleurs, marque Bergère de France. Idéal pour tricot ou crochet. Neuf.'
      },
      fields: [
        { name: 'itemType', label: 'Type de matériel/création', type: 'text', required: true, placeholder: 'Ex: Peinture, Perles, Tissus, Scrapbooking' },
        { name: 'brand', label: 'Marque (si matériel)', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Entamé', 'Occasion'], required: true },
      ]
    },
    { 
      id: 'camping-hiking', 
      name: 'Camping & Randonnée', 
      icon: '🏕️',
      placeholders: {
        title: 'Ex: Tente Quechua Arpenaz 3 personnes',
        description: 'Tente de camping 3 places Quechua, modèle Arpenaz. Facile à monter. Utilisée 2 fois, très bon état. Imperméable.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'équipement', type: 'text', required: true, placeholder: 'Ex: Tente, Sac de couchage, Réchaud, Sac à dos' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Quechua, The North Face'},
        { name: 'capacity', label: 'Capacité (si tente, sac à dos...)', type: 'text', required: false, placeholder: 'Ex: 2 personnes, 50L'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état (utilisé quelques fois)'], required: true },
      ]
    },
  ]
};