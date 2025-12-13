'use client';

import { useState, useEffect } from 'react';
import styles from './InAppBrowserBanner.module.css';

export function InAppBrowserBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [browserName, setBrowserName] = useState('');

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || '';

        // Detect common in-app browsers
        const inAppBrowsers = [
            { pattern: /FBAN|FBAV/i, name: 'Facebook' },
            { pattern: /Instagram/i, name: 'Instagram' },
            { pattern: /Messenger/i, name: 'Messenger' },
            { pattern: /Discord/i, name: 'Discord' },
            { pattern: /Twitter/i, name: 'Twitter' },
            { pattern: /LinkedIn/i, name: 'LinkedIn' },
            { pattern: /Snapchat/i, name: 'Snapchat' },
            { pattern: /TikTok/i, name: 'TikTok' },
            { pattern: /WhatsApp/i, name: 'WhatsApp' },
            { pattern: /Telegram/i, name: 'Telegram' },
            { pattern: /Line\//i, name: 'Line' },
            { pattern: /WeChat|MicroMessenger/i, name: 'WeChat' },
        ];

        for (const browser of inAppBrowsers) {
            if (browser.pattern.test(ua)) {
                setBrowserName(browser.name);
                setShowBanner(true);
                return;
            }
        }

        // Generic in-app browser detection (WebView indicators)
        const isWebView = /wv|WebView/i.test(ua) ||
            (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua)) ||
            (/Android.*Version\/[\d.]+.*Chrome\/[\d.]+ Mobile/i.test(ua) && !/Chrome\/[\d.]+ Mobile Safari/i.test(ua));

        if (isWebView) {
            setBrowserName('this app');
            setShowBanner(true);
        }
    }, []);

    const handleOpenInBrowser = () => {
        const url = window.location.href;

        // Try different methods to open in external browser
        // Method 1: For iOS - try Safari
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // iOS in-app browsers sometimes respect this
            window.location.href = `x-safari-${url}`;
            setTimeout(() => {
                // Fallback: just show instructions
                alert(`To open in Safari:\n\n1. Tap the ••• or share button\n2. Select "Open in Safari" or "Open in Browser"\n\nOr copy this link:\n${url}`);
            }, 500);
        } else {
            // Android - try intent
            const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;end`;
            window.location.href = intentUrl;
            setTimeout(() => {
                // Fallback
                alert(`To open in your browser:\n\n1. Tap the ⋮ menu\n2. Select "Open in Browser" or "Open in Chrome"\n\nOr copy this link:\n${url}`);
            }, 500);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied! Paste it in your browser.');
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied! Paste it in your browser.');
        }
    };

    if (!showBanner) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <span className={styles.icon}>🌐</span>
                <p className={styles.message}>
                    For the best experience, open in your browser
                </p>
            </div>
            <div className={styles.buttons}>
                <button onClick={handleOpenInBrowser} className={styles.openButton}>
                    Open in Browser
                </button>
                <button onClick={handleCopyLink} className={styles.copyButton}>
                    Copy Link
                </button>
                <button onClick={() => setShowBanner(false)} className={styles.dismissButton}>
                    ✕
                </button>
            </div>
        </div>
    );
}
