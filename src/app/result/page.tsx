import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './result.module.css';

import { typesData } from '@/data/types';

export default function ResultPage() {
    // Mock result for now
    const resultType = typesData.find(t => t.name === 'The Dreamweaver') || typesData[0];
    const secondaryType = typesData.find(t => t.name === 'The Charmist') || typesData[1];

    return (
        <main className={styles.container}>
            <div className={styles.hero}>
                <p className={styles.label}>Your inner operating system</p>
                <h1 className={styles.title}>You are {resultType.name}</h1>
                <p className={styles.subline}>{resultType.code} · {resultType.family} Archetype</p>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    {resultType.shortDescription}
                </p>
            </div>

            <div className={styles.confidenceBlock}>
                <div className="flex justify-between w-full max-w-[400px] text-sm font-medium">
                    <span>Confidence</span>
                    <span>78%</span>
                </div>
                <div className={styles.confidenceBar}>
                    <div className={styles.confidenceFill} />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    <span className="mr-2">Next most likely:</span>
                    <Link href={`/types/${secondaryType.name.toLowerCase().replace(/ /g, '-')}`} className="underline hover:text-black">
                        {secondaryType.name} (12%)
                    </Link>
                </div>
            </div>

            <div className="prose prose-lg mx-auto mb-12">
                <h2>Core Pattern</h2>
                <div className="whitespace-pre-line text-left">
                    {resultType.fullProfile.split('\n').slice(0, 10).join('\n')}...
                </div>
                <div className="mt-4">
                    <Link href={`/types/${resultType.name.toLowerCase().replace(/ /g, '-')}`}>
                        <Button variant="ghost">Read full profile</Button>
                    </Link>
                </div>
            </div>

            <div className={styles.nextSteps}>
                <Card className="flex flex-col gap-4 items-start">
                    <h3 className="font-bold text-lg">Not sure?</h3>
                    <p className="text-gray-600">Keep talking to your inner OS and see if your type stabilizes or shifts.</p>
                    <Link href="/chat">
                        <Button variant="secondary">Return to chat</Button>
                    </Link>
                </Card>
                <Card className="flex flex-col gap-4 items-start">
                    <h3 className="font-bold text-lg">Explore related types</h3>
                    <p className="text-gray-600">See other types in the NF family or explore the full system.</p>
                    <div className="flex gap-2 flex-wrap">
                        <Link href="/types?family=fi">
                            <Button variant="secondary" className="text-sm">View all Fi-types</Button>
                        </Link>
                        <Link href="/types">
                            <Button variant="ghost" className="text-sm">Browse all 32</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </main>
    );
}
