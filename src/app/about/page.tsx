import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './about.module.css';

export default function AboutPage() {
    return (
        <main className={styles.container}>
            <header className={styles.hero}>
                <p className={styles.kicker}>ABOUT THE SYSTEM</p>
                <h1 className={styles.title}>Inside the 32-type inner OS</h1>
                <p className={styles.subtitle}>
                    inner OS is a voice-first personality lab. We listen to how you narrate real situations, then map the repeated patterns of motivation, perception, and decision making.
                </p>
                <div className={styles.heroStats}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>32</span>
                        <span className={styles.statLabel}>Distinct archetypes modeled</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>8</span>
                        <span className={styles.statLabel}>Core families of cognitive focus</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>12K+</span>
                        <span className={styles.statLabel}>Voice clips used to calibrate tone</span>
                    </div>
                </div>
            </header>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Why we built inner OS</h2>
                    <p className={styles.sectionLead}>
                        Traditional tests rely on self-report sliders. We wanted a system that listens to the way you process stories in real time and reflects that back with language that actually feels human.
                    </p>
                </div>
                <div className={styles.storyGrid}>
                    <div className={styles.storyCard}>
                        <h3>Voice-first signal</h3>
                        <p>Cadence, word choice, and emotional framing reveal priorities more reliably than checkbox prompts.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <h3>Pattern, not label</h3>
                        <p>Types describe your problem-solving &ldquo;saviors&rdquo; and the &ldquo;demons&rdquo; you avoid. None of it is moral, all of it is practical.</p>
                    </div>
                    <div className={styles.storyCard}>
                        <h3>Actionable language</h3>
                        <p>Each profile is written like coaching feedback so you can instantly see how to spot your habits out in the wild.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>How the system works</h2>
                    <p className={styles.sectionLead}>
                        The 32-type map borrows from functional typology, Objective Personality research, and our own transcript library.
                    </p>
                </div>
                <div className={styles.processGrid}>
                    <div className={styles.processStep}>
                        <span className={styles.stepNumber}>1</span>
                        <h3>Capture your real voice</h3>
                        <p>Instead of multiple choice, we ask you to talk through decisions, frustrations, wins, and routines.</p>
                    </div>
                    <div className={styles.processStep}>
                        <span className={styles.stepNumber}>2</span>
                        <h3>Trace cognitive saviors</h3>
                        <p>The engine identifies which functions you lean on, how you gather info, and the tension you sidestep.</p>
                    </div>
                    <div className={styles.processStep}>
                        <span className={styles.stepNumber}>3</span>
                        <h3>Assign an archetype</h3>
                        <p>You get matched with one of 32 archetypes complete with vibe, strengths, blind spots, and growth path.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>What makes inner OS different</h2>
                    <p className={styles.sectionLead}>A conversational AI front end with a nerdy typology engine behind it.</p>
                </div>
                <div className={styles.bentoGrid}>
                    <div className={styles.bentoCard}>
                        <h3>Human tone, not lab copy</h3>
                        <p>Profiles are written by coaches who know the system, so you get paragraphs you could read to a friend.</p>
                    </div>
                    <div className={styles.bentoCard}>
                        <h3>Family-first navigation</h3>
                        <p>We group types into eight families (Fe, Fi, Ne, Ni, Se, Si, Te, Ti) so you can sense the vibe before the detail.</p>
                    </div>
                    <div className={styles.bentoCard}>
                        <h3>Context-aware chat</h3>
                        <p>The chat interface recalls previous answers so the AI can ask sharper follow-ups over time.</p>
                    </div>
                    <div className={styles.bentoCard}>
                        <h3>Always a beta lab</h3>
                        <p>We release fast, gather feedback, and treat the model as an evolving experiment rather than a fixed gospel.</p>
                    </div>
                </div>
            </section>

            <section className={styles.guardrails}>
                <h3 className={styles.guardrailTitle}>What we promise</h3>
                <ul className={styles.guardrailList}>
                    <li>
                        <span className={styles.guardrailLabel}>Pop psychology, not diagnosis.</span>
                        <span>Use inner OS as a mirror and a conversation starter, never as medical advice.</span>
                    </li>
                    <li>
                        <span className={styles.guardrailLabel}>Transparent language.</span>
                        <span>No mysticism. We explain in plain speech what each function combo looks like in real decisions.</span>
                    </li>
                    <li>
                        <span className={styles.guardrailLabel}>You own your stories.</span>
                        <span>Recordings exist only to improve accuracy. Delete a session anytime from the chat history.</span>
                    </li>
                </ul>
            </section>

            <div className={styles.ctaBlock}>
                <div>
                    <h3>Ready to meet your inner operating system?</h3>
                    <p>Jump into a voice session or browse all 32 archetypes to find the one that resonates.</p>
                </div>
                <div className={styles.ctaButtons}>
                    <Link href="/chat">
                        <Button>Talk to your inner OS</Button>
                    </Link>
                    <Link href="/types">
                        <Button variant="secondary">Browse the 32 types</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
