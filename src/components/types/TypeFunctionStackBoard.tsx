"use client";

import React from 'react';
import { generateStack, TYPE_STACKS, type TypeConfig } from '@/lib/typeDatabase';
import { type FuncCode, type StackFunction } from '@/components/FunctionStackBoard';

interface TypeFunctionStackBoardProps {
    functionStack: string; // e.g., "Fi-Ne / Si-Te"
    variant: 'standard' | 'jumper';
    size?: 'small' | 'medium' | 'large';
    showLabels?: boolean;
    onBubbleClick?: (bubble: StackFunction) => void;
}

// Parse function stack string to determine MBTI type
function parseFunctionStack(stackString: string): string | null {
    // Extract the functions (e.g., "Fi-Ne / Si-Te" => ["Fi", "Ne", "Si", "Te"])
    const functions = stackString
        .replace(/\s/g, '')
        .split('/')
        .join('-')
        .split('-') as FuncCode[];

    if (functions.length !== 4) return null;

    // Find matching MBTI type
    for (const [mbtiCode, typeFunctions] of Object.entries(TYPE_STACKS)) {
        if (
            typeFunctions[0] === functions[0] &&
            typeFunctions[1] === functions[1] &&
            typeFunctions[2] === functions[2] &&
            typeFunctions[3] === functions[3]
        ) {
            return mbtiCode;
        }
    }

    return null;
}

export function TypeFunctionStackBoard({
    functionStack,
    variant,
    size = 'large',
    showLabels = true,
    onBubbleClick
}: TypeFunctionStackBoardProps) {
    const mbtiCode = parseFunctionStack(functionStack);

    if (!mbtiCode) {
        return <div>Error: Could not parse function stack</div>;
    }

    const stack = generateStack(mbtiCode, variant as TypeConfig);

    // Calculate dimensions based on size
    const dimensions = {
        small: { width: 250, height: 250, radius: { A: 28, B: 18, C: 18, D: 14 } },
        medium: { width: 350, height: 350, radius: { A: 35, B: 22, C: 22, D: 18 } },
        large: { width: 500, height: 500, radius: { A: 40, B: 25, C: 25, D: 20 } }
    };

    const dim = dimensions[size];

    // Gradient definitions (same as FunctionStackBoard)
    const FUNCTION_GRADIENTS: Record<string, { base: string; middle: string; highlight: string }> = {
        F: { base: '#b91c1c', middle: '#ef4444', highlight: '#fca5a5' },
        T: { base: '#1e40af', middle: '#3b82f6', highlight: '#93c5fd' },
        S: { base: '#047857', middle: '#10b981', highlight: '#6ee7b7' },
        N: { base: '#ca8a04', middle: '#eab308', highlight: '#fde047' },
    };

    const getGradient = (code: FuncCode) => {
        const type = code.charAt(0) as keyof typeof FUNCTION_GRADIENTS;
        return FUNCTION_GRADIENTS[type] || FUNCTION_GRADIENTS.F;
    };

    // Render individual bubble
    const renderBubble = (func: StackFunction, position: { x: number; y: number }, radius: number) => {
        const gradient = func.isSavior ? getGradient(func.code) : { base: '#6b7280', middle: '#9ca3af', highlight: '#d1d5db' };
        const fontSize = func.id === 'A' ? 20 : func.id === 'D' ? 14 : 16;

        return (
            <g
                key={func.id}
                data-bubble-id={func.id}
                data-function-code={func.code}
                data-is-savior={func.isSavior}
                style={{
                    cursor: onBubbleClick ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    transformOrigin: `${position.x}px ${position.y}px`,
                }}
                onClick={() => onBubbleClick?.(func)}
                onMouseEnter={(e) => {
                    if (onBubbleClick) {
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (onBubbleClick) {
                        e.currentTarget.style.transform = 'scale(1)';
                    }
                }}
            >
                {/* Main bubble */}
                <circle
                    cx={position.x}
                    cy={position.y}
                    r={radius}
                    fill={`url(#gradient-${func.id}-${func.code})`}
                    filter={`url(#shadow-${func.id})`}
                />
                {/* Border */}
                <circle
                    cx={position.x}
                    cy={position.y}
                    r={radius - 1}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={func.id === 'A' ? 2 : 1.5}
                    pointerEvents="none"
                />
                {/* Shine overlay */}
                <circle
                    cx={position.x - radius * 0.15}
                    cy={position.y - radius * 0.15}
                    r={radius * 0.35}
                    fill="url(#shine)"
                    pointerEvents="none"
                />
                {/* Label */}
                <text
                    x={position.x}
                    y={position.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={fontSize}
                    fontWeight={func.id === 'A' ? '700' : '600'}
                    fill="white"
                    pointerEvents="none"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
                >
                    {func.code}
                </text>
            </g>
        );
    };

    // Calculate positions (compact layout from FunctionStackBoard)
    const centerX = dim.width / 2;
    const centerY = dim.height / 2;

    const A = stack.find(f => f.id === 'A')!;
    const B = stack.find(f => f.id === 'B')!;
    const C = stack.find(f => f.id === 'C')!;
    const D = stack.find(f => f.id === 'D')!;

    // Positioning based on attitude and kind
    const getAttitude = (code: FuncCode): 'I' | 'E' => code.endsWith('i') ? 'I' : 'E';
    const getKind = (code: FuncCode): 'D' | 'O' => ['F', 'T'].includes(code[0]) ? 'D' : 'O';

    const aAttitude = getAttitude(A.code);
    const dAttitude = getAttitude(D.code);

    // Hero and Inferior positions
    const heroX = aAttitude === 'I' ? centerX * 0.3 : centerX * 1.7;
    const inferiorX = dAttitude === 'I' ? centerX * 0.3 : centerX * 1.7;

    const heroY = centerY * 0.3;
    const inferiorY = centerY * 1.7;

    // Middle positions (B and C)
    const middleY = centerY;
    const leftX = centerX * 0.5;
    const rightX = centerX * 1.5;

    const positions = {
        A: { x: heroX, y: heroY },
        B: { x: leftX, y: middleY },
        C: { x: rightX, y: middleY },
        D: { x: inferiorX, y: inferiorY }
    };

    return (
        <svg
            viewBox={`0 0 ${dim.width} ${dim.height}`}
            width="100%"
            height="100%"
            style={{ maxWidth: `${dim.width}px`, margin: '0 auto', display: 'block' }}
        >
            <defs>
                {/* Gradients for each bubble */}
                {stack.map(func => {
                    const gradient = func.isSavior ? getGradient(func.code) : { base: '#6b7280', middle: '#9ca3af', highlight: '#d1d5db' };
                    return (
                        <radialGradient key={`gradient-${func.id}-${func.code}`} id={`gradient-${func.id}-${func.code}`} cx="35%" cy="35%">
                            <stop offset="0%" stopColor={gradient.highlight} />
                            <stop offset="30%" stopColor={gradient.middle} />
                            <stop offset="70%" stopColor={gradient.base} />
                            <stop offset="100%" stopColor={gradient.base} stopOpacity="0.9" />
                        </radialGradient>
                    );
                })}

                {/* Shine overlay */}
                <radialGradient id="shine" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>

                {/* Shadows */}
                <filter id="shadow-A" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="shadow-B" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="shadow-C" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="shadow-D" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                    <feOffset dx="0" dy="1" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.15" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* Render bubbles */}
            {renderBubble(A, positions.A, dim.radius.A)}
            {renderBubble(B, positions.B, dim.radius.B)}
            {renderBubble(C, positions.C, dim.radius.C)}
            {renderBubble(D, positions.D, dim.radius.D)}
        </svg>
    );
}
