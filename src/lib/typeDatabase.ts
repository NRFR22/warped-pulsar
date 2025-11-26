import { FuncCode, StackFunction } from '@/components/FunctionStackBoard';

// All 16 MBTI types with their function stacks
export const TYPE_STACKS: Record<string, FuncCode[]> = {
    // Introverted Feeling (Fi) dominant
    'INFP': ['Fi', 'Ne', 'Si', 'Te'],
    'ISFP': ['Fi', 'Se', 'Ni', 'Te'],

    // Introverted Intuition (Ni) dominant
    'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
    'INTJ': ['Ni', 'Te', 'Fi', 'Se'],

    // Introverted Thinking (Ti) dominant
    'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
    'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],

    // Introverted Sensing (Si) dominant
    'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
    'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],

    // Extraverted Feeling (Fe) dominant
    'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
    'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],

    // Extraverted Intuition (Ne) dominant
    'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
    'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],

    // Extraverted Thinking (Te) dominant
    'ENTJ': ['Te', 'Ni', 'Se', 'Fi'],
    'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],

    // Extraverted Sensing (Se) dominant
    'ESFP': ['Se', 'Fi', 'Te', 'Ni'],
    'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
};

export type TypeConfig = 'standard' | 'jumper';

/**
 * Generate a StackFunction array from a type code and config
 * Standard: saviors are 1st & 2nd
 * Jumper: saviors are 1st & 3rd
 */
export function generateStack(typeCode: string, config: TypeConfig): StackFunction[] {
    const functions = TYPE_STACKS[typeCode.toUpperCase()];
    if (!functions) {
        throw new Error(`Unknown type: ${typeCode}`);
    }

    const isStandard = config === 'standard';

    return [
        {
            id: 'A',
            code: functions[0],
            index: 1,
            isSavior: true, // 1st is always savior
        },
        {
            id: 'B',
            code: functions[1],
            index: 2,
            isSavior: isStandard, // 2nd is savior in standard, demon in jumper
        },
        {
            id: 'C',
            code: functions[2],
            index: 3,
            isSavior: !isStandard, // 3rd is demon in standard, savior in jumper
        },
        {
            id: 'D',
            code: functions[3],
            index: 4,
            isSavior: false, // 4th is always demon
        },
    ];
}

/**
 * Get a display label for a type + config
 */
export function getTypeLabel(typeCode: string, config: TypeConfig): string {
    return `${typeCode.toUpperCase()} (${config === 'standard' ? 'Standard' : 'Jumper'})`;
}

/**
 * Get a description for a type + config
 */
export function getTypeDescription(typeCode: string, config: TypeConfig): string {
    const functions = TYPE_STACKS[typeCode.toUpperCase()];
    if (!functions) return '';

    const stackStr = functions.join(' / ');
    const saviorInfo = config === 'standard'
        ? 'Standard saviors (1st & 2nd)'
        : 'Jumper saviors (1st & 3rd)';

    return `${stackStr} - ${saviorInfo}`;
}

/**
 * Get all available type options
 */
export function getAllTypeOptions(): Array<{ value: string; label: string; description: string; stack: StackFunction[] }> {
    const options: Array<{ value: string; label: string; description: string; stack: StackFunction[] }> = [];

    // Get all type codes
    const typeCodes = Object.keys(TYPE_STACKS).sort();

    // For each type, create both standard and jumper variants
    for (const typeCode of typeCodes) {
        // Standard variant
        options.push({
            value: `${typeCode}-standard`,
            label: getTypeLabel(typeCode, 'standard'),
            description: getTypeDescription(typeCode, 'standard'),
            stack: generateStack(typeCode, 'standard'),
        });

        // Jumper variant
        options.push({
            value: `${typeCode}-jumper`,
            label: getTypeLabel(typeCode, 'jumper'),
            description: getTypeDescription(typeCode, 'jumper'),
            stack: generateStack(typeCode, 'jumper'),
        });
    }

    return options;
}

/**
 * Get type option by value (e.g., "INFP-standard")
 */
export function getTypeOption(value: string): { value: string; label: string; description: string; stack: StackFunction[] } | null {
    const [typeCode, configStr] = value.split('-');
    const config = configStr as TypeConfig;

    if (!TYPE_STACKS[typeCode.toUpperCase()] || !['standard', 'jumper'].includes(config)) {
        return null;
    }

    return {
        value,
        label: getTypeLabel(typeCode, config),
        description: getTypeDescription(typeCode, config),
        stack: generateStack(typeCode, config),
    };
}
