import { ChatInterface } from '@/components/chat/ChatInterface';
import { ProgressPanel } from '@/components/chat/ProgressPanel';
import styles from './chat.module.css';

export default function ChatPage() {
    return (
        <main className={styles.container}>
            <div className={styles.progressRow}>
                <ProgressPanel />
            </div>
            <div className={styles.chatRow}>
                <ChatInterface />
            </div>
        </main>
    );
}
