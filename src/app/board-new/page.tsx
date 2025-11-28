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

            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Ready for new implementation</p>
            </div>
        </div>
    );
}
