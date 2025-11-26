import { TypeProfile } from '@/data/types';

export interface Superpower {
  title: string;
  description: string;
}

export interface ExtractedContent {
  name: string;
  code: string;
  mbti: string;
  variant: 'standard' | 'jumper';
  functionStack: string;
  mainQuote: string;
  introText: string[];
  coreVibe: string[];
  superpowers: Superpower[];
  saviorFunctions: string[];
  demonFunctions: string[];
  engineExplanation: string[];
  growthPoints: string[];
  essenceQuote: string;
  shortDescription: string;
  color: string;
}

export interface KeyDifference {
  aspect: string;
  standard: string;
  jumper: string;
  icon: string;
}

const MBTI_REGEX = /MBTI:\s*([A-Z]{4})/;

function extractMbti(profile: string): string {
  const match = profile.match(MBTI_REGEX);
  return match ? match[1] : '';
}

function determineVariant(code: string): 'standard' | 'jumper' {
  const [firstRaw, secondRaw] = code.split('/');
  const firstOrientation = firstRaw?.trim().charAt(1).toLowerCase();
  const secondOrientation = secondRaw?.trim().charAt(1).toLowerCase();
  return firstOrientation === secondOrientation ? 'jumper' : 'standard';
}

function parseProfileSections(content: string) {
  const sections = {
    intro: [] as string[],
    coreVibe: [] as string[],
    strengths: [] as string[],
    engine: [] as string[],
    growth: [] as string[],
    essence: [] as string[]
  };

  const lines = content.split('\n');
  let currentSection: keyof typeof sections = 'intro';

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.includes('Core Vibe:')) {
      currentSection = 'coreVibe';
      return;
    } else if (trimmed.includes('What Makes You Different')) {
      currentSection = 'strengths';
      return;
    } else if (trimmed.includes('Your Inner Engine')) {
      currentSection = 'engine';
      return;
    } else if (trimmed.includes("When You're at Your Best")) {
      currentSection = 'growth';
      return;
    } else if (trimmed.includes('The Essence of the')) {
      currentSection = 'essence';
      return;
    }

    if (currentSection === 'intro' && trimmed.startsWith('⭐')) return;
    if (currentSection === 'intro' && trimmed.includes('Savior') && trimmed.includes('Demon')) return;

    sections[currentSection].push(trimmed);
  });

  return sections;
}

function parseStrengths(lines: string[]): Superpower[] {
  const items: Superpower[] = [];
  let currentTitle = '';

  lines.forEach(line => {
    if (line.startsWith('✔')) {
      currentTitle = line.replace('✔', '').trim();
    } else if (currentTitle) {
      items.push({ title: currentTitle, description: line });
      currentTitle = '';
    }
  });

  return items;
}

function extractFunctions(engineLines: string[], type: 'Savior' | 'Demon'): string[] {
  const functions: string[] = [];
  let capture = false;

  engineLines.forEach(line => {
    if (line.includes(type)) {
      capture = true;
      return;
    }
    if (capture && (line.includes('Savior') || line.includes('Demon'))) {
      capture = false;
      return;
    }
    if (capture && line.match(/^[A-Z][a-z]\s*\(/)) {
      functions.push(line);
    }
  });

  return functions;
}

export function extractEnhancedContent(type: TypeProfile): ExtractedContent {
  const sections = parseProfileSections(type.fullProfile);

  const mainQuote = sections.intro.find(line => line.includes('"')) ||
                    sections.essence.find(line => line.includes('"')) || '';

  const introText = sections.intro
    .filter(line => !line.includes('"'))
    .slice(0, 3);

  const coreVibe = sections.coreVibe
    .map(line => line.replace(/^\*\s*/, '').trim())
    .filter(line => line);

  const superpowers = parseStrengths(sections.strengths);

  const saviorFunctions = extractFunctions(sections.engine, 'Savior');
  const demonFunctions = extractFunctions(sections.engine, 'Demon');

  const engineExplanation = sections.engine.filter(line =>
    !line.includes('Savior') &&
    !line.includes('Demon') &&
    !line.match(/^[A-Z][a-z]\s*\(/)
  );

  const growthPoints = sections.growth
    .map(line => line.replace(/^\*\s*/, '').trim())
    .filter(line => line);

  const essenceQuote = sections.essence.find(line => line.includes('"')) ||
                       sections.essence[sections.essence.length - 1] || '';

  return {
    name: type.name,
    code: type.code,
    mbti: extractMbti(type.fullProfile),
    variant: determineVariant(type.code),
    functionStack: type.code,
    mainQuote: mainQuote.replace(/"/g, ''),
    introText,
    coreVibe,
    superpowers,
    saviorFunctions,
    demonFunctions,
    engineExplanation,
    growthPoints,
    essenceQuote: essenceQuote.replace(/"/g, ''),
    shortDescription: type.shortDescription,
    color: type.color
  };
}

export function generateKeyDifferences(
  standard: ExtractedContent,
  jumper: ExtractedContent
): KeyDifference[] {
  // Generate smart differences based on function stacks
  const differences: KeyDifference[] = [];

  // Temporal lens
  differences.push({
    aspect: 'Temporal Lens',
    standard: standard.functionStack.includes('Si') ? 'Past-Informed: Draws wisdom from memories' : 'Detail-oriented focus',
    jumper: jumper.functionStack.includes('Ni') ? 'Future-Aimed: Envisions possibilities ahead' : jumper.functionStack.includes('Se') ? 'Present-Moment: Acts on immediate experience' : 'Explores divergent options',
    icon: '🕰️'
  });

  // Processing style
  differences.push({
    aspect: 'Processing Style',
    standard: 'Contemplative: Takes time to reflect deeply',
    jumper: 'Spontaneous: Trusts instinct and acts on vision',
    icon: '⚡'
  });

  // Information gathering
  differences.push({
    aspect: 'Information Gathering',
    standard: standard.functionStack.includes('Si') ? 'Values concrete details and past precedents' : 'Systematic and thorough',
    jumper: jumper.functionStack.includes('Ni') ? 'Focuses on patterns and future implications' : 'Embraces sensory experience and novelty',
    icon: '📊'
  });

  // Decision energy
  differences.push({
    aspect: 'Decision Energy',
    standard: 'Reflective: Considers what has worked before',
    jumper: 'Intuitive: Follows gut feelings about what could be',
    icon: '💭'
  });

  return differences;
}

export function getRelatedTypes(mbti: string): Array<{mbti: string, name: string, similarity: string, slug: string}> {
  // This would ideally be more sophisticated, but for now return some related types
  const related: Record<string, Array<{mbti: string, similarity: string}>> = {
    'INFP': [
      { mbti: 'INFJ', similarity: 'Similar Fi/Ni introverted depth' },
      { mbti: 'ENFP', similarity: 'Shared Ne-Fi energy' },
      { mbti: 'ISFP', similarity: 'Fi-Se artistic sensitivity' },
      { mbti: 'INTP', similarity: 'Introverted creative thinkers' }
    ],
    'INFJ': [
      { mbti: 'INFP', similarity: 'Similar introverted idealism' },
      { mbti: 'ENFJ', similarity: 'Shared Fe-Ni connection' },
      { mbti: 'INTJ', similarity: 'Ni-Te strategic vision' },
      { mbti: 'ISFJ', similarity: 'Si-Fe nurturing care' }
    ]
    // Add more as needed
  };

  const relatedList = related[mbti] || [];
  return relatedList.map(r => ({
    mbti: r.mbti,
    name: `${r.mbti} Type`,
    similarity: r.similarity,
    slug: r.mbti.toLowerCase()
  }));
}
