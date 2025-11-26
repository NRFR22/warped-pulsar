'use client';

import { motion } from 'framer-motion';
import { ConversationPreview } from './ConversationPreview';
import styles from './InteractiveDemo.module.css';

export function InteractiveDemo() {
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
          <h2 className={styles.title}>Experience it yourself</h2>
          <p className={styles.subtitle}>
            See how a real conversation unfolds and watch as patterns emerge in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ConversationPreview />
        </motion.div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          This is a simplified preview. The real conversation adapts dynamically to your responses.
        </motion.p>
      </div>
    </section>
  );
}
