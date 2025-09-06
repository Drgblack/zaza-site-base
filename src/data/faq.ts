export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Basic setup and first steps'
  },
  {
    id: 'writing-features',
    name: 'Writing & Features',
    description: 'How to use Promptly effectively'
  },
  {
    id: 'classroom-pedagogy',
    name: 'Classroom & Pedagogy',
    description: 'Teaching practices and school policies'
  },
  {
    id: 'accounts-billing',
    name: 'Accounts & Billing',
    description: 'Plans, payments, and invoicing'
  },
  {
    id: 'privacy-safety',
    name: 'Privacy & Safety',
    description: 'Data protection and student safety'
  },
  {
    id: 'technical-integrations',
    name: 'Technical & Integrations',
    description: 'Browser support and system requirements'
  }
];

export const faqData: FAQItem[] = [
  // Getting Started
  {
    id: 'getting-started-what-is-promptly',
    category: 'getting-started',
    question: 'What is Zaza Promptly?',
    answer: 'Zaza Promptly is a teacher-friendly writing assistant that helps you draft clear, caring parent messages in minutes. It suggests phrasing, tone, translations, and helpful closing lines so you can spend less time writing and more time teaching.',
    keywords: ['zaza promptly', 'writing assistant', 'teacher tool', 'parent messages', 'what is promptly']
  },
  {
    id: 'getting-started-who-for',
    category: 'getting-started',
    question: 'Who is Promptly for?',
    answer: 'Teachers and school staff who write to parents and caregivers. It\'s perfect for quick replies, sensitive updates, reminders, and report comments.',
    keywords: ['teachers', 'school staff', 'parents', 'caregivers', 'who can use']
  },
  {
    id: 'getting-started-sign-up',
    category: 'getting-started',
    question: 'How do I sign up?',
    answer: 'Go to / and select Get Started. Create an account with your email or Google login. You can start with the free plan and upgrade anytime on /pricing.',
    keywords: ['sign up', 'create account', 'register', 'get started', 'email', 'google login']
  },
  {
    id: 'getting-started-school-devices',
    category: 'getting-started',
    question: 'Does Promptly work on school devices?',
    answer: 'Yes. Promptly runs in the browser, so it works on most school laptops and desktops. If your school has strict network rules, share our /support page with IT to allow required domains.',
    keywords: ['school devices', 'browser', 'laptops', 'desktops', 'network rules', 'IT support']
  },
  {
    id: 'getting-started-free-trial',
    category: 'getting-started',
    question: 'Is there a free plan or trial?',
    answer: 'Yes. You can try Promptly on a free plan. For the latest plan details, see /pricing.',
    keywords: ['free plan', 'trial', 'pricing', 'free version', 'cost']
  },

  // Writing & Features
  {
    id: 'writing-features-write-faster',
    category: 'writing-features',
    question: 'How does Promptly help me write faster?',
    answer: 'Type a few notes about the situation and your goal. Promptly drafts a message you can accept or edit. It can rewrite for clarity, soften tone, shorten or expand, translate, and suggest professional closings.',
    keywords: ['write faster', 'draft messages', 'rewrite', 'clarity', 'tone', 'translate', 'professional closings']
  },
  {
    id: 'writing-features-tone-style',
    category: 'writing-features',
    question: 'Can Promptly match my tone and school style?',
    answer: 'Yes. Use the tone options or paste a short sample of your style. Promptly will adapt to be warm, professional, and parent-friendly.',
    keywords: ['tone matching', 'school style', 'warm', 'professional', 'parent-friendly', 'style adaptation']
  },
  {
    id: 'writing-features-translate',
    category: 'writing-features',
    question: 'Does Promptly translate messages?',
    answer: 'Yes. You can translate messages to many languages and also translate replies back to your language for quick understanding. Always check with your school policies before sending.',
    keywords: ['translate', 'translation', 'languages', 'multilingual', 'school policies']
  },
  {
    id: 'writing-features-save-reuse',
    category: 'writing-features',
    question: 'Can I save and reuse messages?',
    answer: 'Yes. Save messages to your personal library as reusable templates. You can organize them by topic like Attendance, Homework, Behavior, and Celebrations.',
    keywords: ['save messages', 'reuse', 'templates', 'library', 'attendance', 'homework', 'behavior', 'celebrations']
  },
  {
    id: 'writing-features-humanize',
    category: 'writing-features',
    question: 'How do you prevent AI-sounding text?',
    answer: 'We tune for clarity and plain language. You can click Humanize for simpler phrasing, reduce formality, and remove fluff so it reads like you.',
    keywords: ['humanize', 'AI-sounding', 'clarity', 'plain language', 'simpler phrasing', 'natural writing']
  },
  {
    id: 'writing-features-accuracy',
    category: 'writing-features',
    question: 'Will Promptly make things up?',
    answer: 'Promptly avoids unsupported claims and sticks to what you provide. If a detail is uncertain, it suggests neutral wording or a follow-up question. Always review before sending.',
    keywords: ['accuracy', 'make up', 'unsupported claims', 'neutral wording', 'follow-up', 'review']
  },
  {
    id: 'writing-features-sensitive-topics',
    category: 'writing-features',
    question: 'Can Promptly help with sensitive topics?',
    answer: 'Yes. Use the Sensitive Topic option for careful, balanced language with empathy and clear next steps. You decide what to send.',
    keywords: ['sensitive topics', 'careful language', 'balanced', 'empathy', 'next steps', 'difficult conversations']
  },
  {
    id: 'writing-features-vs-chatgpt',
    category: 'writing-features',
    question: 'Why not just use ChatGPT?',
    answer: 'ChatGPT is general-purpose. Promptly is built for teacher-to-parent messages, so it is faster and safer for your workflow. You get classroom-ready templates, sensitive-topic guidance, tone presets that sound like a caring teacher, parent-friendly translations, policy reminders, a reusable message library, and guardrails that avoid made-up details. The result - fewer prompts, quicker drafts, and messages that match school expectations and privacy needs.',
    keywords: ['ChatGPT comparison', 'teacher-specific', 'classroom-ready', 'templates', 'policy reminders', 'privacy needs', 'school expectations']
  },

  // Classroom & Pedagogy
  {
    id: 'classroom-pedagogy-school-policies',
    category: 'classroom-pedagogy',
    question: 'Does Promptly respect school policies?',
    answer: 'Yes. You\'re always in control. Promptly offers suggestions that you approve. You can add your policy links or required phrases to keep messages aligned with your school.',
    keywords: ['school policies', 'control', 'suggestions', 'policy links', 'required phrases', 'alignment']
  },
  {
    id: 'classroom-pedagogy-concise-messages',
    category: 'classroom-pedagogy',
    question: 'How do I keep messages concise for busy parents?',
    answer: 'Use Shorten or Key Points. We keep the most important details, timelines, and actions while staying supportive and clear.',
    keywords: ['concise messages', 'busy parents', 'shorten', 'key points', 'important details', 'timelines', 'actions']
  },
  {
    id: 'classroom-pedagogy-behavior-attendance',
    category: 'classroom-pedagogy',
    question: 'Can Promptly help with behavior or attendance updates?',
    answer: 'Yes. Pick a template, add context, and choose your tone. Promptly keeps language factual, respectful, and solution-focused.',
    keywords: ['behavior updates', 'attendance', 'templates', 'context', 'factual', 'respectful', 'solution-focused']
  },
  {
    id: 'classroom-pedagogy-is-cheating',
    category: 'classroom-pedagogy',
    question: 'Is using Promptly "cheating"?',
    answer: 'No. Promptly is a professional writing assistant for teachers - like a translator, style guide, or spell-check. You provide the facts, judgment, and intent. Promptly helps with clarity, tone, and translations, but you review and decide what to send. Follow your school\'s policy. If disclosure is required, add a short note like "Drafted with AI assistance." Avoid sharing more personal data than needed and keep messages factual and respectful.',
    keywords: ['cheating', 'professional writing assistant', 'translator', 'style guide', 'facts', 'judgment', 'school policy', 'AI assistance', 'disclosure']
  },

  // Accounts & Billing
  {
    id: 'accounts-billing-upgrade-cancel',
    category: 'accounts-billing',
    question: 'How do I upgrade, change plans, or cancel?',
    answer: 'Visit /pricing to upgrade. To change or cancel, go to Account → Billing in the app and follow the steps. Changes take effect immediately, and you keep access until the end of the current period.',
    keywords: ['upgrade', 'change plans', 'cancel', 'pricing', 'billing', 'account', 'immediate changes']
  },
  {
    id: 'accounts-billing-school-plans',
    category: 'accounts-billing',
    question: 'Do you offer school or team plans?',
    answer: 'Yes. We support purchase orders and group billing for schools and districts. Contact us via /support to request a quote.',
    keywords: ['school plans', 'team plans', 'purchase orders', 'group billing', 'schools', 'districts', 'quote']
  },
  {
    id: 'accounts-billing-invoices-vat',
    category: 'accounts-billing',
    question: 'Can I get invoices with VAT details?',
    answer: 'Yes. Add your billing details in Account → Billing and download invoices anytime. For corrections, reach us via /support.',
    keywords: ['invoices', 'VAT', 'billing details', 'download', 'corrections', 'support']
  },

  // Privacy & Safety
  {
    id: 'privacy-safety-student-information',
    category: 'privacy-safety',
    question: 'Is student information safe?',
    answer: 'We take privacy seriously. Do not include more personal information than needed. We protect your data with encryption and strict access controls. We never sell your data. See /privacy for details.',
    keywords: ['student information', 'privacy', 'personal information', 'encryption', 'access controls', 'data protection', 'never sell data']
  },
  {
    id: 'privacy-safety-gdpr',
    category: 'privacy-safety',
    question: 'Do you comply with GDPR?',
    answer: 'We operate with GDPR principles in mind and provide tools to access or delete your data. For data processing questions or a DPA request, contact us via /support.',
    keywords: ['GDPR', 'compliance', 'data access', 'data deletion', 'DPA request', 'data processing']
  },
  {
    id: 'privacy-safety-delete-account',
    category: 'privacy-safety',
    question: 'Can I delete my data and account?',
    answer: 'Yes. Go to Account → Settings to request deletion. We\'ll remove your account data according to our /privacy policy and any legal requirements.',
    keywords: ['delete data', 'delete account', 'account settings', 'data removal', 'privacy policy', 'legal requirements']
  },

  // Technical & Integrations
  {
    id: 'technical-integrations-browser-support',
    category: 'technical-integrations',
    question: 'Which browsers does Promptly support?',
    answer: 'Promptly supports current versions of Chrome, Edge, Firefox, and Safari on desktop. Mobile works in the browser, with best results on larger screens.',
    keywords: ['browser support', 'Chrome', 'Edge', 'Firefox', 'Safari', 'desktop', 'mobile', 'larger screens']
  },
  {
    id: 'technical-integrations-email-lms',
    category: 'technical-integrations',
    question: 'Does Promptly integrate with my email or LMS?',
    answer: 'You can copy-paste messages into Gmail, Outlook, or your LMS. Deeper integrations are on our roadmap. Tell us what you need at /support.',
    keywords: ['integrations', 'email', 'LMS', 'Gmail', 'Outlook', 'copy-paste', 'roadmap', 'support']
  },
  {
    id: 'technical-integrations-offline',
    category: 'technical-integrations',
    question: 'Does Promptly work offline?',
    answer: 'No. Promptly needs an internet connection to generate or translate text.',
    keywords: ['offline', 'internet connection', 'generate text', 'translate', 'online only']
  },
  {
    id: 'technical-integrations-contact-support',
    category: 'technical-integrations',
    question: 'How do I contact support?',
    answer: 'Go to /support. Share your issue and steps to reproduce. We aim to respond quickly and keep teachers moving.',
    keywords: ['contact support', 'support page', 'issue', 'steps to reproduce', 'quick response', 'teachers']
  }
];

// Helper function to get FAQs by category
export function getFAQsByCategory(categoryId: string): FAQItem[] {
  return faqData.filter(faq => faq.category === categoryId);
}

// Helper function to search FAQs
export function searchFAQs(query: string): FAQItem[] {
  if (!query.trim()) return faqData;
  
  const searchTerm = query.toLowerCase().trim();
  return faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm) ||
    faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
}

// Helper function to get category by ID
export function getCategoryById(id: string): FAQCategory | undefined {
  return faqCategories.find(cat => cat.id === id);
}