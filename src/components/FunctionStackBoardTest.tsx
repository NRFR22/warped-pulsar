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
    selectedCoin?: string;          // which coin to display (S/N, T/F, DI/DE, OE/OI)
    coinFlipped?: boolean;          // flip the coin positions
    showSecondaryAxis?: boolean;    // show secondary A-D axis
    secondaryCoin?: string;         // which coin to display on secondary axis
    secondaryCoinFlipped?: boolean; // flip the secondary coin positions
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

// Get coin labels and colors based on selection
function getCoinDisplay(coin: string, position: 'A' | 'D', flipped: boolean): { label: string; color: string } {
    const coinMap: Record<string, { A: string; D: string; colorA: string; colorD: string }> = {
        'S/N': { A: 'S', D: 'N', colorA: '#10b981', colorD: '#eab308' }, // green, yellow
        'T/F': { A: 'T', D: 'F', colorA: '#3b82f6', colorD: '#ef4444' }, // blue, red
        'DI/DE': { A: 'Di', D: 'De', colorA: '#8b5cf6', colorD: '#ec4899' }, // purple, pink
        'OE/OI': { A: 'Oe', D: 'Oi', colorA: '#f59e0b', colorD: '#06b6d4' }, // amber, cyan
    };

    const config = coinMap[coin] || coinMap['S/N'];

    if (flipped) {
        // Swap A and D
        return position === 'A'
            ? { label: config.D, color: config.colorD }
            : { label: config.A, color: config.colorA };
    } else {
        return position === 'A'
            ? { label: config.A, color: config.colorA }
            : { label: config.D, color: config.colorD };
    }
}

export function FunctionStackBoardTest({
    stack,
    showMainAxis = true,
    showMiddleAxis = true,
    selectedCoin = 'S/N',
    coinFlipped = false,
    showSecondaryAxis = false,
    secondaryCoin = 'T/F',
    secondaryCoinFlipped = false,
}: FunctionStackBoardProps) {
    // Find functions by ID
    const A = stack.find(f => f.id === 'A')!;
    const B = stack.find(f => f.id === 'B')!;
    const C = stack.find(f => f.id === 'C')!;
    const D = stack.find(f => f.id === 'D')!;

    // Positioning: A-D vertical (north-south), B-C horizontal (west-east)
    // When secondary axis is shown, shift main axis left and secondary right
    const centerX = 150;
    const axisOffset = showSecondaryAxis ? 50 : 0;

    const aActivePos: Position = { x: centerX - axisOffset, y: 60 };   // North
    const dActivePos: Position = { x: centerX - axisOffset, y: 240 };  // South
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

    // Get coin display for A and D
    const aDisplay = getCoinDisplay(selectedCoin, 'A', coinFlipped);
    const dDisplay = getCoinDisplay(selectedCoin, 'D', coinFlipped);

    // Get coin display for secondary axis
    const aSecondaryDisplay = getCoinDisplay(secondaryCoin, 'A', secondaryCoinFlipped);
    const dSecondaryDisplay = getCoinDisplay(secondaryCoin, 'D', secondaryCoinFlipped);

    // Secondary axis positions (offset to the right from center)
    const aSecondaryPos: Position = { x: centerX + axisOffset, y: 60 };
    const dSecondaryPos: Position = { x: centerX + axisOffset, y: 240 };

    return (
        <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}>
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

                {/* Drop shadow filters */}
                <filter id="shadow-large" x="-50%" y="-50%" width="200%" height="200%">
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

                <filter id="shadow-medium" x="-50%" y="-50%" width="200%" height="200%">
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

                <filter id="shadow-small" x="-50%" y="-50%" width="200%" height="200%">
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
            {showMainAxis && (
                <g
                    style={{
                        cursor: 'default',
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
                    {/* Main bubble with gradient */}
                    <circle
                        cx={aActivePos.x}
                        cy={aActivePos.y}
                        r={aRadius}
                        fill={`url(#gradient-${aDisplay.label.charAt(0)})`}
                        filter="url(#shadow-large)"
                    />
                    {/* Subtle border for definition */}
                    <circle
                        cx={aActivePos.x}
                        cy={aActivePos.y}
                        r={aRadius - 1}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                    {/* Glossy shine overlay */}
                    <circle
                        cx={aActivePos.x - aRadius * 0.15}
                        cy={aActivePos.y - aRadius * 0.15}
                        r={aRadius * 0.35}
                        fill="url(#shine)"
                        pointerEvents="none"
                    />
                    {/* Function label */}
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
                        {aDisplay.label}
                    </text>
                </g>
            )}

            {/* D - Inferior function (South) */}
            {showMainAxis && (
                <g
                    style={{
                        cursor: 'default',
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
                    {/* Main bubble with grey gradient */}
                    <circle
                        cx={dActivePos.x}
                        cy={dActivePos.y}
                        r={dRadius}
                        fill="url(#gradient-grey)"
                        filter="url(#shadow-small)"
                    />
                    {/* Subtle border for definition */}
                    <circle
                        cx={dActivePos.x}
                        cy={dActivePos.y}
                        r={dRadius - 1}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={1}
                        pointerEvents="none"
                    />
                    {/* Glossy shine overlay */}
                    <circle
                        cx={dActivePos.x - dRadius * 0.15}
                        cy={dActivePos.y - dRadius * 0.15}
                        r={dRadius * 0.35}
                        fill="url(#shine)"
                        pointerEvents="none"
                    />
                    {/* Function label */}
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
                        {dDisplay.label}
                    </text>
                </g>
            )}

            {/* B - Second function (West) */}
            {showMiddleAxis && (
                <g
                    style={{
                        cursor: 'default',
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
                    {/* Main bubble with gradient */}
                    <circle
                        cx={bActivePos.x}
                        cy={bActivePos.y}
                        r={bRadius}
                        fill={B.isSavior ? `url(#gradient-${B.code.charAt(0)})` : 'url(#gradient-grey)'}
                        filter="url(#shadow-medium)"
                    />
                    {/* Subtle border for definition */}
                    <circle
                        cx={bActivePos.x}
                        cy={bActivePos.y}
                        r={bRadius - 1}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={1.5}
                        pointerEvents="none"
                    />
                    {/* Glossy shine overlay */}
                    <circle
                        cx={bActivePos.x - bRadius * 0.15}
                        cy={bActivePos.y - bRadius * 0.15}
                        r={bRadius * 0.35}
                        fill="url(#shine)"
                        pointerEvents="none"
                    />
                    {/* Function label */}
                    <text
                        x={bActivePos.x}
                        y={bActivePos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={bFontSize}
                        fontWeight="600"
                        fill="white"
                        pointerEvents="none"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                    >
                        {B.code}
                    </text>
                </g>
            )}

            {/* C - Third function (East) */}
            {showMiddleAxis && (
                <g
                    style={{
                        cursor: 'default',
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
                    {/* Main bubble with gradient */}
                    <circle
                        cx={cActivePos.x}
                        cy={cActivePos.y}
                        r={cRadius}
                        fill={C.isSavior ? `url(#gradient-${C.code.charAt(0)})` : 'url(#gradient-grey)'}
                        filter="url(#shadow-medium)"
                    />
                    {/* Subtle border for definition */}
                    <circle
                        cx={cActivePos.x}
                        cy={cActivePos.y}
                        r={cRadius - 1}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={1.5}
                        pointerEvents="none"
                    />
                    {/* Glossy shine overlay */}
                    <circle
                        cx={cActivePos.x - cRadius * 0.15}
                        cy={cActivePos.y - cRadius * 0.15}
                        r={cRadius * 0.35}
                        fill="url(#shine)"
                        pointerEvents="none"
                    />
                    {/* Function label */}
                    <text
                        x={cActivePos.x}
                        y={cActivePos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={cFontSize}
                        fontWeight="600"
                        fill="white"
                        pointerEvents="none"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                    >
                        {C.code}
                    </text>
                </g>
            )}

            {/* Secondary axis */}
            {showSecondaryAxis && (
                <>
                    {/* Secondary axis line */}
                    <line
                        x1={aSecondaryPos.x}
                        y1={aSecondaryPos.y}
                        x2={dSecondaryPos.x}
                        y2={dSecondaryPos.y}
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="6,6"
                        opacity={0.5}
                    />

                    {/* Secondary A bubble */}
                    <g
                        style={{
                            cursor: 'default',
                            transition: 'transform 0.3s ease',
                            transformOrigin: `${aSecondaryPos.x}px ${aSecondaryPos.y}px`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <circle
                            cx={aSecondaryPos.x}
                            cy={aSecondaryPos.y}
                            r={aRadius}
                            fill={`url(#gradient-${aSecondaryDisplay.label.charAt(0)})`}
                            filter="url(#shadow-large)"
                        />
                        <circle
                            cx={aSecondaryPos.x}
                            cy={aSecondaryPos.y}
                            r={aRadius - 1}
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth={2}
                            pointerEvents="none"
                        />
                        <circle
                            cx={aSecondaryPos.x - aRadius * 0.15}
                            cy={aSecondaryPos.y - aRadius * 0.15}
                            r={aRadius * 0.35}
                            fill="url(#shine)"
                            pointerEvents="none"
                        />
                        <text
                            x={aSecondaryPos.x}
                            y={aSecondaryPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={aFontSize}
                            fontWeight="700"
                            fill="white"
                            pointerEvents="none"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                        >
                            {aSecondaryDisplay.label}
                        </text>
                    </g>

                    {/* Secondary D bubble */}
                    <g
                        style={{
                            cursor: 'default',
                            transition: 'transform 0.3s ease',
                            transformOrigin: `${dSecondaryPos.x}px ${dSecondaryPos.y}px`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <circle
                            cx={dSecondaryPos.x}
                            cy={dSecondaryPos.y}
                            r={dRadius}
                            fill="url(#gradient-grey)"
                            filter="url(#shadow-small)"
                        />
                        <circle
                            cx={dSecondaryPos.x}
                            cy={dSecondaryPos.y}
                            r={dRadius - 1}
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth={1}
                            pointerEvents="none"
                        />
                        <circle
                            cx={dSecondaryPos.x - dRadius * 0.15}
                            cy={dSecondaryPos.y - dRadius * 0.15}
                            r={dRadius * 0.35}
                            fill="url(#shine)"
                            pointerEvents="none"
                        />
                        <text
                            x={dSecondaryPos.x}
                            y={dSecondaryPos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={dFontSize}
                            fontWeight="600"
                            fill="white"
                            pointerEvents="none"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                        >
                            {dSecondaryDisplay.label}
                        </text>
                    </g>
                </>
            )}
        </svg>
    );
}
