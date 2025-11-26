"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ExploreTypesMenu } from './ExploreTypesMenu';
import { Button } from './Button';
import styles from './Navbar.module.css';

function Navbar() {
    const [showTypesDropdown, setShowTypesDropdown] = useState(false);
    const [showLessonsDropdown, setShowLessonsDropdown] = useState(false);
    const typesTimeout = useRef<NodeJS.Timeout | null>(null);
    const lessonsTimeout = useRef<NodeJS.Timeout | null>(null);

    const LESSONS_PREVIEW = [
        {
            title: 'Feeling vs Thinking',
            summary: 'How Fe/Fi differ from Te/Ti in real decisions.',
            color: 'linear-gradient(135deg, #ef4444 0%, #3b82f6 100%)',
            borderColor: '#ef4444'
        },
        {
            title: 'Sensing vs Intuition',
            summary: 'Spot SE/SI tells versus NE/NI patterns.',
            color: 'linear-gradient(135deg, #10b981 0%, #eab308 100%)',
            borderColor: '#10b981'
        },
        {
            title: 'Di vs De',
            summary: 'Why decider vs. decider stacking matters.',
            color: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            borderColor: '#8b5cf6'
        },
        {
            title: 'Oi vs Oe',
            summary: 'Observer polarity and how it shapes planning.',
            color: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
            borderColor: '#f59e0b'
        },
        {
            title: 'Observer vs Decider',
            summary: 'Savior focus and common stress behaviors.',
            color: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            borderColor: '#06b6d4'
        },
        {
            title: 'Introvert vs Extrovert',
            summary: 'Energy flow and how it shows up in conversation.',
            color: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            borderColor: '#6366f1'
        },
    ];

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/LOGO_.png"
                    alt="inner OS logo"
                    width={160}
                    height={48}
                    className={styles.logoImage}
                    priority
                />
            </Link>

            <nav className={styles.nav}>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.link}>
                        Home
                    </Link>
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => {
                            if (typesTimeout.current) clearTimeout(typesTimeout.current);
                            setShowTypesDropdown(true);
                        }}
                        onMouseLeave={() => {
                            typesTimeout.current = setTimeout(() => setShowTypesDropdown(false), 120);
                        }}
                        onFocusCapture={() => setShowTypesDropdown(true)}
                        onBlurCapture={() => setShowTypesDropdown(false)}
                    >
                        <Link href="/types" className={styles.link}>
                            Explore types
                        </Link>
                        <div className={cn(styles.dropdownPanel, showTypesDropdown && styles.dropdownPanelOpen)}>
                            <ExploreTypesMenu onRequestClose={() => setShowTypesDropdown(false)} />
                        </div>
                    </div>
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => {
                            if (lessonsTimeout.current) clearTimeout(lessonsTimeout.current);
                            setShowLessonsDropdown(true);
                        }}
                        onMouseLeave={() => {
                            lessonsTimeout.current = setTimeout(() => setShowLessonsDropdown(false), 120);
                        }}
                        onFocusCapture={() => setShowLessonsDropdown(true)}
                        onBlurCapture={() => setShowLessonsDropdown(false)}
                    >
                        <Link href="/lessons" className={styles.link}>
                            Lessons
                        </Link>
                        <div className={cn(styles.dropdownPanel, showLessonsDropdown && styles.dropdownPanelOpen)}>
                            <div className={styles.lessonPreviewGrid}>
                                {LESSONS_PREVIEW.map((lesson) => (
                                    <Link
                                        key={lesson.title}
                                        href="/lessons"
                                        className={styles.lessonPreviewCard}
                                        style={{
                                            background: lesson.color,
                                            borderColor: lesson.borderColor,
                                        }}
                                    >
                                        <h4>{lesson.title}</h4>
                                        <p>{lesson.summary}</p>
                                    </Link>
                                ))}
                            </div>
                            <Link href="/lessons" className={styles.dropdownFooter}>
                                View all lessons →
                            </Link>
                        </div>
                    </div>
                    <Link href="/bubbles" className={styles.link}>
                        Bubbles
                    </Link>
                    <Link href="/board" className={styles.link}>
                        Board
                    </Link>
                    <Link href="/about" className={styles.link}>
                        About the system
                    </Link>
                </div>
                <Link href="/chat">
                    <Button className={styles.cta}>Talk to your inner OS</Button>
                </Link>
            </nav>
        </header>
    );
}

export { Navbar };
export default Navbar;
