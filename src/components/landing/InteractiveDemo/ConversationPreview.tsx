'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import styles from './ConversationPreview.module.css';

interface Message {
  type: 'ai' | 'user';
  text: string;
  options?: string[];
  indicators?: string[];
}

const conversation: Message[] = [
  {
    type: 'ai',
    text: "Let's start simple. When you're making a big decision, do you usually go with your gut feeling, or do you need to think it through logically first?"
  },
  {
    type: 'user',
    text: "I usually need to think it through. I make lists, weigh pros and cons...",
    options: [
      "I go with my gut feeling",
      "I think it through logically",
      "It depends on the situation"
    ],
    indicators: ['Ti', 'Te']
  },
  {
    type: 'ai',
    text: "Interesting. So you like having a clear framework. Now, when you're in a group setting, do you find yourself more energized by being around people, or do you need alone time to recharge?"
  },
  {
    type: 'user',
    text: "Definitely need alone time. Social situations are fun but draining.",
    options: [
      "Energized by people",
      "Need alone time to recharge",
      "Somewhere in between"
    ],
    indicators: ['I']
  },
  {
    type: 'ai',
    text: "Got it. You're showing strong introverted thinking patterns. Let me ask about how you process information..."
  }
];

export function ConversationPreview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);

    const currentMsg = conversation[currentStep];
    if (currentMsg.indicators) {
      setActiveIndicators(prev => [...new Set([...prev, ...currentMsg.indicators!])]);
    }

    setTimeout(() => {
      if (currentStep < conversation.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedOption(null);
      }
    }, 800);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setActiveIndicators([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.indicators}>
        <div className={styles.indicatorsTitle}>Detected Patterns</div>
        <div className={styles.indicatorsList}>
          {['Ti', 'Te', 'Fi', 'Fe', 'Ni', 'Ne', 'Si', 'Se', 'I', 'E'].map(indicator => (
            <motion.div
              key={indicator}
              className={`${styles.indicator} ${activeIndicators.includes(indicator) ? styles.active : ''}`}
              initial={{ scale: 1 }}
              animate={activeIndicators.includes(indicator) ? {
                scale: [1, 1.2, 1],
                boxShadow: ['0 0 0px rgba(99, 102, 241, 0)', '0 0 20px rgba(99, 102, 241, 0.6)', '0 0 10px rgba(99, 102, 241, 0.4)']
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {indicator}
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          <AnimatePresence mode="popLayout">
            {conversation.slice(0, currentStep + 1).map((message, index) => (
              <motion.div
                key={index}
                className={`${styles.message} ${styles[message.type]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.messageIcon}>
                  {message.type === 'ai' ? <Sparkles size={16} /> : <MessageCircle size={16} />}
                </div>
                <div className={styles.messageContent}>
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {conversation[currentStep]?.options && currentStep < conversation.length - 1 && (
          <motion.div
            className={styles.options}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {conversation[currentStep].options!.map((option, index) => (
              <motion.button
                key={index}
                className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
                onClick={() => handleOptionClick(index)}
                disabled={selectedOption !== null}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}

        {currentStep === conversation.length - 1 && (
          <motion.button
            className={styles.resetButton}
            onClick={resetDemo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start Over
          </motion.button>
        )}
      </div>
    </div>
  );
}
