"use client";

import React, { useState } from 'react';
import styles from './board.module.css';

export default function BoardNewPage() {
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

                <div style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    background: '#fafafa',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.3 8.6 186.4 171.8" width="205" height="189">
                        {/* Line 1-4 (grey) */}
                        {showLine1_4 && (
                            <line x1="110.6" y1="96.0" x2="75.5" y2="131.2"
                                stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                        )}
                        {/* Line 2-3 (black) */}
                        {showLine2_3 && (
                            <line x1="76.0" y1="101.7" x2="101.9" y2="124.5"
                                stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                        )}

                        {/* circles */}
                        {showBall1 && (
                            <circle cx="143.4" cy="63.0" r="46.5" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall2 && (
                            <circle cx="51.0" cy="79.8" r="33.2" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall3 && (
                            <circle cx="119.4" cy="139.8" r="23.2" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall4 && (
                            <circle cx="63.8" cy="143.0" r="16.6" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}

                        {/* Line 5-8 (grey, two segments) */}
                        {showLine5_8 && (
                            <>
                                <line x1="94.4" y1="93.0" x2="113.3" y2="113.2"
                                    stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                                <line x1="113.3" y1="113.2" x2="126.6" y2="102.2"
                                    stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                            </>
                        )}

                        {/* Line 6-7 (black, two segments) */}
                        {showLine6_7 && (
                            <>
                                <line x1="101.7" y1="123.3" x2="113.3" y2="113.2"
                                    stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                                <line x1="113.3" y1="113.2" x2="129.0" y2="126.7"
                                    stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                            </>
                        )}

                        {/* Second set - circles (5-8) */}
                        {showBall5 && (
                            <circle cx="63.0" cy="59.4" r="45.9" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall6 && (
                            <circle cx="153.8" cy="79.8" r="35.2" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall7 && (
                            <circle cx="85.0" cy="137.8" r="22.1" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                        {showBall8 && (
                            <circle cx="141.8" cy="137.8" r="17.0" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}
