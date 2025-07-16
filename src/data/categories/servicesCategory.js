export const servicesCategory = {
  id: 'services',
  name: 'Services',
  icon: '🛠️',
  color: 'bg-teal-100 text-teal-600',
  placeholders: {
    title: 'Ex: Cours de maths niveau collège/lycée',
    description: 'Propose cours particuliers de mathématiques. Décrivez votre expérience, méthodologie, tarifs...'
  },
  subCategories: [
    { 
      id: 'lessons', 
      name: 'Cours Particuliers', 
      icon: '🧑‍🏫',
      placeholders: {
        title: 'Ex: Professeur d\'anglais donne cours tous niveaux',
        description: 'Enseignant expérimenté propose cours d\'anglais personnalisés : conversation, grammaire, préparation examens. Secteur Nord Médoc. CESU accepté.'
      },
      fields: [
        { name: 'subject', label: 'Matière enseignée', type: 'text', required: true, placeholder: 'Ex: Mathématiques, Anglais, Guitare' },
        { name: 'level', label: 'Niveau', type: 'text', required: false, placeholder: 'Ex: Collège, Lycée, Débutant, Tous niveaux'},
        { name: 'experience', label: 'Expérience du professeur', type: 'text', required: false, placeholder: 'Ex: 5 ans d\'enseignement, Étudiant en Master'},
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: 20€/heure, Sur devis'}
      ]
    },
    { 
      id: 'home-services', 
      name: 'Services à Domicile', 
      icon: '🧹',
      placeholders: {
        title: 'Ex: Jardinier propose entretien de jardins',
        description: 'Jardinier paysagiste avec expérience propose ses services pour tonte, taille, débroussaillage, création de massifs. Travail soigné. Devis gratuit.'
      },
      fields: [
        { name: 'serviceType', label: 'Type de service', type: 'text', required: true, placeholder: 'Ex: Ménage, Jardinage, Bricolage, Garde d\'animaux' },
        { name: 'experience', label: 'Expérience', type: 'text', required: false, placeholder: 'Ex: Plusieurs années, Références disponibles'},
        { name: 'availability', label: 'Disponibilités', type: 'text', required: false, placeholder: 'Ex: Semaine, Week-ends'},
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: 15€/heure, Forfait possible'}
      ]
    },
    { 
      id: 'repairs', 
      name: 'Réparations', 
      icon: '🔧',
      placeholders: {
        title: 'Ex: Réparation électroménager toutes marques',
        description: 'Technicien qualifié répare vos appareils électroménagers (lave-linge, four, frigo...). Intervention rapide dans le Médoc. Diagnostic et devis.'
      },
      fields: [
        { name: 'itemToRepair', label: 'Type d\'objet à réparer', type: 'text', required: true, placeholder: 'Ex: Électroménager, Vélo, Ordinateur, Vêtement' },
        { name: 'expertise', label: 'Expertise/Compétences', type: 'text', required: false, placeholder: 'Ex: Réparateur agréé, Bon bricoleur'},
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: Sur devis, Tarif horaire'}
      ]
    },
    { 
      id: 'babysitting', 
      name: 'Baby-sitting', 
      icon: '👶',
      placeholders: {
        title: 'Ex: Baby-sitter expérimentée disponible soirs et week-ends',
        description: 'Étudiante sérieuse avec expérience (BAFA, garde d\'enfants de 0 à 10 ans) propose ses services de baby-sitting. Véhiculée. Secteur Lacanau et environs.'
      },
      fields: [
        { name: 'experience', label: 'Expérience avec les enfants', type: 'text', required: true, placeholder: 'Ex: BAFA, Expérience de 3 ans, Maman de 2 enfants' },
        { name: 'ageRangeChildren', label: 'Âge des enfants gardés', type: 'text', required: false, placeholder: 'Ex: Nourrissons, 3-6 ans, Tous âges'},
        { name: 'availability', label: 'Disponibilités', type: 'text', required: false, placeholder: 'Ex: Soirées, Mercredis, Vacances scolaires'},
        { name: 'pricingType', label: 'Tarif horaire indicatif', type: 'text', required: false, placeholder: 'Ex: 10€/heure'}
      ]
    },
    { 
      id: 'events-services', 
      name: 'Services Événementiel', 
      icon: '🎉',
      placeholders: {
        title: 'Ex: DJ animateur pour vos soirées (mariage, anniversaire)',
        description: 'DJ professionnel avec matériel de sonorisation et lumières propose animation pour tous types d\'événements. Large répertoire musical. Ambiance garantie !'
      },
      fields: [
        { name: 'serviceType', label: 'Type de service', type: 'text', required: true, placeholder: 'Ex: DJ, Photographe, Traiteur, Location de matériel' },
        { name: 'experience', label: 'Expérience/Portfolio', type: 'text', required: false, placeholder: 'Ex: Mariages, Anniversaires, Événements d\'entreprise'},
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: Sur devis, Forfait soirée'}
      ]
    },
    { 
      id: 'wellness', 
      name: 'Bien-être', 
      icon: '🧘',
      placeholders: {
        title: 'Ex: Massage californien à domicile',
        description: 'Praticienne certifiée propose massages bien-être à domicile (californien, suédois...). Moment de détente assuré. Table de massage professionnelle.'
      },
      fields: [
        { name: 'serviceType', label: 'Type de prestation', type: 'text', required: true, placeholder: 'Ex: Massage, Cours de Yoga/Pilates, Coiffure à domicile' },
        { name: 'qualifications', label: 'Diplômes/Certifications', type: 'text', required: false },
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: 50€ la séance, Sur devis'}
      ]
    },
    { 
      id: 'animal-services', 
      name: 'Services Animaux', 
      icon: '🐾',
      placeholders: {
        title: 'Ex: Garde de chiens et chats pendant vos vacances',
        description: 'Passionnée d\'animaux propose garde à mon domicile (maison avec jardin) ou visites chez vous. Expérience et affection garanties pour vos compagnons.'
      },
      fields: [
        { name: 'serviceType', label: 'Type de service', type: 'text', required: true, placeholder: 'Ex: Garde d\'animaux, Promenade de chien, Toilettage' },
        { name: 'animalTypes', label: 'Animaux acceptés', type: 'text', required: false, placeholder: 'Ex: Chiens, Chats, NAC'},
        { name: 'experience', label: 'Expérience avec les animaux', type: 'text', required: false },
        { name: 'pricingType', label: 'Tarif', type: 'text', required: false, placeholder: 'Ex: 15€/jour (garde), 10€/promenade'}
      ]
    },
  ]
};