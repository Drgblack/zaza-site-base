import { Metadata } from 'next';

// Base URL for all metadata
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com';

// SEO-optimized metadata configurations for all pages and locales
// Designed for both Google/Bing and AI Answer Engines

export const seoMetadata = {
  // English metadata
  en: {
    home: {
      title: 'Write better parent messages in minutes - not hours | Zaza Promptly',
      description: 'Promptly helps teachers cut admin time so you can focus on teaching - with warmth, clarity, and confidence. Save 5+ hours per week writing parent messages and reports.',
      keywords: 'AI teacher tools, parent communication templates, teacher AI assistant, automated report cards, education AI software, teacher productivity tools',
      openGraph: {
        title: 'AI Communication Assistant for Teachers | Zaza Promptly',
        description: 'Hallucination-safe AI that helps teachers write better parent messages, report cards, and professional notes in minutes - not hours.'
      }
    },
    pricing: {
      title: 'Teacher-Friendly Pricing - Start Free | Zaza Promptly',
      description: 'Simple, affordable pricing for teachers. Free plan available. Pro plans from €99/year. No lock-ins, cancel anytime. Built by educators for educators.',
      keywords: 'teacher AI pricing, affordable education software, teacher budget software, education AI cost',
      openGraph: {
        title: 'Affordable AI Tools for Teachers | Pricing',
        description: 'Teacher-friendly pricing starting free. Pro features from just €8.25/month. No contracts, cancel anytime.'
      }
    },
    solutions: {
      title: 'How can Promptly help teachers? | Solutions',
      description: 'Discover how Promptly saves teachers 5+ hours per week with AI-powered parent messages, report card comments, and professional communication tools.',
      keywords: 'AI solutions for teachers, parent communication help, report writing assistance, teacher workflow automation',
      openGraph: {
        title: 'AI Solutions for Teacher Communication Challenges',
        description: 'Cut parent communication time by 60-80%. Hallucination-safe AI tailored for teachers.'
      }
    },
    blog: {
      title: 'Teaching Tips & AI Insights | Zaza Promptly Blog',
      description: 'Expert advice for teachers on communication, classroom management, and using AI safely. Written by education professionals.',
      keywords: 'teaching tips, teacher communication, AI in education, classroom management, teacher resources',
      openGraph: {
        title: 'Teaching Tips & AI Insights for Educators',
        description: 'Practical advice for teachers from education experts. Learn to use AI safely and effectively.'
      }
    },
    about: {
      title: 'Built by a Learning Expert | About Dr. Greg Blackburn',
      description: 'Meet Dr. Greg Blackburn, PhD in Professional Education. 20+ years helping teachers succeed. Built Promptly to help teachers focus on what matters most.',
      keywords: 'Greg Blackburn PhD, education expert, teacher advocate, AI education ethics',
      openGraph: {
        title: 'Meet the Education Expert Behind Zaza Promptly',
        description: 'Dr. Greg Blackburn, PhD in Professional Education, built Promptly after seeing how admin work drains teachers.'
      }
    },
    resources: {
      title: 'Free Teaching Resources & Templates | Zaza Promptly',
      description: 'Download free parent communication templates, report card phrases, and teaching resources. Created by education professionals.',
      keywords: 'free teaching resources, parent message templates, report card comments, teacher templates',
      openGraph: {
        title: 'Free Teaching Resources & Communication Templates',
        description: 'Download professional templates and resources to save time on parent communication and reports.'
      }
    }
  },

  // German metadata
  de: {
    home: {
      title: 'Bessere Elternmitteilungen in Minuten - nicht in Stunden | Zaza Promptly',
      description: 'Promptly hilft Lehrkräften, Admin-Zeit zu reduzieren - mit Wärme, Klarheit und Vertrauen. Sparen Sie 5+ Stunden pro Woche bei Elternmitteilungen und Zeugnissen.',
      keywords: 'KI Tools für Lehrer, Elternkommunikation Vorlagen, Lehrer KI Assistent, automatisierte Zeugnisse, Bildung KI Software',
      openGraph: {
        title: 'KI-Kommunikationsassistent für Lehrkräfte | Zaza Promptly',
        description: 'Hallucinationssichere KI für bessere Elternmitteilungen, Zeugnisbemerkungen und professionelle Texte in Minuten.'
      }
    },
    pricing: {
      title: 'Lehrerfreundliche Preise - Kostenlos starten | Zaza Promptly',
      description: 'Einfache, erschwingliche Preise für Lehrkräfte. Kostenloser Plan verfügbar. Pro-Pläne ab €99/Jahr. Keine Bindung, jederzeit kündbar.',
      keywords: 'Lehrer KI Preise, erschwingliche Bildungssoftware, Lehrerbudget Software, Bildung KI Kosten',
      openGraph: {
        title: 'Erschwingliche KI-Tools für Lehrkräfte | Preise',
        description: 'Lehrerfreundliche Preise ab kostenlos. Pro-Features ab nur €8,25/Monat. Keine Verträge.'
      }
    },
    solutions: {
      title: 'Wie hilft Promptly Lehrkräften? | Lösungen',
      description: 'Entdecken Sie, wie Promptly Lehrkräften 5+ Stunden pro Woche spart mit KI-gestützten Elternmitteilungen und Kommunikationstools.',
      keywords: 'KI Lösungen für Lehrer, Elternkommunikation Hilfe, Zeugnis Schreibhilfe, Lehrer Workflow Automatisierung',
      openGraph: {
        title: 'KI-Lösungen für Lehrkräfte-Kommunikation',
        description: 'Reduzieren Sie Elternkommunikationszeit um 60-80%. Hallucinationssichere KI für Lehrkräfte.'
      }
    }
  },

  // French metadata
  fr: {
    home: {
      title: 'Rédigez de meilleurs messages aux parents en quelques minutes | Zaza Promptly',
      description: 'Promptly aide les enseignants à réduire le temps administratif - avec clarté, chaleur et confiance. Économisez 5+ heures par semaine.',
      keywords: 'outils IA enseignants, modèles communication parents, assistant IA professeur, bulletins automatisés, logiciel éducation IA',
      openGraph: {
        title: 'Assistant de Communication IA pour Enseignants | Zaza Promptly',
        description: 'IA sans hallucinations pour de meilleurs messages parents, commentaires de bulletins et textes professionnels en minutes.'
      }
    },
    pricing: {
      title: 'Tarifs Adaptés aux Enseignants - Essai Gratuit | Zaza Promptly',
      description: 'Tarifs simples et abordables pour enseignants. Plan gratuit disponible. Plans Pro à partir de €99/an. Annulation simple.',
      keywords: 'prix IA enseignants, logiciel éducation abordable, budget enseignant logiciel, coût IA éducation',
      openGraph: {
        title: 'Outils IA Abordables pour Enseignants | Tarifs',
        description: 'Tarifs adaptés aux enseignants dès gratuit. Fonctionnalités Pro à partir de €8,25/mois seulement.'
      }
    }
  },

  // Spanish metadata
  es: {
    home: {
      title: 'Escriba mejores mensajes a familias en minutos - no en horas | Zaza Promptly',
      description: 'Promptly ayuda a los docentes a reducir tiempo administrativo - con claridad, calidez y confianza. Ahorre 5+ horas por semana.',
      keywords: 'herramientas IA docentes, plantillas comunicación familias, asistente IA profesor, boletines automatizados, software educación IA',
      openGraph: {
        title: 'Asistente de Comunicación IA para Docentes | Zaza Promptly',
        description: 'IA sin alucinaciones para mejores mensajes a familias, comentarios de boletines y textos profesionales en minutos.'
      }
    },
    pricing: {
      title: 'Precios Pensados para Docentes - Prueba Gratuita | Zaza Promptly',
      description: 'Precios simples y accesibles para docentes. Plan gratuito disponible. Planes Pro desde €99/año. Cancelación simple.',
      keywords: 'precios IA docentes, software educación asequible, presupuesto docente software, costo IA educación',
      openGraph: {
        title: 'Herramientas IA Accesibles para Docentes | Precios',
        description: 'Precios pensados para docentes desde gratis. Funciones Pro desde solo €8,25/mes.'
      }
    }
  },

  // Italian metadata  
  it: {
    home: {
      title: 'Scriva migliori messaggi ai genitori in minuti - non in ore | Zaza Promptly',
      description: 'Promptly aiuta i docenti a ridurre il tempo amministrativo - con chiarezza, calore e fiducia. Risparmi 5+ ore a settimana.',
      keywords: 'strumenti IA insegnanti, modelli comunicazione genitori, assistente IA docente, pagelle automatizzate, software educazione IA',
      openGraph: {
        title: 'Assistente di Comunicazione IA per Docenti | Zaza Promptly',
        description: 'IA senza allucinazioni per migliori messaggi ai genitori, commenti nelle pagelle e testi professionali in minuti.'
      }
    },
    pricing: {
      title: 'Prezzi Pensati per Docenti - Prova Gratuita | Zaza Promptly',
      description: 'Prezzi semplici e accessibili per docenti. Piano gratuito disponibile. Piani Pro da €99/anno. Disdetta semplice.',
      keywords: 'prezzi IA docenti, software educazione accessibile, budget docente software, costo IA educazione',
      openGraph: {
        title: 'Strumenti IA Accessibili per Docenti | Prezzi',
        description: 'Prezzi pensati per docenti da gratis. Funzioni Pro da solo €8,25/mese.'
      }
    }
  }
};

// Generate comprehensive metadata for any page
export function generatePageMetadata(
  page: keyof (typeof seoMetadata)['en'],
  locale: 'en' | 'de' | 'fr' | 'es' | 'it' = 'en',
  overrides: Partial<Metadata> = {}
): Metadata {
  const pageData = seoMetadata[locale]?.[page] || seoMetadata.en[page];
  
  const metadata: Metadata = {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.openGraph.title,
      description: pageData.openGraph.description,
      url: `${BASE_URL}/${locale === 'en' ? '' : locale}${page === 'home' ? '' : `/${page}`}`,
      siteName: 'Zaza Promptly',
      images: [
        {
          url: `${BASE_URL}/og/hero-og.png`,
          width: 1200,
          height: 630,
          alt: pageData.openGraph.title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.openGraph.title,
      description: pageData.openGraph.description,
      images: [`${BASE_URL}/og/hero-og.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale === 'en' ? '' : locale}${page === 'home' ? '' : `/${page}`}`,
      languages: {
        'en': `${BASE_URL}${page === 'home' ? '' : `/${page}`}`,
        'de': `${BASE_URL}/de${page === 'home' ? '' : `/${page}`}`,
        'fr': `${BASE_URL}/fr${page === 'home' ? '' : `/${page}`}`,
        'es': `${BASE_URL}/es${page === 'home' ? '' : `/${page}`}`,
        'it': `${BASE_URL}/it${page === 'home' ? '' : `/${page}`}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...overrides,
  };

  return metadata;
}

// AI-optimized article metadata for blog posts
export function generateArticleMetadata(
  title: string,
  description: string,
  slug: string,
  locale: 'en' | 'de' | 'fr' | 'es' | 'it' = 'en',
  publishedDate?: string,
  modifiedDate?: string
): Metadata {
  return {
    title: `${title} | Zaza Promptly Blog`,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: 'Zaza Promptly',
      images: [
        {
          url: `${BASE_URL}/og/blog-${slug}-og.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ['Dr. Greg Blackburn'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og/blog-${slug}-og.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}