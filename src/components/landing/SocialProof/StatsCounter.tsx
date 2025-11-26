'use client';

import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './StatsCounter.module.css';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 12847, label: 'Personalities Discovered', prefix: '' },
  { value: 32, label: 'Unique Archetypes' },
  { value: 94, label: 'Accuracy Rate', suffix: '%' },
];

export function StatsCounter() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  });

  return (
    <motion.div
      ref={ref}
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          stat={stat}
          isActive={isVisible}
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  );
}

interface StatCardProps {
  stat: Stat;
  isActive: boolean;
  delay: number;
}

function StatCard({ stat, isActive, delay }: StatCardProps) {
  const count = useCountUp({
    end: stat.value,
    duration: 2000,
    isActive,
  });

  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.statValue}>
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
}
