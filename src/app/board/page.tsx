"use client";

import React, { useState, useMemo } from 'react';
import { FunctionStackBoard } from '@/components/FunctionStackBoard';
import { getAllTypeOptions, getTypeOption } from '@/lib/typeDatabase';
import styles from './board.module.css';

export default function BoardPage() {
    const [selectedType, setSelectedType] = useState('INFP-standard');
    const [showGhosts, setShowGhosts] = useState(true);
    const [interactive, setInteractive] = useState(true);

    // Get all available types (32 total - 16 types × 2 configs)
    const allTypes = useMemo(() => getAllTypeOptions(), []);

    // Get current type configuration
    const currentType = getTypeOption(selectedType);

    if (!currentType) {
        return <div>Error: Type not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Function Stack Board</h1>
                <p className={styles.subtitle}>
                    Logic-driven bubble board with coin flipping
                </p>
            </div>

            <div className={styles.mainGrid}>
                {/* Live Preview */}
                <div className={styles.previewSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Live Board</h2>
                        <span className={styles.badge}>{currentType.label}</span>
                    </div>

                    <div className={styles.previewCard}>
                        <FunctionStackBoard
                            stack={currentType.stack}
                            showGhosts={showGhosts}
                            interactive={interactive}
                        />
                    </div>

                    <div className={styles.info}>
                        <p className={styles.infoText}>{currentType.description}</p>
                        {interactive && (
                            <p className={styles.hint}>
                                💡 Click bubbles to flip coins and see alternate positions
                            </p>
                        )}
                    </div>

                    <div className={styles.stackDisplay}>
                        <h3 className={styles.stackTitle}>Current Stack Data</h3>
                        <div className={styles.stackGrid}>
                            {currentType.stack.map(func => (
                                <div key={func.id} className={styles.stackItem}>
                                    <div className={styles.stackItemHeader}>
                                        <span className={styles.stackId}>{func.id}</span>
                                        <span className={styles.stackCode}>{func.code}</span>
                                    </div>
                                    <div className={styles.stackItemDetails}>
                                        <span>Index: {func.index}</span>
                                        <span className={func.isSavior ? styles.savior : styles.demon}>
                                            {func.isSavior ? 'Savior' : 'Demon'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controlsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Controls</h2>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Personality Type ({allTypes.length} total)</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className={styles.select}
                        >
                            <optgroup label="Introverted Types">
                                {allTypes
                                    .filter(t => t.value.startsWith('I'))
                                    .map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                            </optgroup>
                            <optgroup label="Extraverted Types">
                                {allTypes
                                    .filter(t => t.value.startsWith('E'))
                                    .map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                            </optgroup>
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                checked={showGhosts}
                                onChange={(e) => setShowGhosts(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <span>Show ghost positions</span>
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                checked={interactive}
                                onChange={(e) => setInteractive(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <span>Enable coin flipping (interactive)</span>
                        </label>
                    </div>

                    <div className={styles.legend}>
                        <h3 className={styles.legendTitle}>How it works</h3>
                        <div className={styles.legendContent}>
                            <div className={styles.legendSection}>
                                <h4>The Board</h4>
                                <ul>
                                    <li><strong>Top row:</strong> Savior functions</li>
                                    <li><strong>Bottom row:</strong> Demon functions</li>
                                    <li><strong>Left column:</strong> Introverted (i)</li>
                                    <li><strong>Right column:</strong> Extraverted (e)</li>
                                </ul>
                            </div>

                            <div className={styles.legendSection}>
                                <h4>The Coins</h4>
                                <ul>
                                    <li><strong>Outer coin:</strong> A & D flip left ↔ right</li>
                                    <li><strong>Inner coin:</strong> B & C flip top ↔ bottom</li>
                                    <li>Ghost positions show alternate slots</li>
                                    <li>Click any bubble to flip its coin</li>
                                </ul>
                            </div>

                            <div className={styles.legendSection}>
                                <h4>Standard vs Jumper</h4>
                                <ul>
                                    <li><strong>Standard:</strong> Saviors are 1st & 2nd</li>
                                    <li><strong>Jumper:</strong> Saviors are 1st & 3rd</li>
                                    <li>This changes B & C positioning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Examples Grid */}
            <div className={styles.examplesSection}>
                <h2 className={styles.examplesTitle}>Featured Examples</h2>
                <p className={styles.examplesSubtitle}>
                    Showing 8 common types (32 total available in dropdown above)
                </p>
                <div className={styles.examplesGrid}>
                    {/* Show a curated selection of 8 types */}
                    {allTypes
                        .filter(t => ['INFP-standard', 'ENTJ-standard', 'ISFJ-standard', 'ESTP-standard',
                                      'INFP-jumper', 'ENTJ-jumper', 'ISFJ-jumper', 'ESTP-jumper'].includes(t.value))
                        .map(type => (
                            <div
                                key={type.value}
                                className={`${styles.exampleCard} ${selectedType === type.value ? styles.exampleCardActive : ''}`}
                                onClick={() => setSelectedType(type.value)}
                            >
                                <h3 className={styles.exampleLabel}>{type.label}</h3>
                                <p className={styles.exampleDesc}>{type.description}</p>
                                <div className={styles.examplePreview}>
                                    <FunctionStackBoard
                                        stack={type.stack}
                                        showGhosts={false}
                                        interactive={false}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
