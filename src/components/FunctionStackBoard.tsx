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

interface Position {
    x: number;
    y: number;
}

// Compact mode settings
const ENDPOINT_INSET = 0.6; // 60% of distance toward center (A & D)
const MIDDLE_INSET = 0.2; // 20% of distance toward center (B & C)
const HERO_RADIUS_COMPACT = 40 * 0.8;   // 32
const INFERIOR_RADIUS_COMPACT = 20 * 0.6; // 12 (40% smaller)
const MIDDLE_RADIUS_COMPACT = 25 * 0.9; // 22.5

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

        // Move A and D inward toward center
        aActivePos = insetTowardsCenter(aActivePos, centerAD, ENDPOINT_INSET);
        dActivePos = insetTowardsCenter(dActivePos, centerAD, ENDPOINT_INSET);

        // Also transform ghost positions
        aGhostPos = insetTowardsCenter(aGhostPos, centerAD, ENDPOINT_INSET);
        dGhostPos = insetTowardsCenter(dGhostPos, centerAD, ENDPOINT_INSET);

        // Calculate center of the B-C diagonal
        const centerBC: Position = {
            x: (bActivePos.x + cActivePos.x) / 2,
            y: (bActivePos.y + cActivePos.y) / 2,
        };

        // Move B and C inward toward center
        bActivePos = insetTowardsCenter(bActivePos, centerBC, MIDDLE_INSET);
        cActivePos = insetTowardsCenter(cActivePos, centerBC, MIDDLE_INSET);

        // Also transform ghost positions
        bGhostPos = insetTowardsCenter(bGhostPos, centerBC, MIDDLE_INSET);
        cGhostPos = insetTowardsCenter(cGhostPos, centerBC, MIDDLE_INSET);
    }

    // Calculate radii (use compact variants when enabled)
    const aRadius = compactEndpoints ? HERO_RADIUS_COMPACT : getRadius(A.index);
    const dRadius = compactEndpoints ? INFERIOR_RADIUS_COMPACT : getRadius(D.index);
    const bRadius = compactEndpoints ? MIDDLE_RADIUS_COMPACT : getRadius(B.index);
    const cRadius = compactEndpoints ? MIDDLE_RADIUS_COMPACT : getRadius(C.index);

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
                        fontSize={14}
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
                        fontSize={12}
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
            <circle
                cx={aActivePos.x}
                cy={aActivePos.y}
                r={aRadius}
                fill={getColor(A.code)}
                opacity={0.95}
                onClick={handleOuterCoinClick}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
            />
            <circle
                cx={aActivePos.x}
                cy={aActivePos.y}
                r={aRadius - 2}
                fill="none"
                stroke="white"
                strokeWidth={2}
                opacity={0.3}
                pointerEvents="none"
            />
            <text
                x={aActivePos.x}
                y={aActivePos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={20}
                fontWeight="700"
                fill="white"
                pointerEvents="none"
            >
                {A.code}
            </text>

            {/* B - Second function */}
            <circle
                cx={bActivePos.x}
                cy={bActivePos.y}
                r={bRadius}
                fill={B.isSavior ? getColor(B.code) : '#6b7280'}
                opacity={0.95}
                onClick={handleMiddleCoinClick}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
            />
            <circle
                cx={bActivePos.x}
                cy={bActivePos.y}
                r={bRadius - 2}
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                opacity={0.3}
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
            >
                {B.code}
            </text>

            {/* C - Third function */}
            <circle
                cx={cActivePos.x}
                cy={cActivePos.y}
                r={cRadius}
                fill={C.isSavior ? getColor(C.code) : '#6b7280'}
                opacity={0.95}
                onClick={handleMiddleCoinClick}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
            />
            <circle
                cx={cActivePos.x}
                cy={cActivePos.y}
                r={cRadius - 2}
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                opacity={0.3}
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
            >
                {C.code}
            </text>

            {/* D - Inferior function */}
            <circle
                cx={dActivePos.x}
                cy={dActivePos.y}
                r={dRadius}
                fill="#6b7280"
                opacity={0.95}
                onClick={handleOuterCoinClick}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
            />
            <circle
                cx={dActivePos.x}
                cy={dActivePos.y}
                r={dRadius - 2}
                fill="none"
                stroke="white"
                strokeWidth={1}
                opacity={0.3}
                pointerEvents="none"
            />
            <text
                x={dActivePos.x}
                y={dActivePos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14}
                fontWeight="600"
                fill="white"
                pointerEvents="none"
            >
                {D.code}
            </text>
        </svg>
    );
}
