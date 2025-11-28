"use client";

import React from 'react';
import styles from './board.module.css';

export default function BoardNewPage() {
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
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    background: '#fafafa',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 189" width="205" height="189">
                        {/* circles */}
                        <circle cx="143.4" cy="63.0" r="46.5" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        <circle cx="51.0" cy="79.8" r="33.2" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        <circle cx="119.4" cy="139.8" r="23.2" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />
                        <circle cx="63.8" cy="143.0" r="16.6" fill="#ffffff" stroke="#cccccc" strokeWidth="2" />

                        {/* connecting lines */}
                        <line x1="110.6" y1="96.0" x2="75.5" y2="131.2"
                            stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
                        <line x1="76.0" y1="101.7" x2="101.9" y2="124.5"
                            stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
