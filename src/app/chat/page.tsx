import { ChatInterface } from '@/components/chat/ChatInterface';
import { InAppBrowserBanner } from '@/components/ui/InAppBrowserBanner';
import styles from './chat.module.css';

export default function ChatPage() {
    return (
        <main className={styles.container}>
            <div className={styles.chatRow}>
                <ChatInterface />
            </div>
            <InAppBrowserBanner />
        </main>
    );
}
