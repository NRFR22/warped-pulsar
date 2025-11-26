"use client";

import React, { useState } from 'react';
import { FunctionStackBubbles } from '@/components/FunctionStackBubbles';
import styles from './bubbles.module.css';

export default function BubblesPlayground() {
    const [functionStack, setFunctionStack] = useState('Fi/Ne');
    const [showAll, setShowAll] = useState(true);
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('large');

    const functionOptions = [
        'Fi/Ne', 'Fi/Ni', 'Fi/Se', 'Fi/Si',
        'Fe/Ne', 'Fe/Ni', 'Fe/Se', 'Fe/Si',
        'Ti/Ne', 'Ti/Ni', 'Ti/Se', 'Ti/Si',
        'Te/Ne', 'Te/Ni', 'Te/Se', 'Te/Si',
        'Ne/Fi', 'Ne/Fe', 'Ne/Ti', 'Ne/Te',
        'Ni/Fi', 'Ni/Fe', 'Ni/Ti', 'Ni/Te',
        'Se/Fi', 'Se/Fe', 'Se/Ti', 'Se/Te',
        'Si/Fi', 'Si/Fe', 'Si/Ti', 'Si/Te',
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Function Stack Bubbles</h1>
                <p className={styles.subtitle}>
                    Interactive Design Workspace & Component Documentation
                </p>
            </div>

            <div className={styles.mainGrid}>
                {/* Live Preview */}
                <div className={styles.previewSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Live Preview</h2>
                        <span className={styles.badge}>Interactive</span>
                    </div>

                    <div className={styles.previewCard}>
                        <FunctionStackBubbles
                            functionStack={functionStack}
                            showAll={showAll}
                            size={size}
                        />
                    </div>

                    <div className={styles.currentConfig}>
                        <div className={styles.configItem}>
                            <span className={styles.configLabel}>Stack:</span>
                            <code className={styles.configValue}>{functionStack}</code>
                        </div>
                        <div className={styles.configItem}>
                            <span className={styles.configLabel}>Show All:</span>
                            <code className={styles.configValue}>{showAll.toString()}</code>
                        </div>
                        <div className={styles.configItem}>
                            <span className={styles.configLabel}>Size:</span>
                            <code className={styles.configValue}>{size}</code>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controlsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Controls</h2>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Function Stack</label>
                        <select
                            value={functionStack}
                            onChange={(e) => setFunctionStack(e.target.value)}
                            className={styles.select}
                        >
                            {functionOptions.map(stack => (
                                <option key={stack} value={stack}>{stack}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Display Mode</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={!showAll}
                                    onChange={() => setShowAll(false)}
                                />
                                <span>2 Bubbles Only (Saviors)</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    checked={showAll}
                                    onChange={() => setShowAll(true)}
                                />
                                <span>All 4 Bubbles (2 Highlighted)</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <label className={styles.controlLabel}>Size</label>
                        <div className={styles.buttonGroup}>
                            <button
                                className={`${styles.sizeButton} ${size === 'small' ? styles.active : ''}`}
                                onClick={() => setSize('small')}
                            >
                                Small
                            </button>
                            <button
                                className={`${styles.sizeButton} ${size === 'medium' ? styles.active : ''}`}
                                onClick={() => setSize('medium')}
                            >
                                Medium
                            </button>
                            <button
                                className={`${styles.sizeButton} ${size === 'large' ? styles.active : ''}`}
                                onClick={() => setSize('large')}
                            >
                                Large
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation */}
            <div className={styles.documentation}>
                <div className={styles.sectionHeader}>
                    <h2>Usage Guide</h2>
                </div>

                <div className={styles.docSection}>
                    <h3>Basic Usage</h3>
                    <div className={styles.codeBlock}>
                        <pre><code>{`import { FunctionStackBubbles } from '@/components/FunctionStackBubbles';

<FunctionStackBubbles
  functionStack="Fi/Ne"
  showAll={true}
  size="large"
/>`}</code></pre>
                    </div>
                </div>

                <div className={styles.docSection}>
                    <h3>Props</h3>
                    <table className={styles.propsTable}>
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>functionStack</code></td>
                                <td><code>string</code></td>
                                <td>-</td>
                                <td>The function stack (e.g., "Fi/Ne")</td>
                            </tr>
                            <tr>
                                <td><code>showAll</code></td>
                                <td><code>boolean</code></td>
                                <td><code>false</code></td>
                                <td>Show all 4 functions or just 2 saviors</td>
                            </tr>
                            <tr>
                                <td><code>size</code></td>
                                <td><code>'small' | 'medium' | 'large'</code></td>
                                <td><code>'large'</code></td>
                                <td>Size of the bubble display</td>
                            </tr>
                            <tr>
                                <td><code>variant</code></td>
                                <td><code>'standard' | 'jumper'</code></td>
                                <td><code>'standard'</code></td>
                                <td>Type variant (for future use)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.docSection}>
                    <h3>Examples</h3>
                    <div className={styles.examplesGrid}>
                        <div className={styles.exampleCard}>
                            <div className={styles.examplePreview}>
                                <FunctionStackBubbles functionStack="Fi/Ne" showAll={false} size="small" />
                            </div>
                            <div className={styles.exampleCode}>
                                <code>showAll={`{false}`} size="small"</code>
                            </div>
                            <p className={styles.exampleDesc}>Just savior functions, compact size</p>
                        </div>

                        <div className={styles.exampleCard}>
                            <div className={styles.examplePreview}>
                                <FunctionStackBubbles functionStack="Te/Ni" showAll={true} size="medium" />
                            </div>
                            <div className={styles.exampleCode}>
                                <code>showAll={`{true}`} size="medium"</code>
                            </div>
                            <p className={styles.exampleDesc}>All 4 functions with highlighting</p>
                        </div>

                        <div className={styles.exampleCard}>
                            <div className={styles.examplePreview}>
                                <FunctionStackBubbles functionStack="Se/Ti" showAll={false} size="large" />
                            </div>
                            <div className={styles.exampleCode}>
                                <code>showAll={`{false}`} size="large"</code>
                            </div>
                            <p className={styles.exampleDesc}>Full size, saviors only</p>
                        </div>
                    </div>
                </div>

                <div className={styles.docSection}>
                    <h3>Color System</h3>
                    <p className={styles.colorSystemNote}>Colors are grouped by function type, not orientation (i/e)</p>
                    <div className={styles.colorGrid}>
                        {[
                            { func: 'Fi', color: '#ef4444', name: 'Introverted Feeling' },
                            { func: 'Fe', color: '#ef4444', name: 'Extroverted Feeling' },
                            { func: 'Ti', color: '#3b82f6', name: 'Introverted Thinking' },
                            { func: 'Te', color: '#3b82f6', name: 'Extroverted Thinking' },
                            { func: 'Si', color: '#10b981', name: 'Introverted Sensing' },
                            { func: 'Se', color: '#10b981', name: 'Extroverted Sensing' },
                            { func: 'Ni', color: '#eab308', name: 'Introverted Intuition' },
                            { func: 'Ne', color: '#eab308', name: 'Extroverted Intuition' },
                        ].map(({ func, color, name }) => (
                            <div key={func} className={styles.colorItem}>
                                <div
                                    className={styles.colorSwatch}
                                    style={{ background: color }}
                                />
                                <div className={styles.colorInfo}>
                                    <div className={styles.colorFunc}>{func}</div>
                                    <div className={styles.colorName}>{name}</div>
                                    <code className={styles.colorHex}>{color}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
