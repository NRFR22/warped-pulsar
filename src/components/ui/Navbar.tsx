import Link from 'next/link';
import Image from 'next/image';
import { Button } from './Button';
import styles from './Navbar.module.css';

export function Navbar() {
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
                <Link href="/" className={styles.link}>
                    Home
                </Link>
                <Link href="/types" className={styles.link}>
                    Explore types
                </Link>
                <Link href="/about" className={styles.link}>
                    About the system
                </Link>

                <Link href="/chat">
                    <Button className={styles.cta}>Talk to your inner OS</Button>
                </Link>
            </nav>
        </header>
    );
}
