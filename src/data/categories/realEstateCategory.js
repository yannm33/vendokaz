export const realEstateCategory = {
  id: 'real-estate',
  name: 'Immobilier',
  icon: '🏠',
  color: 'bg-green-100 text-green-600',
  placeholders: {
    title: 'Ex: Maison T4 avec jardin à Lesparre',
    description: 'Décrivez le bien immobilier : surface, nombre de pièces, atouts, quartier...'
  },
  subCategories: [
    { 
      id: 'rentals', 
      name: 'Locations', 
      icon: '🔑',
      placeholders: {
        title: 'Ex: Appartement T3 lumineux à louer Soulac',
        description: 'Bel appartement T3 de 65m² à louer, proche centre et plage. Cuisine équipée, balcon, parking. Disponible immédiatement. Loyer CC.'
      },
      fields: [
        { name: 'propertyType', label: 'Type de bien', type: 'select', options: ['Maison', 'Appartement', 'Studio', 'Chambre', 'Local commercial', 'Parking/Box', 'Autre'], required: true },
        { name: 'surface', label: 'Surface habitable (m²)', type: 'number', required: true, placeholder: 'Ex: 120' },
        { name: 'rooms', label: 'Nombre de pièces', type: 'number', required: true, placeholder: 'Ex: 5' },
        { name: 'bedrooms', label: 'Nombre de chambres', type: 'number', required: false, placeholder: 'Ex: 3' },
        { name: 'furnished', label: 'Meublé', type: 'select', options: ['Oui', 'Non', 'Partiellement'], required: false},
        { name: 'energyClass', label: 'Classe énergie (DPE)', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non requis', 'Non applicable'], required: false },
        { name: 'ges', label: 'Émissions GES', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non requis', 'Non applicable'], required: false }
      ]
    },
    { 
      id: 'sales', 
      name: 'Ventes', 
      icon: '💰',
      placeholders: {
        title: 'Ex: Charmante maison médocaine à vendre Hourtin',
        description: 'Vends maison de caractère avec jardin arboré, proche lac. 3 chambres, grand séjour, cheminée. Idéal résidence principale ou secondaire.'
      },
      fields: [
        { name: 'propertyType', label: 'Type de bien', type: 'select', options: ['Maison', 'Appartement', 'Terrain', 'Local commercial', 'Parking/Box', 'Autre'], required: true },
        { name: 'surface', label: 'Surface habitable (m²)', type: 'number', required: true, placeholder: 'Ex: 120' },
        { name: 'rooms', label: 'Nombre de pièces', type: 'number', required: true, placeholder: 'Ex: 5' },
        { name: 'bedrooms', label: 'Nombre de chambres', type: 'number', required: false, placeholder: 'Ex: 3' },
        { name: 'landSurface', label: 'Surface du terrain (m²) (si applicable)', type: 'number', required: false, placeholder: 'Ex: 500'},
        { name: 'energyClass', label: 'Classe énergie (DPE)', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non requis', 'Non applicable'], required: false },
        { name: 'ges', label: 'Émissions GES', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non requis', 'Non applicable'], required: false }
      ] 
    },
    { 
      id: 'colocations', 
      name: 'Colocations', 
      icon: '👥',
      placeholders: {
        title: 'Ex: Chambre en colocation dans grande maison (Lacanau)',
        description: 'Propose chambre meublée dans colocation sympa et respectueuse. Maison avec jardin, proche des commerces. Profil recherché : étudiant(e) ou jeune actif(ve).'
      },
      fields: [
        { name: 'propertyType', label: 'Type de logement', type: 'select', options: ['Maison', 'Appartement'], required: true },
        { name: 'roomSurface', label: 'Surface de la chambre (m²)', type: 'number', required: false, placeholder: 'Ex: 12' },
        { name: 'totalRooms', label: 'Nombre total de pièces dans le logement', type: 'number', required: false, placeholder: 'Ex: 5' },
        { name: 'roommatesCount', label: 'Nombre de colocataires actuels', type: 'number', required: false, placeholder: 'Ex: 2'},
        { name: 'availabilityDate', label: 'Disponible à partir du', type: 'date', required: false}
      ]
    },
    { 
      id: 'offices-shops', 
      name: 'Bureaux & Commerces', 
      icon: '🏢',
      placeholders: {
        title: 'Ex: Local commercial à louer centre-ville Pauillac',
        description: 'Local commercial de 80m² avec vitrine, idéalement situé en rue passante. Parfait pour boutique ou profession libérale. Bail 3/6/9.'
      },
      fields: [
        { name: 'transactionType', label: 'Type de transaction', type: 'select', options: ['Location', 'Vente', 'Cession de bail'], required: true },
        { name: 'propertyType', label: 'Type de bien', type: 'select', options: ['Bureau', 'Local commercial', 'Entrepôt', 'Atelier', 'Autre'], required: true },
        { name: 'surface', label: 'Surface (m²)', type: 'number', required: true, placeholder: 'Ex: 80' },
        { name: 'locationFeatures', label: 'Atouts de l\'emplacement', type: 'text', required: false, placeholder: 'Ex: Angle de rue, Proche transports'},
      ]
    },
    { 
      id: 'vacation-rentals', 
      name: 'Locations de vacances', 
      icon: '🏖️',
      placeholders: {
        title: 'Ex: Maison de vacances avec piscine proche océan (Montalivet)',
        description: 'Loue charmante maison pour 6 personnes, tout confort, avec piscine privée. À 5 min de la plage. Disponible en juillet et août. Semaine / Quinzaine.'
      },
      fields: [
        { name: 'propertyType', label: 'Type de logement', type: 'select', options: ['Maison', 'Appartement', 'Villa', 'Studio', 'Chambre d\'hôte', 'Autre'], required: true },
        { name: 'capacity', label: 'Capacité d\'accueil (personnes)', type: 'number', required: true, placeholder: 'Ex: 4'},
        { name: 'bedrooms', label: 'Nombre de chambres', type: 'number', required: false, placeholder: 'Ex: 2' },
        { name: 'rentalPeriod', label: 'Période de location type', type: 'text', required: false, placeholder: 'Ex: Semaine, Week-end, Nuitée'},
        { name: 'nearbyAttractions', label: 'Proximité (plage, commerces...)', type: 'text', required: false, placeholder: 'Ex: 200m de la plage, 5min des commerces'}
      ]
    },
  ]
};