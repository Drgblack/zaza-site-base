// Comprehensive structured data schemas for Zaza Promptly
// Optimized for both traditional SEO and AI Answer Engines

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zazapromptly.com/#organization",
  "name": "Zaza Technologies",
  "alternateName": "Zaza Promptly",
  "url": "https://zazapromptly.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://zazapromptly.com/images/zaza-logo.png",
    "width": "512",
    "height": "512"
  },
  "founder": {
    "@type": "Person",
    "name": "Dr. Greg Blackburn",
    "honorificPrefix": "Dr.",
    "honorificSuffix": "PhD",
    "jobTitle": "Founder & CEO",
    "alumniOf": {
      "@type": "EducationalOrganization", 
      "name": "Professional Education Institution"
    },
    "description": "PhD in Professional Education, learning expert with 20+ years in education"
  },
  "foundingDate": "2022",
  "description": "AI-powered communication tools designed specifically for teachers to save time and reduce stress",
  "sameAs": [
    "https://twitter.com/zazapromptly",
    "https://linkedin.com/company/zaza-technologies"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@zazapromptly.com",
    "availableLanguage": ["en", "de", "fr", "es", "it"]
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://zazapromptly.com/#software",
  "name": "Zaza Promptly",
  "alternateName": "Promptly AI",
  "applicationCategory": "EducationApplication",
  "operatingSystem": ["iOS", "Android", "Web"],
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Plan",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "5 AI-generated messages per month"
    },
    {
      "@type": "Offer", 
      "name": "Pro Teacher Plan",
      "price": "99",
      "priceCurrency": "EUR",
      "description": "Unlimited AI messages, all features"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "12000",
    "bestRating": "5"
  },
  "featureList": [
    "Hallucination-safe AI writing",
    "Parent message templates", 
    "Report card comments",
    "Student feedback generator",
    "GDPR compliant",
    "Teacher-specific tone matching"
  ],
  "screenshot": "https://zazapromptly.com/images/promptly-app-screenshot.png",
  "softwareRequirements": "Internet connection required",
  "publisher": {
    "@id": "https://zazapromptly.com/#organization"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is it safe to use AI for parent messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Promptly is hallucination-safe and you always edit before sending. Your data stays private."
      }
    },
    {
      "@type": "Question",
      "name": "Will parents know I used AI?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "No. Promptly writes in a warm, natural teacher voice. You stay in control."
      }
    },
    {
      "@type": "Question",
      "name": "How much time can I save?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Teachers typically cut communication and report writing time by 60-80 percent."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be good with tech to use Promptly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all. If you can type, you can use Promptly."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe and GDPR compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Promptly never trains on your data and all processing is GDPR compliant."
      }
    },
    {
      "@type": "Question",
      "name": "How does Promptly compare to ChatGPT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike ChatGPT, Promptly is teacher-specific, hallucination-safe, GDPR-compliant, and tuned for parent-appropriate tone."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. There are no lock-ins."
      }
    }
  ]
};

// Localized schemas for better international SEO
export const getLocalizedSchemas = (locale: string) => {
  const translations: Record<string, any> = {
    de: {
      description: "KI-gestützte Kommunikationstools speziell für Lehrkräfte zur Zeitersparnis und Stressreduzierung",
      founderDescription: "PhD in Professional Education, Bildungsexperte mit über 20 Jahren Erfahrung",
      appDescription: "Hallucinationssichere KI-Hilfe für Lehrkräfte",
      faq: [
        {
          question: "Ist es sicher, KI für Elternmitteilungen zu nutzen?",
          answer: "Ja. Promptly ist hallucinationssicher, und Sie bearbeiten immer selbst vor dem Versenden. Ihre Daten bleiben privat."
        },
        {
          question: "Merken Eltern, dass ich KI verwendet habe?", 
          answer: "Nein. Promptly schreibt in einer warmen, natürlichen Lehrer-Sprache. Sie behalten die Kontrolle."
        },
        {
          question: "Wie viel Zeit kann ich sparen?",
          answer: "Lehrkräfte sparen typischerweise 60-80 % Zeit beim Schreiben von Mitteilungen und Zeugnissen."
        }
      ]
    },
    fr: {
      description: "Outils de communication IA conçus spécifiquement pour les enseignants afin de gagner du temps et réduire le stress",
      founderDescription: "PhD en éducation professionnelle, expert en apprentissage avec plus de 20 ans d'expérience",
      appDescription: "Assistant IA sans hallucinations pour enseignants",
      faq: [
        {
          question: "Est-ce sûr d'utiliser l'IA pour écrire aux parents?",
          answer: "Oui. Promptly évite les hallucinations et vous gardez toujours le contrôle."
        },
        {
          question: "Les parents sauront-ils que j'ai utilisé l'IA?",
          answer: "Non. Promptly écrit dans une langue naturelle, chaleureuse, professionnelle."
        },
        {
          question: "Combien de temps puis-je gagner?",
          answer: "Les enseignants économisent 60-80 % de temps pour la rédaction de bulletins et communications."
        }
      ]
    },
    es: {
      description: "Herramientas de comunicación con IA diseñadas específicamente para docentes para ahorrar tiempo y reducir estrés",
      founderDescription: "PhD en Educación Profesional, experto en educación con más de 20 años de experiencia",
      appDescription: "Asistente de IA libre de alucinaciones para docentes",
      faq: [
        {
          question: "¿Es seguro usar IA para escribir a las familias?",
          answer: "Sí. Promptly evita alucinaciones y usted siempre tiene el control."
        },
        {
          question: "¿Las familias notarán que he usado IA?",
          answer: "No. Promptly escribe con un tono natural, cálido y profesional."
        },
        {
          question: "¿Cuánto tiempo puedo ahorrar?",
          answer: "Los docentes ahorran entre un 60 y 80 % del tiempo de redacción."
        }
      ]
    },
    it: {
      description: "Strumenti di comunicazione IA progettati specificamente per insegnanti per risparmiare tempo e ridurre lo stress",
      founderDescription: "PhD in Educazione Professionale, esperto di apprendimento con oltre 20 anni di esperienza",
      appDescription: "Assistente IA sicuro contro le allucinazioni per docenti",
      faq: [
        {
          question: "È sicuro usare l'IA per scrivere ai genitori?",
          answer: "Sì. Promptly evita allucinazioni e lei mantiene sempre il controllo."
        },
        {
          question: "I genitori si accorgeranno che ho usato l'IA?",
          answer: "No. Promptly scrive con tono naturale, caldo e professionale."
        },
        {
          question: "Quanto tempo posso risparmiare?",
          answer: "Gli insegnanti risparmiano tra il 60 e l'80 % del tempo di scrittura."
        }
      ]
    }
  };

  return translations[locale] || {};
};

// Educational program schemas for other Zaza apps
export const educationalProgramSchemas = {
  teach: {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Zaza Teach",
    "description": "AI-powered lesson planning and teaching assistant",
    "provider": {
      "@id": "https://zazapromptly.com/#organization"
    },
    "programType": "Professional Development",
    "occupationalCategory": "Education"
  },
  autoplanner: {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram", 
    "name": "Zaza AutoPlanner",
    "description": "Automated lesson planning and curriculum design tool",
    "provider": {
      "@id": "https://zazapromptly.com/#organization"
    },
    "programType": "Planning Tool",
    "occupationalCategory": "Education"
  }
};

// Breadcrumb schema generator
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};