"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TypeFunctionStackBoard } from '@/components/types/TypeFunctionStackBoard';
import { FunctionStackBoard } from '@/components/FunctionStackBoard';
import { getAllTypeOptions, getTypeOption } from '@/lib/typeDatabase';
import { extractEnhancedContent, generateKeyDifferences, getRelatedTypes, type ExtractedContent } from '@/lib/extractVariantContent';
import { type TypeProfile } from '@/data/types';
import styles from './variant-comparison.module.css';

// Get gradient ID based on function code and savior status
function getGradientId(code: string, isSavior: boolean): string {
    if (!isSavior) return 'url(#gradient-grey)';
    const functionType = code.charAt(0);
    return `url(#gradient-${functionType})`;
}

// SVG Defs component for glossy gradients and filters
function GlossyDefs() {
    return (
        <defs>
            <radialGradient id="gradient-F" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="30%" stopColor="#ef4444" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="gradient-T" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="gradient-S" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="30%" stopColor="#10b981" />
                <stop offset="70%" stopColor="#047857" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="gradient-N" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="30%" stopColor="#eab308" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="gradient-grey" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="30%" stopColor="#9ca3af" />
                <stop offset="70%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#6b7280" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="shine" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="3"/>
                <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>
    );
}

// Glossy ball component with hover expansion
interface GlossyBallProps {
    cx: number;
    cy: number;
    r: number;
    code: string;
    isSavior: boolean;
    fontSize: number;
}

function GlossyBall({ cx, cy, r, code, isSavior, fontSize }: GlossyBallProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <g
            filter="url(#shadow)"
            style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                transformOrigin: `${cx}px ${cy}px`,
                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <circle cx={cx} cy={cy} r={r} fill={getGradientId(code, isSavior)} />
            <circle cx={cx} cy={cy} r={r - 1} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
            <circle cx={cx - r * 0.15} cy={cy - r * 0.15} r={r * 0.35} fill="url(#shine)" />
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

// Ball matrix props
interface BallMatrixProps {
    stack: Array<{ code: string; isSavior: boolean }>;
}

// Extraverted-first ball matrix component (layout 1-4)
function ExtravertedBallMatrix({ stack }: BallMatrixProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 230 250" width="260" height="280" style={{ overflow: 'visible' }}>
            <GlossyDefs />
            {/* Line 1-4 */}
            <line x1="110.6" y1="96.0" x2="75.5" y2="131.2" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
            {/* Line 2-3 */}
            <line x1="76.0" y1="101.7" x2="101.9" y2="124.5" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />

            {/* Glossy balls 1-4 */}
            {stack[0] && (
                <GlossyBall cx={143.4} cy={63.0} r={46.5} code={stack[0].code} isSavior={stack[0].isSavior} fontSize={18} />
            )}
            {stack[1] && (
                <GlossyBall cx={51.0} cy={79.8} r={33.2} code={stack[1].code} isSavior={stack[1].isSavior} fontSize={14} />
            )}
            {stack[2] && (
                <GlossyBall cx={119.4} cy={139.8} r={23.2} code={stack[2].code} isSavior={stack[2].isSavior} fontSize={12} />
            )}
            {stack[3] && (
                <GlossyBall cx={63.8} cy={143.0} r={16.6} code={stack[3].code} isSavior={stack[3].isSavior} fontSize={10} />
            )}
        </svg>
    );
}

// Introverted-first ball matrix component (layout 5-8)
function IntrovertedBallMatrix({ stack }: BallMatrixProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -15 220 230" width="250" height="260" style={{ overflow: 'visible' }}>
            <GlossyDefs />
            {/* Line 5-8 (grey, two segments) */}
            <line x1="94.4" y1="93.0" x2="113.3" y2="113.2" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
            <line x1="113.3" y1="113.2" x2="130.0" y2="96.0" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
            {/* Line 6-7 (two segments) */}
            <line x1="101.7" y1="123.3" x2="113.3" y2="113.2" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />
            <line x1="113.3" y1="113.2" x2="129.0" y2="126.7" stroke="#bbbbbb" strokeWidth="3" strokeLinecap="round" />

            {/* Glossy balls 5-8 */}
            {stack[0] && (
                <GlossyBall cx={63.0} cy={59.4} r={45.9} code={stack[0].code} isSavior={stack[0].isSavior} fontSize={18} />
            )}
            {stack[1] && (
                <GlossyBall cx={153.8} cy={79.8} r={35.2} code={stack[1].code} isSavior={stack[1].isSavior} fontSize={14} />
            )}
            {stack[2] && (
                <GlossyBall cx={85.0} cy={137.8} r={22.1} code={stack[2].code} isSavior={stack[2].isSavior} fontSize={12} />
            )}
            {stack[3] && (
                <GlossyBall cx={141.8} cy={137.8} r={17.0} code={stack[3].code} isSavior={stack[3].isSavior} fontSize={10} />
            )}
        </svg>
    );
}

// Unified component that picks the right layout based on first function
function FunctionBallMatrix({ stack }: BallMatrixProps) {
    // Check if first function is extraverted (ends with 'e') or introverted (ends with 'i')
    const firstFunc = stack[0]?.code || '';
    const isExtraverted = firstFunc.endsWith('e');

    return isExtraverted
        ? <ExtravertedBallMatrix stack={stack} />
        : <IntrovertedBallMatrix stack={stack} />;
}

interface VariantComparisonPageProps {
    mbtiCode: string;
    variants: TypeProfile[];
}

export function VariantComparisonPage({ mbtiCode, variants }: VariantComparisonPageProps) {
    const [activeTab, setActiveTab] = useState<'standard' | 'jumper'>('standard');
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

    // Board section state
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Dropdown state for ball matrix testing
    const [standardSelectedType, setStandardSelectedType] = useState<string>('');
    const [jumperSelectedType, setJumperSelectedType] = useState<string>('');

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

                        {/* New Glossy Ball Matrix with Dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                            <FunctionBallMatrix
                                stack={(() => {
                                    const selectedTypeData = standardSelectedType
                                        ? allTypes.find(t => t.value === standardSelectedType)
                                        : null;
                                    if (selectedTypeData) {
                                        return selectedTypeData.stack.map(f => ({
                                            code: f.code,
                                            isSavior: f.isSavior,
                                        }));
                                    }
                                    // Fallback to page's standard variant
                                    const funcs = standardContent.functionStack.split('/').map(f => f.trim());
                                    return [
                                        { code: funcs[0] || 'Fi', isSavior: true },
                                        { code: funcs[1] || 'Ne', isSavior: true },
                                        { code: funcs[2] || 'Si', isSavior: false },
                                        { code: funcs[3] || 'Te', isSavior: false },
                                    ];
                                })()}
                            />
                            <select
                                value={standardSelectedType}
                                onChange={(e) => setStandardSelectedType(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    minWidth: '200px',
                                }}
                            >
                                <option value="">-- Select Type --</option>
                                {allTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
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

                        {/* New Glossy Ball Matrix with Dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                            <FunctionBallMatrix
                                stack={(() => {
                                    const selectedTypeData = jumperSelectedType
                                        ? allTypes.find(t => t.value === jumperSelectedType)
                                        : null;
                                    if (selectedTypeData) {
                                        return selectedTypeData.stack.map(f => ({
                                            code: f.code,
                                            isSavior: f.isSavior,
                                        }));
                                    }
                                    // Fallback to page's jumper variant
                                    const funcs = jumperContent.functionStack.split('/').map(f => f.trim());
                                    return [
                                        { code: funcs[0] || 'Fi', isSavior: true },
                                        { code: funcs[1] || 'Ne', isSavior: false },
                                        { code: funcs[2] || 'Si', isSavior: true },
                                        { code: funcs[3] || 'Te', isSavior: false },
                                    ];
                                })()}
                            />
                            <select
                                value={jumperSelectedType}
                                onChange={(e) => setJumperSelectedType(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.9rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    background: '#fff',
                                    cursor: 'pointer',
                                    minWidth: '200px',
                                }}
                            >
                                <option value="">-- Select Type --</option>
                                {allTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
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
