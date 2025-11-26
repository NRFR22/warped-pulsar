'use client';

import { Shield, Lock, Clock, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './TrustBadges.module.css';

const badges = [
  {
    icon: Shield,
    text: '100% Private',
    subtext: 'No data stored'
  },
  {
    icon: Lock,
    text: 'Secure & Encrypted',
    subtext: 'Your conversation is safe'
  },
  {
    icon: Clock,
    text: '5 Minutes',
    subtext: 'Quick & accurate'
  },
  {
    icon: Brain,
    text: 'AI-Powered',
    subtext: 'Based on psychology'
  }
];

export function TrustBadges() {
  return (
    <div className={styles.container}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.text}
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className={styles.iconWrapper}>
              <Icon size={20} />
            </div>
            <div className={styles.content}>
              <div className={styles.text}>{badge.text}</div>
              <div className={styles.subtext}>{badge.subtext}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
