export const multimediaCategory = {
  id: 'multimedia',
  name: 'Multimédia',
  icon: '💻',
  color: 'bg-indigo-100 text-indigo-600',
  placeholders: {
    title: 'Ex: MacBook Air M1 comme neuf',
    description: 'Décrivez l\'appareil : état, caractéristiques, accessoires inclus...'
  },
  subCategories: [
    { 
      id: 'computers', 
      name: 'Ordinateurs', 
      icon: '🖥️',
      placeholders: {
        title: 'Ex: PC Gamer Fixe Ryzen 5 + RTX 3060',
        description: 'Vends PC de bureau assemblé, idéal pour gaming et création. Processeur AMD Ryzen 5, carte graphique Nvidia RTX 3060, 16Go RAM, SSD 1To. Fonctionne parfaitement.'
      },
      fields: [
        { name: 'computerType', label: 'Type d\'ordinateur', type: 'select', options: ['Ordinateur de bureau', 'Serveur', 'Mini PC', 'Tout-en-un'], required: true },
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Apple, Dell, HP' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: iMac, XPS' },
        { name: 'processor', label: 'Processeur', type: 'text', required: false, placeholder: 'Ex: Intel Core i5, AMD Ryzen 7'},
        { name: 'ram', label: 'Mémoire vive (RAM)', type: 'text', required: false, placeholder: 'Ex: 8Go, 16Go'},
        { name: 'storage', label: 'Stockage', type: 'text', required: false, placeholder: 'Ex: 512Go SSD, 1To HDD'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (sous blister)', 'Comme neuf', 'Très bon état', 'Bon état', 'État correct', 'Pour pièces'], required: true },
        { name: 'warranty', label: 'Garantie restante', type: 'text', required: false, placeholder: 'Ex: Oui, 6 mois'}
      ]
    },
    { 
      id: 'laptops', 
      name: 'Portables', 
      icon: '💻',
      placeholders: {
        title: 'Ex: Ordinateur Portable Dell XPS 13',
        description: 'Vends Dell XPS 13 pouces, ultraportable et performant. Core i7, 16Go RAM, 512Go SSD. Excellent état, batterie tient bien la charge. Vendu avec chargeur.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Apple, Lenovo, Asus' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: MacBook Air, ThinkPad' },
        { name: 'screenSize', label: 'Taille d\'écran (pouces)', type: 'text', required: false, placeholder: 'Ex: 13", 15.6"'},
        { name: 'processor', label: 'Processeur', type: 'text', required: false, placeholder: 'Ex: Intel Core i7, AMD Ryzen 5'},
        { name: 'ram', label: 'Mémoire vive (RAM)', type: 'text', required: false, placeholder: 'Ex: 8Go, 16Go'},
        { name: 'storage', label: 'Stockage', type: 'text', required: false, placeholder: 'Ex: 256Go SSD, 1To SSD'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (sous blister)', 'Comme neuf', 'Très bon état', 'Bon état', 'État correct', 'Pour pièces'], required: true },
        { name: 'warranty', label: 'Garantie restante', type: 'text', required: false, placeholder: 'Ex: Oui, 1 an'}
      ]
    },
    { 
      id: 'tablets', 
      name: 'Tablettes', 
      icon: '📱',
      placeholders: {
        title: 'Ex: iPad Air 4ème génération 64Go Wi-Fi',
        description: 'Tablette Apple iPad Air en parfait état, aucune rayure. Idéale pour navigation, jeux, et productivité. Vendue avec boîte et chargeur d\'origine.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Apple, Samsung, Xiaomi' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: iPad Air, Galaxy Tab S7' },
        { name: 'screenSize', label: 'Taille d\'écran (pouces)', type: 'text', required: false, placeholder: 'Ex: 10.2", 11"'},
        { name: 'storage', label: 'Stockage', type: 'text', required: false, placeholder: 'Ex: 64Go, 128Go'},
        { name: 'connectivity', label: 'Connectivité', type: 'select', options: ['Wi-Fi', 'Wi-Fi + Cellulaire (4G/5G)'], required: false},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuve (sous blister)', 'Comme neuve', 'Très bon état', 'Bon état', 'État correct', 'Pour pièces'], required: true },
      ]
    },
    { 
      id: 'phones', 
      name: 'Téléphones', 
      icon: '📞',
      placeholders: {
        title: 'Ex: iPhone 12 Pro Max 256Go Bleu Pacifique',
        description: 'Vends iPhone 12 Pro Max en excellent état, toujours protégé par coque et verre trempé. Batterie à 90%. Débloqué tout opérateur. Vendu avec boîte.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Apple, Samsung, Google' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: iPhone 13, Galaxy S21' },
        { name: 'storage', label: 'Stockage', type: 'text', required: false, placeholder: 'Ex: 128Go, 256Go'},
        { name: 'color', label: 'Couleur', type: 'text', required: false, placeholder: 'Ex: Noir, Bleu Pacifique'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (sous blister)', 'Comme neuf', 'Très bon état', 'Bon état (rayures légères)', 'Pour pièces (écran cassé, etc.)'], required: true },
        { name: 'unlocked', label: 'Débloqué tout opérateur', type: 'checkbox', required: false, defaultValue: true}
      ]
    },
    { 
      id: 'consoles-games', 
      name: 'Consoles & Jeux', 
      icon: '🎮',
      placeholders: {
        title: 'Ex: Console Nintendo Switch OLED + Zelda TOTK',
        description: 'Vends Nintendo Switch modèle OLED en parfait état, avec le jeu Zelda Tears of the Kingdom. Peu servie. Tous accessoires d\'origine inclus.'
      },
      fields: [
        { name: 'itemType', label: 'Type', type: 'select', options:['Console de salon', 'Console portable', 'Jeu vidéo', 'Accessoire console (manette, casque...)'], required: true},
        { name: 'platform', label: 'Plateforme (Console/PC)', type: 'text', required: true, placeholder: 'Ex: PS5, Xbox Series X, Nintendo Switch, PC' },
        { name: 'brand', label: 'Marque (si console/accessoire)', type: 'text', required: false, placeholder: 'Ex: Sony, Microsoft, Nintendo' },
        { name: 'gameTitle', label: 'Titre du jeu (si jeu)', type: 'text', required: false, placeholder: 'Ex: Zelda: Breath of the Wild'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (sous blister)', 'Comme neuf', 'Très bon état', 'Bon état (boîte un peu abîmée)', 'Jeu seul (sans boîte)'], required: true },
      ]
    },
    { 
      id: 'photo-video', 
      name: 'Image & Son', 
      icon: '📷',
      placeholders: {
        title: 'Ex: Appareil Photo Hybride Sony Alpha 7 III',
        description: 'Vends boîtier Sony A7 III en excellent état, capteur propre. Idéal pour photo et vidéo. Vendu avec batterie et chargeur. Objectif disponible séparément.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'appareil', type: 'select', options: ['Appareil photo (Reflex, Hybride, Compact)', 'Caméra / Caméscope', 'Objectif photo/vidéo', 'Drone', 'Casque audio', 'Enceinte', 'Microphone', 'Autre'], required: true },
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Canon, Sony, Bose' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: EOS 5D Mark IV, WH-1000XM4' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf (sous blister)', 'Comme neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'accessories-multi', 
      name: 'Accessoires', 
      icon: '🔌',
      placeholders: {
        title: 'Ex: Souris Logitech MX Master 3S',
        description: 'Vends souris ergonomique Logitech MX Master 3S, comme neuve. Utilisée quelques semaines. Parfaite pour productivité. Avec dongle USB et câble de charge.'
      },
      fields: [
        { name: 'accessoryType', label: 'Type d\'accessoire', type: 'text', required: true, placeholder: 'Ex: Chargeur, Câble, Souris, Clavier, Housse' },
        { name: 'compatibleWith', label: 'Compatible avec', type: 'text', required: false, placeholder: 'Ex: MacBook Pro, iPhone 12, PC Windows'},
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
  ]
};