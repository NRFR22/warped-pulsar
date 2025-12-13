'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './ComparisonTable.module.css';

const comparisons = [
  { feature: 'Format', other: 'Multiple choice quiz', ours: 'Natural conversation' },
  { feature: 'Time Required', other: '30-45 minutes', ours: '5 minutes' },
  { feature: 'Input Method', other: 'Typing answers', ours: 'Voice only' },
  { feature: 'Accuracy', other: 'Variable', ours: '94% accuracy' },
  { feature: 'Results', other: 'Simple labels', ours: 'Deep cognitive insights' },
  { feature: 'Experience', other: 'Feels like a test', ours: 'Feels like a conversation' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function ComparisonTable() {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cell}></div>
          <div className={`${styles.cell} ${styles.otherHeader}`}>
            <span>Other Tests</span>
          </div>
          <div className={`${styles.cell} ${styles.innerOSHeader}`}>
            <span>Ours</span>
            <div className={styles.badge}>Recommended</div>
          </div>
        </div>

        {comparisons.map((comparison, index) => (
          <motion.div
            key={comparison.feature}
            className={styles.row}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`${styles.cell} ${styles.featureCell}`}>
              {comparison.feature}
            </div>
            <div className={`${styles.cell} ${styles.otherCell}`}>
              {comparison.other}
            </div>
            <div className={`${styles.cell} ${styles.innerOSCell}`}>
              <Check className={styles.checkIcon} size={16} />
              {comparison.ours}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
