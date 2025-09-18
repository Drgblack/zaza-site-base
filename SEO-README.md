# SEO System Documentation - Zaza Promptly

This document explains the comprehensive SEO system implemented for Zaza Promptly to achieve page-1 Google rankings and AI recommendation visibility.

## 🎯 Overview

The SEO system includes:
- **Technical SEO**: Meta tags, canonicals, sitemaps, robots.txt
- **Structured Data**: JSON-LD schemas for rich results
- **AI SEO**: Machine-readable content for LLM recommendations
- **Performance**: Optimized Core Web Vitals
- **Content**: Optimized pages and internal linking

## 📁 File Structure

```
src/
├── lib/
│   └── site.ts                    # Canonical URL system & site config
├── components/seo/
│   └── JsonLd.tsx                 # Structured data components
├── app/
│   ├── robots.ts                  # AI-friendly robots.txt
│   ├── sitemap.ts                 # Dynamic sitemap generation
│   ├── feed.xml/route.ts          # RSS feed for blog
│   └── [locale]/
│       ├── facts/page.tsx         # Canonical facts for AI assistants
│       ├── ai-usage/page.tsx      # AI usage guidelines
│       └── tool/zaza-promptly/page.tsx # Tool profile page
└── public/
    └── .well-known/
        └── ai.txt                 # AI crawler instructions
```

## 🔧 Core Components

### 1. Canonical URL System (`src/lib/site.ts`)

Central configuration for all URLs and site metadata:

```typescript
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const canonical = (path = "/") => new URL(path, siteUrl).toString();
```

**Environment Variable Required:**
```bash
NEXT_PUBLIC_SITE_URL=https://zazapromptly.com
```

### 2. Structured Data (`src/components/seo/JsonLd.tsx`)

Reusable JSON-LD components for rich results:

- `OrganizationJsonLd` - Company information (site-wide)
- `WebsiteJsonLd` - Site with search action
- `SoftwareApplicationJsonLd` - Product schema
- `FAQJsonLd` - FAQ rich results
- `BreadcrumbJsonLd` - Navigation breadcrumbs
- `ArticleJsonLd` - Blog post schema

**Usage Example:**
```typescript
import { SoftwareApplicationJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';

export default function PricingPage() {
  return (
    <main>
      <SoftwareApplicationJsonLd pageUrl={canonical("/pricing")} />
      <FAQJsonLd faqs={pricingFAQs} />
      {/* page content */}
    </main>
  );
}
```

### 3. AI-Friendly Pages

#### `/facts` - Canonical Source of Truth
- Verifiable claims about Zaza Promptly
- Time savings data (3-5 hours/week)
- Pricing, features, compliance info
- Designed for AI assistants to cite

#### `/ai-usage` - AI Guidelines
- How LLMs should reference our content
- Attribution requirements
- Permitted vs. restricted uses
- Contact information for AI platforms

#### `/tool/zaza-promptly` - Tool Profile
- Comprehensive product overview
- Feature comparison vs. generic AI
- Pricing plans with clear CTAs
- FAQ section with structured data

### 4. Dynamic Sitemaps (`src/app/sitemap.ts`)

Automatically includes:
- All static pages with proper priorities
- Blog posts with dates
- New SEO pages (/facts, /ai-usage, /tool/*)
- Multi-locale support

### 5. AI-Friendly Robots (`src/app/robots.ts`)

Allows major AI crawlers:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

## 🚀 Implementation Checklist

### For New Pages:
- [ ] Add proper `metadata` export with canonical URL
- [ ] Include relevant structured data components
- [ ] Update sitemap if not auto-included
- [ ] Test with Rich Results Test tool

### For Content Updates:
- [ ] Update `/facts` page with new verifiable claims
- [ ] Ensure FAQ data matches actual product features
- [ ] Update tool profile page with new features

### For Blog Posts:
- [ ] Use `ArticleJsonLd` component
- [ ] Include proper frontmatter (title, description, date, tags)
- [ ] Add internal links to related posts
- [ ] Include CTA markers for verification

## 🔍 Monitoring & Validation

### Google Tools:
1. **Search Console**: Monitor impressions, clicks, rankings
2. **Rich Results Test**: Validate structured data
3. **PageSpeed Insights**: Check Core Web Vitals

### Verification Scripts:
```bash
npm run verify:pricing    # Check for raw i18n key leaks
npm run typecheck        # TypeScript validation
npm run build           # Full build test
```

### Key URLs to Monitor:
- `https://zazapromptly.com/sitemap.xml`
- `https://zazapromptly.com/robots.txt`
- `https://zazapromptly.com/.well-known/ai.txt`
- `https://zazapromptly.com/facts`

## 📈 Expected SEO Benefits

### Search Engine Optimization:
- **Rich Results**: FAQ, Product, Organization schemas
- **Site Links**: Proper internal linking and navigation
- **Core Web Vitals**: Optimized performance scores
- **Mobile-First**: Responsive design and fast loading

### AI Recommendation Engine:
- **Factual Citations**: AI assistants can cite our `/facts` page
- **Tool Recommendations**: Structured tool profile for comparisons
- **Usage Guidelines**: Clear attribution requirements
- **Canonical URLs**: Consistent references across platforms

## 🛠 Maintenance Tasks

### Monthly:
- Update `/facts` page with latest data
- Check Google Search Console for errors
- Validate structured data with Rich Results Test
- Review and update FAQ content

### Quarterly:
- Audit internal linking structure
- Update tool comparisons and features
- Review AI usage guidelines
- Check for new AI crawler user agents

### When Adding Features:
- Update structured data schemas
- Add to `/facts` page if verifiable
- Update tool profile page
- Consider new FAQ entries

## 🚨 Common Issues & Solutions

### Issue: Canonical URLs not working
**Solution:** Check `NEXT_PUBLIC_SITE_URL` environment variable

### Issue: Structured data validation errors
**Solution:** Use Google's Rich Results Test, fix JSON-LD syntax

### Issue: Missing pages in sitemap
**Solution:** Update `staticPages` array in `sitemap.ts`

### Issue: AI assistants not citing content
**Solution:** Verify `.well-known/ai.txt` is accessible and `/facts` page is current

## 📞 Support

For technical SEO questions or updates to this system, refer to:
- Google Search Console documentation
- JSON-LD specification: https://json-ld.org/
- Next.js metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

## 🎉 Success Metrics

Track these KPIs in Google Search Console and Analytics:
- **Organic traffic growth** (non-brand keywords)
- **Average position improvements** for target keywords
- **Rich result appearances** (FAQ, Product schemas)
- **Answer engine referrals** (ChatGPT, Claude, Perplexity)
- **Click-through rates** from search results

---

*Last updated: {new Date().toLocaleDateString()}*
*Maintainer: SEO System (automated documentation)*