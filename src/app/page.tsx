'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mic, Brain, Sparkles, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

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

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.title} variants={fadeInUp}>
            Meet your inner operating system.
          </motion.h1>
          <motion.p className={styles.subtitle} variants={fadeInUp}>
            Talk to an AI that listens to how you think and feel, then sorts you into one of <strong>32 personality archetypes</strong>.
          </motion.p>
          <motion.div className={styles.heroButtons} variants={fadeInUp}>
            <Link href="/chat">
              <Button>Talk to your inner OS</Button>
            </Link>
            <Link href="/types">
              <Button variant="secondary">Browse the 32 types</Button>
            </Link>
          </motion.div>
          <motion.p className="text-sm text-gray-500 mt-2" variants={fadeInUp}>
            Voice-only. No quiz questions. Just talk.
          </motion.p>
        </motion.div>
        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/interactive-ai.png"
            alt="Humanoid AI avatar with cognitive functions radiating outward"
            width={420}
            height={560}
            className={styles.heroIllustration}
            priority
          />
        </motion.div>
      </section>

      {/* How it works */}
      <motion.section
        className={styles.howItWorks}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How it works
        </motion.h2>
        <motion.div
          className={styles.steps}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUp}>
            <Card className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <Mic size={24} />
              </div>
              <h3 className={styles.stepTitle}>Step 1 – Talk</h3>
              <p className={styles.stepText}>
                Hold the mic and just talk about your day, your decisions, your frustrations—whatever's real.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <Brain size={24} />
              </div>
              <h3 className={styles.stepTitle}>Step 2 – The engine listens</h3>
              <p className={styles.stepText}>
                Behind the scenes, inner OS analyzes patterns in your language and responses.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className={styles.stepCard}>
              <div className={styles.stepIcon}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.stepTitle}>Step 3 – Meet your type</h3>
              <p className={styles.stepText}>
                You get one of 32 archetypes like <strong>The Dreamweaver</strong>, <strong>The Maverick</strong>, or <strong>The Powerhouse</strong>.
              </p>
            </Card>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-center mt-8 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link href="/chat">
            <Button>Start talking</Button>
          </Link>
          <Link href="/types">
            <Button variant="ghost">See all the types <ArrowRight size={16} className="ml-2" /></Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* 32-type universe */}
      <motion.section
        className={styles.universe}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          32 archetypes, one inner OS.
        </motion.h2>
        <motion.p
          className={styles.universeText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We've mapped 32 distinct patterns of motivation, perception, and behavior. You don't have to understand the system — just explore what resonates.
        </motion.p>

        <motion.div
          className={styles.familyGrid}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { name: 'Fe-types', vibe: 'Expressive, people-centered', color: 'var(--color-f)' },
            { name: 'Fi-types', vibe: 'Authentic, value-driven', color: 'var(--color-f)' },
            { name: 'Ne-types', vibe: 'Explorative, idea-generators', color: 'var(--color-n)' },
            { name: 'Ni-types', vibe: 'Strategic, pattern-seekers', color: 'var(--color-n)' },
            { name: 'Se-types', vibe: 'Present, action-oriented', color: 'var(--color-s)' },
            { name: 'Si-types', vibe: 'Reliable, detail-focused', color: 'var(--color-s)' },
            { name: 'Te-types', vibe: 'Efficient, system-builders', color: 'var(--color-t)' },
            { name: 'Ti-types', vibe: 'Analytical, logic-driven', color: 'var(--color-t)' },
          ].map((family) => (
            <motion.div key={family.name} variants={fadeInUp}>
              <Link href={`/types?family=${family.name.split('-')[0]}`}>
                <Card className={styles.familyCard}>
                  <div className={styles.familyHeader}>
                    <span className={styles.familyName}>{family.name}</span>
                    <div className={styles.pill} style={{ backgroundColor: family.color }} />
                  </div>
                  <p className={styles.familyVibe}>{family.vibe}</p>
                  <p className={styles.familyExamples}>Includes: The Illuminator, The Oracle...</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/types">
            <Button variant="secondary">Browse all 32 types</Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Why it's different */}
      <motion.section
        className={styles.features}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why it's different
        </motion.h2>
        <motion.div
          className={styles.featureGrid}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUp}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Mic size={28} />
              </div>
              <h3 className={styles.featureTitle}>Voice-first</h3>
              <p className={styles.featureText}>
                No typing. No multiple choice. Just speak naturally about what matters to you.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Zap size={28} />
              </div>
              <h3 className={styles.featureTitle}>Real-time analysis</h3>
              <p className={styles.featureText}>
                Advanced AI processes your responses in real-time, detecting patterns you might not even notice.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users size={28} />
              </div>
              <h3 className={styles.featureTitle}>32 unique types</h3>
              <p className={styles.featureText}>
                Based on cognitive functions and personality theory—not just labels, but deep insights into how you operate.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className={styles.finalCta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to discover your type?</h2>
          <p className={styles.ctaText}>
            Start a conversation with your inner OS. No signup required.
          </p>
          <Link href="/chat">
            <Button size="lg">Start talking now</Button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
