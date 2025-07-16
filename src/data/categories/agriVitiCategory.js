export const agriVitiCategory = {
  id: 'agri-viti',
  name: 'Agri & Viti',
  icon: '🚜',
  color: 'bg-lime-100 text-lime-600',
  placeholders: {
    title: 'Ex: Tracteur John Deere série 5E',
    description: 'Décrivez le matériel agricole/viticole : marque, modèle, année, état...'
  },
  subCategories: [
    { 
      id: 'tractors-machinery', 
      name: 'Tracteurs & Machines', 
      icon: '🚜',
      placeholders: {
        title: 'Ex: Micro-tracteur Kubota B1600',
        description: 'Vends micro-tracteur Kubota avec rotovator. Idéal pour petites parcelles. Bon état de fonctionnement, entretien régulier.'
      },
      fields: [
        { name: 'machineType', label: 'Type de machine', type: 'text', required: true, placeholder: 'Ex: Tracteur, Moissonneuse, Pulvérisateur' },
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: John Deere, Massey Ferguson' },
        { name: 'model', label: 'Modèle', type: 'text', required: false },
        { name: 'year', label: 'Année', type: 'number', required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Occasion - Très bon état', 'Occasion - Bon état', 'Pour pièces'], required: true },
      ]
    },
    { 
      id: 'vineyard-tools', 
      name: 'Outillage Viticole', 
      icon: '🍇',
      placeholders: {
        title: 'Ex: Sécateur électrique Pellenc Vinion',
        description: 'Sécateur électrique Pellenc en très bon état, avec batterie et chargeur. Utilisé une saison. Parfait pour la taille de la vigne.'
      },
      fields: [
        { name: 'toolType', label: 'Type d\'outil', type: 'text', required: true, placeholder: 'Ex: Sécateur électrique, Rogneuse, Intercep' },
        { name: 'brand', label: 'Marque', type: 'text', required: false, placeholder: 'Ex: Pellenc, Felco'},
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Très bon état', 'Bon état'], required: true },
      ]
    },
    { 
      id: 'treatments-products', 
      name: 'Traitements & Produits', 
      icon: '🧪',
      placeholders: {
        title: 'Ex: Bouillie bordelaise bio (sac 5kg)',
        description: 'Vends sac de bouillie bordelaise non entamé, utilisable en agriculture biologique. Idéal pour traitement préventif vigne et jardin.'
      },
      fields: [
        { name: 'productType', label: 'Type de produit', type: 'text', required: true, placeholder: 'Ex: Engrais, Soufre, Bouillie bordelaise' },
        { name: 'brand', label: 'Marque/Fabricant', type: 'text', required: false },
        { name: 'packaging', label: 'Conditionnement', type: 'text', required: false, placeholder: 'Ex: Sac de 25kg, Bidon de 5L'},
        { name: 'isOrganic', label: 'Utilisable en Agriculture Biologique', type: 'checkbox', required: false}
      ]
    },
    { 
      id: 'plants-nursery', 
      name: 'Plants & Pépinière', 
      icon: '🌱',
      placeholders: {
        title: 'Ex: Plants de vigne Cabernet Sauvignon (100 pieds)',
        description: 'Vends lot de 100 pieds de vigne, cépage Cabernet Sauvignon. Prêts à planter. Bonne qualité, pépinière locale.'
      },
      fields: [
        { name: 'plantType', label: 'Type de plant/semence', type: 'text', required: true, placeholder: 'Ex: Plants de vigne, Semences de blé, Arbres fruitiers' },
        { name: 'variety', label: 'Variété/Cépage', type: 'text', required: false },
        { name: 'quantity', label: 'Quantité disponible', type: 'text', required: false, placeholder: 'Ex: 100 pieds, 500kg'},
      ]
    },
    { 
      id: 'other-agri-viti', 
      name: 'Autres Agri/Viti', 
      icon: '📦',
      placeholders: {
        title: 'Ex: Barriques chêne français (lot de 5)',
        description: 'Lot de 5 barriques en chêne français, 225L. Ayant contenu du vin rouge. Idéal pour élevage ou décoration.'
      },
      fields: [
        { name: 'itemType', label: 'Type d\'article/service', type: 'text', required: true, placeholder: 'Ex: Barriques, Piquets de vigne, Prestation de travaux' },
        { name: 'condition', label: 'État (si matériel)', type: 'select', options: ['Neuf', 'Bon état', 'Occasion'], required: false },
      ]
    },
  ]
};