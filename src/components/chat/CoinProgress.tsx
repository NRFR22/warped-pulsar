import styles from './CoinProgress.module.css';

interface CoinSide {
    label: string;
    short: string;
    color: string;
}

interface CoinProgressConfig {
    id: string;
    left: CoinSide;
    right: CoinSide;
    progressLabel: string;
    progressValue: number; // 0-100
}

interface CoinProgressProps {
    coins: CoinProgressConfig[];
}

export function CoinProgress({ coins }: CoinProgressProps) {
    return (
        <div className={styles.root}>
            {coins.map((coin) => (
                <div key={coin.id} className={styles.coinCard}>
                    <div className={styles.coinHeader}>
                        <div className={styles.coinCircle} style={{ background: coin.left.color }}>
                            {coin.left.short}
                        </div>
                        <div className={styles.coinTitle}>
                            <span>{coin.left.label}</span>
                            <span className={styles.coinDivider}>vs</span>
                            <span>{coin.right.label}</span>
                        </div>
                        <div className={styles.coinCircle} style={{ background: coin.right.color }}>
                            {coin.right.short}
                        </div>
                    </div>
                    <div className={styles.progressTrack}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${coin.progressValue}%` }}
                        />
                    </div>
                    <div className={styles.progressLabel}>{coin.progressLabel}</div>
                </div>
            ))}
        </div>
    );
}
