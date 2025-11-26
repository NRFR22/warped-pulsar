import styles from './lessons.module.css';

const LESSONS = [
    {
        title: 'Lesson 1 — Meet the four energies',
        summary: 'A quick primer on Feeling, Thinking, Intuition, and Sensing so you know how the map is structured.',
    },
    {
        title: 'Lesson 2 — How functions pair up',
        summary: 'See why Fe/Ne feels different from Fe/Se and how each pairing shapes behavior.',
    },
    {
        title: 'Lesson 3 — Practice spotting patterns',
        summary: 'Listen to short clips and guess which energy shows up. Build your intuition with the system.',
    },
];

export default function LessonsPage() {
    return (
        <main className={styles.container}>
            <header className={styles.hero}>
                <p className={styles.kicker}>Lessons</p>
                <h1>Learn the inner OS system</h1>
                <p>Short, practical lessons that help you understand the 32 archetypes and read the signals in real conversations.</p>
            </header>

            <section className={styles.lessonGrid}>
                {LESSONS.map((lesson) => (
                    <article key={lesson.title} className={styles.lessonCard}>
                        <h2>{lesson.title}</h2>
                        <p>{lesson.summary}</p>
                        <button type="button" className={styles.lessonButton}>Coming soon</button>
                    </article>
                ))}
            </section>
        </main>
    );
}
