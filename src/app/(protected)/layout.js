import '../globals.css';
import Navbar from '../components/navBar';
import { config } from '@fortawesome/fontawesome-svg-core';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

config.autoAddCss = false;

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    let { data, error } = await supabase.auth.getSession();
    if (error || !data.session || data?.session?.expires_at < Date.now() / 1000) {
        redirect('/login');
    }

    return (
        <>
            <Navbar />
            <div style={{ height: 'calc(100% - 5em)', position: 'relative', zIndex: -10 }}>{children}</div>
            <footer></footer>
        </>
    );
}
