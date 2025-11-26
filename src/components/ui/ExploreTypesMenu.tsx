"use client";

import Link from 'next/link';
import { typeGroups } from '@/data/type-groups';
import styles from './ExploreTypesMenu.module.css';

interface ExploreTypesMenuProps {
    onTypeSelect?: (typeId: string) => void;
    onRequestClose?: () => void;
}

type TypeSummary = (typeof typeGroups)[number]['types'][number];

type MbtiCard = {
    mbti: string;
    standard?: TypeSummary;
    jumper?: TypeSummary;
};

const buildMbtiCards = (types: TypeSummary[], order?: string[]): MbtiCard[] => {
    const grouped = types.reduce((acc, type) => {
        if (!acc[type.mbti]) {
            acc[type.mbti] = [];
        }
        acc[type.mbti].push(type);
        return acc;
    }, {} as Record<string, TypeSummary[]>);

    const orderedCodes = order && order.length ? order : Object.keys(grouped);

    return orderedCodes
        .map((code) => {
            const matches = grouped[code];
            if (!matches || matches.length === 0) return null;
            const standard = matches.find((t) => t.variant === 'standard') || matches[0];
            const jumper = matches.find((t) => t.variant === 'jumper') || matches.find((t) => t.id !== standard?.id);
            return { mbti: code, standard, jumper };
        })
        .filter((card): card is MbtiCard => Boolean(card));
};

export function ExploreTypesMenu({ onTypeSelect = (id) => console.log('Select type', id), onRequestClose }: ExploreTypesMenuProps) {
    const handleCardClick = (typeId?: string) => {
        if (typeId) {
            onTypeSelect(typeId);
        }
    };

    return (
        <div className={styles.panel} role="menu" aria-label="Explore types">
            {onRequestClose && (
                <button type="button" className={styles.mobileClose} onClick={onRequestClose} aria-label="Close menu">
                    ×
                </button>
            )}
            <div className={styles.headerIntro}>
                <div>
                    <p className={styles.panelLabel}>Explore types</p>
                    <h3>Beyond the 16 types — discover your true cognitive wiring</h3>
                    <p className={styles.panelSubtext}>32 archetypes. Because you're more than four letters.</p>
                </div>
            </div>
            {typeGroups.map((group) => (
                <div key={group.id} className={styles.groupSection}>
                    <div className={styles.groupInfo}>
                        <div className={styles.groupLabel}>{group.label}</div>
                        <p>{group.description}</p>
                        {group.functionHint && <span className={styles.functionHint}>{group.functionHint}</span>}
                    </div>
                    <div className={styles.cardsGrid}>
                        {buildMbtiCards(group.types, group.mbtiOrder).map((card) => {
                            const targetSlug = card.mbti.toLowerCase();

                            return (
                                <Link
                                    key={`${group.id}-${card.mbti}`}
                                    href={`/types/${targetSlug}`}
                                    className={styles.mbtiCard}
                                    style={{ background: group.accent }}
                                    onClick={() => handleCardClick(card.standard?.id || card.jumper?.id)}
                                >
                                    <div className={styles.mbtiCode}>{card.mbti}</div>
                                    <div className={styles.variantList}>
                                        <div className={styles.variantRow}>
                                            <span className={styles.variantName}>{card.standard?.name || 'Standard variant coming soon'}</span>
                                            <span className={styles.variantTag}>Standard</span>
                                        </div>
                                        <div className={styles.variantRow}>
                                            <span className={styles.variantName}>{card.jumper?.name || 'Jumper variant coming soon'}</span>
                                            <span className={styles.variantTag}>Jumper</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardHint}>2 variants →</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div className={styles.footerLink}>
                <Link href="/types">Explore all 32 different types →</Link>
            </div>
        </div>
    );
}
