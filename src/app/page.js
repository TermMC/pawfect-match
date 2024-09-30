import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Link href='/supabase-server-test'>Click Here To See Some User Data In A Server Component</Link>
                <Link href='/supabase-client-test'>Click Here To See Some User Data In A Client Component</Link>
            </main>
        </div>
    );
}
