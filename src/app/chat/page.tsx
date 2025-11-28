import { ChatInterface } from '@/components/chat/ChatInterface';
import { ProgressPanel } from '@/components/chat/ProgressPanel';
import { CoinProgress } from '@/components/chat/CoinProgress';
import styles from './chat.module.css';

export default function ChatPage() {
    const coinProgressData = [
        {
            id: 'tf',
            left: { label: 'Feeling', short: 'F', color: '#ef4444' },
            right: { label: 'Thinking', short: 'T', color: '#3b82f6' },
            progressLabel: 'Evaluating decider coin',
            progressValue: 45,
        },
        {
            id: 'sn',
            left: { label: 'Sensing', short: 'S', color: '#10b981' },
            right: { label: 'Intuition', short: 'N', color: '#eab308' },
            progressLabel: 'Observer clarity',
            progressValue: 62,
        },
        {
            id: 'dide',
            left: { label: 'Di', short: 'Di', color: '#8b5cf6' },
            right: { label: 'De', short: 'De', color: '#ec4899' },
            progressLabel: 'Decision style in focus',
            progressValue: 30,
        },
        {
            id: 'oioe',
            left: { label: 'Oi', short: 'Oi', color: '#06b6d4' },
            right: { label: 'Oe', short: 'Oe', color: '#f59e0b' },
            progressLabel: 'Observer style in focus',
            progressValue: 20,
        },
    ];

    return (
        <main className={styles.container}>
            <div className={styles.progressRow}>
                <div className={styles.coinSection}>
                    <div className={styles.coinHeader}>
                        <div>
                            <p className={styles.kicker}>Talk to your inner OS</p>
                            <h2>Live coin diagnostics</h2>
                            <p className={styles.coinDescription}>
                                I’m testing each cognitive coin in real time while you speak.
                            </p>
                        </div>
                    </div>
                    <CoinProgress coins={coinProgressData} />
                </div>
                <div className={styles.panelWrapper}>
                    <ProgressPanel />
                </div>
            </div>
            <div className={styles.chatRow}>
                <ChatInterface />
            </div>
        </main>
    );
}
