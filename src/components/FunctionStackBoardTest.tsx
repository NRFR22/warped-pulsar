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
    showMainAxis?: boolean;         // show A-D vertical axis (teach mode)
    showMiddleAxis?: boolean;       // show B-C horizontal axis (teach mode)
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
    showMainAxis = true,
    showMiddleAxis = true,
}: FunctionStackBoardProps) {
    // Find functions by ID
    const A = stack.find(f => f.id === 'A')!;
    const B = stack.find(f => f.id === 'B')!;
    const C = stack.find(f => f.id === 'C')!;
    const D = stack.find(f => f.id === 'D')!;

    // Positioning: A-D vertical (north-south), B-C horizontal (west-east)
    const aActivePos: Position = { x: 150, y: 60 };   // North
    const dActivePos: Position = { x: 150, y: 240 };  // South
    const bActivePos: Position = { x: 90, y: 150 };   // West
    const cActivePos: Position = { x: 210, y: 150 };  // East

    // Calculate radii
    const aRadius = getRadius(A.index);
    const bRadius = getRadius(B.index);
    const cRadius = getRadius(C.index);
    const dRadius = getRadius(D.index);

    // Font sizes
    const aFontSize = 20;
    const bFontSize = 16;
    const cFontSize = 16;
    const dFontSize = 14;

    return (
        <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
            {/* Main axis: Vertical line from A (north) to D (south) */}
            {showMainAxis && (
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
            )}

            {/* Middle axis: Horizontal line from B (west) to C (east) */}
            {showMiddleAxis && (
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
            )}

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

            {/* B - Second function (West) */}
            <circle
                cx={bActivePos.x}
                cy={bActivePos.y}
                r={bRadius}
                fill={B.isSavior ? getColor(B.code) : '#6b7280'}
                opacity={0.95}
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
                fontSize={bFontSize}
                fontWeight="600"
                fill="white"
                pointerEvents="none"
            >
                {B.code}
            </text>

            {/* C - Third function (East) */}
            <circle
                cx={cActivePos.x}
                cy={cActivePos.y}
                r={cRadius}
                fill={C.isSavior ? getColor(C.code) : '#6b7280'}
                opacity={0.95}
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
                fontSize={cFontSize}
                fontWeight="600"
                fill="white"
                pointerEvents="none"
            >
                {C.code}
            </text>
        </svg>
    );
}
