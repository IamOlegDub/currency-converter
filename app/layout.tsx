import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { fetchExchangeRates } from '@/utils/api/api';
import { Karla } from 'next/font/google';

export const metadata: Metadata = {
    title: 'CC | Currency Converter',
    description: 'Effortless currency conversions.',
    openGraph: {
        type: 'website',
        title: 'CC | Currency Converter',
        description: 'Effortless currency conversions.',
        url: 'https://currency-converter-nine-jet.vercel.app/',
        images: [
            {
                url: '/preview-image.png',
                width: 1200,
                height: 630,
                alt: 'Preview of Currency Converter app',
            },
        ],
        siteName: 'CC | Currency Converter',
    },
};

const inter = Karla({ subsets: ['latin'] });

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let exchangeRates = null;

    try {
        exchangeRates = await fetchExchangeRates('uah');
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
    }

    return (
        <html lang="en" className={inter.className}>
            <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
                <Header exchangeRates={exchangeRates} />
                <main className="bg-white flex flex-col flex-1 rounded-t-3xl">
                    {children}
                </main>
            </body>
        </html>
    );
}
