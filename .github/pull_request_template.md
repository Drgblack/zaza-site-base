# Pull Request Checklist

Please check all that apply:

## Code Quality & Standards
- [ ] **No homepage design changes** (unless this PR is labeled "homepage")
- [ ] **ESLint + TypeScript pass** (no ignoreDuringBuilds or ignoreBuildErrors)
- [ ] No Vercel toolbar/inspector visible by default

## Feature Flags
- [ ] **Feature flags respected** (Zara off by default unless `NEXT_PUBLIC_ENABLE_ZARA=1`)
- [ ] Toolbar/inspector only loads when `NEXT_PUBLIC_TOOLBAR=1`

## Documentation & Review
- [ ] **Two screenshots attached** (before/after or key functionality)
- [ ] Preview URL tested and working
- [ ] Description explains what changed and why

## Accessibility & Performance
- [ ] Proper semantic HTML and ARIA labels
- [ ] No layout shift introduced
- [ ] Images have alt text
- [ ] Focus states visible and logical

---

## Description
[Describe what this PR changes and why]

## Preview URL
[Add Vercel preview URL here]

## Screenshots
[Attach 2 screenshots showing the changes]

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Verified no console errors
- [ ] Checked Network tab for failed requests