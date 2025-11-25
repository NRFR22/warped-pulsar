import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.links}>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/faq" className={styles.link}>FAQ</Link>
                    <Link href="/terms" className={styles.link}>Terms</Link>
                    <Link href="/privacy" className={styles.link}>Privacy</Link>
                    <Link href="/disclaimer" className={styles.link}>Disclaimers</Link>
                </div>
                <p className={styles.disclaimer}>
                    inner OS is a pop-psychology tool, not a mental health or clinical assessment.
                </p>
            </div>
        </footer>
    );
}
