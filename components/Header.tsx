import { FC } from 'react';
import RateBlock from './RateBlock';
import Image from 'next/image';
import HeaderDeco from './HeaderDeco';
import { ExchangeRates } from '@/utils/shared/types';

export interface HeaderProps {
    exchangeRates: ExchangeRates | null;
}

const Header: FC<HeaderProps> = ({ exchangeRates }) => {
    const headerCurrencies: Array<'usd' | 'eur'> = ['usd', 'eur'];
    return (
        <header className="relative bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-white py-6 px-8 flex flex-col md:flex-row md:justify-between items-center shadow-lg">
            {/* Background Decoration */}
            <HeaderDeco />

            {/* Logo and Title */}
            <div className="relative z-10 flex items-center gap-4 mb-4 md:mb-0">
                <div className="rounded-3xl bg-white/80 p-3 w-14 h-14 flex justify-center items-center shadow-lg">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={28}
                        height={28}
                        className="w-auto"
                    />
                </div>
                <h1 className="text-2xl font-bold tracking-wide drop-shadow-md">
                    Currency Converter
                </h1>
            </div>

            {/* Exchange Rates */}
            <div className="relative z-10 flex gap-6 items-center">
                {headerCurrencies.map((currency) => (
                    <RateBlock
                        key={currency}
                        currencyCode={currency}
                        rateValue={
                            exchangeRates ? 1 / exchangeRates[currency] : null
                        }
                    />
                ))}
            </div>
        </header>
    );
};

export default Header;
