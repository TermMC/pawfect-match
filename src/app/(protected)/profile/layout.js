import '../../globals.css'
import Navbar from '../../components/navBar';
import { config } from '@fortawesome/fontawesome-svg-core';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

config.autoAddCss = false;


export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const{data, error} = await supabase.auth.getUser();
    if (error || !data?.user){
        redirect ('/login');
    }

    return (
        <html lang='en'>
            <body>
                <Navbar />
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
}
