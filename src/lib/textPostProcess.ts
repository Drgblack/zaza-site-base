/**
 * Text post-processor for snippet output
 * Ensures consistent formatting and quality
 */

export function polish(text: string): string {
  let s = text.trim()
    .replace(/\n{3,}/g, '\n\n')  // Max 2 consecutive newlines
    .replace(/\s{2,}/g, ' ');    // Collapse multiple spaces
  
  // Capitalize sentence starts
  s = s.replace(/(^|[.!?]\s+)([a-z])/g, (_, p, c) => (p || '') + c.toUpperCase());
  
  // Clamp to 4 paragraphs, each ≤ 3 sentences
  const paras = s.split(/\n+/).slice(0, 4).map(p => {
    const parts = p.split(/(?<=[.!?])\s+/).slice(0, 3);
    return parts.join(' ');
  });
  
  return paras.join('\n\n');
}

export function fallbackMessage(name = "your child"): string {
  const pronoun = name === "your child" ? "They" : name;
  
  return polish(`Hi there – I wanted to share a quick update about ${name}. ${pronoun} showed effort this week and worked well with classmates. We also noticed a few moments where focus slipped, which makes it harder to start tasks quickly. Could we try a two-step cue at home and school – quick reminder, then a short check-in? Your insights really help. Please reply if there is anything that would make routines easier. Thanks for partnering with me.`);
}