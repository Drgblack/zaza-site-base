export interface AppStoreMetadata {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  promotionalText?: string;
  whatsNew?: string;
}

export interface RegionalConfig {
  locale: string;
  language: string;
  region: string;
  currency: string;
  metadata: AppStoreMetadata;
  pricing: {
    starter: number;
    pro: number;
    currency: string;
  };
  features: string[];
  testimonials: string[];
}

export const appStoreConfigs: Record<string, RegionalConfig> = {
  'en-US': {
    locale: 'en-US',
    language: 'English',
    region: 'United States',
    currency: 'USD',
    metadata: {
      title: 'Zaza Promptly - AI Teaching Assistant',
      subtitle: 'Save hours on parent communication & lesson planning',
      description: `Transform your teaching with AI-powered tools designed specifically for educators. Zaza Promptly helps you:

• Generate personalized parent-teacher communication in seconds
• Create engaging lesson plans with AI assistance
• Write detailed progress reports and assessments
• Manage classroom documentation efficiently
• Access a library of proven teaching resources

Join thousands of teachers who save 5+ hours weekly on administrative tasks while improving communication quality.

Perfect for: Elementary, Middle, High School, and Special Education teachers.`,
      keywords: ['teacher', 'education', 'AI', 'parent communication', 'lesson planning', 'progress reports', 'classroom management', 'teaching assistant', 'school', 'educator'],
      promotionalText: 'Save 5+ hours weekly on teacher communication',
      whatsNew: 'New AI-powered lesson planning templates and enhanced parent communication tools'
    },
    pricing: {
      starter: 14.99,
      pro: 19.99,
      currency: 'USD'
    },
    features: [
      'AI-powered parent communication',
      'Lesson planning assistance',
      'Progress report generation',
      'Classroom memory system',
      'Export to DOC/PDF',
      'Multi-language support'
    ],
    testimonials: [
      'Saves me 6 hours every week on parent emails',
      'The AI suggestions are incredibly helpful',
      'Best investment I made for my teaching career'
    ]
  },
  'de-DE': {
    locale: 'de-DE',
    language: 'German',
    region: 'Germany',
    currency: 'EUR',
    metadata: {
      title: 'Zaza Promptly - KI-Assistent für Lehrer',
      subtitle: 'Sparen Sie Stunden bei der Elternkommunikation',
      description: `Transformieren Sie Ihren Unterricht mit KI-gestützten Tools, die speziell für Pädagogen entwickelt wurden. Zaza Promptly hilft Ihnen:

• Generieren Sie personalisierte Eltern-Lehrer-Kommunikation in Sekunden
• Erstellen Sie fesselnde Unterrichtspläne mit KI-Unterstützung
• Schreiben Sie detaillierte Fortschrittsberichte und Bewertungen
• Verwalten Sie Klassenzimmer-Dokumentation effizient
• Greifen Sie auf eine Bibliothek bewährter Lehrressourcen zu

Schließen Sie sich Tausenden von Lehrern an, die wöchentlich 5+ Stunden bei Verwaltungsaufgaben sparen und gleichzeitig die Kommunikationsqualität verbessern.

Perfekt für: Grundschul-, Mittelstufen-, Oberstufen- und Sonderpädagogen.`,
      keywords: ['lehrer', 'bildung', 'KI', 'elternkommunikation', 'unterrichtsplanung', 'fortschrittsberichte', 'klassenmanagement', 'lehrassistent', 'schule', 'pädagoge'],
      promotionalText: 'Sparen Sie 5+ Stunden wöchentlich bei der Lehrer-Kommunikation',
      whatsNew: 'Neue KI-gestützte Unterrichtsplanungsvorlagen und verbesserte Elternkommunikationstools'
    },
    pricing: {
      starter: 14.99,
      pro: 19.99,
      currency: 'EUR'
    },
    features: [
      'KI-gestützte Elternkommunikation',
      'Unterrichtsplanungsassistenz',
      'Fortschrittsbericht-Generierung',
      'Klassenzimmer-Gedächtnissystem',
      'Export zu DOC/PDF',
      'Mehrsprachige Unterstützung'
    ],
    testimonials: [
      'Spart mir 6 Stunden jede Woche bei Eltern-E-Mails',
      'Die KI-Vorschläge sind unglaublich hilfreich',
      'Beste Investition für meine Lehrerkarriere'
    ]
  },
  'fr-FR': {
    locale: 'fr-FR',
    language: 'French',
    region: 'France',
    currency: 'EUR',
    metadata: {
      title: 'Zaza Promptly - Assistant IA pour Enseignants',
      subtitle: 'Gagnez des heures sur la communication parentale',
      description: `Transformez votre enseignement avec des outils alimentés par l'IA conçus spécifiquement pour les éducateurs. Zaza Promptly vous aide à:

• Générer une communication parent-enseignant personnalisée en secondes
• Créer des plans de cours engageants avec l'assistance IA
• Rédiger des rapports de progression détaillés et des évaluations
• Gérer efficacement la documentation de classe
• Accéder à une bibliothèque de ressources pédagogiques éprouvées

Rejoignez des milliers d'enseignants qui économisent 5+ heures par semaine sur les tâches administratives tout en améliorant la qualité de la communication.

Parfait pour: Enseignants du primaire, collège, lycée et éducation spécialisée.`,
      keywords: ['enseignant', 'éducation', 'IA', 'communication parentale', 'planification de cours', 'rapports de progression', 'gestion de classe', 'assistant enseignant', 'école', 'éducateur'],
      promotionalText: 'Gagnez 5+ heures par semaine sur la communication enseignante',
      whatsNew: 'Nouveaux modèles de planification de cours alimentés par l\'IA et outils de communication parentale améliorés'
    },
    pricing: {
      starter: 14.99,
      pro: 19.99,
      currency: 'EUR'
    },
    features: [
      'Communication parentale alimentée par l\'IA',
      'Assistance à la planification de cours',
      'Génération de rapports de progression',
      'Système de mémoire de classe',
      'Export vers DOC/PDF',
      'Support multilingue'
    ],
    testimonials: [
      'Me fait gagner 6 heures chaque semaine sur les e-mails aux parents',
      'Les suggestions IA sont incroyablement utiles',
      'Meilleur investissement pour ma carrière d\'enseignant'
    ]
  },
  'es-ES': {
    locale: 'es-ES',
    language: 'Spanish',
    region: 'Spain',
    currency: 'EUR',
    metadata: {
      title: 'Zaza Promptly - Asistente IA para Profesores',
      subtitle: 'Ahorra horas en comunicación con padres',
      description: `Transforma tu enseñanza con herramientas impulsadas por IA diseñadas específicamente para educadores. Zaza Promptly te ayuda a:

• Generar comunicación personalizada padre-profesor en segundos
• Crear planes de lecciones atractivos con asistencia de IA
• Escribir informes de progreso detallados y evaluaciones
• Gestionar documentación del aula eficientemente
• Acceder a una biblioteca de recursos de enseñanza probados

Únete a miles de profesores que ahorran 5+ horas semanales en tareas administrativas mientras mejoran la calidad de la comunicación.

Perfecto para: Profesores de primaria, secundaria, bachillerato y educación especial.`,
      keywords: ['profesor', 'educación', 'IA', 'comunicación padres', 'planificación lecciones', 'informes progreso', 'gestión aula', 'asistente profesor', 'escuela', 'educador'],
      promotionalText: 'Ahorra 5+ horas semanales en comunicación docente',
      whatsNew: 'Nuevas plantillas de planificación de lecciones impulsadas por IA y herramientas mejoradas de comunicación con padres'
    },
    pricing: {
      starter: 14.99,
      pro: 19.99,
      currency: 'EUR'
    },
    features: [
      'Comunicación con padres impulsada por IA',
      'Asistencia en planificación de lecciones',
      'Generación de informes de progreso',
      'Sistema de memoria del aula',
      'Exportar a DOC/PDF',
      'Soporte multilingüe'
    ],
    testimonials: [
      'Me ahorra 6 horas cada semana en correos a padres',
      'Las sugerencias de IA son increíblemente útiles',
      'Mejor inversión para mi carrera docente'
    ]
  },
  'it-IT': {
    locale: 'it-IT',
    language: 'Italian',
    region: 'Italy',
    currency: 'EUR',
    metadata: {
      title: 'Zaza Promptly - Assistente IA per Insegnanti',
      subtitle: 'Risparmia ore nella comunicazione con i genitori',
      description: `Trasforma il tuo insegnamento con strumenti alimentati dall'IA progettati specificamente per gli educatori. Zaza Promptly ti aiuta a:

• Generare comunicazione personalizzata genitore-insegnante in secondi
• Creare piani di lezione coinvolgenti con assistenza IA
• Scrivere rapporti di progresso dettagliati e valutazioni
• Gestire la documentazione della classe in modo efficiente
• Accedere a una biblioteca di risorse didattiche collaudate

Unisciti a migliaia di insegnanti che risparmiano 5+ ore settimanali sui compiti amministrativi migliorando la qualità della comunicazione.

Perfetto per: Insegnanti di scuola primaria, media, superiore e educazione speciale.`,
      keywords: ['insegnante', 'educazione', 'IA', 'comunicazione genitori', 'pianificazione lezioni', 'rapporti progresso', 'gestione classe', 'assistente insegnante', 'scuola', 'educatore'],
      promotionalText: 'Risparmia 5+ ore settimanali sulla comunicazione docente',
      whatsNew: 'Nuovi modelli di pianificazione delle lezioni alimentati dall\'IA e strumenti migliorati per la comunicazione con i genitori'
    },
    pricing: {
      starter: 14.99,
      pro: 19.99,
      currency: 'EUR'
    },
    features: [
      'Comunicazione con i genitori alimentata dall\'IA',
      'Assistenza nella pianificazione delle lezioni',
      'Generazione di rapporti di progresso',
      'Sistema di memoria della classe',
      'Esporta in DOC/PDF',
      'Supporto multilingue'
    ],
    testimonials: [
      'Mi fa risparmiare 6 ore ogni settimana sulle email ai genitori',
      'I suggerimenti IA sono incredibilmente utili',
      'Miglior investimento per la mia carriera di insegnante'
    ]
  }
};

export function getAppStoreConfig(locale: string): RegionalConfig {
  return appStoreConfigs[locale] || appStoreConfigs['en-US'];
}

export function generateAppStoreKeywords(locale: string): string {
  const config = getAppStoreConfig(locale);
  return config.metadata.keywords.join(', ');
}

export function getRegionalPricing(locale: string) {
  const config = getAppStoreConfig(locale);
  return config.pricing;
}

export function getRegionalFeatures(locale: string): string[] {
  const config = getAppStoreConfig(locale);
  return config.features;
}

export function getRegionalTestimonials(locale: string): string[] {
  const config = getAppStoreConfig(locale);
  return config.testimonials;
}
