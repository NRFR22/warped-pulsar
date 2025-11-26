"use client";

import React from 'react';
import styles from './FunctionStackBubbles.module.css';

interface FunctionStackBubblesProps {
    functionStack: string; // e.g., "Fi/Ne" or "Ti/Se"
    variant?: 'standard' | 'jumper';
    showAll?: boolean; // if true, show all 4 functions with 2 highlighted
    size?: 'small' | 'medium' | 'large';
}

// Gradient color definitions for glossy 3D effect
const FUNCTION_GRADIENTS: Record<string, {
    base: string;
    middle: string;
    highlight: string;
    shine: string;
}> = {
    // Feeling - Red to Pink gradient
    'F': {
        base: '#b91c1c',
        middle: '#ef4444',
        highlight: '#fca5a5',
        shine: '#fee2e2',
    },
    // Thinking - Deep Blue to Sky Blue gradient
    'T': {
        base: '#1e40af',
        middle: '#3b82f6',
        highlight: '#93c5fd',
        shine: '#dbeafe',
    },
    // Sensing - Forest Green to Mint gradient
    'S': {
        base: '#047857',
        middle: '#10b981',
        highlight: '#6ee7b7',
        shine: '#d1fae5',
    },
    // Intuition - Gold to Yellow gradient
    'N': {
        base: '#ca8a04',
        middle: '#eab308',
        highlight: '#fde047',
        shine: '#fef9c3',
    },
};

// Helper to get gradient colors for a function
const getGradient = (func: string) => {
    const type = func.charAt(0); // F, T, S, or N
    return FUNCTION_GRADIENTS[type] || FUNCTION_GRADIENTS['F'];
};

// Cognitive function axes (opposites on the same "coin")
const FUNCTION_OPPOSITES: Record<string, string> = {
    'Fi': 'Te',
    'Te': 'Fi',
    'Fe': 'Ti',
    'Ti': 'Fe',
    'Ne': 'Si',
    'Si': 'Ne',
    'Ni': 'Se',
    'Se': 'Ni',
};

// Get all 4 functions in order for a given stack
const getFullStack = (functionStack: string, variant: 'standard' | 'jumper'): string[] => {
    const [first, second] = functionStack.split('/').map(f => f.trim());

    // Get opposing functions using cognitive axes
    const third = FUNCTION_OPPOSITES[second];
    const fourth = FUNCTION_OPPOSITES[first];

    return [first, second, third, fourth];
};

export function FunctionStackBubbles({
    functionStack,
    variant = 'standard',
    showAll = false,
    size = 'large'
}: FunctionStackBubblesProps) {
    const functions = showAll
        ? getFullStack(functionStack, variant)
        : functionStack.split('/').map(f => f.trim());

    const saviorCount = showAll ? 2 : functions.length;

    const getBubbleStyle = (index: number) => {
        const stylesList = [
            { radius: 75, opacity: 1, fontSize: 42, fontWeight: "900", filter: "url(#shadow-large)", shineRadius: 22 },    // 1st - Hero (MASSIVE)
            { radius: 48, opacity: 1, fontSize: 30, fontWeight: "700", filter: "url(#shadow-medium)", shineRadius: 14 }, // 2nd - Parent (Large)
            { radius: 22, opacity: 0.35, fontSize: 16, fontWeight: "600", filter: "url(#shadow-small)", shineRadius: 6 },  // 3rd - Child (Small, faded)
            { radius: 18, opacity: 0.3, fontSize: 14, fontWeight: "600", filter: "url(#shadow-small)", shineRadius: 5 },  // 4th - Inferior (Tiny, very faded)
        ];
        return stylesList[index] || stylesList[3];
    };

    return (
        <div className={`${styles.container} ${styles[size]}`}>
            <svg
                viewBox="0 0 320 320"
                className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Radial gradients for each function type */}
                    {Object.entries(FUNCTION_GRADIENTS).map(([type, colors]) => (
                        <radialGradient key={`gradient-${type}`} id={`gradient-${type}`} cx="35%" cy="35%">
                            <stop offset="0%" stopColor={colors.highlight} />
                            <stop offset="30%" stopColor={colors.middle} />
                            <stop offset="70%" stopColor={colors.base} />
                            <stop offset="100%" stopColor={colors.base} style={{ stopOpacity: 0.9 }} />
                        </radialGradient>
                    ))}

                    {/* Grey gradient for demon functions */}
                    <radialGradient id="gradient-grey" cx="35%" cy="35%">
                        <stop offset="0%" stopColor="#d1d5db" />
                        <stop offset="30%" stopColor="#9ca3af" />
                        <stop offset="70%" stopColor="#6b7280" />
                        <stop offset="100%" stopColor="#6b7280" style={{ stopOpacity: 0.9 }} />
                    </radialGradient>

                    {/* Glossy shine overlay */}
                    <radialGradient id="shine" cx="30%" cy="30%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    {/* Drop shadow filters for different sizes */}
                    <filter id="shadow-large" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="0" dy="8" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.25"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    <filter id="shadow-medium" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="4" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.2"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    <filter id="shadow-small" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                        <feOffset dx="0" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.15"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Connection lines between bubbles */}
                {functions.length === 2 && (
                    <>
                        {/* Main curved connection */}
                        <path
                            d="M 80 160 Q 160 140, 240 160"
                            stroke="#64748b"
                            strokeWidth="4"
                            fill="none"
                            opacity="0.6"
                            strokeLinecap="round"
                        />
                    </>
                )}

                {functions.length === 4 && (() => {
                    const centerX = 160;
                    const centerY = 160;

                    const leftColumnX = centerX - 50;
                    const rightColumnX = centerX + 50;
                    const topRowY = centerY - 50;

                    const heroStyle = getBubbleStyle(0);
                    const parentStyle = getBubbleStyle(1);
                    const childStyle = getBubbleStyle(2);

                    const topCenterX = (leftColumnX + rightColumnX) / 2;
                    const maxTopRadius = Math.max(heroStyle.radius, parentStyle.radius);
                    const bottomY = topRowY + maxTopRadius + childStyle.radius + 28;
                    const offsetX = 28;
                    const leftBottomX = topCenterX - offsetX;
                    const rightBottomX = topCenterX + offsetX;

                    const makeCurvePath = (fromX: number, fromY: number, toX: number, toY: number) => {
                        const cx = (fromX + toX) / 2;
                        const cy = (fromY + toY) / 2 - 10;
                        return `M ${fromX} ${fromY} Q ${cx} ${cy}, ${toX} ${toY}`;
                    };

                    const pathFiToTe = makeCurvePath(leftColumnX, topRowY, rightBottomX, bottomY);
                    const pathNeToSi = makeCurvePath(rightColumnX, topRowY, leftBottomX, bottomY);

                    return (
                        <>
                            <path
                                d={pathFiToTe}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.4"
                                strokeLinecap="round"
                                strokeDasharray="4,4"
                            />
                            <path
                                d={pathNeToSi}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.4"
                                strokeLinecap="round"
                                strokeDasharray="4,4"
                            />
                        </>
                    );
                })()}

                {/* Render bubbles */}
                {(() => {
                    if (functions.length === 2) {
                        // Simple two-bubble layout
                        return functions.map((func, index) => {
                            const gradient = getGradient(func);
                            const x = index === 0 ? 80 : 240;
                            const y = 160;
                            const style = getBubbleStyle(index);
                            const gradientId = `gradient-${func.charAt(0)}`;

                            // Use grey gradient for demon functions (index >= 2)
                            const isDemon = index >= 2;
                            const finalGradientId = isDemon ? 'gradient-grey' : gradientId;

                            return (
                                <g key={func + index} className={styles.bubble}>
                                    {/* Main bubble with gradient */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={style.radius}
                                        fill={`url(#${finalGradientId})`}
                                        opacity={style.opacity}
                                        filter={style.filter}
                                    />
                                    {/* Subtle border for definition */}
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={style.radius - 1}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="2"
                                        pointerEvents="none"
                                    />
                                    {/* Glossy shine overlay */}
                                    <circle
                                        cx={x - style.radius * 0.15}
                                        cy={y - style.radius * 0.15}
                                        r={style.shineRadius}
                                        fill="url(#shine)"
                                        pointerEvents="none"
                                    />
                                    {/* Function label */}
                                    <text
                                        x={x}
                                        y={y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className={styles.label}
                                        fill="white"
                                        fontWeight={style.fontWeight}
                                        fontSize={style.fontSize}
                                        style={{
                                            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                            letterSpacing: '0.02em',
                                        }}
                                    >
                                        {func}
                                    </text>
                                </g>
                            );
                        });
                    } else if (functions.length === 4) {
                        const centerX = 160;
                        const centerY = 160;
                        const leftColumnX = centerX - 50;
                        const rightColumnX = centerX + 50;
                        const topRowY = centerY - 50;
                        const heroStyle = getBubbleStyle(0);
                        const parentStyle = getBubbleStyle(1);
                        const childStyle = getBubbleStyle(2);
                        const topCenterX = (leftColumnX + rightColumnX) / 2;
                        const maxTopRadius = Math.max(heroStyle.radius, parentStyle.radius);
                        const bottomY = topRowY + maxTopRadius + childStyle.radius + 28;
                        const offsetX = 28;
                        const leftBottomX = topCenterX - offsetX;
                        const rightBottomX = topCenterX + offsetX;

                        const positions: Record<string, { x: number; y: number } | null> = {
                            leftTop: null,
                            leftBottom: null,
                            rightTop: null,
                            rightBottom: null,
                        };

                        functions.forEach((func, index) => {
                            const isIntroverted = func.endsWith('i');
                            const pos = { func, index, isSavior: index < saviorCount };

                            if (isIntroverted) {
                                if (!positions.leftTop) {
                                    positions.leftTop = { x: leftColumnX, y: topRowY, ...pos };
                                } else {
                                    positions.leftBottom = { x: leftBottomX, y: bottomY, ...pos };
                                }
                            } else {
                                if (!positions.rightTop) {
                                    positions.rightTop = { x: rightColumnX, y: topRowY, ...pos };
                                } else {
                                    positions.rightBottom = { x: rightBottomX, y: bottomY, ...pos };
                                }
                            }
                        });

                        return Object.values(positions)
                            .filter((pos): pos is NonNullable<typeof pos> => pos !== null)
                            .map((pos) => {
                                const gradient = getGradient(pos.func);
                                const style = getBubbleStyle(pos.index);
                                const gradientId = `gradient-${pos.func.charAt(0)}`;

                            // Use grey gradient for demon functions (index >= 2)
                            const isDemon = pos.index >= 2;
                            const finalGradientId = isDemon ? 'gradient-grey' : gradientId;

                            return (
                                <g key={pos.func + pos.index} className={styles.bubble}>
                                    {/* Main bubble with gradient */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={style.radius}
                                        fill={`url(#${finalGradientId})`}
                                        opacity={style.opacity}
                                        filter={style.filter}
                                    />
                                    {/* Subtle border for definition */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={style.radius - 1}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="2"
                                        pointerEvents="none"
                                    />
                                    {/* Glossy shine overlay */}
                                    <circle
                                        cx={pos.x - style.radius * 0.15}
                                        cy={pos.y - style.radius * 0.15}
                                        r={style.shineRadius}
                                        fill="url(#shine)"
                                        pointerEvents="none"
                                    />
                                    {/* Function label */}
                                    <text
                                        x={pos.x}
                                        y={pos.y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className={styles.label}
                                        fill="white"
                                        fontWeight={style.fontWeight}
                                        fontSize={style.fontSize}
                                        style={{
                                            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                            letterSpacing: '0.02em',
                                        }}
                                    >
                                        {pos.func}
                                    </text>
                                </g>
                            );
                        });
                    }

                    return null;
                })()}
            </svg>
        </div>
    );
}
