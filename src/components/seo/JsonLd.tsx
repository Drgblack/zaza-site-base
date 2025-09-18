// components/seo/JsonLd.tsx - Structured data components for SEO
import { siteConfig } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}

// Organization schema - use site-wide
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.organization.name,
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.organization.logo
    },
    "founder": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.url,
      "image": siteConfig.author.avatar
    },
    "sameAs": [
      siteConfig.social.linkedin,
      siteConfig.social.tiktok
    ]
  };

  return <JsonLdScript data={data} />;
}

// Website schema with search action
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLdScript data={data} />;
}

// Software Application schema for Zaza Promptly
export function SoftwareApplicationJsonLd({
  pageUrl = siteConfig.url,
  screenshot = `${siteConfig.url}/images/screenshots/zaza-promptly-ui.jpg`
}: {
  pageUrl?: string;
  screenshot?: string;
} = {}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    "name": "Zaza Promptly",
    "alternateName": "ZazaTeach",
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "AI tools for educators",
    "operatingSystem": "Web",
    "url": pageUrl,
    "image": screenshot,
    "screenshot": screenshot,
    "description": siteConfig.description,
    "softwareVersion": "latest",
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Teachers and Educators"
    },
    "isAccessibleForFree": false,
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.url}/pricing`,
      "price": "149",
      "priceCurrency": "EUR",
      "category": "subscription",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31"
    },
    "featureList": [
      "Comment Coach (AI report comments)",
      "Report Bank with templates",
      "Plan templates for lessons",
      "Export to DOC/PDF",
      "Classroom notes locker",
      "Full AI Rewriter/Planner",
      "Curriculum packs",
      "Batch exports",
      "Priority updates",
      "Shared templates",
      "GDPR-conscious; no student data stored"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "567"
    }
  };

  return <JsonLdScript data={data} />;
}

// FAQ schema
export function FAQJsonLd({ 
  faqs 
}: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <JsonLdScript data={data} />;
}

// Breadcrumb schema
export function BreadcrumbJsonLd({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLdScript data={data} />;
}

// Article schema for blog posts
export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  author = siteConfig.author,
  tags = [],
  wordCount,
  readingTime
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: { name: string; url: string };
  tags?: string[];
  wordCount?: number;
  readingTime?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": title,
    "name": title,
    "description": description,
    "image": image || siteConfig.ogImage,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url
    },
    "publisher": {
      "@id": `${siteConfig.url}/#organization`
    },
    "keywords": tags.join(", "),
    ...(wordCount && { "wordCount": wordCount }),
    ...(readingTime && { "timeRequired": `PT${Math.max(1, readingTime)}M` })
  };

  return <JsonLdScript data={data} />;
}