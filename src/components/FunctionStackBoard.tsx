"use client";

import React, { useState } from 'react';

// Type definitions
export type FuncCode = 'Fi' | 'Fe' | 'Ti' | 'Te' | 'Ni' | 'Ne' | 'Si' | 'Se';

export interface StackFunction {
    id: 'A' | 'B' | 'C' | 'D';      // 1st, 2nd, 3rd, 4th
    code: FuncCode;
    index: 1 | 2 | 3 | 4;           // position in stack
    isSavior: boolean;              // true/false for this function in THIS type
}

export interface FunctionStackBoardProps {
    stack: StackFunction[];         // length 4, sorted by index ascending
    showGhosts?: boolean;           // draw dotted "alternate" positions (default: true)
    interactive?: boolean;          // click to toggle coins (default: true)
    showBoard?: boolean;            // show board boxes and axis labels (default: true)
    compactEndpoints?: boolean;     // shrink and move hero/inferior closer to center (default: false)
}

// Board anchor points (SVG viewBox 0 0 300 300)
const HERO_LEFT = { x: 40, y: 40 };
const HERO_RIGHT = { x: 260, y: 40 };
const DEMON_LEFT = { x: 40, y: 260 };
const DEMON_RIGHT = { x: 260, y: 260 };

const INNER_LEFT_TOP = { x: 110, y: 110 };
const INNER_RIGHT_TOP = { x: 190, y: 110 };
const INNER_LEFT_BOTTOM = { x: 110, y: 190 };
const INNER_RIGHT_BOTTOM = { x: 190, y: 190 };

// Helper functions
const getAttitude = (code: FuncCode): 'I' | 'E' => {
    return code.endsWith('i') ? 'I' : 'E';
};

const getKind = (code: FuncCode): 'D' | 'O' => {
    return ['F', 'T'].includes(code[0]) ? 'D' : 'O';
};

const getRadius = (index: 1 | 2 | 3 | 4): number => {
    const radii = { 1: 40, 2: 25, 3: 25, 4: 20 };
    return radii[index];
};

const getColor = (code: FuncCode): string => {
    const colors: Record<string, string> = {
        'F': '#ef4444',  // red
        'T': '#3b82f6',  // blue
        'S': '#10b981',  // green
        'N': '#eab308',  // yellow
    };
    return colors[code[0]] || '#64748b';
};

// Gradient color definitions for glossy 3D effect
const FUNCTION_GRADIENTS: Record<string, {
    base: string;
    middle: string;
    highlight: string;
}> = {
    'F': { base: '#b91c1c', middle: '#ef4444', highlight: '#fca5a5' },
    'T': { base: '#1e40af', middle: '#3b82f6', highlight: '#93c5fd' },
    'S': { base: '#047857', middle: '#10b981', highlight: '#6ee7b7' },
    'N': { base: '#ca8a04', middle: '#eab308', highlight: '#fde047' },
};

const getGradient = (code: string) => {
    const type = code.charAt(0);
    return FUNCTION_GRADIENTS[type] || FUNCTION_GRADIENTS['F'];
};

interface Position {
    x: number;
    y: number;
}

// Compact mode settings
const A_INSET = 0.65; // 65% of distance toward center (A ball)
const D_INSET = 0.7; // 70% of distance toward center (D ball)
const B_INSET = 0.3; // 30% of distance toward center (B ball)
const C_INSET = 0.3; // 30% of distance toward center (C ball)
const HERO_RADIUS_COMPACT = 40 * 0.8;   // 32
const INFERIOR_RADIUS_COMPACT = 20 * 0.6; // 12 (40% smaller)
const MIDDLE_RADIUS_COMPACT = 25 * 0.9; // 22.5
const A_FONTSIZE_COMPACT = 20 * 1.2; // 24 (20% bigger)
const D_FONTSIZE_COMPACT = 14 * 0.64; // 8.96 (36% smaller)

// Utility: move a point toward center along the line
function insetTowardsCenter(p: Position, center: Position, inset: number): Position {
    return {
        x: p.x + inset * (center.x - p.x),
        y: p.y + inset * (center.y - p.y),
    };
}

export function FunctionStackBoard({
    stack,
    showGhosts = true,
    interactive = true,
    showBoard = true,
    compactEndpoints = false,
}: FunctionStackBoardProps) {
    // Find functions by ID
    const A = stack.find(f => f.id === 'A')!;
    const B = stack.find(f => f.id === 'B')!;
    const C = stack.find(f => f.id === 'C')!;
    const D = stack.find(f => f.id === 'D')!;

    // Jumper types have C as savior instead of B, so middle coin should be flipped by default
    const isJumper = C.isSavior === true;

    const [outerCoinFlipped, setOuterCoinFlipped] = useState(false);
    const [middleCoinFlipped, setMiddleCoinFlipped] = useState(isJumper);

    // Calculate positions for A & D (outer coin)
    const aIsIntroverted = getAttitude(A.code) === 'I';

    let aActivePos: Position, aGhostPos: Position, dActivePos: Position, dGhostPos: Position;

    if (!outerCoinFlipped) {
        if (aIsIntroverted) {
            aActivePos = HERO_LEFT;
            aGhostPos = HERO_RIGHT;
            dActivePos = DEMON_RIGHT;
            dGhostPos = DEMON_LEFT;
        } else {
            aActivePos = HERO_RIGHT;
            aGhostPos = HERO_LEFT;
            dActivePos = DEMON_LEFT;
            dGhostPos = DEMON_RIGHT;
        }
    } else {
        // Flipped: swap active and ghost
        if (aIsIntroverted) {
            aActivePos = HERO_RIGHT;
            aGhostPos = HERO_LEFT;
            dActivePos = DEMON_LEFT;
            dGhostPos = DEMON_RIGHT;
        } else {
            aActivePos = HERO_LEFT;
            aGhostPos = HERO_RIGHT;
            dActivePos = DEMON_RIGHT;
            dGhostPos = DEMON_LEFT;
        }
    }

    // Calculate positions for B & C (inner coin)
    const bIsIntroverted = getAttitude(B.code) === 'I';
    const cIsIntroverted = getAttitude(C.code) === 'I';

    // Determine columns for B and C
    const bSaviorPos = bIsIntroverted ? INNER_LEFT_TOP : INNER_RIGHT_TOP;
    const bDemonPos = bIsIntroverted ? INNER_LEFT_BOTTOM : INNER_RIGHT_BOTTOM;
    const cSaviorPos = cIsIntroverted ? INNER_LEFT_TOP : INNER_RIGHT_TOP;
    const cDemonPos = cIsIntroverted ? INNER_LEFT_BOTTOM : INNER_RIGHT_BOTTOM;

    let bActivePos: Position, bGhostPos: Position, cActivePos: Position, cGhostPos: Position;

    // Default state (no flip)
    if (!middleCoinFlipped) {
        if (B.isSavior) {
            // Standard type: B is savior
            bActivePos = bSaviorPos;
            bGhostPos = bDemonPos;
            cActivePos = cDemonPos;
            cGhostPos = cSaviorPos;
        } else {
            // Jumper type: C is savior
            cActivePos = cSaviorPos;
            cGhostPos = cDemonPos;
            bActivePos = bDemonPos;
            bGhostPos = bSaviorPos;
        }
    } else {
        // Flipped state
        if (B.isSavior) {
            // Standard type flipped: swap B and C rows
            bActivePos = bDemonPos;
            bGhostPos = bSaviorPos;
            cActivePos = cSaviorPos;
            cGhostPos = cDemonPos;
        } else {
            // Jumper type flipped: swap B and C rows
            cActivePos = cDemonPos;
            cGhostPos = cSaviorPos;
            bActivePos = bSaviorPos;
            bGhostPos = bDemonPos;
        }
    }

    // Apply compact mode transformation to A & D if enabled
    if (compactEndpoints) {
        // Calculate center of the A-D diagonal
        const centerAD: Position = {
            x: (aActivePos.x + dActivePos.x) / 2,
            y: (aActivePos.y + dActivePos.y) / 2,
        };

        // Move A and D inward toward center (independently)
        aActivePos = insetTowardsCenter(aActivePos, centerAD, A_INSET);
        dActivePos = insetTowardsCenter(dActivePos, centerAD, D_INSET);

        // Also transform ghost positions
        aGhostPos = insetTowardsCenter(aGhostPos, centerAD, A_INSET);
        dGhostPos = insetTowardsCenter(dGhostPos, centerAD, D_INSET);

        // Calculate center of the B-C diagonal
        const centerBC: Position = {
            x: (bActivePos.x + cActivePos.x) / 2,
            y: (bActivePos.y + cActivePos.y) / 2,
        };

        // Move B and C inward toward center (independently)
        bActivePos = insetTowardsCenter(bActivePos, centerBC, B_INSET);
        cActivePos = insetTowardsCenter(cActivePos, centerBC, C_INSET);

        // Also transform ghost positions
        bGhostPos = insetTowardsCenter(bGhostPos, centerBC, B_INSET);
        cGhostPos = insetTowardsCenter(cGhostPos, centerBC, C_INSET);
    }

    // Calculate radii (use compact variants when enabled)
    const aRadius = compactEndpoints ? HERO_RADIUS_COMPACT : getRadius(A.index);
    const dRadius = compactEndpoints ? INFERIOR_RADIUS_COMPACT : getRadius(D.index);
    const bRadius = compactEndpoints ? MIDDLE_RADIUS_COMPACT : getRadius(B.index);
    const cRadius = compactEndpoints ? MIDDLE_RADIUS_COMPACT : getRadius(C.index);

    // Calculate font sizes (use compact variants when enabled)
    const aFontSize = compactEndpoints ? A_FONTSIZE_COMPACT : 20;
    const dFontSize = compactEndpoints ? D_FONTSIZE_COMPACT : 14;

    // Handle clicks
    const handleOuterCoinClick = () => {
        if (interactive) {
            setOuterCoinFlipped(!outerCoinFlipped);
        }
    };

    const handleMiddleCoinClick = () => {
        if (interactive) {
            setMiddleCoinFlipped(!middleCoinFlipped);
        }
    };

    return (
        <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
            <defs>
                {/* Radial gradients for each function type */}
                {Object.entries(FUNCTION_GRADIENTS).map(([type, colors]) => (
                    <radialGradient key={`gradient-${type}`} id={`gradient-main-${type}`} cx="35%" cy="35%">
                        <stop offset="0%" stopColor={colors.highlight} />
                        <stop offset="30%" stopColor={colors.middle} />
                        <stop offset="70%" stopColor={colors.base} />
                        <stop offset="100%" stopColor={colors.base} style={{ stopOpacity: 0.9 }} />
                    </radialGradient>
                ))}

                {/* Grey gradient for demon functions */}
                <radialGradient id="gradient-main-grey" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="30%" stopColor="#9ca3af" />
                    <stop offset="70%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#6b7280" style={{ stopOpacity: 0.9 }} />
                </radialGradient>

                {/* Glossy shine overlay */}
                <radialGradient id="shine-main" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>

                {/* Drop shadow filters */}
                <filter id="shadow-main-large" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                    <feOffset dx="0" dy="4" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.25"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

                <filter id="shadow-main-medium" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                    <feOffset dx="0" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

                <filter id="shadow-main-small" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                    <feOffset dx="0" dy="1" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.15"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Board lines - outer square */}
            {showBoard && (
                <>
                    <rect
                        x={40}
                        y={40}
                        width={220}
                        height={220}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth={2}
                    />

                    {/* Inner square */}
                    <rect
                        x={110}
                        y={110}
                        width={80}
                        height={80}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth={1}
                        strokeDasharray="4,4"
                    />

                    {/* Axis labels */}
                    <text x={15} y={155} textAnchor="middle" fontSize={12} fill="#64748b" fontWeight="600" transform="rotate(-90, 15, 155)">
                        INTROVERTED
                    </text>
                    <text x={285} y={155} textAnchor="middle" fontSize={12} fill="#64748b" fontWeight="600" transform="rotate(90, 285, 155)">
                        EXTRAVERTED
                    </text>
                </>
            )}

            {/* Coin diagonal lines */}
            {/* Outer coin (A to D) */}
            <line
                x1={aActivePos.x}
                y1={aActivePos.y}
                x2={dActivePos.x}
                y2={dActivePos.y}
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="6,6"
                opacity={0.5}
            />

            {/* Inner coin (B to C) */}
            <line
                x1={bActivePos.x}
                y1={bActivePos.y}
                x2={cActivePos.x}
                y2={cActivePos.y}
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="4,4"
                opacity={0.5}
            />

            {/* Ghost circles */}
            {showGhosts && (
                <>
                    {/* A ghost */}
                    <circle
                        cx={aGhostPos.x}
                        cy={aGhostPos.y}
                        r={aRadius}
                        fill="none"
                        stroke={getColor(A.code)}
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        opacity={0.3}
                        onClick={handleOuterCoinClick}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                    <text
                        x={aGhostPos.x}
                        y={aGhostPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={aFontSize * 0.7}
                        fill="#94a3b8"
                        opacity={0.4}
                        pointerEvents="none"
                    >
                        {A.code.toLowerCase()}
                    </text>

                    {/* D ghost */}
                    <circle
                        cx={dGhostPos.x}
                        cy={dGhostPos.y}
                        r={dRadius}
                        fill="none"
                        stroke={getColor(D.code)}
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        opacity={0.3}
                        onClick={handleOuterCoinClick}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                    <text
                        x={dGhostPos.x}
                        y={dGhostPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={dFontSize * 0.86}
                        fill="#94a3b8"
                        opacity={0.4}
                        pointerEvents="none"
                    >
                        {D.code.toLowerCase()}
                    </text>

                    {/* B ghost */}
                    <circle
                        cx={bGhostPos.x}
                        cy={bGhostPos.y}
                        r={bRadius}
                        fill="none"
                        stroke={getColor(B.code)}
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        opacity={0.3}
                        onClick={handleMiddleCoinClick}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                    <text
                        x={bGhostPos.x}
                        y={bGhostPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={14}
                        fill="#94a3b8"
                        opacity={0.4}
                        pointerEvents="none"
                    >
                        {B.code.toLowerCase()}
                    </text>

                    {/* C ghost */}
                    <circle
                        cx={cGhostPos.x}
                        cy={cGhostPos.y}
                        r={cRadius}
                        fill="none"
                        stroke={getColor(C.code)}
                        strokeWidth={2}
                        strokeDasharray="5,5"
                        opacity={0.3}
                        onClick={handleMiddleCoinClick}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                    <text
                        x={cGhostPos.x}
                        y={cGhostPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={14}
                        fill="#94a3b8"
                        opacity={0.4}
                        pointerEvents="none"
                    >
                        {C.code.toLowerCase()}
                    </text>
                </>
            )}

            {/* Active circles */}
            {/* A - Hero function */}
            <g
                onClick={handleOuterCoinClick}
                style={{
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    transformOrigin: `${aActivePos.x}px ${aActivePos.y}px`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <circle
                    cx={aActivePos.x}
                    cy={aActivePos.y}
                    r={aRadius}
                    fill={`url(#gradient-main-${A.code.charAt(0)})`}
                    filter="url(#shadow-main-large)"
                />
                <circle
                    cx={aActivePos.x}
                    cy={aActivePos.y}
                    r={aRadius - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={2}
                    pointerEvents="none"
                />
                <circle
                    cx={aActivePos.x - aRadius * 0.15}
                    cy={aActivePos.y - aRadius * 0.15}
                    r={aRadius * 0.35}
                    fill="url(#shine-main)"
                    pointerEvents="none"
                />
                <text
                    x={aActivePos.x}
                    y={aActivePos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={aFontSize}
                    fontWeight="700"
                    fill="white"
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                >
                    {A.code}
                </text>
            </g>

            {/* B - Second function */}
            <g
                onClick={handleMiddleCoinClick}
                style={{
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    transformOrigin: `${bActivePos.x}px ${bActivePos.y}px`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <circle
                    cx={bActivePos.x}
                    cy={bActivePos.y}
                    r={bRadius}
                    fill={B.isSavior ? `url(#gradient-main-${B.code.charAt(0)})` : 'url(#gradient-main-grey)'}
                    filter="url(#shadow-main-medium)"
                />
                <circle
                    cx={bActivePos.x}
                    cy={bActivePos.y}
                    r={bRadius - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1.5}
                    pointerEvents="none"
                />
                <circle
                    cx={bActivePos.x - bRadius * 0.15}
                    cy={bActivePos.y - bRadius * 0.15}
                    r={bRadius * 0.35}
                    fill="url(#shine-main)"
                    pointerEvents="none"
                />
                <text
                    x={bActivePos.x}
                    y={bActivePos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={16}
                    fontWeight="600"
                    fill="white"
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                >
                    {B.code}
                </text>
            </g>

            {/* C - Third function */}
            <g
                onClick={handleMiddleCoinClick}
                style={{
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    transformOrigin: `${cActivePos.x}px ${cActivePos.y}px`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <circle
                    cx={cActivePos.x}
                    cy={cActivePos.y}
                    r={cRadius}
                    fill={C.isSavior ? `url(#gradient-main-${C.code.charAt(0)})` : 'url(#gradient-main-grey)'}
                    filter="url(#shadow-main-medium)"
                />
                <circle
                    cx={cActivePos.x}
                    cy={cActivePos.y}
                    r={cRadius - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1.5}
                    pointerEvents="none"
                />
                <circle
                    cx={cActivePos.x - cRadius * 0.15}
                    cy={cActivePos.y - cRadius * 0.15}
                    r={cRadius * 0.35}
                    fill="url(#shine-main)"
                    pointerEvents="none"
                />
                <text
                    x={cActivePos.x}
                    y={cActivePos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={16}
                    fontWeight="600"
                    fill="white"
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                >
                    {C.code}
                </text>
            </g>

            {/* D - Inferior function */}
            <g
                onClick={handleOuterCoinClick}
                style={{
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    transformOrigin: `${dActivePos.x}px ${dActivePos.y}px`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <circle
                    cx={dActivePos.x}
                    cy={dActivePos.y}
                    r={dRadius}
                    fill="url(#gradient-main-grey)"
                    filter="url(#shadow-main-small)"
                />
                <circle
                    cx={dActivePos.x}
                    cy={dActivePos.y}
                    r={dRadius - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                    pointerEvents="none"
                />
                <circle
                    cx={dActivePos.x - dRadius * 0.15}
                    cy={dActivePos.y - dRadius * 0.15}
                    r={dRadius * 0.35}
                    fill="url(#shine-main)"
                    pointerEvents="none"
                />
                <text
                    x={dActivePos.x}
                    y={dActivePos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={dFontSize}
                    fontWeight="600"
                    fill="white"
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                >
                    {D.code}
                </text>
            </g>
        </svg>
    );
}
