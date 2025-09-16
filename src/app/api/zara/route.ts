import { NextRequest, NextResponse } from 'next/server';
import { ZaraRequest, ZaraResponse, ZARA_SYSTEM_PROMPT, MODE_PREFACES } from '@/components/zara/types';

// Mock OpenAI-style API (replace with real API call)
async function callOpenAI(messages: Array<{role: string, content: string}>, temperature: number = 0.6): Promise<string> {
  // This is a mock implementation for development
  // In production, replace with actual OpenAI API call
  
  const lastMessage = messages[messages.length - 1].content;
  
  // Simple mock responses for testing
  if (lastMessage.includes('photosynthesis')) {
    return `**Summary**: I'll explain photosynthesis at a Grade 6 level with simple language and examples.

**One Helpful Answer**
Photosynthesis is like a plant's way of making food using sunlight! Plants are amazing because they can take three simple things - sunlight, water, and carbon dioxide from the air - and turn them into sugar (food) and oxygen.

Think of it like a kitchen where:
• Sunlight = the energy (like electricity for cooking)
• Water = one ingredient (from roots)  
• Carbon dioxide = another ingredient (from air through leaves)
• Sugar = the food they make
• Oxygen = the leftover that we breathe!

The green color in leaves (chlorophyll) is like the chef that makes this happen.

**Why this works**
Using analogies (kitchen metaphor) helps 6th graders connect new concepts to familiar experiences. Breaking it into simple inputs and outputs matches their concrete thinking stage.

**Differentiation & accommodations**
• ELL: Draw the process, use visual diagrams
• SEND: Use physical props (leaf, flashlight, water) 
• Extension: Research different types of photosynthesis

**Next steps / options**
1. Do a hands-on experiment with aquatic plants showing oxygen bubbles
2. Create a photosynthesis diagram as a class
3. Connect to food chains - where does energy come from?

**Assumptions & info I need**
I assumed Grade 6 science level. Do your students have prior knowledge about cells? Are you covering this in a unit on plants or energy?`;
  }
  
  if (lastMessage.includes('transitions')) {
    return `**Summary**: I'll share proven low-noise transition strategies for Grade 3 that you can start using immediately.

**One Helpful Answer**
• **Silent signals**: Hand raised = everyone raises hand and stops talking. Works because it's visual and gives kids something to DO instead of just "be quiet"
• **Countdown with actions**: "5-finish your sentence, 4-eyes on me, 3-hands empty, 2-ready position, 1-listening ears on"
• **Transition music**: Same 30-second song every time. When it ends, you should be ready. Kids love predictability!
• **Job helpers**: Table captains collect materials while others sit criss-cross. Gives wiggy kids a purposeful job.

**Why this works**
Grade 3 brains need concrete, visual cues more than verbal instructions. Multiple modalities (visual + auditory + movement) reach all learning styles. Predictable routines reduce anxiety.

**Differentiation & accommodations**
• ELL: Use visual cards showing each step
• SEND/ADHD: Practice transitions when calm, give movement jobs
• Extension: Student leaders can demonstrate for younger classes

**Next steps / options**
1. Pick ONE strategy and practice it 3 times when kids aren't excited
2. Post visual reminder cards by your teaching area  
3. Celebrate classes that transition quickly with extra recess time

**Assumptions & info I need**
I assumed a typical classroom setup. Do you have specific transition times that are most challenging? What's your current biggest noise source during transitions?`;
  }

  // Fallback response
  return `I understand you're asking about ${lastMessage}. As a teacher's assistant, I'd be happy to help with practical strategies, explanations, or drafting assistance. Could you provide a bit more specific context about what you'd like help with?`;
}

function detectPII(text: string): boolean {
  // Simple PII detection - look for patterns that might be student names
  const patterns = [
    /\b[A-Z][a-z]+ [A-Z]\./,  // "Jordan A."
    /student.*named/i,
    /my student [A-Z]/i
  ];
  
  return patterns.some(pattern => pattern.test(text));
}

function createPrompt(request: ZaraRequest): string {
  const { mode, tone, language, readingLevel, userText, topic, transform } = request;
  
  // For transform mode, use simple prompts
  if (mode === 'transform' && transform && userText) {
    const transformPrompts = {
      rewrite: `Please rewrite this text more clearly while preserving all spacing and formatting:\n\n${userText}`,
      shorten: `Please shorten this text without losing meaning, preserving formatting:\n\n${userText}`,
      expand: `Please expand this text with one helpful detail, preserving formatting:\n\n${userText}`,
      tone: `Please adjust this text to a ${tone} tone, preserving formatting:\n\n${userText}`,
      translate: `Please translate this text to ${language}, preserving formatting:\n\n${userText}`,
      fix: `Please fix grammar and clarity in this text, preserving formatting:\n\n${userText}`,
      alts: `Please provide 3 concise alternatives for this text:\n\n${userText}`
    };
    
    return transformPrompts[transform] || transformPrompts.rewrite;
  }
  
  // For other modes, use full system prompt
  let preface = MODE_PREFACES[mode] || MODE_PREFACES.advice;
  
  // Replace reading level placeholder
  if (readingLevel && preface.includes('{readingLevel}')) {
    preface = preface.replace('{readingLevel}', readingLevel);
  }
  
  const contextInfo = [];
  if (tone) contextInfo.push(`Tone: ${tone}`);
  if (language && language !== 'en') contextInfo.push(`Language: ${language}`);
  if (readingLevel) contextInfo.push(`Reading level: ${readingLevel}`);
  
  const contextStr = contextInfo.length > 0 ? `\n\nContext: ${contextInfo.join(', ')}` : '';
  
  return `${preface}${contextStr}\n\nUser request: ${topic || userText || 'Please provide general teaching advice.'}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ZaraRequest;
    const { mode, transform, userText, topic } = body;
    
    // Check for PII and add warning if found
    const hasPersonalInfo = userText && detectPII(userText);
    let piiWarning = '';
    if (hasPersonalInfo) {
      piiWarning = 'Tip: Consider anonymizing student details. I\'ll respond with placeholders.\n\n';
    }
    
    // Create the prompt
    const prompt = createPrompt(body);
    
    // Determine temperature based on mode
    const temperature = mode === 'transform' || mode === 'assess' ? 0.4 : 0.6;
    
    // Call AI (mock for now)
    const messages = [
      { role: 'system', content: ZARA_SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ];
    
    const aiResponse = await callOpenAI(messages, temperature);
    
    // For transform mode with alternatives, split the response
    if (mode === 'transform' && transform === 'alts') {
      const lines = aiResponse.split('\n').filter(line => line.trim());
      const variants = lines.slice(0, 3); // Take first 3 non-empty lines
      
      const response: ZaraResponse = {
        text: piiWarning + (variants[0] || aiResponse),
        variants: variants.length > 1 ? variants.slice(1) : undefined
      };
      
      return NextResponse.json(response);
    }
    
    // For regular responses
    const response: ZaraResponse = {
      text: piiWarning + aiResponse
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Zara API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}