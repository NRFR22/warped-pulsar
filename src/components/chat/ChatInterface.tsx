'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './ChatInterface.module.css';

interface Message {
    id: string;
    role: 'bot' | 'user';
    text: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            text: "Hey, I’m your inner OS. I’m going to listen to how you talk and think, and I’ll try to guess your type. Just press the mic and tell me about your day, your decisions, or anything that feels important right now."
        }
    ]);
    const [status, setStatus] = useState<'idle' | 'listening' | 'processing'>('idle');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMicClick = () => {
        if (status === 'idle') {
            setStatus('listening');
            // Mock recording duration
            setTimeout(() => {
                setStatus('processing');
                // Mock processing duration
                setTimeout(() => {
                    addMessage('user', "I've been feeling really overwhelmed lately with all the possibilities. I keep jumping from one idea to another without finishing anything.");
                    setStatus('idle');
                    // Mock bot response
                    setTimeout(() => {
                        addMessage('bot', "That sounds like a classic Ne (Extraverted Intuition) pattern. You see the potential in everything, which can be exciting but also exhausting. Do you feel like you're afraid of missing out if you commit to just one path?");
                    }, 1500);
                }, 1500);
            }, 3000);
        }
    };

    const addMessage = (role: 'bot' | 'user', text: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role, text }]);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                <span className="font-semibold">Chat with your inner OS</span>
                <div className={styles.status}>
                    <Mic size={16} className={status === 'listening' ? 'text-red-500' : 'text-gray-400'} />
                    <span>{status === 'listening' ? 'Listening...' : 'Voice only · Mic enabled'}</span>
                </div>
            </div>

            <div className={styles.messages}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(styles.message, msg.role === 'bot' ? styles.botMessage : styles.userMessage)}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.controls}>
                <button
                    className={cn(styles.micButton, styles[status])}
                    onClick={handleMicClick}
                    disabled={status === 'processing'}
                >
                    {status === 'idle' && <Mic size={32} />}
                    {status === 'listening' && <Square size={24} fill="currentColor" />}
                    {status === 'processing' && <Loader2 size={32} className="animate-spin" />}
                </button>
                <p className={styles.hint}>
                    {status === 'idle' && "Click to talk"}
                    {status === 'listening' && "Listening... click to stop"}
                    {status === 'processing' && "Analyzing..."}
                </p>
            </div>
        </div>
    );
}
