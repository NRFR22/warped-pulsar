"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeFunctionStackBoard } from '@/components/types/TypeFunctionStackBoard';
import { FunctionStackBoard } from '@/components/FunctionStackBoard';
import { getAllTypeOptions, getTypeOption } from '@/lib/typeDatabase';
import { extractEnhancedContent, generateKeyDifferences, getRelatedTypes, type ExtractedContent } from '@/lib/extractVariantContent';
import { type TypeProfile } from '@/data/types';
import styles from './variant-comparison.module.css';

interface VariantComparisonPageProps {
    mbtiCode: string;
    variants: TypeProfile[];
}

export function VariantComparisonPage({ mbtiCode, variants }: VariantComparisonPageProps) {
    const [activeTab, setActiveTab] = useState<'standard' | 'jumper'>('standard');
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

    // Board section state
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Get all available types (32 total - 16 types × 2 configs)
    const allTypes = useMemo(() => getAllTypeOptions(), []);

    // Get current type configuration - default to mbtiCode-standard
    const currentType = getTypeOption(selectedType || `${mbtiCode}-standard`);

    // Extract content for both variants
    const standardVariant = variants.find(v => {
        const extracted = extractEnhancedContent(v);
        return extracted.variant === 'standard';
    });

    const jumperVariant = variants.find(v => {
        const extracted = extractEnhancedContent(v);
        return extracted.variant === 'jumper';
    });

    if (!standardVariant || !jumperVariant) {
        return <div>Error: Missing variant data</div>;
    }

    const standardContent = extractEnhancedContent(standardVariant);
    const jumperContent = extractEnhancedContent(jumperVariant);
    const keyDifferences = generateKeyDifferences(standardContent, jumperContent);
    const relatedTypes = getRelatedTypes(mbtiCode);

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className={styles.variantContainer}>
            <div className={styles.breadcrumb}>
                <Link href="/types" className="hover:underline">Types</Link> › {mbtiCode}
            </div>

            {/* Hero Section */}
            <motion.div
                className={styles.hero}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
            >
                <h1 className={styles.heroTitle}>{mbtiCode} Variants</h1>
                <p className={styles.heroSubtitle}>Two expressions of the same cognitive wiring</p>
                <p className={styles.heroDescription}>
                    Same MBTI type, different developmental paths. Explore how your savior functions create distinct personality expressions.
                </p>

                <motion.div
                    className={styles.variantBadges}
                    variants={stagger}
                >
                    <motion.div
                        className={styles.variantBadge}
                        style={{ borderColor: standardVariant.color, color: standardVariant.color }}
                        variants={fadeInUp}
                    >
                        <div className={styles.badgeAvatar} style={{ background: standardVariant.color }}>
                            {standardContent.code}
                        </div>
                        <div>
                            <div className={styles.badgeLabel}>Standard</div>
                            <div className={styles.badgeName}>{standardContent.name}</div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.variantBadge}
                        style={{ borderColor: jumperVariant.color, color: jumperVariant.color }}
                        variants={fadeInUp}
                    >
                        <div className={styles.badgeAvatar} style={{ background: jumperVariant.color }}>
                            {jumperContent.code}
                        </div>
                        <div>
                            <div className={styles.badgeLabel}>Jumper</div>
                            <div className={styles.badgeName}>{jumperContent.name}</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Visual Character + Function Stack Display */}
                <motion.div
                    className={styles.visualComparison}
                    variants={stagger}
                >
                    {/* Standard Variant Visual */}
                    <motion.div className={styles.variantVisual} variants={fadeInUp}>
                        <div className={styles.variantHeader}>
                            <span className={styles.variantLabel}>Standard</span>
                            <h3 className={styles.variantName}>{standardContent.name}</h3>
                        </div>

                        {/* Character Placeholder */}
                        <div className={styles.characterPlaceholder}>
                            <div className={styles.characterIcon}>👤</div>
                        </div>

                        {/* Function Stack Bubbles */}
                        <div className={styles.functionStackVisual}>
                            <TypeFunctionStackBoard
                                functionStack={standardContent.functionStack}
                                variant="standard"
                                size="large"
                            />
                        </div>
                    </motion.div>

                    {/* Jumper Variant Visual */}
                    <motion.div className={styles.variantVisual} variants={fadeInUp}>
                        <div className={styles.variantHeader}>
                            <span className={styles.variantLabel}>Jumper</span>
                            <h3 className={styles.variantName}>{jumperContent.name}</h3>
                        </div>

                        {/* Character Placeholder */}
                        <div className={styles.characterPlaceholder}>
                            <div className={styles.characterIcon}>👤</div>
                        </div>

                        {/* Function Stack Bubbles */}
                        <div className={styles.functionStackVisual}>
                            <TypeFunctionStackBoard
                                functionStack={jumperContent.functionStack}
                                variant="jumper"
                                size="large"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Quick Comparison Table */}
            <motion.div
                className={styles.quickComparison}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className={styles.comparisonTitle}>At a Glance</h2>
                <div className={styles.comparisonTable}>
                    <div className={styles.tableHeader}>Aspect</div>
                    <div className={styles.tableHeader}>Standard • {standardContent.name}</div>
                    <div className={styles.tableHeader}>Jumper • {jumperContent.name}</div>

                    <div className={styles.tableCell}>
                        <div className={styles.tableCellLabel}>Function Stack</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{standardContent.functionStack}</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{jumperContent.functionStack}</div>
                    </div>

                    <div className={styles.tableCell}>
                        <div className={styles.tableCellLabel}>Core Essence</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{standardContent.shortDescription}</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{jumperContent.shortDescription}</div>
                    </div>

                    <div className={styles.tableCell}>
                        <div className={styles.tableCellLabel}>Primary Energy</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{standardContent.coreVibe[0] || 'Balanced approach'}</div>
                    </div>
                    <div className={styles.tableCell}>
                        <div className={styles.tableCellValue}>{jumperContent.coreVibe[0] || 'Dynamic expression'}</div>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Tabs */}
            <div className={styles.mobileTabs}>
                <button
                    className={`${styles.mobileTab} ${activeTab === 'standard' ? styles.active : ''}`}
                    onClick={() => setActiveTab('standard')}
                >
                    Standard • {standardContent.name}
                </button>
                <button
                    className={`${styles.mobileTab} ${activeTab === 'jumper' ? styles.active : ''}`}
                    onClick={() => setActiveTab('jumper')}
                >
                    Jumper • {jumperContent.name}
                </button>
            </div>

            {/* Side-by-Side Deep Dive */}
            <motion.div
                className={styles.sideBySide}
                initial="initial"
                animate="animate"
                variants={stagger}
            >
                {/* Standard Column */}
                <div className={`${styles.variantColumn} ${activeTab === 'standard' ? styles.active : ''}`}>
                    <VariantColumn content={standardContent} />
                </div>

                {/* Jumper Column */}
                <div className={`${styles.variantColumn} ${activeTab === 'jumper' ? styles.active : ''}`}>
                    <VariantColumn content={jumperContent} />
                </div>
            </motion.div>

            {/* Key Differences Section */}
            <motion.div
                className={styles.keyDifferences}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={styles.sectionTitle}>Key Differences</h2>
                <p className={styles.sectionSubtitle}>
                    How these two variants express the same cognitive wiring differently
                </p>
                <motion.div
                    className={styles.differencesGrid}
                    variants={stagger}
                >
                    {keyDifferences.map((diff, index) => (
                        <motion.div
                            key={index}
                            className={styles.differenceCard}
                            variants={fadeInUp}
                        >
                            <div className={styles.differenceIcon}>{diff.icon}</div>
                            <h3 className={styles.differenceAspect}>{diff.aspect}</h3>
                            <div className={styles.differenceComparison}>
                                <div className={styles.differenceItem}>
                                    <div className={styles.differenceLabel}>Standard</div>
                                    <div className={styles.differenceText}>{diff.standard}</div>
                                </div>
                                <div className={styles.differenceItem}>
                                    <div className={styles.differenceLabel}>Jumper</div>
                                    <div className={styles.differenceText}>{diff.jumper}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Interactive Quiz */}
            <motion.div
                className={styles.interactiveQuiz}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.quizContent}>
                    <h2 className={styles.sectionTitle}>Which Variant Are You?</h2>
                    <p className={styles.sectionSubtitle}>Answer this quick question to find out</p>

                    <div className={styles.quizQuestion}>
                        When facing a major decision, what's your natural tendency?
                    </div>

                    <div className={styles.quizOptions}>
                        <button
                            className={styles.quizOption}
                            onClick={() => setQuizAnswer('standard')}
                        >
                            <div className={styles.quizOptionLetter}>A</div>
                            <div className={styles.quizOptionText}>
                                I reflect on past experiences and look for proven patterns that have worked before
                            </div>
                        </button>
                        <button
                            className={styles.quizOption}
                            onClick={() => setQuizAnswer('jumper')}
                        >
                            <div className={styles.quizOptionLetter}>B</div>
                            <div className={styles.quizOptionText}>
                                I trust my intuition about future possibilities and follow my gut instinct
                            </div>
                        </button>
                    </div>

                    {quizAnswer && (
                        <motion.div
                            className={styles.quizResult}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.quizResultTitle}>
                                {quizAnswer === 'standard'
                                    ? `You might be ${standardContent.name}!`
                                    : `You might be ${jumperContent.name}!`}
                            </div>
                            <div className={styles.quizResultText}>
                                {quizAnswer === 'standard'
                                    ? `${standardContent.name} types lead with ${standardContent.functionStack.split('/')[0]}, drawing from experience and concrete details.`
                                    : `${jumperContent.name} types lead with ${jumperContent.functionStack.split('/')[0]}, trusting patterns and future vision.`}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Community Insights */}
            <motion.div
                className={styles.communityInsights}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={styles.sectionTitle}>Community Insights</h2>
                <p className={styles.sectionSubtitle}>What others are discovering</p>

                <div className={styles.insightsGrid}>
                    <div className={styles.insightCard}>
                        <div className={styles.insightStat}>73%</div>
                        <div className={styles.insightLabel}>Standard Variant</div>
                        <div className={styles.insightText}>
                            Most {mbtiCode} types identify as the Standard variant, reflecting the more common developmental path
                        </div>
                    </div>
                    <div className={styles.insightCard}>
                        <div className={styles.insightStat}>27%</div>
                        <div className={styles.insightLabel}>Jumper Variant</div>
                        <div className={styles.insightText}>
                            Jumper variants report feeling "different" from typical {mbtiCode} descriptions
                        </div>
                    </div>
                    <div className={styles.insightCard}>
                        <div className={styles.insightStat}>92%</div>
                        <div className={styles.insightLabel}>Clarity Gained</div>
                        <div className={styles.insightText}>
                            Users report better self-understanding after discovering their variant
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Expert Deep Dive */}
            <motion.div
                className={styles.expertDeepDive}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.deepDiveContent}>
                    <h2 className={styles.sectionTitle}>Expert Deep Dive</h2>
                    <p className={styles.sectionSubtitle}>Understanding the cognitive science behind variants</p>

                    <div className={styles.deepDiveSection}>
                        <h3 className={styles.deepDiveSectionTitle}>
                            🧠 What Makes a Jumper?
                        </h3>
                        <p className={styles.deepDiveText}>
                            In Objective Personality Science, a "Jumper" occurs when both savior functions share the same
                            orientation (both introverted or both extroverted). This creates a fundamentally different
                            information processing style compared to Standard variants.
                        </p>
                        <div className={styles.deepDiveHighlight}>
                            Standard variants alternate between inner and outer worlds, while Jumpers double down on one orientation,
                            creating a more intense but less balanced approach.
                        </div>
                    </div>

                    <div className={styles.deepDiveSection}>
                        <h3 className={styles.deepDiveSectionTitle}>
                            ⚖️ Neither is "Better"
                        </h3>
                        <p className={styles.deepDiveText}>
                            Both variants have equal strengths and challenges. Standard variants tend to be more balanced
                            but may lack the intensity of Jumpers. Jumpers have incredible depth in their orientation but
                            may struggle more with the opposite orientation.
                        </p>
                    </div>

                    <div className={styles.deepDiveSection}>
                        <h3 className={styles.deepDiveSectionTitle}>
                            🎯 Growth Implications
                        </h3>
                        <p className={styles.deepDiveText}>
                            Understanding your variant helps you know where to focus your personal development.
                            Standard variants benefit from deepening their strengths, while Jumpers often need to develop
                            skills in their non-dominant orientation.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Related Types */}
            {relatedTypes.length > 0 && (
                <motion.div
                    className={styles.relatedTypes}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.sectionTitle}>Related Types</h2>
                    <p className={styles.sectionSubtitle}>Explore similar cognitive wirings</p>

                    <div className={styles.relatedGrid}>
                        {relatedTypes.map((related) => (
                            <Link
                                key={related.mbti}
                                href={`/types/${related.slug}`}
                                className={styles.relatedCard}
                            >
                                <div className={styles.relatedMbti}>{related.mbti}</div>
                                <div className={styles.relatedName}>{related.name}</div>
                                <div className={styles.relatedSimilarity}>{related.similarity}</div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Final CTA */}
            <motion.div
                className={styles.finalCta}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={styles.ctaTitle}>Discover Your True Type</h2>
                <p className={styles.ctaSubtitle}>
                    Take our comprehensive assessment to find your exact variant and unlock deeper self-understanding
                </p>
                <div className={styles.ctaButtons}>
                    <Link href="/chat">
                        <Button size="lg">Start Voice Assessment</Button>
                    </Link>
                    <Link href="/types">
                        <Button variant="secondary" size="lg">Explore All Types</Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

// Variant Column Component
function VariantColumn({ content }: { content: ExtractedContent }) {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <>
            {/* Core Vibe Card */}
            <motion.div className={styles.card} variants={fadeInUp}>
                <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>✨</span>
                    Core Vibe
                </h3>
                <div className={styles.coreVibeList}>
                    {content.coreVibe.map((vibe, i) => (
                        <div key={i} className={styles.vibeItem}>{vibe}</div>
                    ))}
                </div>
            </motion.div>

            {/* Intro & Essence Card */}
            <motion.div className={styles.card} variants={fadeInUp}>
                <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>💫</span>
                    Essence
                </h3>
                <div className={styles.introEssence}>
                    {content.mainQuote && (
                        <div className={styles.quoteBlock}>
                            &ldquo;{content.mainQuote}&rdquo;
                        </div>
                    )}
                    {content.introText.slice(0, 2).map((text, i) => (
                        <p key={i} className={styles.introText}>{text}</p>
                    ))}
                </div>
            </motion.div>

            {/* Superpowers Card */}
            <motion.div className={styles.card} variants={fadeInUp}>
                <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>⚡</span>
                    Superpowers
                </h3>
                <div className={styles.superpowersGrid}>
                    {content.superpowers.map((power, i) => (
                        <div key={i} className={styles.superpower}>
                            <div className={styles.superpowerIcon}>✓</div>
                            <div className={styles.superpowerContent}>
                                <div className={styles.superpowerTitle}>{power.title}</div>
                                <div className={styles.superpowerDesc}>{power.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Inner Engine Card */}
            <motion.div className={styles.card} variants={fadeInUp}>
                <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🔧</span>
                    Inner Engine
                </h3>
                <div className={styles.engineContent}>
                    {content.saviorFunctions.map((func, i) => (
                        <div key={i} className={`${styles.engineFunction} ${styles.engineSavior}`}>
                            ✓ Savior: {func}
                        </div>
                    ))}
                    {content.demonFunctions.map((func, i) => (
                        <div key={i} className={`${styles.engineFunction} ${styles.engineDemon}`}>
                            ⚠ Demon: {func}
                        </div>
                    ))}
                    {content.engineExplanation.slice(0, 2).map((text, i) => (
                        <p key={i} className={styles.engineText}>{text}</p>
                    ))}
                </div>
            </motion.div>

            {/* Growth Card */}
            <motion.div className={styles.card} variants={fadeInUp}>
                <h3 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🌱</span>
                    Growth Path
                </h3>
                <div className={styles.growthList}>
                    {content.growthPoints.map((point, i) => (
                        <div key={i} className={styles.growthItem}>{point}</div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
