"use client";

import React, { useState, useMemo } from 'react';
import styles from './board.module.css';
import { getAllTypeOptions } from '@/lib/typeDatabase';

// Get gradient ID based on function code and savior status
function getGradientId(code: string, isSavior: boolean): string {
    if (!isSavior) return 'url(#gradient-grey)';
    const functionType = code.charAt(0); // F, T, S, or N
    return `url(#gradient-${functionType})`;
}

// SVG Defs component for glossy gradients and filters
function GlossyDefs() {
    return (
        <defs>
            {/* Glossy gradient for F (Feeling) - Red */}
            <radialGradient id="gradient-F" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="30%" stopColor="#ef4444" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.9" />
            </radialGradient>

            {/* Glossy gradient for T (Thinking) - Blue */}
            <radialGradient id="gradient-T" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
            </radialGradient>

            {/* Glossy gradient for S (Sensing) - Green */}
            <radialGradient id="gradient-S" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="30%" stopColor="#10b981" />
                <stop offset="70%" stopColor="#047857" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
            </radialGradient>

            {/* Glossy gradient for N (iNtuition) - Yellow */}
            <radialGradient id="gradient-N" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="30%" stopColor="#eab308" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9" />
            </radialGradient>

            {/* Grey gradient for demon functions */}
            <radialGradient id="gradient-grey" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="30%" stopColor="#9ca3af" />
                <stop offset="70%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#6b7280" stopOpacity="0.9" />
            </radialGradient>

            {/* Shine gradient for glossy highlight */}
            <radialGradient id="shine" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Shadow filter */}
            <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="3"/>
                <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>
    );
}

// Glossy ball component
interface GlossyBallProps {
    cx: number;
    cy: number;
    r: number;
    code: string;
    isSavior: boolean;
    fontSize: number;
}

function GlossyBall({ cx, cy, r, code, isSavior, fontSize }: GlossyBallProps) {
    return (
        <g filter="url(#shadow)">
            {/* Main ball with gradient */}
            <circle cx={cx} cy={cy} r={r} fill={getGradientId(code, isSavior)} />
            {/* Inner edge highlight */}
            <circle cx={cx} cy={cy} r={r - 1} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
            {/* Shine overlay */}
            <circle cx={cx - r * 0.15} cy={cy - r * 0.15} r={r * 0.35} fill="url(#shine)" />
            {/* Label */}
            <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize}
                fontWeight="700"
                fill="white"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
            >
                {code}
            </text>
        </g>
    );
}

export default function BoardNewPage() {
    // Get all type options and split into extraverted-first and introverted-first
    const allTypes = useMemo(() => getAllTypeOptions(), []);

    const extravertedTypes = useMemo(() =>
        allTypes.filter(t => t.stack[0].code.endsWith('e')),
        [allTypes]
    );

    const introvertedTypes = useMemo(() =>
        allTypes.filter(t => t.stack[0].code.endsWith('i')),
        [allTypes]
    );

    // Selected type for each layout
    const [selectedExtravertedType, setSelectedExtravertedType] = useState(extravertedTypes[0]?.value || '');
    const [selectedIntrovertedType, setSelectedIntrovertedType] = useState(introvertedTypes[0]?.value || '');

    // Get the current stack for each layout
    const extravertedStack = useMemo(() => {
        const type = extravertedTypes.find(t => t.value === selectedExtravertedType);
        return type?.stack || [];
    }, [extravertedTypes, selectedExtravertedType]);

    const introvertedStack = useMemo(() => {
        const type = introvertedTypes.find(t => t.value === selectedIntrovertedType);
        return type?.stack || [];
    }, [introvertedTypes, selectedIntrovertedType]);

    const [showBall1, setShowBall1] = useState(true);
    const [showBall2, setShowBall2] = useState(true);
    const [showBall3, setShowBall3] = useState(true);
    const [showBall4, setShowBall4] = useState(true);
    const [showBall5, setShowBall5] = useState(true);
    const [showBall6, setShowBall6] = useState(true);
    const [showBall7, setShowBall7] = useState(true);
    const [showBall8, setShowBall8] = useState(true);

    // Line toggles
    const [showLine1_4, setShowLine1_4] = useState(true);
    const [showLine2_3, setShowLine2_3] = useState(true);
    const [showLine5_8, setShowLine5_8] = useState(true);
    const [showLine6_7, setShowLine6_7] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Board New</h1>
                <p className={styles.subtitle}>
                    Fresh start - building from scratch
                </p>
            </div>

            <div style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
            }}>
                {/* Toggle controls */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall1}
                            onChange={(e) => setShowBall1(e.target.checked)}
                        />
                        Ball 1 (largest)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall2}
                            onChange={(e) => setShowBall2(e.target.checked)}
                        />
                        Ball 2
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall3}
                            onChange={(e) => setShowBall3(e.target.checked)}
                        />
                        Ball 3
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall4}
                            onChange={(e) => setShowBall4(e.target.checked)}
                        />
                        Ball 4 (smallest)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall5}
                            onChange={(e) => setShowBall5(e.target.checked)}
                        />
                        Ball 5
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall6}
                            onChange={(e) => setShowBall6(e.target.checked)}
                        />
                        Ball 6
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall7}
                            onChange={(e) => setShowBall7(e.target.checked)}
                        />
                        Ball 7
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showBall8}
                            onChange={(e) => setShowBall8(e.target.checked)}
                        />
                        Ball 8
                    </label>
                </div>

                {/* Line toggles */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showLine1_4}
                            onChange={(e) => setShowLine1_4(e.target.checked)}
                        />
                        Line 1-4
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showLine2_3}
                            onChange={(e) => setShowLine2_3(e.target.checked)}
                        />
                        Line 2-3
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showLine5_8}
                            onChange={(e) => setShowLine5_8(e.target.checked)}
                        />
                        Line 5-8
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showLine6_7}
                            onChange={(e) => setShowLine6_7(e.target.checked)}
                        />
                        Line 6-7
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {/* First ball matrix (1-4) - Extraverted first function */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.3 8.6 186.4 171.8" width="225" height="208">
                            <GlossyDefs />
                            {/* Line 1-4 (grey) */}
                            {showLine1_4 && (
                                <line x1="110.6" y1="96.0" x2="75.5" y2="131.2"
                                    stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                            )}
                            {/* Line 2-3 */}
                            {showLine2_3 && (
                                <line x1="76.0" y1="101.7" x2="101.9" y2="124.5"
                                    stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                            )}

                            {/* Glossy balls 1-4 */}
                            {showBall1 && extravertedStack[0] && (
                                <GlossyBall cx={143.4} cy={63.0} r={46.5}
                                    code={extravertedStack[0].code} isSavior={extravertedStack[0].isSavior} fontSize={18} />
                            )}
                            {showBall2 && extravertedStack[1] && (
                                <GlossyBall cx={51.0} cy={79.8} r={33.2}
                                    code={extravertedStack[1].code} isSavior={extravertedStack[1].isSavior} fontSize={14} />
                            )}
                            {showBall3 && extravertedStack[2] && (
                                <GlossyBall cx={119.4} cy={139.8} r={23.2}
                                    code={extravertedStack[2].code} isSavior={extravertedStack[2].isSavior} fontSize={12} />
                            )}
                            {showBall4 && extravertedStack[3] && (
                                <GlossyBall cx={63.8} cy={143.0} r={16.6}
                                    code={extravertedStack[3].code} isSavior={extravertedStack[3].isSavior} fontSize={10} />
                            )}
                        </svg>

                        {/* Dropdown for extraverted types */}
                        <select
                            value={selectedExtravertedType}
                            onChange={(e) => setSelectedExtravertedType(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: '#fff',
                                cursor: 'pointer',
                                minWidth: '200px',
                            }}
                        >
                            {extravertedTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Second ball matrix (5-8) - Introverted first function */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.3 8.1 184.5 161.8" width="223" height="196">
                            <GlossyDefs />
                            {/* Line 5-8 (grey, two segments) */}
                            {showLine5_8 && (
                                <>
                                    <line x1="94.4" y1="93.0" x2="113.3" y2="113.2"
                                        stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="113.3" y1="113.2" x2="130.0" y2="96.0"
                                        stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                                </>
                            )}

                            {/* Line 6-7 (two segments) */}
                            {showLine6_7 && (
                                <>
                                    <line x1="101.7" y1="123.3" x2="113.3" y2="113.2"
                                        stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                                    <line x1="113.3" y1="113.2" x2="129.0" y2="126.7"
                                        stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                                </>
                            )}

                            {/* Glossy balls 5-8 */}
                            {showBall5 && introvertedStack[0] && (
                                <GlossyBall cx={63.0} cy={59.4} r={45.9}
                                    code={introvertedStack[0].code} isSavior={introvertedStack[0].isSavior} fontSize={18} />
                            )}
                            {showBall6 && introvertedStack[1] && (
                                <GlossyBall cx={153.8} cy={79.8} r={35.2}
                                    code={introvertedStack[1].code} isSavior={introvertedStack[1].isSavior} fontSize={14} />
                            )}
                            {showBall7 && introvertedStack[2] && (
                                <GlossyBall cx={85.0} cy={137.8} r={22.1}
                                    code={introvertedStack[2].code} isSavior={introvertedStack[2].isSavior} fontSize={12} />
                            )}
                            {showBall8 && introvertedStack[3] && (
                                <GlossyBall cx={141.8} cy={137.8} r={17.0}
                                    code={introvertedStack[3].code} isSavior={introvertedStack[3].isSavior} fontSize={10} />
                            )}
                        </svg>

                        {/* Dropdown for introverted types */}
                        <select
                            value={selectedIntrovertedType}
                            onChange={(e) => setSelectedIntrovertedType(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: '#fff',
                                cursor: 'pointer',
                                minWidth: '200px',
                            }}
                        >
                            {introvertedTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
