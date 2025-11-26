'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import styles from './MagneticTypeCard.module.css';

interface MagneticTypeCardProps {
  name: string;
  vibe: string;
  color: string;
  examples: string;
  link: string;
}

export function MagneticTypeCard({ name, vibe, color, examples, link }: MagneticTypeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <Link href={link}>
      <motion.div
        ref={cardRef}
        className={styles.cardContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card className={styles.card}>
          <div
            className={styles.glow}
            style={{ backgroundColor: color }}
          />
          <div className={styles.header}>
            <span className={styles.name}>{name}</span>
            <div
              className={styles.pill}
              style={{ backgroundColor: color }}
            />
          </div>
          <p className={styles.vibe}>{vibe}</p>
          <p className={styles.examples}>{examples}</p>

          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <span>Explore Type →</span>
          </motion.div>
        </Card>
      </motion.div>
    </Link>
  );
}
