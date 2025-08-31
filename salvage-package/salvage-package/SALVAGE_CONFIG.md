# SALVAGE CONFIG

## Next.js Configuration

### next.config.mjs
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined
  },
  images: {
    domains: ['zazapromptly.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default withNextIntl(nextConfig);
```

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "build:full": "next build && next-sitemap"
  }
}
```

## Internationalization Setup

### i18n/request.ts
```typescript
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const localeSafe = locale ?? 'en';
  const messages =
    (await import(`../messages/${localeSafe}.json`).catch(() => ({default: {}}))).default;

  return {locale: localeSafe, messages};
});
```

### middleware.ts
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en','de','es','fr','it'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|de|es|fr|it)/:path*']
};
```

## Tailwind CSS Configuration

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          500: '#7c3aed',
          600: '#8b5cf6',
        },
        pink: {
          500: '#ec4899', 
          600: '#f472b6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

## TypeScript Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Environment Variables Required

### .env.local
```bash
# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key_here

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Vercel Deployment
VERCEL_GIT_COMMIT_SHA=auto_populated

# Database (If needed)
DATABASE_URL=postgresql://...
```

## Essential Dependencies

### Production Dependencies
```json
{
  "dependencies": {
    "next": "^15.5.2",
    "react": "^19.1.0", 
    "react-dom": "^19.1.0",
    "next-intl": "^4.3.5",
    "lucide-react": "^0.541.0",
    "framer-motion": "^12.23.12",
    "tailwindcss": "^4.1.12",
    "@headlessui/react": "^2.2.7",
    "clsx": "^2.1.1"
  }
}
```

### Development Dependencies  
```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "15.5.2"
  }
}
```

## Deployment Configuration

### Vercel Settings
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x
- **Environment Variables**: Set in Vercel dashboard

### Performance Optimizations
- Standalone output for smaller deployments
- Image optimization enabled  
- Automatic static optimization
- Bundle analysis via `ANALYZE=true npm run build`