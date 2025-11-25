'use client';

import React, { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { typesData } from '@/data/types';
import styles from './TypeExplorer.module.css';

type AccentCSSProperties = CSSProperties & Record<'--accent-color' | '--accent-border-color', string>;

const FAMILY_GROUPS = [
    {
        title: 'Feeling',
        description: 'Lead with empathy, harmony, and personal values.',
        accent: '#ffe5e0',
        accentBorder: '#f5a097',
        families: [
            { id: 'fe', code: 'Fe', name: 'Fe-types', label: 'Expressive Feeling', description: 'External empathy, social calibration, warmth that broadcasts out.', color: 'var(--color-f)', accent: '#ffd8cf' },
            { id: 'fi', code: 'Fi', name: 'Fi-types', label: 'Internal Feeling', description: 'Inner conviction, authenticity, a strong personal moral compass.', color: 'var(--color-f)', accent: '#ffcbc1' },
        ],
    },
    {
        title: 'Thinking',
        description: 'Solve problems with logic, structure, and proof.',
        accent: '#e0ecff',
        accentBorder: '#9dbcf8',
        families: [
            { id: 'te', code: 'Te', name: 'Te-types', label: 'Extroverted Thinking', description: 'Efficiency, metrics, operational clarity in the real world.', color: 'var(--color-t)', accent: '#d4e0ff' },
            { id: 'ti', code: 'Ti', name: 'Ti-types', label: 'Introverted Thinking', description: 'Internal logic, precision, frameworks that make sense to you first.', color: 'var(--color-t)', accent: '#c5d4ff' },
        ],
    },
    {
        title: 'Intuition',
        description: 'Spot patterns, possibilities, and abstract meaning.',
        accent: '#fff6da',
        accentBorder: '#ffd063',
        families: [
            { id: 'ne', code: 'Ne', name: 'Ne-types', label: 'Extroverted Intuition', description: 'Brainstorming, divergent ideas, connecting dots out loud.', color: 'var(--color-n)', accent: '#ffeab0' },
            { id: 'ni', code: 'Ni', name: 'Ni-types', label: 'Introverted Intuition', description: 'Long-range vision, distilled insights, strategic foresight.', color: 'var(--color-n)', accent: '#ffe199' },
        ],
    },
    {
        title: 'Sensing',
        description: 'Trust real-world data, routines, and concrete experience.',
        accent: '#e0f6e8',
        accentBorder: '#96ddb0',
        families: [
            { id: 'se', code: 'Se', name: 'Se-types', label: 'Extroverted Sensing', description: 'In-the-moment action, improvisation, reacting quickly to reality.', color: 'var(--color-s)', accent: '#cff2d9' },
            { id: 'si', code: 'Si', name: 'Si-types', label: 'Introverted Sensing', description: 'Reliability, detailed recall, steady traditions and systems.', color: 'var(--color-s)', accent: '#bff0cd' },
        ],
    },
];

const FAMILY_LOOKUP = FAMILY_GROUPS.flatMap(group => group.families);
const DEFAULT_FAMILY_ID = FAMILY_GROUPS[0]?.families[0]?.id ?? '';

export function TypeExplorer() {
    const [activeFamily, setActiveFamily] = useState<string>(DEFAULT_FAMILY_ID);
    const activeFamilyMeta = FAMILY_LOOKUP.find(f => f.id === activeFamily);
    const activeGroup = FAMILY_GROUPS.find(group => group.families.some(f => f.id === activeFamily));

    const sideImageStyle = activeGroup
        ? {
            borderColor: activeGroup.accentBorder,
            background: `linear-gradient(135deg, ${activeGroup.accent} 0%, transparent 70%)`,
        }
        : undefined;

    return (
        <div className={styles.stage}>
            <div className={cn(styles.sideImage, styles.leftImage)} style={sideImageStyle}>
                <div className={styles.sideLabel}>Image placeholder</div>
            </div>
            <div className={cn(styles.sideImage, styles.rightImage)} style={sideImageStyle}>
                <div className={styles.sideLabel}>Image placeholder</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.groupGrid}>
                    {FAMILY_GROUPS.map((group) => {
                        const groupStyle: AccentCSSProperties = {
                            borderColor: group.accentBorder,
                            background: `linear-gradient(135deg, ${group.accent} 0%, rgba(255,255,255,0) 90%)`,
                            '--accent-color': group.accent,
                            '--accent-border-color': group.accentBorder,
                        };
                        const isActiveGroup = activeGroup?.title === group.title;
                        const selectGroup = () => setActiveFamily(group.families[0].id);

                        return (
                            <div
                                key={group.title}
                                className={cn(styles.groupCard, isActiveGroup && styles.groupCardActive)}
                                style={groupStyle}
                                onClick={selectGroup}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        selectGroup();
                                    }
                                }}
                            >
                                <div className={styles.groupHeader}>
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                </div>
                                <div className={styles.familyPills}>
                                    {group.families.map((family) => (
                                        <Card
                                            key={family.id}
                                            className={cn(styles.familyCard, activeFamily === family.id && styles.active)}
                                            style={{
                                                borderColor: family.accent,
                                                backgroundColor: family.accent,
                                            }}
                                            onClick={() => setActiveFamily(family.id)}
                                        >
                                            <span className={styles.familyCode}>{family.code}</span>
                                            <div>
                                                <div className={styles.familyName}>{family.label}</div>
                                                <div className={styles.familyVibe}>{family.description}</div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            {!activeFamily && (
                <div className={styles.placeholder}>
                    Choose a Feeling, Thinking, Intuition, or Sensing branch to see its four archetypes.
                </div>
            )}

            {activeFamilyMeta && (
                <div className={styles.detailSection} id="details">
                    <div className={styles.detailHeader}>
                        <div className={styles.detailBadge} style={{ backgroundColor: activeFamilyMeta.color }}>
                            {activeFamilyMeta.code}
                        </div>
                        <div>
                            <div className={styles.detailGroup}>{activeGroup?.title}</div>
                            <h2 className={styles.detailTitle}>{activeFamilyMeta.name}</h2>
                            <p className={styles.detailIntro}>{activeFamilyMeta.description}</p>
                        </div>
                    </div>

                    <div className={styles.typeGrid}>
                        {typesData.filter(t => t.familyId === activeFamily).map((type, idx) => (
                            <Link href={`/types/${type.name.toLowerCase().replace(/ /g, '-')}`} key={idx}>
                                <Card className={styles.typeCard}>
                                    <div className="w-12 h-12 rounded-full bg-gray-100 mb-2" style={{ background: type.color }} />
                                    <h3 className={styles.typeName}>{type.name}</h3>
                                    <span className={styles.typeCode}>{type.code}</span>
                                    <p className={styles.typeHook}>{type.shortDescription}</p>
                                    <Button variant="ghost" className="mt-2 self-start p-0 h-auto">View profile</Button>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
