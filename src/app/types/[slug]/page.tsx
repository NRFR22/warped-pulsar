import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { typesData, type TypeProfile } from '@/data/types';
import { getTypeSlug } from '@/lib/utils';
import { VariantComparisonPage } from './VariantComparisonPage';
import styles from './type-detail.module.css';

const MBTI_REGEX = /MBTI:\s*([A-Z]{4})/;

const getMbtiLabel = (type: TypeProfile) => {
    const match = type.fullProfile.match(MBTI_REGEX);
    return match ? match[1] : '';
};

const getVariantLabel = (type: TypeProfile) => {
    const [firstRaw, secondRaw] = type.code.split('/');
    const firstOrientation = firstRaw.trim().charAt(1).toLowerCase();
    const secondOrientation = secondRaw.trim().charAt(1).toLowerCase();
    return firstOrientation === secondOrientation ? 'Jumper' : 'Standard';
};

const getVariantHighlights = (profile: string, limit = 2) => {
    const lines = profile
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('⭐') && !line.startsWith('**') && !line.startsWith('MBTI'));
    return lines.slice(0, limit);
};

export default async function TypeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const type = typesData.find(t => getTypeSlug(t) === slug)
        || typesData.find(t => t.name.toLowerCase().replace(/ /g, '-') === slug);

    if (!type) {
        const mbtiSlug = slug.toUpperCase();
        const isMbti = /^[A-Z]{4}$/.test(mbtiSlug);
        if (isMbti) {
                            const variants = typesData
                                .filter((t) => getMbtiLabel(t) === mbtiSlug)
                                .map((variant) => ({ ...variant, mbtiVariant: getVariantLabel(variant) }))
                                .sort((a, b) => {
                                    if (a.mbtiVariant === b.mbtiVariant) return 0;
                                    return a.mbtiVariant === 'Standard' ? -1 : 1;
                                });

            if (variants.length > 0) {
                // Use the new comprehensive variant comparison page
                return <VariantComparisonPage mbtiCode={mbtiSlug} variants={variants} />;
            }
        }

        notFound();
    }

    // Bento Grid Content Parser
    const parseProfile = (content: string) => {
        const sections = {
            intro: [] as string[],
            coreVibe: [] as string[],
            strengths: [] as string[],
            engine: [] as string[],
            growth: [] as string[],
            essence: [] as string[]
        };

        const lines = content.split('\n');
        let currentSection: keyof typeof sections = 'intro';

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            if (trimmed.includes('Core Vibe:')) {
                currentSection = 'coreVibe';
                return; // Skip header line
            } else if (trimmed.includes('What Makes You Different')) {
                currentSection = 'strengths';
                return;
            } else if (trimmed.includes('Your Inner Engine')) {
                currentSection = 'engine';
                return;
            } else if (trimmed.includes("When You're at Your Best")) {
                currentSection = 'growth';
                return;
            } else if (trimmed.includes('The Essence of the')) {
                currentSection = 'essence';
                return;
            }

            // Skip the "⭐ THE TYPE" header in intro as we have it in Hero
            if (currentSection === 'intro' && trimmed.startsWith('⭐')) return;
            if (currentSection === 'intro' && trimmed.includes('Savior') && trimmed.includes('Demon')) return;

            sections[currentSection].push(trimmed);
        });

        return sections;
    };

    const parsedContent = parseProfile(type.fullProfile);

    // Helper to render checkmarks
    const renderStrengths = (lines: string[]) => {
        const items: { title: string, desc: string }[] = [];
        let currentTitle = '';

        lines.forEach(line => {
            if (line.startsWith('✔')) {
                currentTitle = line.replace('✔', '').trim();
            } else if (currentTitle) {
                items.push({ title: currentTitle, desc: line });
                currentTitle = '';
            }
        });

        return (
            <div className={styles.strengthsGrid}>
                {items.map((item, i) => (
                    <div key={i} className={styles.strengthItem}>
                        <div className={styles.checkIcon}>✔</div>
                        <div>
                            <div className={styles.strengthTitle}>{item.title}</div>
                            <div className={styles.strengthDesc}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/types" className="hover:underline">Types</Link> › {type.name}
            </div>

            <div className={styles.bentoGrid}>
                {/* 1. Identity / Hero Card */}
                <div className={styles.cardIdentity}>
                    <div className={styles.heroHeader}>
                        <div className={styles.avatarSmall} style={{ background: type.color }}>
                            {type.code}
                        </div>
                        <div>
                            <h1 className={styles.heroTitle}>{type.name}</h1>
                            <div className={styles.heroMeta}>{type.code} • {type.family}</div>
                        </div>
                    </div>
                    <div className={styles.introText}>
                        {parsedContent.intro.map((line, i) => (
                            <p key={i} className={styles.paragraph}>{line}</p>
                        ))}
                    </div>
                </div>

                {/* 2. Core Vibe Card */}
                <div className={styles.cardVibe} style={{ background: `linear-gradient(135deg, ${type.color}10, transparent)` }}>
                    <h3 className={styles.cardTitle}>Core Vibe</h3>
                    <div className={styles.vibeList}>
                        {parsedContent.coreVibe.map((line, i) => (
                            <div key={i} className={styles.vibeItem}>{line.replace('*', '').trim()}</div>
                        ))}
                    </div>
                </div>

                {/* 3. Inner Engine Card */}
                <div className={styles.cardEngine}>
                    <h3 className={styles.cardTitle}>Inner Engine</h3>
                    <div className={styles.engineContent}>
                        {parsedContent.engine.map((line, i) => {
                            if (line.includes('Savior')) return <div key={i} className={styles.engineSavior}>{line}</div>;
                            if (line.includes('Demon')) return <div key={i} className={styles.engineDemon}>{line}</div>;
                            return <p key={i} className={styles.engineText}>{line}</p>;
                        })}
                    </div>
                </div>

                {/* 4. Strengths Card (Wide) */}
                <div className={styles.cardStrengths}>
                    <h3 className={styles.cardTitle}>Superpowers</h3>
                    {renderStrengths(parsedContent.strengths)}
                </div>

                {/* 5. Growth Card */}
                <div className={styles.cardGrowth}>
                    <h3 className={styles.cardTitle}>Growth & Best Self</h3>
                    <div className={styles.growthList}>
                        {parsedContent.growth.map((line, i) => (
                            <div key={i} className={styles.growthItem}>
                                <span className={styles.bullet}>•</span>
                                {line.replace('*', '').trim()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. Essence / CTA Card */}
                <div className={styles.cardEssence}>
                    <div className={styles.essenceQuote}>
                        &ldquo;{parsedContent.essence.find(l => l.startsWith('"'))?.replace(/"/g, '') || parsedContent.essence[0]}&rdquo;
                    </div>
                    <Link href="/chat" className={styles.ctaButton}>
                        <Button className="w-full">Chat with {type.name}</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
