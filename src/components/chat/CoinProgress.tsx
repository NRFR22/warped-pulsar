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

// Gradient color definitions for glossy 3D effect
const GRADIENTS: Record<string, { base: string; middle: string; highlight: string }> = {
    F: { base: '#b91c1c', middle: '#ef4444', highlight: '#fca5a5' },
    T: { base: '#1e40af', middle: '#3b82f6', highlight: '#93c5fd' },
    S: { base: '#047857', middle: '#10b981', highlight: '#6ee7b7' },
    N: { base: '#ca8a04', middle: '#eab308', highlight: '#fde047' },
    Di: { base: '#7c3aed', middle: '#8b5cf6', highlight: '#c4b5fd' },
    De: { base: '#db2777', middle: '#ec4899', highlight: '#fbcfe8' },
    Oe: { base: '#d97706', middle: '#f59e0b', highlight: '#fcd34d' },
    Oi: { base: '#0891b2', middle: '#06b6d4', highlight: '#67e8f9' },
};

function GlossyBubble({ label, gradientId }: { label: string; gradientId: string }) {
    const gradient = GRADIENTS[label];

    return (
        <svg viewBox="0 0 50 50" className={styles.coinCircle}>
            <defs>
                <radialGradient id={gradientId} cx="35%" cy="35%">
                    <stop offset="0%" stopColor={gradient.highlight} />
                    <stop offset="30%" stopColor={gradient.middle} />
                    <stop offset="70%" stopColor={gradient.base} />
                    <stop offset="100%" stopColor={gradient.base} stopOpacity="0.9" />
                </radialGradient>
                <radialGradient id={`shine-${gradientId}`} cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <filter id={`shadow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main bubble */}
            <circle
                cx="25"
                cy="25"
                r="22"
                fill={`url(#${gradientId})`}
                filter={`url(#shadow-${gradientId})`}
            />
            {/* Border */}
            <circle
                cx="25"
                cy="25"
                r="21"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
            />
            {/* Shine overlay */}
            <circle
                cx="22"
                cy="22"
                r="8"
                fill={`url(#shine-${gradientId})`}
            />
            {/* Label */}
            <text
                x="25"
                y="25"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fontWeight="700"
                fill="white"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.02em' }}
            >
                {label}
            </text>
        </svg>
    );
}

export function CoinProgress({ coins }: CoinProgressProps) {
    return (
        <div className={styles.root}>
            {coins.map((coin) => (
                <div key={coin.id} className={styles.coinCard}>
                    <div className={styles.coinHeader}>
                        <GlossyBubble
                            label={coin.left.short}
                            gradientId={`gradient-${coin.id}-left`}
                        />
                        <div className={styles.coinTitle}>
                            <span>{coin.left.label}</span>
                            <span className={styles.coinDivider}>vs</span>
                            <span>{coin.right.label}</span>
                        </div>
                        <GlossyBubble
                            label={coin.right.short}
                            gradientId={`gradient-${coin.id}-right`}
                        />
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
