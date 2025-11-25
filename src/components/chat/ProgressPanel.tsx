import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './ProgressPanel.module.css';

export function ProgressPanel() {
    // Mock data
    const progress = 42;
    const hypotheses = [
        { label: 'NF Family', color: 'var(--gradient-nf)' },
        { label: 'Intuitive', color: 'var(--color-n)' },
        { label: 'Feeling', color: 'var(--color-f)' },
    ];

    return (
        <div className={styles.panel}>
            <div className={styles.section}>
                <h3 className={styles.title}>Typing Progress</h3>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                </div>
                <p className={styles.progressText}>Current clarity: {progress}%</p>
                <p className="text-xs text-gray-500">The more you talk, the clearer your type becomes.</p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.title}>What I think so far</h3>
                <div className={styles.chipGrid}>
                    {hypotheses.map((h) => (
                        <div key={h.label} className={styles.chip}>
                            <div className={styles.chipColor} style={{ background: h.color }} />
                            {h.label}
                        </div>
                    ))}
                </div>
            </div>

            {progress > 40 && (
                <div className={styles.revealCard}>
                    <h3 className={styles.revealTitle}>Ready to see your type?</h3>
                    <p className="text-sm text-gray-500">I have a strong hypothesis.</p>
                    <Link href="/result">
                        <Button className="w-full">Reveal my type</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
