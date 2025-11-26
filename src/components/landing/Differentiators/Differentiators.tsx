'use client';

import { motion } from 'framer-motion';
import { ComparisonTable } from './ComparisonTable';
import styles from './Differentiators.module.css';

export function Differentiators() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Not just another personality test</h2>
          <p className={styles.subtitle}>
            See how Inner OS compares to traditional personality assessments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ComparisonTable />
        </motion.div>
      </div>
    </section>
  );
}
