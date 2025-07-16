export const wellnessTherapiesCategory = {
  id: 'wellness-therapies',
  name: 'Bien-être & Thérapies',
  icon: '💖', 
  color: 'bg-teal-100 text-teal-600',
  placeholders: {
    title: 'Ex: Séance de Reiki Usui à Soulac',
    description: 'Décrivez votre service, votre approche, les bienfaits attendus, et vos qualifications. Précisez si vous recevez en cabinet, à domicile, ou en ligne.'
  },
  subCategories: [
    {
      id: 'osteopathy',
      name: 'Ostéopathie',
      icon: '🦴',
      fields: [
        { name: 'practitionerName', label: 'Nom du praticien/cabinet', type: 'text', required: true, placeholder: 'Ex: Cabinet Ostéo Médoc' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 45 min - 1h' },
        { name: 'targetAudience', label: 'Public cible', type: 'text', required: false, placeholder: 'Ex: Adultes, Enfants, Nourrissons, Sportifs' },
        { name: 'approachDescription', label: 'Approche/Méthode', type: 'textarea', required: false, placeholder: 'Décrivez votre approche (structurelle, crânienne, viscérale...).', rows: 3 },
        { name: 'issuesAddressed', label: 'Problématiques abordées', type: 'textarea', required: false, placeholder: 'Ex: Douleurs dorsales, troubles digestifs, migraines, stress...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: D.O. (Diplômé en Ostéopathie)' },
        { name: 'locationType', label: 'Lieu de consultation', type: 'select', options: ['En cabinet', 'À domicile', 'En ligne (téléconsultation)'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'yoga',
      name: 'Yoga',
      icon: '🧘',
      fields: [
        { name: 'practitionerName', label: 'Nom du professeur/studio', type: 'text', required: true, placeholder: 'Ex: Yoga Harmonie Médoc' },
        { name: 'yogaStyle', label: 'Style de Yoga enseigné', type: 'text', required: false, placeholder: 'Ex: Hatha, Vinyasa, Ashtanga, Yin' },
        { name: 'sessionDuration', label: 'Durée type d\'un cours', type: 'text', required: false, placeholder: 'Ex: 1h, 1h15, 1h30' },
        { name: 'level', label: 'Niveau(x) des cours', type: 'text', required: false, placeholder: 'Ex: Débutant, Intermédiaire, Tous niveaux' },
        { name: 'issuesAddressed', label: 'Bienfaits/Objectifs', type: 'textarea', required: false, placeholder: 'Ex: Souplesse, gestion du stress, renforcement musculaire, relaxation...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Professeur certifié Yoga Alliance RYT200' },
        { name: 'locationType', label: 'Lieu des cours', type: 'select', options: ['En studio/salle', 'En extérieur', 'À domicile', 'En ligne'], required: false, defaultValue: 'En studio/salle' },
      ]
    },
    {
      id: 'meditation',
      name: 'Méditation',
      icon: '🧠',
      fields: [
        { name: 'practitionerName', label: 'Nom de l\'instructeur/centre', type: 'text', required: true, placeholder: 'Ex: Méditation Pleine Conscience Médoc' },
        { name: 'meditationType', label: 'Type de méditation guidée', type: 'text', required: false, placeholder: 'Ex: Pleine conscience (MBSR), Vipassana, Transcendantale' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance/atelier', type: 'text', required: false, placeholder: 'Ex: 30 min, 1h, Atelier de 2h' },
        { name: 'issuesAddressed', label: 'Bienfaits/Objectifs', type: 'textarea', required: false, placeholder: 'Ex: Réduction du stress, amélioration de la concentration, paix intérieure...', rows: 3 },
        { name: 'certifications', label: 'Qualifications', type: 'text', required: false, placeholder: 'Ex: Instructeur MBSR certifié' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En centre/salle', 'En extérieur', 'En ligne'], required: false, defaultValue: 'En centre/salle' },
      ]
    },
    {
      id: 'sophrology',
      name: 'Sophrologie',
      icon: '😌',
      fields: [
        { name: 'practitionerName', label: 'Nom du sophrologue/cabinet', type: 'text', required: true, placeholder: 'Ex: Sophro Sérénité Médoc' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 1h' },
        { name: 'targetAudience', label: 'Public cible', type: 'text', required: false, placeholder: 'Ex: Adultes, Enfants, Adolescents, Entreprises' },
        { name: 'issuesAddressed', label: 'Domaines d\'application', type: 'textarea', required: false, placeholder: 'Ex: Gestion du stress, troubles du sommeil, préparation aux examens, confiance en soi...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Sophrologue certifié RNCP' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En cabinet', 'À domicile', 'En ligne'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'naturopathy',
      name: 'Naturopathie',
      icon: '🌿',
      fields: [
        { name: 'practitionerName', label: 'Nom du naturopathe/cabinet', type: 'text', required: true, placeholder: 'Ex: Naturo Vitalité Médoc' },
        { name: 'sessionDuration', label: 'Durée type d\'une consultation', type: 'text', required: false, placeholder: 'Ex: 1h - 1h30 (première), 45 min (suivi)' },
        { name: 'approachDescription', label: 'Approche/Techniques utilisées', type: 'textarea', required: false, placeholder: 'Ex: Bilan vitalité, conseils en alimentation, phytothérapie, aromathérapie...', rows: 3 },
        { name: 'issuesAddressed', label: 'Accompagnement pour', type: 'textarea', required: false, placeholder: 'Ex: Troubles digestifs, fatigue chronique, gestion du poids, renforcement immunitaire...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Naturopathe certifié FENA' },
        { name: 'locationType', label: 'Lieu des consultations', type: 'select', options: ['En cabinet', 'À domicile', 'En ligne'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'hypnotherapy',
      name: 'Hypnothérapie',
      icon: '🌀',
      fields: [
        { name: 'practitionerName', label: 'Nom de l\'hypnothérapeute/cabinet', type: 'text', required: true, placeholder: 'Ex: Hypno Bien-être Médoc' },
        { name: 'hypnosisType', label: 'Type d\'hypnose pratiquée', type: 'text', required: false, placeholder: 'Ex: Ericksonienne, Humaniste, Classique' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 1h - 1h30' },
        { name: 'issuesAddressed', label: 'Indications', type: 'textarea', required: false, placeholder: 'Ex: Arrêt du tabac, perte de poids, gestion des phobies, anxiété...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Maître Praticien en Hypnose Ericksonienne' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En cabinet', 'À domicile', 'En ligne'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'reflexology',
      name: 'Réflexologie',
      icon: '👣',
      fields: [
        { name: 'practitionerName', label: 'Nom du réflexologue/cabinet', type: 'text', required: true, placeholder: 'Ex: Réflexo Douceur Médoc' },
        { name: 'reflexologyType', label: 'Type de réflexologie', type: 'text', required: false, placeholder: 'Ex: Plantaire, Palmaire, Faciale (Dien Chan)' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 1h' },
        { name: 'issuesAddressed', label: 'Bienfaits', type: 'textarea', required: false, placeholder: 'Ex: Relaxation profonde, amélioration de la circulation, soulagement des tensions...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Réflexologue certifié (école X)' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En cabinet', 'À domicile'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'chiropractic',
      name: 'Chiropraxie',
      icon: '🤸',
      fields: [
        { name: 'practitionerName', label: 'Nom du chiropracteur/cabinet', type: 'text', required: true, placeholder: 'Ex: Chiropratique Médoc Centre' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 30-45 min (première), 15-20 min (suivi)' },
        { name: 'approachDescription', label: 'Approche/Techniques utilisées', type: 'textarea', required: false, placeholder: 'Décrivez votre approche et les techniques principales.', rows: 3 },
        { name: 'issuesAddressed', label: 'Problématiques traitées', type: 'textarea', required: false, placeholder: 'Ex: Douleurs vertébrales, sciatiques, névralgies, maux de tête...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Diplômé de l\'IFEC' },
        { name: 'locationType', label: 'Lieu de consultation', type: 'select', options: ['En cabinet'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'shiatsu',
      name: 'Shiatsu',
      icon: '💆',
      fields: [
        { name: 'practitionerName', label: 'Nom du praticien/cabinet', type: 'text', required: true, placeholder: 'Ex: Shiatsu Équilibre Médoc' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 1h - 1h15' },
        { name: 'approachDescription', label: 'Description du Shiatsu proposé', type: 'textarea', required: false, placeholder: 'Expliquez les principes et le déroulement d\'une séance.', rows: 3 },
        { name: 'issuesAddressed', label: 'Bienfaits', type: 'textarea', required: false, placeholder: 'Ex: Réduction du stress, amélioration du sommeil, détente musculaire, harmonisation énergétique...', rows: 3 },
        { name: 'certifications', label: 'Diplômes/Certifications', type: 'text', required: false, placeholder: 'Ex: Praticien Shiatsu certifié (Fédération X)' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En cabinet', 'À domicile'], required: false, defaultValue: 'En cabinet' },
      ]
    },
    {
      id: 'reiki',
      name: 'Reiki',
      icon: '✨',
      fields: [
        { name: 'practitionerName', label: 'Nom du praticien/maître Reiki', type: 'text', required: true, placeholder: 'Ex: Reiki Lumière Médoc' },
        { name: 'reikiLineage', label: 'Lignée Reiki (si pertinent)', type: 'text', required: false, placeholder: 'Ex: Usui Shiki Ryoho' },
        { name: 'sessionDuration', label: 'Durée type d\'une séance', type: 'text', required: false, placeholder: 'Ex: 1h' },
        { name: 'issuesAddressed', label: 'Bienfaits', type: 'textarea', required: false, placeholder: 'Ex: Relaxation profonde, libération des blocages énergétiques, soutien émotionnel...', rows: 3 },
        { name: 'certifications', label: 'Niveau/Certifications', type: 'text', required: false, placeholder: 'Ex: Maître Reiki Enseignant (niveau X)' },
        { name: 'locationType', label: 'Lieu des séances', type: 'select', options: ['En cabinet', 'À domicile', 'À distance'], required: false, defaultValue: 'En cabinet' },
      ]
    }
  ]
};