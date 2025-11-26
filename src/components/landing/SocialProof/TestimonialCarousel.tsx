'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialCarousel.module.css';

interface Testimonial {
  quote: string;
  author: string;
  type: string;
  archetype: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I've taken dozens of personality tests. This is the first one that actually GOT me. The voice conversation felt so natural.",
    author: "Sarah K.",
    type: "INFP",
    archetype: "The Dreamweaver"
  },
  {
    quote: "Five minutes of talking revealed more about myself than hours of questionnaires. It's like talking to someone who truly understands how my mind works.",
    author: "Marcus T.",
    type: "INTJ",
    archetype: "The Architect"
  },
  {
    quote: "The accuracy is scary good. It picked up on patterns in my thinking I didn't even realize I had. Absolutely mind-blowing.",
    author: "Jessica R.",
    type: "ENFP",
    archetype: "The Champion"
  },
  {
    quote: "Finally, a personality test that doesn't feel like a test. Just a genuine conversation that somehow knows exactly who I am.",
    author: "David L.",
    type: "ISTP",
    archetype: "The Craftsman"
  }
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className={styles.testimonial}
          >
            <div className={styles.quote}>"{testimonials[current].quote}"</div>
            <div className={styles.author}>
              <div className={styles.authorName}>{testimonials[current].author}</div>
              <div className={styles.authorType}>
                {testimonials[current].type} · {testimonials[current].archetype}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={() => paginate(-1)}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={() => paginate(1)}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.active : ''}`}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
