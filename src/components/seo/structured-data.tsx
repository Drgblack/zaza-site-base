interface StructuredDataProps {
  type: 'website' | 'article' | 'organization' | 'breadcrumbList';
  data: unknown;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateWebsiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zaza Promptly",
    "description": "AI-powered parent communication tools for teachers",
    "url": "https://zazapromptly.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zazapromptly.com/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zazapromptly.com/images/zaza-logo.png"
      }
    }
  });

  const generateArticleData = () => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.description,
    "image": data.featuredImage,
    "author": {
      "@type": "Person",
      "name": data.author,
      "description": data.authorBio
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zazapromptly.com/images/zaza-logo.png"
      }
    },
    "datePublished": data.publishDate,
    "dateModified": data.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "keywords": data.seoKeywords?.join(', '),
    "articleSection": data.category,
    "about": {
      "@type": "Thing",
      "name": "AI in Education",
      "description": "Using artificial intelligence tools to enhance teaching and education"
    }
  });

  const generateOrganizationData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaza Technologies",
    "alternateName": "Zaza Promptly",
    "url": "https://zazapromptly.com",
    "logo": "https://zazapromptly.com/images/zaza-logo.png",
    "description": "AI-powered tools for teachers to streamline parent communication and save time",
    "foundingDate": "2023",
    "sameAs": [
      "https://linkedin.com/company/zaza-technologies",
      "https://x.com/zazatechnologies",
      "https://tiktok.com/@zazatechnologies"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@zazapromptly.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Zaza Promptly Pro",
      "description": "AI-powered parent communication for teachers",
      "price": "14.99",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  });

  const generateBreadcrumbData = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data.map((item: unknown, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  let structuredData;
  switch (type) {
    case 'website':
      structuredData = generateWebsiteData();
      break;
    case 'article':
      structuredData = generateArticleData();
      break;
    case 'organization':
      structuredData = generateOrganizationData();
      break;
    case 'breadcrumbList':
      structuredData = generateBreadcrumbData();
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
