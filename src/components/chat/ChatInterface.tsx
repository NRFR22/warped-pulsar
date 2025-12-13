'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Square, Loader2, Send, ArrowRight, Trophy, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './ChatInterface.module.css';

const API_BASE = "https://question-pipeline-production.up.railway.app";
const SESSION_STORAGE_KEY = "typing_session";

interface Message {
    id: string;
    role: 'bot' | 'user' | 'system';
    text: string;
}

interface SignalsSummary {
    total_signals: number;
    seni_count: number;
    nesi_count: number;
    tefi_count: number;
    feti_count: number;
    oi_count: number;
    oe_count: number;
    di_count: number;
    de_count: number;
}

interface TopType {
    type: string;
    score: number;
    observer: string;
    decider: string;
    observer_score: number;
    decider_score: number;
}

interface RunnerUp {
    type: string;
    score: number;
    observer: string;
    decider: string;
    notes: string;
}

interface Result {
    top_type: TopType;
    runner_ups: RunnerUp[];
    observer_first: boolean;
}

interface SavedSession {
    sessionId: string;
    messages: Message[];
    questionNumber: number;
    phase: number;
    signals: SignalsSummary;
}

type SessionState = 'loading' | 'code_entry' | 'conversation' | 'awaiting_known_type' | 'results';

export function ChatInterface() {
    const [sessionState, setSessionState] = useState<SessionState>('loading');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [accessCode, setAccessCode] = useState('');
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [phase, setPhase] = useState(1);
    const [signals, setSignals] = useState<SignalsSummary>({
        total_signals: 0,
        seni_count: 0,
        nesi_count: 0,
        tefi_count: 0,
        feti_count: 0,
        oi_count: 0,
        oe_count: 0,
        di_count: 0,
        de_count: 0,
    });
    const [result, setResult] = useState<Result | null>(null);
    const [networkError, setNetworkError] = useState(false);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const prevPhaseRef = useRef(1);

    // Save session to localStorage
    const saveSession = useCallback(() => {
        if (sessionId && messages.length > 0) {
            const sessionData: SavedSession = {
                sessionId,
                messages,
                questionNumber,
                phase,
                signals,
            };
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        }
    }, [sessionId, messages, questionNumber, phase, signals]);

    // Clear saved session
    const clearSession = useCallback(() => {
        localStorage.removeItem(SESSION_STORAGE_KEY);
    }, []);

    // Check for existing session on mount
    useEffect(() => {
        const checkSavedSession = async () => {
            const saved = localStorage.getItem(SESSION_STORAGE_KEY);
            if (!saved) {
                setSessionState('code_entry');
                return;
            }

            try {
                const sessionData: SavedSession = JSON.parse(saved);

                // Verify session is still valid with API
                const res = await fetch(`${API_BASE}/api/session/${sessionData.sessionId}/status`);

                if (!res.ok) {
                    // Session expired or invalid
                    clearSession();
                    setSessionState('code_entry');
                    return;
                }

                const statusData = await res.json();

                if (statusData.status === 'completed') {
                    // Session already completed
                    clearSession();
                    setSessionState('code_entry');
                    return;
                }

                // Restore session
                setSessionId(sessionData.sessionId);
                setMessages(sessionData.messages);
                setQuestionNumber(sessionData.questionNumber);
                setPhase(sessionData.phase);
                setSignals(sessionData.signals);
                prevPhaseRef.current = sessionData.phase;

                // Add the current question if we have it
                if (statusData.current_question) {
                    // Check if the last message is already this question
                    const lastBotMessage = sessionData.messages.filter(m => m.role === 'bot').pop();
                    if (!lastBotMessage || lastBotMessage.text !== statusData.current_question) {
                        setMessages(prev => [...prev, {
                            id: Date.now().toString(),
                            role: 'bot',
                            text: statusData.current_question
                        }]);
                    }
                }

                setSessionState('conversation');
            } catch (e) {
                console.error('Failed to restore session', e);
                clearSession();
                setSessionState('code_entry');
            }
        };

        checkSavedSession();
    }, [clearSession]);

    // Save session whenever it changes
    useEffect(() => {
        if (sessionState === 'conversation' || sessionState === 'awaiting_known_type') {
            saveSession();
        }
    }, [sessionState, saveSession]);

    // Clear session when complete
    useEffect(() => {
        if (sessionState === 'results') {
            clearSession();
        }
    }, [sessionState, clearSession]);

    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
        }
    }, [inputText]);

    useEffect(() => {
        if (status === 'idle' && (sessionState === 'conversation' || sessionState === 'awaiting_known_type') && inputRef.current) {
            inputRef.current.focus();
        }
    }, [status, sessionState]);

    useEffect(() => {
        if (sessionState === 'code_entry' && codeInputRef.current) {
            codeInputRef.current.focus();
        }
    }, [sessionState]);

    const addMessage = (role: 'bot' | 'user' | 'system', text: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role, text }]);
    };

    const snProgress = Math.min(((signals.seni_count + signals.nesi_count) / 20) * 100, 100);
    const tfProgress = Math.min(((signals.tefi_count + signals.feti_count) / 20) * 100, 100);
    const diDeProgress = Math.min(((signals.di_count + signals.de_count) / 15) * 100, 100);
    const oiOeProgress = Math.min(((signals.oi_count + signals.oe_count) / 15) * 100, 100);

    const handleCodeSubmit = async () => {
        if (!accessCode.trim() || !userName.trim()) return;

        setStatus('processing');
        setError(null);
        setNetworkError(false);

        try {
            const res = await fetch(`${API_BASE}/api/session/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_code: accessCode.trim().toUpperCase() }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || 'Invalid code');
            }

            const data = await res.json();
            setSessionId(data.session_id);
            setQuestionNumber(data.question_number);

            addMessage('system', "Hi! I'll be asking you questions to figure out your Personality Type. At first I'll be asking general questions to get to know you, then I'll get into more directed questions once I've got a baseline. Enjoy!");

            setTimeout(() => {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'bot', text: data.first_question }]);
            }, 100);

            setSessionState('conversation');
        } catch (e: any) {
            if (e.message === 'Failed to fetch') {
                setNetworkError(true);
                setError('Network error. Please check your connection and try again.');
            } else {
                setError(e.message || 'Something went wrong');
            }
        } finally {
            setStatus('idle');
        }
    };

    const handleCodeKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCodeSubmit();
        }
    };

    const handleTextSubmit = async () => {
        if (!inputText.trim() || status === 'processing' || !sessionId) return;

        const text = inputText.trim();
        setInputText('');
        addMessage('user', text);
        setNetworkError(false);

        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        // If we're awaiting known type, submit it and get results from /api/session/complete
        if (sessionState === 'awaiting_known_type') {
            setStatus('processing');
            try {
                const res = await fetch(`${API_BASE}/api/session/complete`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_id: sessionId,
                        user_known_type: text,
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to complete session');
                }

                const data = await res.json();
                // Use the results from /api/session/complete
                if (data.pipeline_result) {
                    setResult(data.pipeline_result);
                }
                setSessionState('results');
            } catch (e) {
                console.error('Failed to complete session', e);
                addMessage('system', "There was an error completing your session. Please try again.");
            } finally {
                setStatus('idle');
            }
            return;
        }

        // Normal conversation flow
        setStatus('processing');

        try {
            const res = await fetch(`${API_BASE}/api/session/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    answer: text,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                if (err.detail?.includes('expired') || err.detail?.includes('not found')) {
                    clearSession();
                    addMessage('system', "Your session has expired. Please start over with a new access code.");
                    setTimeout(() => {
                        setSessionState('code_entry');
                        setMessages([]);
                        setSessionId(null);
                    }, 3000);
                    return;
                }
                throw new Error(err.detail || 'Error submitting answer');
            }

            const data = await res.json();
            setQuestionNumber(data.question_number);

            if (data.signals_summary) {
                setSignals(data.signals_summary);
            }

            if (data.phase && data.phase !== prevPhaseRef.current) {
                if (data.phase === 2) {
                    addMessage('system', "We're entering Phase 2! I'll be asking more pointed questions to explore certain parts of your personality now that I have a baseline. You're doing great!");
                }
                prevPhaseRef.current = data.phase;
                setPhase(data.phase);
            }

            if (data.is_complete) {
                // Don't store result here - we'll get it from /api/session/complete
                addMessage('system', "Your results are ready! Before I show you, if you've been officially typed before, please enter your full type (e.g., 'MF Ne-Fi CP/S(B) #1'). If you haven't been typed, just say 'not typed' or 'unknown'.");
                setSessionState('awaiting_known_type');
            } else {
                addMessage('bot', data.next_question);
            }
        } catch (e: any) {
            if (e.message === 'Failed to fetch') {
                setNetworkError(true);
                addMessage('system', "Network error. Please check your connection and try again.");
            } else {
                addMessage('bot', `Sorry, there was an error: ${e.message}. Please try again.`);
            }
        } finally {
            setStatus('idle');
        }
    };

    const handleRetry = () => {
        setNetworkError(false);
        if (sessionState === 'code_entry') {
            handleCodeSubmit();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextSubmit();
        }
    };

    const handleMicClick = () => {
        if (status === 'idle') {
            setStatus('listening');
        } else if (status === 'listening') {
            setStatus('idle');
        }
    };

    // Loading screen
    if (sessionState === 'loading') {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.chatContainer}>
                    <div className={styles.loadingScreen}>
                        <Loader2 size={32} className={styles.spinning} />
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Code entry screen
    if (sessionState === 'code_entry') {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.chatContainer}>
                    <div className={styles.codeEntry}>
                        <div className={styles.codeContent}>
                            <div className={styles.alphaNotice}>
                                <span className={styles.alphaTag}>Alpha Release</span>
                                <p className={styles.alphaHeadline}>Welcome to the InnerOS Typing Assessment</p>
                                <p className={styles.alphaBody}>
                                    You've been invited to participate in our alpha program. Your feedback during this phase
                                    is invaluable in shaping the future of personality typing technology.
                                </p>
                            </div>

                            <div className={styles.formSection}>
                                <h2 className={styles.codeTitle}>Begin Your Assessment</h2>
                                <p className={styles.codeDescription}>
                                    Enter your details below to start. The assessment typically takes 15-25 minutes to complete.
                                </p>

                                <div className={styles.formFields}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Your Name</label>
                                        <input
                                            type="text"
                                            className={styles.nameInput}
                                            placeholder="Enter your name"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            onKeyDown={handleCodeKeyDown}
                                            disabled={status === 'processing'}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Access Code</label>
                                        <div className={styles.codeInputWrapper}>
                                            <input
                                                ref={codeInputRef}
                                                type="text"
                                                className={styles.codeInput}
                                                placeholder="e.g. 1234"
                                                value={accessCode}
                                                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                                onKeyDown={handleCodeKeyDown}
                                                disabled={status === 'processing'}
                                                maxLength={4}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className={styles.startButton}
                                        onClick={handleCodeSubmit}
                                        disabled={!accessCode.trim() || !userName.trim() || status === 'processing'}
                                    >
                                        {status === 'processing' ? (
                                            <>
                                                <Loader2 size={18} className={styles.spinning} />
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                Start Assessment
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {error && (
                                    <div className={styles.errorWrapper}>
                                        <p className={styles.codeError}>{error}</p>
                                        {networkError && (
                                            <button className={styles.retryButton} onClick={handleRetry}>
                                                <RefreshCw size={16} />
                                                Retry
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <p className={styles.footerNote}>
                                By continuing, you agree to participate in this alpha program.
                                Your responses will be used to improve our typing algorithms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Results screen
    if (sessionState === 'results' && result) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.chatContainer}>
                    <div className={styles.resultsScreen}>
                        <h2 className={styles.resultsTitle}>Your Results</h2>

                        <div className={styles.topTypeCard}>
                            <Trophy size={32} className={styles.trophyIcon} />
                            <div className={styles.topTypeInfo}>
                                <span className={styles.topTypeLabel}>Your Type</span>
                                <span className={styles.topTypeValue}>{result.top_type.type}</span>
                                <span className={styles.topTypeScore}>Score: {result.top_type.score.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className={styles.runnerUps}>
                            <h3 className={styles.runnerUpsTitle}>Other Possibilities</h3>
                            {result.runner_ups.slice(0, 5).map((ru, index) => (
                                <div key={ru.type} className={styles.runnerUpItem}>
                                    <span className={styles.runnerUpRank}>#{index + 2}</span>
                                    <span className={styles.runnerUpType}>{ru.type}</span>
                                    <span className={styles.runnerUpScore}>{ru.score.toFixed(1)}</span>
                                    <span className={styles.runnerUpNotes}>{ru.notes}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Conversation screen (also used for awaiting_known_type)
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.progressSidebar}>
                <div className={styles.progressItem}>
                    <svg className={styles.progressRing} viewBox="0 0 100 100">
                        <circle className={styles.progressRingBg} cx="50" cy="50" r="42" />
                        <circle
                            className={styles.progressRingFill}
                            cx="50" cy="50" r="42"
                            style={{ strokeDasharray: `${snProgress * 2.64} 264`, stroke: 'var(--color-n)' }}
                        />
                    </svg>
                    <span className={styles.progressLabel}>S/N</span>
                </div>
                <div className={styles.progressItem}>
                    <svg className={styles.progressRing} viewBox="0 0 100 100">
                        <circle className={styles.progressRingBg} cx="50" cy="50" r="42" />
                        <circle
                            className={styles.progressRingFill}
                            cx="50" cy="50" r="42"
                            style={{ strokeDasharray: `${tfProgress * 2.64} 264`, stroke: 'var(--color-f)' }}
                        />
                    </svg>
                    <span className={styles.progressLabel}>T/F</span>
                </div>
            </div>

            <div className={styles.chatContainer}>
                <div className={styles.questionProgress}>
                    {sessionState === 'awaiting_known_type' ? 'Analysis Complete' : `Question ${questionNumber} of ~20`}
                </div>

                <div className={styles.messages} ref={messagesContainerRef}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                styles.message,
                                msg.role === 'bot' && styles.botMessage,
                                msg.role === 'user' && styles.userMessage,
                                msg.role === 'system' && styles.systemMessage
                            )}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {status === 'processing' && (
                        <div className={styles.processingWrapper}>
                            <div className={cn(styles.message, styles.botMessage, styles.typing)}>
                                <span className={styles.typingDot}></span>
                                <span className={styles.typingDot}></span>
                                <span className={styles.typingDot}></span>
                            </div>
                            <p className={styles.processingHint}>
                                This might take 1-2 min for a specially tailored follow up question
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.controls}>
                    <div className={cn(styles.inputWrapper, status === 'listening' && styles.inputListening)}>
                        <textarea
                            ref={inputRef}
                            className={styles.textInput}
                            placeholder={sessionState === 'awaiting_known_type' ? "Enter your OPS type or anything..." : (status === 'listening' ? "Listening..." : "Type your answer...")}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={status === 'processing' || status === 'listening'}
                            rows={1}
                        />
                        <div className={styles.inputButtons}>
                            <button
                                className={cn(styles.micButton, styles[status])}
                                onClick={handleMicClick}
                                disabled={status === 'processing'}
                                title={status === 'listening' ? 'Stop recording' : 'Start recording'}
                            >
                                {status === 'idle' && <Mic size={18} />}
                                {status === 'listening' && <Square size={14} fill="currentColor" />}
                                {status === 'processing' && <Loader2 size={18} className={styles.spinning} />}
                            </button>
                            <button
                                className={cn(styles.sendButton, inputText.trim() && status === 'idle' && styles.sendActive)}
                                onClick={handleTextSubmit}
                                disabled={!inputText.trim() || status !== 'idle'}
                                title="Send message"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.progressSidebar}>
                <div className={styles.progressItem}>
                    <svg className={styles.progressRing} viewBox="0 0 100 100">
                        <circle className={styles.progressRingBg} cx="50" cy="50" r="42" />
                        <circle
                            className={styles.progressRingFill}
                            cx="50" cy="50" r="42"
                            style={{ strokeDasharray: `${diDeProgress * 2.64} 264`, stroke: '#8b5cf6' }}
                        />
                    </svg>
                    <span className={styles.progressLabel}>Di/De</span>
                </div>
                <div className={styles.progressItem}>
                    <svg className={styles.progressRing} viewBox="0 0 100 100">
                        <circle className={styles.progressRingBg} cx="50" cy="50" r="42" />
                        <circle
                            className={styles.progressRingFill}
                            cx="50" cy="50" r="42"
                            style={{ strokeDasharray: `${oiOeProgress * 2.64} 264`, stroke: '#06b6d4' }}
                        />
                    </svg>
                    <span className={styles.progressLabel}>Oi/Oe</span>
                </div>
            </div>
        </div>
    );
}
