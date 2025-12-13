'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Square, Loader2, Send, ArrowRight, Trophy, RefreshCw, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './ChatInterface.module.css';
import { RapidFireOverlay } from './RapidFireOverlay';

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
    const [shareCode, setShareCode] = useState<string | null>(null);
    const [shareCodeLoading, setShareCodeLoading] = useState(false);
    const [shareCodeCopied, setShareCodeCopied] = useState(false);

    // Rapid fire state
    const [rapidFireActive, setRapidFireActive] = useState(false);
    const [rapidFireAvailable, setRapidFireAvailable] = useState(0);

    // Feedback state
    const [feedback, setFeedback] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

    // Voice recording state
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);
    const prevPhaseRef = useRef(1);

    const thinkingPhrases = [
        "Sizing you up",
        "Getting the vibe",
        "Reading the room",
        "Connecting the dots",
        "Picking up signals",
        "Tuning in",
        "Taking notes",
        "Spotting patterns",
        "Cross-checking traits",
        "Testing hypotheses",
        "Weighing tendencies",
        "Aligning signals",
        "Refining the read",
        "Narrowing it down",
        "Personality sleuthing",
        "Trait juggling",
        "Vibe triangulation",
        "Temperament sniffing",
        "Putting it together",
        "Hmm-ing quietly",
        "Ahh, interesting…",
    ];

    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [showLongWaitMessage, setShowLongWaitMessage] = useState(false);

    useEffect(() => {
        if (status !== 'processing') {
            setShowLongWaitMessage(false);
            return;
        }

        const interval = setInterval(() => {
            setThinkingIndex(prev => (prev + 1) % thinkingPhrases.length);
        }, 6000);

        const longWaitTimer = setTimeout(() => {
            setShowLongWaitMessage(true);
        }, 25000);

        return () => {
            clearInterval(interval);
            clearTimeout(longWaitTimer);
        };
    }, [status, thinkingPhrases.length]);

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
    // Session persistence disabled for now - always start fresh
    useEffect(() => {
        clearSession();
        setSessionState('code_entry');
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

    const messageIdRef = useRef(0);
    const addMessage = (role: 'bot' | 'user' | 'system', text: string) => {
        messageIdRef.current += 1;
        setMessages(prev => [...prev, { id: `msg-${messageIdRef.current}-${Date.now()}`, role, text }]);
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
                body: JSON.stringify({ access_code: accessCode.trim().toUpperCase(), user_name: userName.trim() }),
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
                setMessages(prev => [...prev, { id: `first-q-${Date.now()}`, role: 'bot', text: data.first_question }]);
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

        // Start rapid fire if in Phase 2 and questions are available
        if (phase === 2 && rapidFireAvailable > 0) {
            setRapidFireActive(true);
        }

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

            // Track rapid fire availability from response
            if (data.rapid_fire_available !== undefined) {
                setRapidFireAvailable(data.rapid_fire_available);
            }

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
            setRapidFireActive(false); // Dismiss rapid fire when main question arrives
        }
    };

    const handleRetry = () => {
        setNetworkError(false);
        if (sessionState === 'code_entry') {
            handleCodeSubmit();
        }
    };

    const handleGenerateShareCode = async () => {
        setShareCodeLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/generate-code`, {
                method: 'POST',
            });
            if (res.ok) {
                const data = await res.json();
                setShareCode(data.code);
            }
        } catch (e) {
            console.error('Failed to generate share code', e);
        } finally {
            setShareCodeLoading(false);
        }
    };

    const handleCopyShareCode = async () => {
        if (shareCode) {
            await navigator.clipboard.writeText(shareCode);
            setShareCodeCopied(true);
            setTimeout(() => setShareCodeCopied(false), 2000);
        }
    };

    const handleFeedbackSubmit = async () => {
        if (!feedback.trim() || !sessionId) return;

        setFeedbackSubmitting(true);

        try {
            await fetch(`${API_BASE}/api/session/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    feedback: feedback.trim(),
                }),
            });
            setFeedbackSubmitted(true);
        } catch (e) {
            console.error('Failed to submit feedback', e);
        } finally {
            setFeedbackSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextSubmit();
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        console.log('Transcribing audio, size:', audioBlob.size);

        if (audioBlob.size < 1000) {
            console.log('Audio too short, skipping transcription');
            setStatus('idle');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            console.log('Sending to API...');
            const response = await fetch(`${API_BASE}/api/transcribe`, {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || 'Transcription failed');
            }

            const data = await response.json();
            console.log('Transcript received:', data);

            // Insert transcript into input field
            if (data.transcript) {
                setInputText(prev => prev + (prev ? ' ' : '') + data.transcript);
            }
            setStatus('idle');

            // Focus the input
            if (inputRef.current) {
                inputRef.current.focus();
            }

        } catch (error: any) {
            console.error('Transcription failed:', error);
            addMessage('system', `Voice transcription failed: ${error.message || 'Unknown error'}`);
            setStatus('idle');
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Check for supported mime types
            let mimeType = 'audio/webm;codecs=opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'audio/webm';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'audio/mp4';
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        mimeType = ''; // Let browser choose
                    }
                }
            }
            console.log('Using mimeType:', mimeType || 'default');

            const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

            audioChunksRef.current = [];

            recorder.ondataavailable = (event) => {
                console.log('Data available, size:', event.data.size);
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                console.log('Recording stopped, chunks:', audioChunksRef.current.length);
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());

                // Create blob from chunks
                const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
                console.log('Created blob, size:', audioBlob.size, 'type:', audioBlob.type);

                // Send to backend for transcription
                setStatus('processing');
                await transcribeAudio(audioBlob);
            };

            // Start recording and request data every second
            recorder.start(1000);
            setMediaRecorder(recorder);
            setIsRecording(true);
            setStatus('listening');
            console.log('Recording started');

        } catch (error) {
            console.error('Failed to start recording:', error);
            addMessage('system', 'Microphone access denied. Please allow microphone access to use voice input.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
            setStatus('processing');
        }
    };

    const handleMicClick = () => {
        if (status === 'processing') return;

        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    // DEBUG: Show dummy results button
    const showDummyResults = () => {
        setResult({
            top_type: { type: 'Ne-Fi', score: 18.5, observer: 'Ne', decider: 'Fi', observer_score: 10.2, decider_score: 8.3 },
            runner_ups: [
                { type: 'Ne-Ti', score: 15.2, observer: 'Ne', decider: 'Ti', notes: 'Strong Ne signals' },
                { type: 'Fi-Ne', score: 14.8, observer: 'Ne', decider: 'Fi', notes: 'Could be Fi first' },
                { type: 'Ni-Fe', score: 12.1, observer: 'Ni', decider: 'Fe', notes: 'Some Ni patterns' },
                { type: 'Se-Fi', score: 10.5, observer: 'Se', decider: 'Fi', notes: 'Less likely' },
                { type: 'Ti-Ne', score: 9.8, observer: 'Ne', decider: 'Ti', notes: 'Possible but unlikely' },
            ],
            observer_first: true,
        });
        setSessionState('results');
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
                                <p className={styles.alphaHeadline}>Welcome to the Personality Typing Assessment</p>
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

                            {/* DEBUG BUTTONS - Remove before production */}
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button
                                    onClick={showDummyResults}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.75rem',
                                        background: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    [DEBUG] Results
                                </button>
                                <button
                                    onClick={() => {
                                        setSessionId('debug-session');
                                        setRapidFireAvailable(26);
                                        setRapidFireActive(true);
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.75rem',
                                        background: '#8b5cf6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    [DEBUG] Rapid Fire
                                </button>
                            </div>

                            {/* Rapid Fire Overlay for debug */}
                            {sessionId && (
                                <RapidFireOverlay
                                    sessionId={sessionId}
                                    isActive={rapidFireActive}
                                    onClose={() => setRapidFireActive(false)}
                                />
                            )}
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

                        <div className={styles.infoBox}>
                            <p>
                                Not familiar with this personality system? Don't worry — we're building this website
                                to be the perfect educational platform for understanding your type. Even if the results
                                don't mean much to you yet, they will soon!
                            </p>
                        </div>

                        <div className={styles.shareSection}>
                            <p className={styles.shareText}>Got any friends in OPS? Have them do this test!</p>
                            {shareCode ? (
                                <div className={styles.shareCodeDisplay}>
                                    <span className={styles.shareCodeValue}>{shareCode}</span>
                                    <button
                                        className={styles.copyButton}
                                        onClick={handleCopyShareCode}
                                    >
                                        {shareCodeCopied ? (
                                            <>
                                                <Check size={16} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className={styles.shareButton}
                                    onClick={handleGenerateShareCode}
                                    disabled={shareCodeLoading}
                                >
                                    {shareCodeLoading ? (
                                        <>
                                            <Loader2 size={16} className={styles.spinning} />
                                            Generating...
                                        </>
                                    ) : (
                                        'Get Access Code'
                                    )}
                                </button>
                            )}
                        </div>

                        <div className={styles.feedbackSection}>
                            <h3 className={styles.feedbackTitle}>Share Your Thoughts</h3>

                            {feedbackSubmitted ? (
                                <p className={styles.feedbackThanks}>Thank you for your feedback!</p>
                            ) : (
                                <>
                                    <textarea
                                        className={styles.feedbackTextarea}
                                        placeholder="Share your thoughts about the test, your results, or anything else..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        rows={4}
                                        disabled={feedbackSubmitting}
                                    />

                                    <button
                                        className={styles.feedbackSubmit}
                                        onClick={handleFeedbackSubmit}
                                        disabled={!feedback.trim() || feedbackSubmitting}
                                    >
                                        {feedbackSubmitting ? (
                                            <>
                                                <Loader2 size={16} className={styles.spinning} />
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Feedback'
                                        )}
                                    </button>
                                </>
                            )}
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
                            {showLongWaitMessage ? (
                                <p className={styles.longWaitHint}>
                                    This is taking longer than usual. We're doing deeper analysis. We're probably going into Phase 2...
                                </p>
                            ) : (
                                <div className={styles.processingHints}>
                                    <p className={styles.processingHint} key={thinkingIndex}>
                                        {thinkingPhrases[thinkingIndex]}...
                                    </p>
                                    <p className={styles.processingTimer}>~20 seconds</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Rapid Fire Overlay */}
                {sessionId && (
                    <RapidFireOverlay
                        sessionId={sessionId}
                        isActive={rapidFireActive}
                        onClose={() => setRapidFireActive(false)}
                    />
                )}

                <div className={styles.controls}>
                    <div className={cn(styles.inputWrapper, isRecording && styles.inputListening)}>
                        <textarea
                            ref={inputRef}
                            className={styles.textInput}
                            placeholder={sessionState === 'awaiting_known_type' ? "Enter your OPS type or anything..." : (isRecording ? "Listening..." : "Type your answer...")}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={status === 'processing' || isRecording}
                            rows={1}
                        />
                        <div className={styles.inputButtons}>
                            <button
                                className={cn(
                                    styles.micButton,
                                    isRecording && styles.recording,
                                    status === 'processing' && styles.processing
                                )}
                                onClick={handleMicClick}
                                disabled={status === 'processing'}
                                title={isRecording ? 'Stop recording' : 'Start recording'}
                            >
                                {status === 'processing' ? (
                                    <Loader2 size={18} className={styles.spinning} />
                                ) : isRecording ? (
                                    <Square size={14} fill="currentColor" />
                                ) : (
                                    <Mic size={18} />
                                )}
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
