import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { fetchExchangeRates } from '@/utils/api';
import { Karla } from 'next/font/google';

export const metadata: Metadata = {
    title: 'CC | Currency Converter',
    description: 'Effortless currency conversions.',
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
