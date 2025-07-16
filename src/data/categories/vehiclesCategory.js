export const vehiclesCategory = {
  id: 'vehicles',
  name: 'Véhicules',
  icon: '🚗',
  color: 'bg-blue-100 text-blue-600',
  placeholders: {
    title: 'Ex: Peugeot 208 Allure 2019',
    description: 'Décrivez votre véhicule : état, options, entretien, raison de la vente...'
  },
  fields: [ 
      { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Peugeot' },
      { name: 'model', label: 'Modèle', type: 'text', required: true, placeholder: 'Ex: 208' },
      { name: 'year', label: 'Année de mise en circulation', type: 'number', required: true, placeholder: 'Ex: 2019' },
  ],
  subCategories: [
    { 
      id: 'cars', 
      name: 'Voitures', 
      icon: '🚘',
      placeholders: {
        title: 'Ex: Renault Clio V TCe 100 Zen',
        description: 'Superbe Renault Clio V, parfait état, faible kilométrage. Idéale pour la ville et les trajets quotidiens. Options : GPS, climatisation, radar de recul. Carnet d\'entretien à jour.'
      },
      fields: [
        { name: 'registrationNumber', label: 'Numéro d\'immatriculation', type: 'text', required: false, placeholder: 'AA-123-AA (non public)' },
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Renault' },
        { name: 'model', label: 'Modèle', type: 'text', required: true, placeholder: 'Ex: Clio V' },
        { name: 'year', label: 'Année modèle', type: 'number', required: true, placeholder: 'Ex: 2020', min: 1900, step: 1 },
        { name: 'firstRegistrationDate', label: 'Date de première mise en circulation', type: 'date', required: true },
        { name: 'technicalInspectionEndDate', label: 'Date de fin de validité du contrôle technique', type: 'date', required: false },
        { name: 'mileage', label: 'Kilométrage', type: 'number', required: true, placeholder: 'Ex: 45000', min: 0, step: 1 },
        { name: 'fuel', label: 'Énergie', type: 'select', options: ['Essence', 'Diesel', 'Hybride', 'Hybride Rechargeable', 'Électrique', 'GPL', 'Gaz Naturel (GNV)', 'Autre'], required: true },
        { name: 'transmission', label: 'Boîte de vitesse', type: 'select', options: ['Manuelle', 'Automatique'], required: true },
        { name: 'vehicleType', label: 'Type de véhicule', type: 'select', options: ['Berline', 'Citadine', 'SUV / 4x4', 'Break', 'Monospace', 'Coupé', 'Cabriolet', 'Utilitaire léger', 'Autre'], required: false },
        { name: 'doors', label: 'Nombre de portes', type: 'select', options: ['2', '3', '4', '5', 'Plus de 5'], required: false },
        { name: 'seats', label: 'Nombre de place(s)', type: 'select', options: ['2', '3', '4', '5', '6', '7', '8', '9 et plus'], required: false },
        { name: 'fiscalHorsepower', label: 'Puissance fiscale (CV)', type: 'number', required: false, placeholder: 'Ex: 5', min: 1, step: 1 },
        { name: 'dinPower', label: 'Puissance DIN (Ch)', type: 'number', required: false, placeholder: 'Ex: 110', min: 10, step: 1 },
        { name: 'finish', label: 'Finition', type: 'text', required: false, placeholder: 'Ex: Zen, Allure, S-Line' },
        { name: 'version', label: 'Version', type: 'text', required: false, placeholder: 'Ex: TCe 100, BlueHDi 130 EAT8' },
        { name: 'licenseRequired', label: 'Permis', type: 'select', options: ['Avec permis', 'Sans permis (Voiturette)'], required: false, defaultValue: 'Avec permis' },
        { name: 'color', label: 'Couleur', type: 'text', required: false, placeholder: 'Ex: Gris Artense, Blanc Nacré' },
        { name: 'upholstery', label: 'Sellerie', type: 'text', required: false, placeholder: 'Ex: Tissu noir, Cuir beige' },
        { name: 'equipment', label: 'Équipements principaux', type: 'textarea', required: false, placeholder: 'Listez les équipements importants : GPS, Toit ouvrant, Climatisation automatique, Attelage, Jantes alu...' , rows: 4},
        { name: 'historyMaintenance', label: 'Historique et entretien', type: 'textarea', required: false, placeholder: 'Ex: Carnet d\'entretien à jour, factures disponibles, dernière révision faite le XX/XX/XXXX...', rows: 4 },
        { name: 'vehicleState', label: 'État du véhicule', type: 'select', options: ['Neuf', 'Excellent état (comme neuf)', 'Très bon état (quelques micro-rayures)', 'Bon état (usure normale)', 'État correct (défauts esthétiques / petites réparations à prévoir)', 'Pour pièces / À restaurer'], required: true },
        { name: 'critair', label: 'Crit\'Air', type: 'select', options: ['0 (Vert)', '1 (Violet)', '2 (Jaune)', '3 (Orange)', '4 (Bordeaux)', '5 (Gris)', 'Non classé', 'Non applicable'], required: false },
        { name: 'emissionClass', label: 'Classe d\'émission CO2 (si connue)', type: 'text', required: false, placeholder: 'Ex: A, B, 120g/km' },
      ]
    },
    { 
      id: 'motorcycles', 
      name: 'Motos', 
      icon: '🏍️',
      placeholders: {
        title: 'Ex: Yamaha MT-07 2020 A2',
        description: 'Yamaha MT-07 bridable A2, très bon état, peu roulé. Parfaite pour jeune permis ou motard confirmé. Options : Ligne Akrapovic, support de plaque court. Dors au garage.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Yamaha' },
        { name: 'model', label: 'Modèle', type: 'text', required: true, placeholder: 'Ex: MT-07' },
        { name: 'year', label: 'Année de mise en circulation', type: 'number', required: true, placeholder: 'Ex: 2020' },
        { name: 'mileage', label: 'Kilométrage (km)', type: 'number', required: true, placeholder: 'Ex: 15000' },
        { name: 'engineSize', label: 'Cylindrée (cm³)', type: 'number', required: false, placeholder: 'Ex: 689' },
        { name: 'condition', label: 'État général', type: 'select', options: ['Excellent', 'Très bon', 'Bon', 'Correct', 'À réparer'], required: false },
      ]
    },
    { 
      id: 'scooters', 
      name: 'Scooters', 
      icon: '🛵',
      placeholders: {
        title: 'Ex: Vespa Primavera 125cc Rouge',
        description: 'Magnifique Vespa Primavera 125, idéal pour la ville. Faible consommation, top case inclus. Quelques rayures d\'usage mais excellent état général.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Vespa' },
        { name: 'model', label: 'Modèle', type: 'text', required: true, placeholder: 'Ex: Primavera' },
        { name: 'year', label: 'Année de mise en circulation', type: 'number', required: true, placeholder: 'Ex: 2021' },
        { name: 'mileage', label: 'Kilométrage (km)', type: 'number', required: true, placeholder: 'Ex: 5000' },
        { name: 'engineSize', label: 'Cylindrée (cm³)', type: 'number', required: false, placeholder: 'Ex: 125' },
        { name: 'condition', label: 'État général', type: 'select', options: ['Excellent', 'Très bon', 'Bon', 'Correct', 'À réparer'], required: false },
      ]
    },
    { 
      id: 'bicycles', 
      name: 'Vélos', 
      icon: '🚲',
      placeholders: {
        title: 'Ex: VTT électrique Specialized Turbo Levo',
        description: 'Superbe VTT électrique Specialized, modèle Turbo Levo. Batterie longue durée, parfait pour les sentiers du Médoc. Très peu servi, comme neuf. Vendu avec chargeur et antivol.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Btwin, Specialized' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: Riverside, Rockrider' },
        { name: 'bikeType', label: 'Type de vélo', type: 'select', options: ['VTT', 'Vélo de route', 'Vélo de ville', 'VTC', 'Vélo électrique', 'BMX', 'Vélo enfant', 'Autre'], required: true },
        { name: 'frameSize', label: 'Taille du cadre', type: 'text', required: false, placeholder: 'Ex: M, L, 54cm, 26 pouces' },
        { name: 'material', label: 'Matériau du cadre', type: 'select', options: ['Aluminium', 'Carbone', 'Acier', 'Titane', 'Autre'], required: false },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'À réviser'], required: true }
      ]
    },
    { 
      id: 'utility-vehicles', 
      name: 'Utilitaires', 
      icon: '🚚',
      placeholders: {
        title: 'Ex: Renault Kangoo Utilitaire L1H1',
        description: 'Utilitaire Renault Kangoo en bon état, idéal pour artisan ou déménagement. Entretien suivi, CT OK. TVA récupérable pour les professionnels.'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Renault' },
        { name: 'model', label: 'Modèle', type: 'text', required: true, placeholder: 'Ex: Kangoo' },
        { name: 'year', label: 'Année de mise en circulation', type: 'number', required: true, placeholder: 'Ex: 2018' },
        { name: 'mileage', label: 'Kilométrage (km)', type: 'number', required: true, placeholder: 'Ex: 120000' },
        { name: 'fuel', label: 'Carburant', type: 'select', options: ['Diesel', 'Essence', 'Électrique', 'Autre'], required: true },
        { name: 'payloadCapacity', label: 'Capacité de charge (kg/m³)', type: 'text', required: false, placeholder: 'Ex: 800 kg ou 3.5 m³' },
      ]
    },
    { 
      id: 'caravaning', 
      name: 'Caravaning', 
      icon: '🚐',
      placeholders: {
        title: 'Ex: Camping-car Chausson Welcome 4 places',
        description: 'Camping-car profilé Chausson, 4 couchages, idéal pour famille. Nombreux rangements, panneau solaire, porte-vélos. Prêt à partir pour de nouvelles aventures !'
      },
      fields: [
        { name: 'brand', label: 'Marque', type: 'text', required: true, placeholder: 'Ex: Adria, Chausson' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: Coral, Welcome' },
        { name: 'year', label: 'Année', type: 'number', required: true, placeholder: 'Ex: 2017' },
        { name: 'vehicleType', label: 'Type', type: 'select', options: ['Camping-car', 'Caravane', 'Fourgon aménagé', 'Van', 'Autre'], required: true },
        { name: 'sleeps', label: 'Nombre de couchages', type: 'number', required: false, placeholder: 'Ex: 4' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Excellent état', 'Bon état', 'À rafraîchir'], required: true },
      ]
    },
    { 
      id: 'nautisme', 
      name: 'Nautisme', 
      icon: '⛵',
      placeholders: {
        title: 'Ex: Voilier Jeanneau Sun Odyssey 30i',
        description: 'Voilier habitable Jeanneau Sun Odyssey, parfait pour croisières côtières. Bien équipé, entretenu par professionnel. Place de port possible.'
      },
      fields: [
        { name: 'brand', label: 'Marque/Constructeur', type: 'text', required: true, placeholder: 'Ex: Jeanneau, Zodiac' },
        { name: 'model', label: 'Modèle', type: 'text', required: false, placeholder: 'Ex: Cap Camarat, Medline' },
        { name: 'boatType', label: 'Type d\'embarcation', type: 'select', options: ['Voilier', 'Bateau à moteur', 'Semi-rigide', 'Jet-ski', 'Kayak/Canoë', 'Paddle', 'Annexe', 'Autre'], required: true },
        { name: 'length', label: 'Longueur (m)', type: 'number', required: false, placeholder: 'Ex: 7.5' },
        { name: 'engineType', label: 'Type de moteur (si applicable)', type: 'text', required: false, placeholder: 'Ex: Hors-bord Yamaha 150CV' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'À restaurer'], required: true },
      ]
    },
    { 
      id: 'vehicle-parts', 
      name: 'Pièces & Équipement', 
      icon: '⚙️',
      placeholders: {
        title: 'Ex: 4 Pneus Michelin Pilot Sport 225/45R17',
        description: 'Vends 4 pneus Michelin en très bon état, peu usés. Idéal pour berline sportive. Dimensions exactes : 225/45 R17 91Y.'
      },
      fields: [
        { name: 'partType', label: 'Type de pièce/équipement', type: 'text', required: true, placeholder: 'Ex: Pneu, Jante, Casque, Moteur...' },
        { name: 'compatibleVehicle', label: 'Véhicule compatible (si applicable)', type: 'text', required: false, placeholder: 'Ex: Moto BMW R1200GS, Voiture Peugeot 208' },
        { name: 'brand', label: 'Marque de la pièce', type: 'text', required: false, placeholder: 'Ex: Michelin, Brembo' },
        { name: 'condition', label: 'État', type: 'select', options: ['Neuf', 'Occasion - Très bon état', 'Occasion - Bon état', 'Pour pièces'], required: true },
      ]
    },
  ]
};