'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { typesData } from '@/data/types';
import { FAMILY_GROUPS } from '@/data/family-groups';
import styles from './TypeExplorer.module.css';

const FAMILY_LOOKUP = FAMILY_GROUPS.flatMap(group => group.families);

const FUNCTION_COLORS: Record<string, string> = {
    F: '#ff6b6b',
    T: '#6c83ff',
    N: '#ffd75e',
    S: '#68d391',
};

const hexToRgba = (hex: string, alpha: number) => {
    const sanitized = hex.replace('#', '');
    const isShort = sanitized.length === 3;
    const expanded = isShort ? sanitized.split('').map(char => char + char).join('') : sanitized;
    const bigint = parseInt(expanded, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getSplitBackgroundForType = (code: string) => {
    const [firstRaw, secondRaw] = code.split('/');
    const first = firstRaw?.trim().charAt(0).toUpperCase();
    const second = secondRaw?.trim().charAt(0).toUpperCase();
    const start = FUNCTION_COLORS[first || ''] || '#f4f4f5';
    const end = FUNCTION_COLORS[second || ''] || '#e5e7eb';
    return `linear-gradient(135deg, ${hexToRgba(start, 0.5)} 50%, ${hexToRgba(end, 0.5)} 50%)`;
};

export function TypeExplorer() {
    const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
    const [activeFamily, setActiveFamily] = useState<string | null>(null);

    const handleGroupToggle = (groupId: string) => {
        setActiveFamily(null);
        setExpandedGroupId(prev => (prev === groupId ? null : groupId));
    };

    const activeFamilyMeta = activeFamily ? FAMILY_LOOKUP.find(f => f.id === activeFamily) : undefined;

    return (
        <div className={styles.root}>
            <div className={styles.collapsed}>
                <p className={styles.collapsedIntro}>Start with the core energy that feels most like you.</p>
                <div className={styles.collapsedGrid}>
                    {FAMILY_GROUPS.map(group => {
                        const isExpanded = expandedGroupId === group.id;
                        const selectedFamily = activeFamily && group.families.some(f => f.id === activeFamily)
                            ? activeFamilyMeta
                            : undefined;

                        return (
                            <div
                                key={group.id}
                                className={cn(styles.collapsedCard, isExpanded && styles.collapsedCardActive)}
                                style={{ borderColor: group.accentBorder, background: `linear-gradient(135deg, ${group.accent} 0%, rgba(255,255,255,0) 100%)` }}
                            >
                                <button
                                    type="button"
                                    className={styles.collapsedToggle}
                                    onClick={() => handleGroupToggle(group.id)}
                                >
                                    <div className={styles.collapsedTitle}>{group.title}</div>
                                    <div className={styles.collapsedDescription}>{group.description}</div>
                                </button>
                                {isExpanded && (
                                    <>
                                        <div className={styles.expandedFamilies}>
                                            {group.families.map(family => (
                                                <button
                                                    key={family.id}
                                                    type="button"
                                                    className={cn(styles.familyOption, activeFamily === family.id && styles.familyOptionActive)}
                                                    onClick={() => setActiveFamily(family.id)}
                                                >
                                                    <div className={styles.familyOptionCode}>{family.code}</div>
                                                    <div>
                                                        <div className={styles.familyOptionTitle}>{family.label}</div>
                                                        <div className={styles.familyOptionDescription}>{family.description}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        {selectedFamily && (
                                            <div className={styles.familyDetail}>
                                                <div className={styles.detailHeader}>
                                                    <div className={styles.detailBadge} style={{ backgroundColor: selectedFamily.color }}>
                                                        {selectedFamily.code}
                                                    </div>
                                                    <div>
                                                        <div className={styles.detailGroup}>{group.title}</div>
                                                        <h3 className={styles.detailTitle}>{selectedFamily.name}</h3>
                                                        <p className={styles.detailIntro}>{selectedFamily.description}</p>
                                                    </div>
                                                </div>
                                                <div className={styles.typeGrid}>
                                                    {typesData.filter(t => t.familyId === selectedFamily.id).map((type, idx) => (
                                                        <Link href={`/types/${type.name.toLowerCase().replace(/ /g, '-')}`} key={idx}>
                                                            <Card
                                                                className={cn(styles.typeCard, styles.typeCardColored)}
                                                                style={{ background: getSplitBackgroundForType(type.code) }}
                                                            >
                                                                <div className={styles.typeBadge}>{type.code}</div>
                                                                <h3 className={styles.typeName}>{type.name}</h3>
                                                                <p className={styles.typeHook}>{type.shortDescription}</p>
                                                                <Button variant="ghost" className={cn(styles.viewProfileButton, 'mt-2 self-start p-0 h-auto')}>
                                                                    View profile
                                                                </Button>
                                                            </Card>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
