"use client";

import React, { useState, useMemo } from 'react';
import { FunctionStackBoard } from '@/components/FunctionStackBoard';
import { FunctionStackBoardTest } from '@/components/FunctionStackBoardTest';
import { FunctionStackBoardStyled } from '@/components/FunctionStackBoardStyled';
import { getAllTypeOptions, getTypeOption } from '@/lib/typeDatabase';
import styles from './board.module.css';

type StyleType = 'glossy' | 'neon' | 'glass' | 'flat' | 'sketch' | 'neumorphic' | 'metallic' | 'pixel' | 'watercolor';

export default function BoardPage() {
    const [activeTab, setActiveTab] = useState<'main' | 'teach' | 'styles'>('teach');
    const [selectedType, setSelectedType] = useState('INFP-standard');
    const [showGhosts, setShowGhosts] = useState(false);
    const [interactive, setInteractive] = useState(false);
    const [showBoard, setShowBoard] = useState(false);
    const [compactEndpoints, setCompactEndpoints] = useState(true);

    // Teach tab specific controls
    const [showMainAxis, setShowMainAxis] = useState(true);
    const [showMiddleAxis, setShowMiddleAxis] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState('S/N');
    const [coinFlipped, setCoinFlipped] = useState(false);

    // Secondary axis controls
    const [showSecondaryAxis, setShowSecondaryAxis] = useState(false);
    const [secondaryCoin, setSecondaryCoin] = useState('T/F');
    const [secondaryCoinFlipped, setSecondaryCoinFlipped] = useState(false);

    // Styles tab controls
    const [selectedStyle, setSelectedStyle] = useState<StyleType>('glossy');

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

                {/* Tab buttons */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'main' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('main')}
                    >
                        Main bubbles
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'teach' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('teach')}
                    >
                        Teach
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'styles' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('styles')}
                    >
                        Styles
                    </button>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Live Preview */}
                <div className={styles.previewSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Live Board</h2>
                        <span className={styles.badge}>{currentType.label}</span>
                    </div>

                    <div className={styles.previewCard}>
                        {activeTab === 'main' ? (
                            <FunctionStackBoard
                                key={selectedType}
                                stack={currentType.stack}
                                showGhosts={showGhosts}
                                interactive={interactive}
                                showBoard={showBoard}
                                compactEndpoints={compactEndpoints}
                            />
                        ) : activeTab === 'teach' ? (
                            <FunctionStackBoardTest
                                key={selectedType}
                                stack={currentType.stack}
                                showMainAxis={showMainAxis}
                                showMiddleAxis={showMiddleAxis}
                                selectedCoin={selectedCoin}
                                coinFlipped={coinFlipped}
                                showSecondaryAxis={showSecondaryAxis}
                                secondaryCoin={secondaryCoin}
                                secondaryCoinFlipped={secondaryCoinFlipped}
                            />
                        ) : (
                            <FunctionStackBoardStyled
                                key={selectedType}
                                stack={currentType.stack}
                                styleType={selectedStyle}
                                showGhosts={false}
                                interactive={false}
                                showBoard={false}
                                compactEndpoints={true}
                            />
                        )}
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

                    {activeTab === 'main' ? (
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
                    ) : activeTab === 'teach' ? (
                        <>
                            <div className={styles.controlGroup}>
                                <label className={styles.controlLabel}>Select Coin</label>
                                <select
                                    value={selectedCoin}
                                    onChange={(e) => setSelectedCoin(e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="S/N">S/N coin</option>
                                    <option value="T/F">T/F coin</option>
                                    <option value="DI/DE">DI/DE coin</option>
                                    <option value="OE/OI">OE/OI coin</option>
                                </select>
                            </div>

                            <div className={styles.controlGroup}>
                                <button
                                    onClick={() => setCoinFlipped(!coinFlipped)}
                                    className={styles.flipButton}
                                >
                                    Flip Coin
                                </button>
                            </div>

                            <div className={styles.controlGroup}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={showSecondaryAxis}
                                        onChange={(e) => setShowSecondaryAxis(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Show secondary axis</span>
                                </label>
                            </div>

                            {showSecondaryAxis && (
                                <>
                                    <div className={styles.controlGroup}>
                                        <label className={styles.controlLabel}>Secondary Coin</label>
                                        <select
                                            value={secondaryCoin}
                                            onChange={(e) => setSecondaryCoin(e.target.value)}
                                            className={styles.select}
                                        >
                                            <option value="S/N">S/N coin</option>
                                            <option value="T/F">T/F coin</option>
                                            <option value="DI/DE">DI/DE coin</option>
                                            <option value="OE/OI">OE/OI coin</option>
                                        </select>
                                    </div>

                                    <div className={styles.controlGroup}>
                                        <button
                                            onClick={() => setSecondaryCoinFlipped(!secondaryCoinFlipped)}
                                            className={styles.flipButton}
                                        >
                                            Flip Secondary Coin
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className={styles.controlGroup}>
                            <label className={styles.controlLabel}>Visual Style</label>
                            <select
                                value={selectedStyle}
                                onChange={(e) => setSelectedStyle(e.target.value as StyleType)}
                                className={styles.select}
                            >
                                <option value="glossy">Glossy 3D</option>
                                <option value="neon">Neon Glow</option>
                                <option value="glass">Glassmorphism</option>
                                <option value="flat">Flat Material</option>
                                <option value="sketch">Hand-drawn</option>
                                <option value="neumorphic">Soft UI</option>
                                <option value="metallic">Metallic Chrome</option>
                                <option value="pixel">Pixel Art</option>
                                <option value="watercolor">Watercolor</option>
                            </select>
                        </div>
                    )}

                    {activeTab === 'main' ? (
                        <>
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

                            <div className={styles.controlGroup}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={showBoard}
                                        onChange={(e) => setShowBoard(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Show board boxes & labels</span>
                                </label>
                            </div>

                            <div className={styles.controlGroup}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={compactEndpoints}
                                        onChange={(e) => setCompactEndpoints(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Compact layout (move endpoints closer)</span>
                                </label>
                            </div>
                        </>
                    ) : activeTab === 'teach' ? (
                        <>
                            <div className={styles.controlGroup}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={showMainAxis}
                                        onChange={(e) => setShowMainAxis(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Show main axis (A-D vertical)</span>
                                </label>
                            </div>

                            <div className={styles.controlGroup}>
                                <label className={styles.toggleLabel}>
                                    <input
                                        type="checkbox"
                                        checked={showMiddleAxis}
                                        onChange={(e) => setShowMiddleAxis(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <span>Show middle axis (B-C horizontal)</span>
                                </label>
                            </div>
                        </>
                    ) : null}

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
