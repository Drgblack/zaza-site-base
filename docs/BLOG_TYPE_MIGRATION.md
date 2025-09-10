# BlogPost Type Migration Guide

## Overview

This guide documents the migration from multiple BlogPost type definitions to a single consolidated interface.

## Current State

We have identified 4 different BlogPost type definitions:
1. `blog-posts-data.ts` - Root level, comprehensive but inconsistent
2. `src/lib/blog-types.ts` - Clean structure, used by some components  
3. `src/lib/blog/blog-data.ts` - Simple, for MDX files
4. `src/lib/mdx.ts` - Basic MDX interface

## Migration Strategy

### Phase 1: Create Consolidated Type ✅
- Created `src/lib/blog/types-consolidated.ts` with:
  - Comprehensive BlogPost interface supporting all existing fields
  - Backward compatibility for deprecated fields
  - Utility functions for normalization and type guards
  - Helper functions for common operations

### Phase 2: Update Imports (TODO)
Replace imports across the codebase:

```typescript
// OLD - Various imports
import { BlogPost } from '../../../blog-posts-data';
import { BlogPost } from '@/lib/blog-types';
import { BlogPost } from '@/lib/blog/blog-data';

// NEW - Single import
import { BlogPost } from '@/lib/blog/types-consolidated';
```

### Phase 3: Update Components (TODO)
Update components to use helper functions instead of inline type checking:

```typescript
// OLD
<span>{typeof post.author === 'string' ? post.author : post.author?.name}</span>

// NEW
import { getAuthorName } from '@/lib/blog/types-consolidated';
<span>{getAuthorName(post.author)}</span>
```

### Phase 4: Normalize Data Sources (TODO)
Update data fetching to use normalization:

```typescript
import { normalizeBlogPost } from '@/lib/blog/types-consolidated';

// When fetching blog posts
const posts = rawPosts.map(normalizeBlogPost);
```

### Phase 5: Deprecate Old Types (TODO)
Once all components are migrated:
1. Add deprecation notices to old type files
2. Run tests to ensure no regressions
3. Remove old type definitions

## Field Mappings

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `date` | `publishedAt` | Keep `date` for backward compatibility |
| `featuredImage` | `image` | Keep `featuredImage` for backward compatibility |
| `readTime` | `readingTime` | Support both string and number |
| `authorBio` | `author.bio` | When author is object |

## Benefits

1. **Type Safety**: Single source of truth
2. **Developer Experience**: Clear which interface to use
3. **Maintainability**: Changes in one place
4. **Performance**: No runtime type checking needed
5. **Flexibility**: Supports gradual migration

## Timeline

- Phase 1: ✅ Complete
- Phase 2: Ready to start
- Phase 3-5: Dependent on Phase 2 completion

## Testing Checklist

- [ ] All blog pages load correctly
- [ ] Blog post data displays properly
- [ ] Author information shows correctly
- [ ] Categories and tags work
- [ ] SEO metadata is preserved
- [ ] No TypeScript errors
- [ ] No runtime errors

## Notes

- The consolidated type supports both old and new field names during migration
- Helper functions handle the complexity of different data shapes
- Components can be migrated one at a time
- No breaking changes for existing functionality