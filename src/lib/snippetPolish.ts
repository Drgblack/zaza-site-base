export function polish(text: string): string {
  let t = text.trim().replace(/\n{3,}/g, "\n\n").replace(/\s{2,}/g, " ");
  
  // Capitalize sentence starts
  t = t.replace(/(^|[.!?]\s+)([a-z])/g, (_, p, c) => (p || "") + c.toUpperCase());
  
  // Clamp to ≤ 4 paragraphs, each ≤ 3 sentences
  t = t.split(/\n+/).slice(0, 4).map(p => {
    const s = p.split(/(?<=[.!?])\s+/).slice(0, 3);
    return s.join(" ");
  }).join("\n\n");
  
  return t;
}

export function failsRubric(t: string, fmt: "email" | "sms"): boolean {
  const banned = /\b(lazy|disruptive|disorder|diagnos|blame|bad kid)\b/i.test(t);
  const wc = t.split(/\s+/).filter(Boolean).length;
  const tooLong = fmt === "sms" ? wc > 80 : wc > 130;
  const tooShort = fmt === "sms" ? wc < 40 : wc < 80;
  
  return banned || tooLong || tooShort;
}

export function getWordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function createFallbackMessage(student?: string, topic?: string): string {
  const studentName = student || "your child";
  const fallbackTopic = topic || "classroom progress";
  
  return `Hi there! I wanted to share a quick update about ${studentName}.

${studentName} brings positive energy to our classroom and works well with classmates. Today I noticed some areas where we can work together to support ${studentName === "your child" ? "them" : "him"} even more.

At home, you might try checking in after school about the day's highlights. This can help reinforce the learning we're doing in class.

Please feel free to reach out if you have any questions. Thanks for being such a supportive partner!`;
}