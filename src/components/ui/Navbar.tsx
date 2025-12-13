"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ExploreTypesMenu } from './ExploreTypesMenu';
import { Button } from './Button';
import styles from './Navbar.module.css';

export function Navbar() {
    const [showTypesDropdown, setShowTypesDropdown] = useState(false);
    const [showLessonsDropdown, setShowLessonsDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const typesTimeout = useRef<NodeJS.Timeout | null>(null);
    const lessonsTimeout = useRef<NodeJS.Timeout | null>(null);

    const LESSONS_PREVIEW = [
        { title: 'Feeling vs Thinking', summary: 'How Fe/Fi differ from Te/Ti in real decisions.' },
        { title: 'Sensing vs Intuition', summary: 'Spot SE/SI tells versus NE/NI patterns.' },
        { title: 'Di vs De', summary: 'Why decider vs. decider stacking matters.' },
        { title: 'Oi vs Oe', summary: 'Observer polarity and how it shapes planning.' },
        { title: 'Observer vs Decider', summary: 'Savior focus and common stress behaviors.' },
        { title: 'Introvert vs Extrovert', summary: 'Energy flow and how it shows up in conversation.' },
    ];

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/LOGO_.png"
                    alt="Personality logo"
                    width={160}
                    height={48}
                    className={styles.logoImage}
                    priority
                />
            </Link>

            {/* Hamburger button for mobile */}
            <button
                className={styles.hamburger}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
            >
                <span className={cn(styles.hamburgerLine, mobileMenuOpen && styles.hamburgerOpen)} />
                <span className={cn(styles.hamburgerLine, mobileMenuOpen && styles.hamburgerOpen)} />
                <span className={cn(styles.hamburgerLine, mobileMenuOpen && styles.hamburgerOpen)} />
            </button>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Mobile slide-out menu */}
            <div className={cn(styles.mobileMenu, mobileMenuOpen && styles.mobileMenuOpen)}>
                <Link href="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/types" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Explore types
                </Link>
                <Link href="/lessons" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Lessons
                </Link>
                <Link href="/board-new" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Board New
                </Link>
                <Link href="/board" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Board
                </Link>
                <Link href="/about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    About the system
                </Link>
                <Link href="/chat" className={styles.mobileCta} onClick={() => setMobileMenuOpen(false)}>
                    Talk to your Personality
                </Link>
            </div>

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
                                    <Link key={lesson.title} href="/lessons" className={styles.lessonPreviewCard}>
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
                    <Link href="/board-new" className={styles.link}>
                        Board New
                    </Link>
                    <Link href="/board" className={styles.link}>
                        Board
                    </Link>
                    <Link href="/about" className={styles.link}>
                        About the system
                    </Link>
                </div>
                <Link href="/chat">
                    <Button className={styles.cta}>Talk to your Personality</Button>
                </Link>
            </nav>
        </header>
    );
}
