export const FAMILY_GROUPS = [
    {
        id: 'feeling',
        title: 'Feeling',
        description: 'Lead with empathy, harmony, and personal values.',
        accent: '#ffe5e0',
        accentBorder: '#f5a097',
        families: [
            { id: 'fe', code: 'Fe', name: 'Fe-types', label: 'Expressive Feeling', description: 'External empathy, social calibration, warmth that broadcasts out.', color: 'var(--color-f)' },
            { id: 'fi', code: 'Fi', name: 'Fi-types', label: 'Internal Feeling', description: 'Inner conviction, authenticity, a strong personal moral compass.', color: 'var(--color-f)' },
        ],
    },
    {
        id: 'thinking',
        title: 'Thinking',
        description: 'Solve problems with logic, structure, and proof.',
        accent: '#e0ecff',
        accentBorder: '#9dbcf8',
        families: [
            { id: 'te', code: 'Te', name: 'Te-types', label: 'Extroverted Thinking', description: 'Efficiency, metrics, operational clarity in the real world.', color: 'var(--color-t)' },
            { id: 'ti', code: 'Ti', name: 'Ti-types', label: 'Introverted Thinking', description: 'Internal logic, precision, frameworks that make sense to you first.', color: 'var(--color-t)' },
        ],
    },
    {
        id: 'intuition',
        title: 'Intuition',
        description: 'Spot patterns, possibilities, and abstract meaning.',
        accent: '#fff6da',
        accentBorder: '#ffd063',
        families: [
            { id: 'ne', code: 'Ne', name: 'Ne-types', label: 'Extroverted Intuition', description: 'Brainstorming, divergent ideas, connecting dots out loud.', color: 'var(--color-n)' },
            { id: 'ni', code: 'Ni', name: 'Ni-types', label: 'Introverted Intuition', description: 'Long-range vision, distilled insights, strategic foresight.', color: 'var(--color-n)' },
        ],
    },
    {
        id: 'sensing',
        title: 'Sensing',
        description: 'Trust real-world data, routines, and concrete experience.',
        accent: '#e0f6e8',
        accentBorder: '#96ddb0',
        families: [
            { id: 'se', code: 'Se', name: 'Se-types', label: 'Extroverted Sensing', description: 'In-the-moment action, improvisation, reacting quickly to reality.', color: 'var(--color-s)' },
            { id: 'si', code: 'Si', name: 'Si-types', label: 'Introverted Sensing', description: 'Reliability, detailed recall, steady traditions and systems.', color: 'var(--color-s)' },
        ],
    },
];
