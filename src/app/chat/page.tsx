import { ChatInterface } from '@/components/chat/ChatInterface';
import { ProgressPanel } from '@/components/chat/ProgressPanel';
import styles from './chat.module.css';

export default function ChatPage() {
    return (
        <main className={styles.container}>
            <div className={styles.chatColumn}>
                <ChatInterface />
            </div>
            <div className={styles.progressColumn}>
                <ProgressPanel />
            </div>
        </main>
    );
}
