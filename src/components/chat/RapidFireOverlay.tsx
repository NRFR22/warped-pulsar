'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './RapidFireOverlay.module.css';

const API_BASE = "https://question-pipeline-production.up.railway.app";

interface RapidFireQuestion {
    question_id: string;
    text: string;
    option_1: string;
    option_5: string;
    questions_remaining: number;
}

interface Props {
    sessionId: string;
    isActive: boolean;
    onClose: () => void;
}

export function RapidFireOverlay({ sessionId, isActive, onClose }: Props) {
    const [question, setQuestion] = useState<RapidFireQuestion | null>(null);
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showFeedback, setShowFeedback] = useState<string | null>(null);

    const fetchQuestion = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/rapid-fire/get`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId }),
            });

            if (res.ok) {
                const data = await res.json();
                setQuestion(data);
                setSelectedValue(null);
            } else {
                // No more questions available
                onClose();
            }
        } catch (e) {
            console.error('Failed to fetch rapid fire question', e);
            // Don't close on error - just keep showing current question
        }
    }, [sessionId, onClose]);

    // Fetch first question when activated
    useEffect(() => {
        if (isActive && !question) {
            fetchQuestion();
        }
    }, [isActive, question, fetchQuestion]);

    // Reset state when deactivated
    useEffect(() => {
        if (!isActive) {
            setQuestion(null);
            setSelectedValue(null);
            setShowFeedback(null);
        }
    }, [isActive]);

    const handleAnswer = async (value: number) => {
        if (!question || isLoading) return;

        setSelectedValue(value);
        setIsLoading(true);

        // Submit answer (fire and forget for speed)
        fetch(`${API_BASE}/api/rapid-fire/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: sessionId,
                question_id: question.question_id,
                answer: value,
            }),
        })
            .then(res => res.json())
            .then(data => {
                // Brief feedback showing which signal got points
                if (data.signal) {
                    setShowFeedback(data.signal);
                    setTimeout(() => setShowFeedback(null), 500);
                }
            })
            .catch(console.error);

        // Immediately fetch next question after brief visual feedback
        setTimeout(() => {
            fetchQuestion();
            setIsLoading(false);
        }, 300);
    };

    if (!isActive || !question) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.badge}>Quick Question</span>
                    <span className={styles.remaining}>
                        {question.questions_remaining} left
                    </span>
                </div>

                <p className={styles.question}>{question.text}</p>

                <div className={styles.labels}>
                    <span className={styles.leftLabel}>{question.option_1}</span>
                    <span className={styles.rightLabel}>{question.option_5}</span>
                </div>

                <div className={styles.buttons}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            className={`${styles.optionButton} ${selectedValue === value ? styles.selected : ''}`}
                            onClick={() => handleAnswer(value)}
                            disabled={isLoading}
                        >
                            {value}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className={styles.feedback}>
                        +{showFeedback}
                    </div>
                )}
            </div>
        </div>
    );
}
