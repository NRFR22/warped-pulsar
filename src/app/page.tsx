'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mic, Brain, Sparkles, ArrowRight, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedHero } from '@/components/landing/Hero/EnhancedHero';
import { SocialProof } from '@/components/landing/SocialProof/SocialProof';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo/InteractiveDemo';
import { EnhancedTypeCosmos } from '@/components/landing/TypeCosmos/EnhancedTypeCosmos';
import { Differentiators } from '@/components/landing/Differentiators/Differentiators';
import { EnhancedCTA } from '@/components/landing/CTASection/EnhancedCTA';
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
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Social Proof */}
      <SocialProof />

      {/* Interactive Demo */}
      <InteractiveDemo />

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

      {/* Enhanced Type Cosmos */}
      <EnhancedTypeCosmos />

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

      {/* Differentiators / Comparison */}
      <Differentiators />

      {/* Enhanced Final CTA */}
      <EnhancedCTA />
    </main>
  );
}
