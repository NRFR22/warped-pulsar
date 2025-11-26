'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn, getTypeSlug } from '@/lib/utils';
import { typeGroups } from '@/data/type-groups';
import styles from './TypeExplorer.module.css';

const FUNCTION_COLORS: Record<string, string> = {
    F: '#FF8A8A',
    T: '#7FA6FF',
    N: '#FFE08A',
    S: '#8EE6A0',
};

const BRANCH_ACCENTS: Record<string, string> = {
    Fi: '#FF8A8A',
    Fe: '#FF8A8A',
    Ti: '#7FA6FF',
    Te: '#7FA6FF',
    Ne: '#FFE08A',
    Ni: '#FFE08A',
    Se: '#8EE6A0',
    Si: '#8EE6A0',
};

const getSplitBackgroundForType = (code: string) => {
    const [firstRaw, secondRaw] = code.split('/');
    const first = firstRaw?.trim().charAt(0).toUpperCase();
    const second = secondRaw?.trim().charAt(0).toUpperCase();
    const start = `${FUNCTION_COLORS[first || ''] || '#f4f4f5'}33`;
    const end = `${FUNCTION_COLORS[second || ''] || '#e5e7eb'}33`;
    return `linear-gradient(135deg, ${start} 50%, ${end} 50%)`;
};

export function TypeExplorer() {
    const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
    const [activeBranchId, setActiveBranchId] = useState<string | null>(null);

    const activeGroup = expandedGroupId ? typeGroups.find((group) => group.id === expandedGroupId) : undefined;
    const activeBranch = activeGroup?.branches.find((branch) => branch.id === activeBranchId);

    useEffect(() => {
        if (!expandedGroupId) {
            setActiveBranchId(null);
        }
    }, [expandedGroupId]);

    return (
        <div className={styles.root}>
            <div className={styles.collapsed}>
                <p className={styles.collapsedIntro}>Start with the core energy that feels most like you.</p>
                <div className={styles.collapsedGrid}>
                    {typeGroups.map((group) => {
                        const isExpanded = expandedGroupId === group.id;
                        return (
                            <div
                                key={group.id}
                                className={cn(styles.collapsedCard, isExpanded && styles.collapsedCardActive)}
                                style={{ borderColor: group.accent, background: `linear-gradient(135deg, ${group.accent} 0%, rgba(255,255,255,0) 100%)` }}
                            >
                                <button
                                    type="button"
                                    className={styles.collapsedToggle}
                                    onClick={() => setExpandedGroupId((prev) => (prev === group.id ? null : group.id))}
                                >
                                    <div className={styles.collapsedTitle}>{group.label}</div>
                                    <div className={styles.collapsedDescription}>{group.description}</div>
                                </button>
                                {isExpanded && (
                                    <>
                                        <div className={styles.expandedFamilies}>
                                            {group.branches.map((branch) => (
                                                <button
                                                    key={branch.id}
                                                    type="button"
                                                    className={cn(styles.familyOption, activeBranchId === branch.id && styles.familyOptionActive)}
                                                    onClick={() => setActiveBranchId((prev) => (prev === branch.id ? null : branch.id))}
                                                    style={{
                                                        borderColor: BRANCH_ACCENTS[branch.prefix] || 'var(--color-border)',
                                                        background: BRANCH_ACCENTS[branch.prefix] || 'rgba(255,255,255,0.08)',
                                                    }}
                                                >
                                                    <div className={styles.familyOptionCode}>{branch.prefix}</div>
                                                    <div>
                                                        <div className={styles.familyOptionTitle}>{branch.label}</div>
                                                        <div className={styles.familyOptionDescription}>{branch.description}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        {activeBranch && (
                                            <div className={styles.familyDetail}>
                                                <div className={styles.typeGrid}>
                                                    {activeBranch.types.map((type) => (
                                                        <Link href={`/types/${getTypeSlug(type)}`} key={type.id}>
                                                            <Card className={cn(styles.typeCard, styles.typeCardColored)} style={{ background: getSplitBackgroundForType(type.code) }}>
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
