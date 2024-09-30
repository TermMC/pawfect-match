import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Link href='/supabase-test'>Click Here To See Some User Data</Link>
            </main>
        </div>
    );
}
