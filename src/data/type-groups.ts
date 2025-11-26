import { typesData } from './types';

const EXT_FUNCTIONS = ['Fe', 'Te', 'Ne', 'Se'];

const getMbtiFromCode = (code: string) => {
    const [rawFirst, rawSecond] = code.split('/');
    const first = rawFirst.trim();
    const second = rawSecond.trim();

    const perceivingFunc = ['N', 'S'].includes(first[0]) ? first : second;
    const judgingFunc = ['F', 'T'].includes(first[0]) ? first : second;
    const dominantIsExt = EXT_FUNCTIONS.includes(first);

    const mbtiFirst = dominantIsExt ? 'E' : 'I';
    const mbtiSecond = perceivingFunc[0];
    const mbtiThird = judgingFunc[0];

    let mbtiFourth = 'P';
    if (mbtiFirst === 'E') {
        mbtiFourth = ['F', 'T'].includes(first[0]) ? 'J' : 'P';
    } else {
        const extFunc = EXT_FUNCTIONS.includes(first) ? first : second;
        mbtiFourth = ['F', 'T'].includes(extFunc[0]) ? 'J' : 'P';
    }

    return `${mbtiFirst}${mbtiSecond}${mbtiThird}${mbtiFourth}`;
};

const TYPE_ORDER: Record<string, string[]> = {
    Fi: ['Fi/Si', 'Fi/Ne', 'Fi/Ni', 'Fi/Se'],
    Ti: ['Ti/Ni', 'Ti/Se', 'Ti/Si', 'Ti/Ne'],
    Fe: ['Fe/Ni', 'Fe/Se', 'Fe/Si', 'Fe/Ne'],
    Te: ['Te/Ni', 'Te/Se', 'Te/Si', 'Te/Ne'],
    Ne: ['Ne/Fi', 'Ne/Te', 'Ne/Ti', 'Ne/Fe'],
    Se: ['Se/Ti', 'Se/Fe', 'Se/Fi', 'Se/Te'],
    Ni: ['Ni/Fi', 'Ni/Te', 'Ni/Ti', 'Ni/Fe'],
    Si: ['Si/Fi', 'Si/Te', 'Si/Ti', 'Si/Fe'],
};

const getOrderIndex = (prefix: string, code: string, fallback: number) => {
    const order = TYPE_ORDER[prefix];
    if (!order) return fallback;
    const idx = order.indexOf(code);
    return idx === -1 ? fallback : idx;
};

const MBTI_REGEX = /MBTI:\s*([A-Z]{4})/;

const getMbtiLabel = (profile: string, fallbackCode: string) => {
    const match = profile.match(MBTI_REGEX);
    if (match) {
        return match[1];
    }
    return getMbtiFromCode(fallbackCode);
};

const swapOrientation = (func: string) => {
    if (func.length < 2) return func;
    const [letter, orientation] = [func[0], func[1]];
    const flipped = orientation.toLowerCase() === 'i' ? 'e' : 'i';
    return `${letter}${flipped}`;
};

const swapFunctionLetter = (func: string) => {
    const swaps: Record<string, string> = { F: 'T', T: 'F', N: 'S', S: 'N' };
    const letter = swaps[func[0].toUpperCase()] || func[0];
    const orientation = func[1] || '';
    return `${letter}${orientation}`;
};

const getFunctionStack = (code: string) => {
    const [firstRaw, secondRaw] = code.split('/');
    const first = firstRaw.trim();
    const second = secondRaw.trim();
    const third = swapOrientation(swapFunctionLetter(second));
    const fourth = swapOrientation(swapFunctionLetter(first));
    return `${first}/${second}/${third}/${fourth}`;
};

const BASE_GROUPS = [
    {
        id: 'individualists',
        label: 'Individualists',
        description: 'Guided by their own inner standards and a strong sense of personal direction.',
        accent: '#f1f1f5',
        functionHint: '(Fi or Ti dominant)',
        mbtiOrder: ['INFP', 'ISFP', 'INTP', 'ISTP'],
        branches: [
            { id: 'fi', label: 'Feeler (Fi)', description: 'Lead with internal values and authenticity.', prefix: 'Fi' },
            { id: 'ti', label: 'Thinker (Ti)', description: 'Lead with internal logic and precision.', prefix: 'Ti' },
        ],
    },
    {
        id: 'collaborators',
        label: 'Collaborators',
        description: 'Naturally attuned to others and motivated by shared connection and alignment.',
        accent: '#ffb3c1',
        functionHint: '(Fe or Te dominant)',
        mbtiOrder: ['ENFJ', 'ESFJ', 'ENTJ', 'ESTJ'],
        branches: [
            { id: 'fe', label: 'Feeler (Fe)', description: 'Lead with external empathy and harmony.', prefix: 'Fe' },
            { id: 'te', label: 'Thinker (Te)', description: 'Lead with external systems and execution.', prefix: 'Te' },
        ],
    },
    {
        id: 'explorers',
        label: 'Explorers',
        description: 'Driven by curiosity and the desire to experience new possibilities.',
        accent: '#d7f3e3',
        functionHint: '(Ne or Se dominant)',
        mbtiOrder: ['ENFP', 'ENTP', 'ESFP', 'ESTP'],
        branches: [
            { id: 'ne', label: 'Intuition (Ne)', description: 'Lead with divergent possibilities and pattern-play.', prefix: 'Ne' },
            { id: 'se', label: 'Sensing (Se)', description: 'Lead with real-time experience and improv.', prefix: 'Se' },
        ],
    },
    {
        id: 'architects',
        label: 'Architects',
        description: 'Seek clarity, order, and stable structures they can rely on.',
        accent: '#dce9ff',
        functionHint: '(Ni or Si dominant)',
        mbtiOrder: ['INTJ', 'INFJ', 'ISTJ', 'ISFJ'],
        branches: [
            { id: 'ni', label: 'Intuition (Ni)', description: 'Lead with foresight and distilled insight.', prefix: 'Ni' },
            { id: 'si', label: 'Sensing (Si)', description: 'Lead with precedent, memory, and stability.', prefix: 'Si' },
        ],
    },
];

const getVariantFromCode = (code: string): 'standard' | 'jumper' => {
    const [firstRaw, secondRaw] = code.split('/');
    const first = firstRaw?.trim();
    const second = secondRaw?.trim();
    const firstOrientation = first?.charAt(1).toLowerCase();
    const secondOrientation = second?.charAt(1).toLowerCase();
    if (!firstOrientation || !secondOrientation) {
        return 'standard';
    }
    return firstOrientation === secondOrientation ? 'jumper' : 'standard';
};

const buildTypes = (prefix: string) =>
    typesData
        .filter((type) => type.code.startsWith(`${prefix}/`))
        .sort((a, b) => getOrderIndex(prefix, a.code, Number.MAX_SAFE_INTEGER) - getOrderIndex(prefix, b.code, Number.MAX_SAFE_INTEGER))
        .map((type) => ({
            id: type.code.toLowerCase().replace('/', '-'),
            name: type.name,
            code: type.code,
            color: type.color,
            shortDescription: type.shortDescription,
            mbti: getMbtiLabel(type.fullProfile, type.code),
            variant: getVariantFromCode(type.code),
            functionStack: getFunctionStack(type.code),
        }));

export const typeGroups = BASE_GROUPS.map((group) => {
    const branches = group.branches.map((branch) => ({
        ...branch,
        types: buildTypes(branch.prefix),
    }));

    return {
        ...group,
        branches,
        types: branches.flatMap((branch) => branch.types),
    };
});
