import { buildUserPrompt } from '../snippetPrompt';

describe('buildUserPrompt', () => {
  test('builds prompt with minimal input', () => {
    const input = {
      topic: 'test topic',
      language: 'English',
      tone: 'Supportive',
      length: 110
    };

    const prompt = buildUserPrompt(input);

    expect(prompt).toContain('Topic: test topic');
    expect(prompt).toContain('Language: English');
    expect(prompt).toContain('Tone: Supportive');
    expect(prompt).toContain('Length target: 110 words');
    expect(prompt).toContain('Student name (optional): not provided');
    expect(prompt).toContain('- Positives: none');
    expect(prompt).toContain('- Focus: none');
    expect(prompt).toContain('- Next steps: none');
  });

  test('builds prompt with all fields filled', () => {
    const input = {
      topic: 'homework follow up',
      student: 'Alex',
      language: 'German',
      tone: 'Friendly',
      length: 150,
      positives: 'Great participation in class',
      focus: 'completing homework on time',
      next: 'set up a reminder system',
      format: 'email' as const
    };

    const prompt = buildUserPrompt(input);

    expect(prompt).toContain('Topic: homework follow up');
    expect(prompt).toContain('Student name (optional): Alex');
    expect(prompt).toContain('Language: German');
    expect(prompt).toContain('Tone: Friendly');
    expect(prompt).toContain('Length target: 150 words');
    expect(prompt).toContain('- Positives: Great participation in class');
    expect(prompt).toContain('- Focus: completing homework on time');
    expect(prompt).toContain('- Next steps: set up a reminder system');
    expect(prompt).toContain('Format: email');
  });

  test('handles empty student name', () => {
    const input = {
      topic: 'test',
      student: '   ', // whitespace only
      language: 'English',
      tone: 'Supportive',
      length: 100
    };

    const prompt = buildUserPrompt(input);
    expect(prompt).toContain('Student name (optional): not provided');
  });

  test('clamps length values to valid range', () => {
    const lowInput = {
      topic: 'test',
      language: 'English',
      tone: 'Supportive',
      length: 30 // below minimum
    };

    const highInput = {
      topic: 'test',
      language: 'English',
      tone: 'Supportive',
      length: 250 // above maximum
    };

    expect(buildUserPrompt(lowInput)).toContain('Length target: 60 words');
    expect(buildUserPrompt(highInput)).toContain('Length target: 180 words');
  });

  test('handles missing optional fields', () => {
    const input = {
      topic: 'behaviour update',
      language: 'French',
      tone: 'Formal',
      length: 120,
      positives: '', // empty string
      focus: undefined, // undefined
      next: '   ' // whitespace
    };

    const prompt = buildUserPrompt(input);
    expect(prompt).toContain('- Positives: none');
    expect(prompt).toContain('- Focus: none');
    expect(prompt).toContain('- Next steps: none');
  });
});