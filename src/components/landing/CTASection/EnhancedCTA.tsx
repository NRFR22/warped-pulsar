'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';
import styles from './EnhancedCTA.module.css';

export function EnhancedCTA() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.background}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </div>

        <div className={styles.content}>
          <motion.div
            className={styles.icon}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={48} />
          </motion.div>

          <h2 className={styles.title}>Ready to discover your type?</h2>

          <p className={styles.text}>
            Join 12,847+ people who've discovered their inner OS.
            <br />
            No signup. No email. Just 5 minutes of conversation.
          </p>

          <div className={styles.buttons}>
            <Link href="/chat">
              <Button size="lg" className={styles.primaryButton}>
                Start Your 5-Minute Discovery
              </Button>
            </Link>
            <Link href="/types">
              <Button variant="secondary" size="lg">
                Browse All 32 Types
              </Button>
            </Link>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>100% Private</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>No Signup Required</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>Results in 5 Minutes</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
