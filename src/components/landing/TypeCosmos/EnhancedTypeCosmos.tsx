'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { MagneticTypeCard } from './MagneticTypeCard';
import styles from './EnhancedTypeCosmos.module.css';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const typeGroups = [
  { name: 'Fe-types', vibe: 'Expressive, people-centered', color: '#EF4444', examples: 'The Illuminator, The Advocate...', link: '/types?family=Fe' },
  { name: 'Fi-types', vibe: 'Authentic, value-driven', color: '#EF4444', examples: 'The Dreamweaver, The Individualist...', link: '/types?family=Fi' },
  { name: 'Ne-types', vibe: 'Explorative, idea-generators', color: '#FDE047', examples: 'The Starmaker, The Champion...', link: '/types?family=Ne' },
  { name: 'Ni-types', vibe: 'Strategic, pattern-seekers', color: '#FDE047', examples: 'The Oracle, The Architect...', link: '/types?family=Ni' },
  { name: 'Se-types', vibe: 'Present, action-oriented', color: '#22C55E', examples: 'The Performer, The Maverick...', link: '/types?family=Se' },
  { name: 'Si-types', vibe: 'Reliable, detail-focused', color: '#22C55E', examples: 'The Guardian, The Steward...', link: '/types?family=Si' },
  { name: 'Te-types', vibe: 'Efficient, system-builders', color: '#3B82F6', examples: 'The Commander, The Executive...', link: '/types?family=Te' },
  { name: 'Ti-types', vibe: 'Analytical, logic-driven', color: '#3B82F6', examples: 'The Logician, The Craftsman...', link: '/types?family=Ti' },
];

export function EnhancedTypeCosmos() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>32 archetypes, one inner OS</h2>
          <p className={styles.subtitle}>
            We've mapped 32 distinct patterns of motivation, perception, and behavior.
            Hover to explore—click to dive deep.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {typeGroups.map((group) => (
            <motion.div key={group.name} variants={fadeInUp}>
              <MagneticTypeCard {...group} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/types">
            <Button variant="secondary" size="lg">
              Browse All 32 Types
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
