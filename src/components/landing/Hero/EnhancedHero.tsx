'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { Shield, Clock, Lock } from 'lucide-react';
import styles from './EnhancedHero.module.css';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const badges = [
  { icon: Shield, text: '100% Private' },
  { icon: Clock, text: '5 Minutes' },
  { icon: Lock, text: 'No Signup' }
];

export function EnhancedHero() {
  return (
    <section className={styles.hero}>
      <ParticleBackground />

      <div className={styles.content}>
        <motion.div
          className={styles.heroContent}
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div className={styles.badges} variants={fadeInUp}>
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.text}
                  className={styles.badge}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon size={14} />
                  <span>{badge.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.h1 className={styles.title} variants={fadeInUp}>
            Discover the real you in{' '}
            <span className={styles.highlight}>5 minutes</span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={fadeInUp}>
            No tests. No typing. Just talk. Our AI listens to how you think and reveals one of{' '}
            <strong>32 personality archetypes</strong>.
          </motion.p>

          <motion.div className={styles.heroButtons} variants={fadeInUp}>
            <Link href="/chat">
              <Button size="lg" className={styles.primaryButton}>
                Start Your 5-Minute Discovery
              </Button>
            </Link>
            <Link href="/types">
              <Button variant="secondary" size="lg">
                Browse the 32 Types
              </Button>
            </Link>
          </motion.div>

          <motion.p className={styles.note} variants={fadeInUp}>
            Voice-only. No quiz questions. Just talk.
          </motion.p>

          <motion.div
            className={styles.liveCounter}
            variants={fadeInUp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.pulse} />
            <span>3 people discovering their type right now</span>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageGlow} />
          <Image
            src="/interactive-ai.png"
            alt="AI Personality Assessment"
            width={420}
            height={560}
            className={styles.heroIllustration}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
