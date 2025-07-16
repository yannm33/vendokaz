export const rentalsVariousCategory = {
  id: 'rentals-various',
  name: 'Locations',
  icon: '📦',
  color: 'bg-orange-100 text-orange-600',
  placeholders: {
    title: 'Ex: Location remorque porte-moto week-end',
    description: 'Loue remorque porte-moto. Indiquez la durée, le prix, les conditions...'
  },
  subCategories: [
    { 
      id: 'tool-rental', 
      name: 'Location d\'outils', 
      icon: '🔩',
      placeholders: {
        title: 'Ex: Location Kärcher haute pression journée',
        description: 'Loue nettoyeur haute pression Kärcher, idéal pour terrasses, façades. Plusieurs lances disponibles. Tarif journée ou week-end. Caution demandée.'
      },
      fields: [
        { name: 'toolName', label: 'Nom de l\'outil', type: 'text', required: true, placeholder: 'Ex: Perceuse, Ponceuse, Bétonnière' },
        { name: 'brand', label: 'Marque', type: 'text', required: false },
        { name: 'rentalPeriodPrice', label: 'Prix par jour/semaine', type: 'text', required: false, placeholder: 'Ex: 20€/jour, 100€/semaine'},
        { name: 'depositRequired', label: 'Caution demandée (€)', type: 'number', required: false, placeholder: 'Ex: 50'}
      ]
    },
    { 
      id: 'equipment-rental', 
      name: 'Location de matériel', 
      icon: '🏗️',
      placeholders: {
        title: 'Ex: Location sonorisation pour soirée (enceintes + table)',
        description: 'Loue matériel de sonorisation complet pour vos événements : 2 enceintes amplifiées, table de mixage, micros. Facile à installer. Tarif week-end.'
      },
      fields: [
        { name: 'equipmentName', label: 'Nom du matériel', type: 'text', required: true, placeholder: 'Ex: Échafaudage, Remorque, Sonorisation' },
        { name: 'rentalPeriodPrice', label: 'Prix par jour/week-end', type: 'text', required: false, placeholder: 'Ex: 50€/jour'},
        { name: 'depositRequired', label: 'Caution demandée (€)', type: 'number', required: false, placeholder: 'Ex: 200'}
      ]
    },
    { 
      id: 'vehicle-rental-short', 
      name: 'Location de véhicules (courte durée)', 
      icon: '🚗',
      placeholders: {
        title: 'Ex: Location utilitaire 12m³ pour déménagement',
        description: 'Loue camionnette utilitaire de 12m³ avec hayon. Idéal pour déménagement. Permis B. Location à la journée ou demi-journée. Forfait kilométrique.'
      },
      fields: [
        { name: 'vehicleType', label: 'Type de véhicule', type: 'text', required: true, placeholder: 'Ex: Voiture citadine, Utilitaire, Vélo électrique' },
        { name: 'brandModel', label: 'Marque et Modèle', type: 'text', required: false, placeholder: 'Ex: Renault Clio, Btwin Elops'},
        { name: 'rentalPeriodPrice', label: 'Prix par jour/km', type: 'text', required: false, placeholder: 'Ex: 30€/jour + 0.20€/km'},
        { name: 'conditions', label: 'Conditions de location', type: 'text', required: false, placeholder: 'Ex: Permis B depuis 2 ans, Caution'}
      ]
    },
    { 
      id: 'party-equipment-rental', 
      name: 'Location matériel de fête', 
      icon: '🥳',
      placeholders: {
        title: 'Ex: Location tonnelle barnum 3x6m pour réception',
        description: 'Loue tonnelle de réception type barnum, dimensions 3x6m. Facile à monter. Parfait pour mariage, anniversaire, fête de famille. Tarif week-end.'
      },
      fields: [
        { name: 'equipmentName', label: 'Type de matériel', type: 'text', required: true, placeholder: 'Ex: Tonnelle, Tables, Chaises, Vaisselle, Jeux gonflables' },
        { name: 'quantityAvailable', label: 'Quantité disponible', type: 'text', required: false, placeholder: 'Ex: 10 tables, 50 chaises'},
        { name: 'rentalPeriodPrice', label: 'Prix par week-end/événement', type: 'text', required: false, placeholder: 'Ex: Forfait 150€'},
      ]
    },
  ]
};