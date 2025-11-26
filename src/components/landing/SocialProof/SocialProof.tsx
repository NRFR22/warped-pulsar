'use client';

import { motion } from 'framer-motion';
import { TestimonialCarousel } from './TestimonialCarousel';
import { StatsCounter } from './StatsCounter';
import { TrustBadges } from './TrustBadges';
import styles from './SocialProof.module.css';

export function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Join thousands discovering their true selves</h2>
          <p className={styles.subtitle}>
            Real people. Real conversations. Real insights.
          </p>
        </motion.div>

        <TestimonialCarousel />

        <StatsCounter />

        <TrustBadges />
      </div>
    </section>
  );
}
