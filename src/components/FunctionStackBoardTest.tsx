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

export function FunctionStackBoardTest({
    stack,
    showGhosts = true,
    interactive = true,
    showBoard = true,
    compactEndpoints = false,
}: FunctionStackBoardProps) {
    // Find functions by ID
    const A = stack.find(f => f.id === 'A')!;
    const D = stack.find(f => f.id === 'D')!;

    // Simple vertical positioning: A at top (north), D at bottom (south)
    const aActivePos: Position = { x: 150, y: 60 };  // North
    const dActivePos: Position = { x: 150, y: 240 }; // South

    // Calculate radii
    const aRadius = compactEndpoints ? HERO_RADIUS_COMPACT : getRadius(A.index);
    const dRadius = compactEndpoints ? INFERIOR_RADIUS_COMPACT : getRadius(D.index);

    // Calculate font sizes
    const aFontSize = compactEndpoints ? A_FONTSIZE_COMPACT : 20;
    const dFontSize = compactEndpoints ? D_FONTSIZE_COMPACT : 14;

    return (
        <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
            {/* Vertical axis line from A (north) to D (south) */}
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

            {/* A - Hero function (North) */}
            <circle
                cx={aActivePos.x}
                cy={aActivePos.y}
                r={aRadius}
                fill={getColor(A.code)}
                opacity={0.95}
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
                fontSize={aFontSize}
                fontWeight="700"
                fill="white"
                pointerEvents="none"
            >
                {A.code}
            </text>

            {/* D - Inferior function (South) */}
            <circle
                cx={dActivePos.x}
                cy={dActivePos.y}
                r={dRadius}
                fill="#6b7280"
                opacity={0.95}
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
                fontSize={dFontSize}
                fontWeight="600"
                fill="white"
                pointerEvents="none"
            >
                {D.code}
            </text>
        </svg>
    );
}
