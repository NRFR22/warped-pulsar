import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TypeExplorer } from '@/components/types/TypeExplorer';
import styles from './types.module.css';

const STARTER_FAMILIES = [
    { domain: 'Feeling', code: 'Fe', label: 'Expressive connectors', hint: 'People-first, emotionally fluent' },
    { domain: 'Intuition', code: 'Ni', label: 'Strategic intuitives', hint: 'Pattern seekers, future planners' },
    { domain: 'Thinking', code: 'Te', label: 'Builders & operators', hint: 'Efficiency-focused, systems thinkers' },
];

export default function TypesPage() {
    return (
        <main className={styles.container}>
            <TypeExplorer />

            <section className={styles.helperPanel}>
                <div className={styles.helperText}>
                    <h2>Need a starting point?</h2>
                    <p>Pick a family below to jump straight into the Type Explorer with that lens in mind.</p>
                </div>
                <div className={styles.helperChips}>
                    {STARTER_FAMILIES.map((family) => (
                        <Link
                            key={family.label}
                            href={`/types?family=${family.code.toLowerCase()}`}
                            className={styles.helperChip}
                        >
                            <span className={styles.helperFamily}>{family.domain}</span>
                            <div>
                                <div className={styles.helperLabel}>{family.code} · {family.label}</div>
                                <div className={styles.helperHint}>{family.hint}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={styles.ctaPanel}>
                <div>
                    <h2>Ready to confirm your type?</h2>
                    <p>Talk out loud for a few minutes and let inner OS compare notes with your self-read.</p>
                </div>
                <div className={styles.ctaButtons}>
                    <Link href="/chat">
                        <Button>Talk to your inner OS</Button>
                    </Link>
                    <Link href="/result">
                        <Button variant="secondary">See a sample result</Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
