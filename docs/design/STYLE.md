# STYLE.md - Promptly

## Typography
- Stack: Inter, ui-sans-serif
- Sizes:
  - Body: text-base (16) or text-[17px] for long reads; leading-relaxed (~1.6)
  - H3: text-2xl / md:text-[28px] font-semibold leading-snug
  - H2: text-3xl / md:text-[36px] font-semibold tracking-tight
  - H1: text-4xl / md:text-[48px] font-bold tracking-tight
- Max line length: 60-80ch

## Spacing and layout
- Container: mx-auto max-w-[72rem] px-4 sm:px-6 lg:px-8
- Section: py-12 md:py-16 lg:py-20
- Rhythm: multiples of 8. Avoid cramped edges.

## Color and contrast
- Primary:
  - Solid: g-[#7E3AF2] hover:bg-[#6C2BD9] text-white
  - With Tailwind tokens: g-violet-600 hover:bg-violet-700 text-white
- Accent: use #F472B6 sparingly for highlights or chips
- Text: 	ext-slate-900 (light) / 	ext-slate-200 (dark)
- Surfaces: g-white (light) / g-slate-900 (dark)
- Links: 	ext-violet-700 underline-offset-2 hover:underline

## Components - Tailwind recipes
- Primary CTA:
  inline-flex items-center rounded-2xl px-5 py-3 font-medium shadow-sm
   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   focus-visible:ring-violet-600 bg-violet-600 hover:bg-violet-700 text-white
- Secondary button:
  inline-flex items-center rounded-2xl px-5 py-3 font-medium
   ring-1 ring-slate-300 hover:bg-slate-50
- Card:
  ounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm
- Section heading block:
  wrapper: mb-8 - kicker: 	ext-sm text-slate-500 - title: H2 above
- Hero container:
  mx-auto max-w-[68rem] px-4 sm:px-6 lg:px-8 py-20 md:py-28

## Do / Don’t
- Do keep one primary CTA per section. Don’t stack 3 equal buttons.
- Do ensure 4.5:1 contrast for text and CTAs. Don’t use low-contrast pink on white.
- Do cap max widths on long copy. Don’t allow 1200px paragraphs.
