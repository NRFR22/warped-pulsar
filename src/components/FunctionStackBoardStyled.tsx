"use client";

import React from 'react';

// Type definitions
export type FuncCode = 'Fi' | 'Fe' | 'Ti' | 'Te' | 'Ni' | 'Ne' | 'Si' | 'Se';

export interface StackFunction {
    id: 'A' | 'B' | 'C' | 'D';
    code: FuncCode;
    index: 1 | 2 | 3 | 4;
    isSavior: boolean;
}

type StyleType =
    | 'glossy'
    | 'neon'
    | 'glass'
    | 'flat'
    | 'sketch'
    | 'neumorphic'
    | 'metallic'
    | 'pixel'
    | 'watercolor';

export interface FunctionStackBoardStyledProps {
    stack: StackFunction[];
    styleType: StyleType;
    showGhosts?: boolean;
    interactive?: boolean;
    showBoard?: boolean;
    compactEndpoints?: boolean;
}

const getColor = (code: FuncCode): string => {
    const colors: Record<string, string> = {
        'F': '#ef4444',  // red
        'T': '#3b82f6',  // blue
        'S': '#10b981',  // green
        'N': '#eab308',  // yellow
    };
    return colors[code[0]] || '#64748b';
};

const getRadius = (index: 1 | 2 | 3 | 4, compact: boolean): number => {
    if (compact) {
        return index === 1 ? 32 : index === 4 ? 12 : 22.5;
    }
    const radii = { 1: 40, 2: 25, 3: 25, 4: 20 };
    return radii[index];
};

interface Position {
    x: number;
    y: number;
}

// Compact positioning
function insetTowardsCenter(p: Position, center: Position, inset: number): Position {
    return {
        x: p.x + inset * (center.x - p.x),
        y: p.y + inset * (center.y - p.y),
    };
}

export function FunctionStackBoardStyled({
    stack,
    styleType,
    showGhosts = false,
    interactive = false,
    showBoard = false,
    compactEndpoints = false,
}: FunctionStackBoardStyledProps) {
    const A = stack.find(f => f.id === 'A')!;
    const B = stack.find(f => f.id === 'B')!;
    const C = stack.find(f => f.id === 'C')!;
    const D = stack.find(f => f.id === 'D')!;

    // Determine positions
    const getAttitude = (code: FuncCode): 'I' | 'E' => code.endsWith('i') ? 'I' : 'E';
    const getKind = (code: FuncCode): 'D' | 'O' => ['F', 'T'].includes(code[0]) ? 'D' : 'O';

    const HERO_LEFT = { x: 40, y: 40 };
    const HERO_RIGHT = { x: 260, y: 40 };
    const DEMON_LEFT = { x: 40, y: 260 };
    const DEMON_RIGHT = { x: 260, y: 260 };
    const INNER_LEFT_TOP = { x: 110, y: 110 };
    const INNER_RIGHT_TOP = { x: 190, y: 110 };
    const INNER_LEFT_BOTTOM = { x: 110, y: 190 };
    const INNER_RIGHT_BOTTOM = { x: 190, y: 190 };

    let aActivePos: Position, bActivePos: Position, cActivePos: Position, dActivePos: Position;

    // Position logic (simplified for this example)
    const aAtt = getAttitude(A.code);
    const aKind = getKind(A.code);
    aActivePos = (aAtt === 'I' && aKind === 'D') ? HERO_LEFT :
                 (aAtt === 'E' && aKind === 'D') ? HERO_RIGHT :
                 (aAtt === 'I' && aKind === 'O') ? HERO_LEFT : HERO_RIGHT;

    const dAtt = getAttitude(D.code);
    const dKind = getKind(D.code);
    dActivePos = (dAtt === 'I' && dKind === 'D') ? DEMON_LEFT :
                 (dAtt === 'E' && dKind === 'D') ? DEMON_RIGHT :
                 (dAtt === 'I' && dKind === 'O') ? DEMON_LEFT : DEMON_RIGHT;

    const bAtt = getAttitude(B.code);
    const bKind = getKind(B.code);
    const bSavior = B.isSavior;
    bActivePos = bSavior ?
        ((bAtt === 'I' && bKind === 'D') ? INNER_LEFT_TOP :
         (bAtt === 'E' && bKind === 'D') ? INNER_RIGHT_TOP :
         (bAtt === 'I' && bKind === 'O') ? INNER_LEFT_TOP : INNER_RIGHT_TOP) :
        ((bAtt === 'I' && bKind === 'D') ? INNER_LEFT_BOTTOM :
         (bAtt === 'E' && bKind === 'D') ? INNER_RIGHT_BOTTOM :
         (bAtt === 'I' && bKind === 'O') ? INNER_LEFT_BOTTOM : INNER_RIGHT_BOTTOM);

    const cAtt = getAttitude(C.code);
    const cKind = getKind(C.code);
    const cSavior = C.isSavior;
    cActivePos = cSavior ?
        ((cAtt === 'I' && cKind === 'D') ? INNER_LEFT_TOP :
         (cAtt === 'E' && cKind === 'D') ? INNER_RIGHT_TOP :
         (cAtt === 'I' && cKind === 'O') ? INNER_LEFT_TOP : INNER_RIGHT_TOP) :
        ((cAtt === 'I' && cKind === 'D') ? INNER_LEFT_BOTTOM :
         (cAtt === 'E' && cKind === 'D') ? INNER_RIGHT_BOTTOM :
         (cAtt === 'I' && cKind === 'O') ? INNER_LEFT_BOTTOM : INNER_RIGHT_BOTTOM);

    if (compactEndpoints) {
        const centerAD: Position = {
            x: (aActivePos.x + dActivePos.x) / 2,
            y: (aActivePos.y + dActivePos.y) / 2,
        };
        aActivePos = insetTowardsCenter(aActivePos, centerAD, 0.65);
        dActivePos = insetTowardsCenter(dActivePos, centerAD, 0.7);

        const centerBC: Position = {
            x: (bActivePos.x + cActivePos.x) / 2,
            y: (bActivePos.y + cActivePos.y) / 2,
        };
        bActivePos = insetTowardsCenter(bActivePos, centerBC, 0.3);
        cActivePos = insetTowardsCenter(cActivePos, centerBC, 0.3);
    }

    const aRadius = getRadius(A.index, compactEndpoints);
    const bRadius = getRadius(B.index, compactEndpoints);
    const cRadius = getRadius(C.index, compactEndpoints);
    const dRadius = getRadius(D.index, compactEndpoints);

    const aFontSize = compactEndpoints ? 24 : 20;
    const dFontSize = compactEndpoints ? 8.96 : 14;

    // Render bubble based on style type
    const renderBubble = (
        pos: Position,
        radius: number,
        code: FuncCode,
        fontSize: number,
        isInferior: boolean = false,
        isSavior: boolean = true
    ) => {
        const color = getColor(code);
        const isDemon = !isSavior;

        switch (styleType) {
            case 'neon':
                return (
                    <g key={code}>
                        {/* Outer glow */}
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius + 8}
                            fill="none"
                            stroke={isInferior ? '#6b7280' : color}
                            strokeWidth={4}
                            opacity={0.4}
                            filter="url(#glow-outer)"
                        />
                        {/* Inner glow */}
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill="rgba(0,0,0,0.2)"
                            stroke={isInferior ? '#9ca3af' : color}
                            strokeWidth={3}
                            filter="url(#glow-inner)"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill={isInferior ? '#d1d5db' : color}
                            style={{ textShadow: `0 0 10px ${color}` }}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'glass':
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? 'rgba(107, 114, 128, 0.2)' : `${color}33`}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth={2}
                            filter="url(#glass-blur)"
                        />
                        <circle
                            cx={pos.x - radius * 0.2}
                            cy={pos.y - radius * 0.2}
                            r={radius * 0.3}
                            fill="rgba(255,255,255,0.3)"
                            pointerEvents="none"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="600"
                            fill={isInferior ? '#6b7280' : color}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'flat':
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y + 2}
                            r={radius}
                            fill="rgba(0,0,0,0.1)"
                        />
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? '#6b7280' : color}
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill="white"
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'sketch':
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? '#d1d5db' : `${color}cc`}
                            stroke={isInferior ? '#6b7280' : color}
                            strokeWidth={3}
                            filter="url(#sketch-rough)"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill={isInferior ? '#4b5563' : '#1f2937'}
                            style={{ fontFamily: 'Comic Sans MS, cursive' }}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'neumorphic':
                return (
                    <g key={code}>
                        {/* Dark shadow */}
                        <circle
                            cx={pos.x + 4}
                            cy={pos.y + 4}
                            r={radius}
                            fill="rgba(0,0,0,0.1)"
                            filter="url(#blur-soft)"
                        />
                        {/* Light shadow */}
                        <circle
                            cx={pos.x - 2}
                            cy={pos.y - 2}
                            r={radius}
                            fill="rgba(255,255,255,0.9)"
                            filter="url(#blur-soft)"
                        />
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill="#e2e8f0"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill={isInferior ? '#6b7280' : color}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'metallic':
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? 'url(#metallic-grey)' : `url(#metallic-${code.charAt(0)})`}
                            filter="url(#shadow-main-large)"
                        />
                        <circle
                            cx={pos.x - radius * 0.3}
                            cy={pos.y - radius * 0.3}
                            r={radius * 0.25}
                            fill="rgba(255,255,255,0.9)"
                            pointerEvents="none"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill="white"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'pixel':
                const pixelSize = Math.floor(radius / 4);
                return (
                    <g key={code}>
                        <rect
                            x={pos.x - radius}
                            y={pos.y - radius}
                            width={radius * 2}
                            height={radius * 2}
                            fill={isInferior ? '#6b7280' : color}
                            rx={pixelSize}
                        />
                        <rect
                            x={pos.x - radius + pixelSize}
                            y={pos.y - radius + pixelSize}
                            width={radius * 2 - pixelSize * 2}
                            height={radius * 2 - pixelSize * 2}
                            fill={isInferior ? '#9ca3af' : `${color}dd`}
                            rx={pixelSize}
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill="white"
                            style={{ fontFamily: 'monospace' }}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'watercolor':
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius + 4}
                            fill={isInferior ? 'rgba(107, 114, 128, 0.3)' : `${color}40`}
                            filter="url(#watercolor-blur)"
                        />
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? 'url(#watercolor-grey)' : `url(#watercolor-${code.charAt(0)})`}
                            filter="url(#watercolor-texture)"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="600"
                            fill="white"
                            opacity={0.9}
                        >
                            {code}
                        </text>
                    </g>
                );

            case 'glossy':
            default:
                return (
                    <g key={code}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius}
                            fill={isInferior ? 'url(#gradient-main-grey)' : `url(#gradient-main-${code.charAt(0)})`}
                            filter="url(#shadow-main-large)"
                        />
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius - 1}
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth={2}
                            pointerEvents="none"
                        />
                        <circle
                            cx={pos.x - radius * 0.15}
                            cy={pos.y - radius * 0.15}
                            r={radius * 0.35}
                            fill="url(#shine-main)"
                            pointerEvents="none"
                        />
                        <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={fontSize}
                            fontWeight="700"
                            fill="white"
                            pointerEvents="none"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                        >
                            {code}
                        </text>
                    </g>
                );
        }
    };

    return (
        <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
            <defs>
                {/* Glossy gradients */}
                {['F', 'T', 'S', 'N'].map(type => {
                    const colors = {
                        'F': { base: '#b91c1c', middle: '#ef4444', highlight: '#fca5a5' },
                        'T': { base: '#1e40af', middle: '#3b82f6', highlight: '#93c5fd' },
                        'S': { base: '#047857', middle: '#10b981', highlight: '#6ee7b7' },
                        'N': { base: '#ca8a04', middle: '#eab308', highlight: '#fde047' },
                    }[type]!;

                    return (
                        <React.Fragment key={type}>
                            <radialGradient id={`gradient-main-${type}`} cx="35%" cy="35%">
                                <stop offset="0%" stopColor={colors.highlight} />
                                <stop offset="30%" stopColor={colors.middle} />
                                <stop offset="70%" stopColor={colors.base} />
                                <stop offset="100%" stopColor={colors.base} style={{ stopOpacity: 0.9 }} />
                            </radialGradient>
                            {/* Metallic gradients */}
                            <linearGradient id={`metallic-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={colors.highlight} />
                                <stop offset="20%" stopColor={colors.middle} />
                                <stop offset="50%" stopColor={colors.base} />
                                <stop offset="80%" stopColor={colors.middle} />
                                <stop offset="100%" stopColor={colors.highlight} />
                            </linearGradient>
                            {/* Watercolor gradients */}
                            <radialGradient id={`watercolor-${type}`} cx="40%" cy="40%">
                                <stop offset="0%" stopColor={colors.middle} stopOpacity="0.8" />
                                <stop offset="60%" stopColor={colors.base} stopOpacity="0.9" />
                                <stop offset="100%" stopColor={colors.base} stopOpacity="0.7" />
                            </radialGradient>
                        </React.Fragment>
                    );
                })}

                {/* Grey gradients */}
                <radialGradient id="gradient-main-grey" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="30%" stopColor="#9ca3af" />
                    <stop offset="70%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#6b7280" style={{ stopOpacity: 0.9 }} />
                </radialGradient>

                <linearGradient id="metallic-grey" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="20%" stopColor="#9ca3af" />
                    <stop offset="50%" stopColor="#6b7280" />
                    <stop offset="80%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>

                <radialGradient id="watercolor-grey" cx="40%" cy="40%">
                    <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#6b7280" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#6b7280" stopOpacity="0.7" />
                </radialGradient>

                {/* Shine */}
                <radialGradient id="shine-main" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>

                {/* Filters */}
                <filter id="shadow-main-large">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                    <feOffset dx="0" dy="4"/>
                    <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>

                <filter id="glow-outer">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>

                <filter id="glow-inner">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>

                <filter id="glass-blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
                </filter>

                <filter id="sketch-rough">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                </filter>

                <filter id="blur-soft">
                    <feGaussianBlur stdDeviation="3"/>
                </filter>

                <filter id="watercolor-blur">
                    <feGaussianBlur stdDeviation="3"/>
                </filter>

                <filter id="watercolor-texture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="3" result="turbulence"/>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
            </defs>

            {renderBubble(aActivePos, aRadius, A.code, aFontSize, false, true)}
            {renderBubble(bActivePos, bRadius, B.code, 16, false, B.isSavior)}
            {renderBubble(cActivePos, cRadius, C.code, 16, false, C.isSavior)}
            {renderBubble(dActivePos, dRadius, D.code, dFontSize, true, false)}
        </svg>
    );
}
