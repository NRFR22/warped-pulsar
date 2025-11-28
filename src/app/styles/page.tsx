"use client";

import React, { useState } from 'react';
import { FunctionStackBoardStyled } from '@/components/FunctionStackBoardStyled';
import { getTypeOption } from '@/lib/typeDatabase';
import styles from './styles.module.css';

type StyleType =
    | 'glossy'
    | 'neon'
    | 'glass'
    | 'flat'
    | 'sketch'
    | 'neumorphic'
    | 'metallic'
    | 'pixel'
    | 'watercolor';

export default function StylesPage() {
    const [selectedStyle, setSelectedStyle] = useState<StyleType>('glossy');

    // Use INFP-standard as example
    const exampleType = getTypeOption('INFP-standard')!;

    const styleOptions: { value: StyleType; label: string; description: string }[] = [
        { value: 'glossy', label: 'Glossy 3D', description: 'Current style - radial gradients with shine' },
        { value: 'neon', label: 'Neon Glow', description: 'Vibrant glowing edges, cyberpunk feel' },
        { value: 'glass', label: 'Glassmorphism', description: 'Frosted glass with blur effects' },
        { value: 'flat', label: 'Flat Material', description: 'Clean solid colors, minimal shadows' },
        { value: 'sketch', label: 'Hand-drawn', description: 'Rough, organic, artistic appearance' },
        { value: 'neumorphic', label: 'Soft UI', description: 'Extruded/pressed look with soft shadows' },
        { value: 'metallic', label: 'Metallic Chrome', description: 'Shiny metal finish with reflections' },
        { value: 'pixel', label: 'Pixel Art', description: '8-bit retro gaming aesthetic' },
        { value: 'watercolor', label: 'Watercolor', description: 'Soft blended, artistic organic' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Visual Styles Showcase</h1>
                <p className={styles.subtitle}>
                    Explore different visual styles for the function stack bubbles
                </p>
            </div>

            <div className={styles.mainGrid}>
                {/* Preview */}
                <div className={styles.previewSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Live Preview</h2>
                        <span className={styles.badge}>{exampleType.label}</span>
                    </div>

                    <div className={styles.previewCard}>
                        <FunctionStackBoardStyled
                            stack={exampleType.stack}
                            styleType={selectedStyle}
                            showGhosts={false}
                            interactive={false}
                            showBoard={false}
                            compactEndpoints={true}
                        />
                    </div>

                    <div className={styles.info}>
                        <p className={styles.infoText}>
                            {styleOptions.find(s => s.value === selectedStyle)?.description}
                        </p>
                    </div>
                </div>

                {/* Style Selector */}
                <div className={styles.controlsSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Select Style</h2>
                    </div>

                    <div className={styles.styleGrid}>
                        {styleOptions.map(option => (
                            <label
                                key={option.value}
                                className={`${styles.styleCard} ${selectedStyle === option.value ? styles.styleCardActive : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="style"
                                    value={option.value}
                                    checked={selectedStyle === option.value}
                                    onChange={(e) => setSelectedStyle(e.target.value as StyleType)}
                                    className={styles.styleRadio}
                                />
                                <div className={styles.styleCardContent}>
                                    <h3 className={styles.styleLabel}>{option.label}</h3>
                                    <p className={styles.styleDesc}>{option.description}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Styles Grid */}
            <div className={styles.gallerySection}>
                <h2 className={styles.galleryTitle}>All Styles Comparison</h2>
                <div className={styles.galleryGrid}>
                    {styleOptions.map(option => (
                        <div key={option.value} className={styles.galleryCard}>
                            <h3 className={styles.galleryLabel}>{option.label}</h3>
                            <div className={styles.galleryPreview}>
                                <FunctionStackBoardStyled
                                    stack={exampleType.stack}
                                    styleType={option.value}
                                    showGhosts={false}
                                    interactive={false}
                                    showBoard={false}
                                    compactEndpoints={true}
                                />
                            </div>
                            <p className={styles.galleryDesc}>{option.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
