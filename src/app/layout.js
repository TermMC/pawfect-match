import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

config.autoAddCss = false;

export const metadata = {
    title: 'Pawfect Match',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' className={poppins.className}>
            <body>
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
}
