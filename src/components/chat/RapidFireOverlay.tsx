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

// Mock questions for debug mode
const MOCK_QUESTIONS: RapidFireQuestion[] = [
    { question_id: 'mock_1', text: 'Long hike ahead. You\'re the type to...', option_1: 'Push through, collapse at the end', option_5: 'Frequent pit stops along the way', questions_remaining: 25 },
    { question_id: 'mock_2', text: 'When learning something new...', option_1: 'Dive deep into one topic', option_5: 'Explore many topics broadly', questions_remaining: 24 },
    { question_id: 'mock_3', text: 'In a group project...', option_1: 'Take charge and delegate', option_5: 'Go with the flow, support others', questions_remaining: 23 },
    { question_id: 'mock_4', text: 'When making decisions...', option_1: 'Trust your gut feeling', option_5: 'Analyze all the data first', questions_remaining: 22 },
    { question_id: 'mock_5', text: 'Your ideal weekend...', option_1: 'Packed with activities', option_5: 'Relaxed and unstructured', questions_remaining: 21 },
];

export function RapidFireOverlay({ sessionId, isActive, onClose }: Props) {
    const [question, setQuestion] = useState<RapidFireQuestion | null>(null);
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showFeedback, setShowFeedback] = useState<string | null>(null);
    const [mockIndex, setMockIndex] = useState(0);

    const isDebugMode = sessionId === 'debug-session';

    const fetchQuestion = useCallback(async () => {
        // Use mock questions in debug mode
        if (isDebugMode) {
            if (mockIndex < MOCK_QUESTIONS.length) {
                setQuestion(MOCK_QUESTIONS[mockIndex]);
                setSelectedValue(null);
            } else {
                setMockIndex(0);
                setQuestion(MOCK_QUESTIONS[0]);
                setSelectedValue(null);
            }
            return;
        }

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
    }, [sessionId, onClose, isDebugMode, mockIndex]);

    // Fetch first question when activated
    useEffect(() => {
        if (isActive && !question) {
            fetchQuestion();
        }
    }, [isActive, question, fetchQuestion]);

    // In debug mode, update question when mockIndex changes
    useEffect(() => {
        if (isDebugMode && isActive && mockIndex > 0) {
            const nextIndex = mockIndex % MOCK_QUESTIONS.length;
            setQuestion(MOCK_QUESTIONS[nextIndex]);
            setSelectedValue(null);
        }
    }, [mockIndex, isDebugMode, isActive]);

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

        // In debug mode, just show feedback and move to next mock question
        if (isDebugMode) {
            setShowFeedback('debug');
            setTimeout(() => setShowFeedback(null), 500);
            setTimeout(() => {
                setMockIndex(prev => prev + 1);
                setIsLoading(false);
            }, 300);
            return;
        }

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
                    <span className={styles.badge}>🔥 Rapid Fire 🔥</span>
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
