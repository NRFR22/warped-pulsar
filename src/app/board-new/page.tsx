"use client";

import React, { useState, useMemo } from 'react';
import styles from './board.module.css';
import { getAllTypeOptions } from '@/lib/typeDatabase';

// Color mapping for function types
const FUNCTION_COLORS: Record<string, string> = {
    'F': '#e74c3c', // red for Feeling
    'T': '#3498db', // blue for Thinking
    'S': '#2ecc71', // green for Sensing
    'N': '#f1c40f', // yellow for iNtuition
};

const DEMON_COLOR = '#999999'; // grey for demon functions

function getFunctionColor(code: string, isSavior: boolean): string {
    if (!isSavior) return DEMON_COLOR;
    const functionType = code.charAt(0); // F, T, S, or N
    return FUNCTION_COLORS[functionType] || '#ffffff';
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

                            {/* circles 1-4 with type colors */}
                            {showBall1 && extravertedStack[0] && (
                                <>
                                    <circle cx="143.4" cy="63.0" r="46.5"
                                        fill={getFunctionColor(extravertedStack[0].code, extravertedStack[0].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="143.4" y="63.0" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="18" fontWeight="bold">{extravertedStack[0].code}</text>
                                </>
                            )}
                            {showBall2 && extravertedStack[1] && (
                                <>
                                    <circle cx="51.0" cy="79.8" r="33.2"
                                        fill={getFunctionColor(extravertedStack[1].code, extravertedStack[1].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="51.0" y="79.8" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="14" fontWeight="bold">{extravertedStack[1].code}</text>
                                </>
                            )}
                            {showBall3 && extravertedStack[2] && (
                                <>
                                    <circle cx="119.4" cy="139.8" r="23.2"
                                        fill={getFunctionColor(extravertedStack[2].code, extravertedStack[2].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="119.4" y="139.8" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="12" fontWeight="bold">{extravertedStack[2].code}</text>
                                </>
                            )}
                            {showBall4 && extravertedStack[3] && (
                                <>
                                    <circle cx="63.8" cy="143.0" r="16.6"
                                        fill={getFunctionColor(extravertedStack[3].code, extravertedStack[3].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="63.8" y="143.0" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="10" fontWeight="bold">{extravertedStack[3].code}</text>
                                </>
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

                            {/* circles 5-8 with type colors */}
                            {showBall5 && introvertedStack[0] && (
                                <>
                                    <circle cx="63.0" cy="59.4" r="45.9"
                                        fill={getFunctionColor(introvertedStack[0].code, introvertedStack[0].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="63.0" y="59.4" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="18" fontWeight="bold">{introvertedStack[0].code}</text>
                                </>
                            )}
                            {showBall6 && introvertedStack[1] && (
                                <>
                                    <circle cx="153.8" cy="79.8" r="35.2"
                                        fill={getFunctionColor(introvertedStack[1].code, introvertedStack[1].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="153.8" y="79.8" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="14" fontWeight="bold">{introvertedStack[1].code}</text>
                                </>
                            )}
                            {showBall7 && introvertedStack[2] && (
                                <>
                                    <circle cx="85.0" cy="137.8" r="22.1"
                                        fill={getFunctionColor(introvertedStack[2].code, introvertedStack[2].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="85.0" y="137.8" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="12" fontWeight="bold">{introvertedStack[2].code}</text>
                                </>
                            )}
                            {showBall8 && introvertedStack[3] && (
                                <>
                                    <circle cx="141.8" cy="137.8" r="17.0"
                                        fill={getFunctionColor(introvertedStack[3].code, introvertedStack[3].isSavior)}
                                        stroke="#333" strokeWidth="2" />
                                    <text x="141.8" y="137.8" textAnchor="middle" dominantBaseline="central"
                                        fill="#fff" fontSize="10" fontWeight="bold">{introvertedStack[3].code}</text>
                                </>
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
