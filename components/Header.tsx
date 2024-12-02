import { ExchangeRates } from '@/utils/api';
import { FC } from 'react';
import RateBlock from './RateBlock';
import Image from 'next/image';
import SkeletonRateBlock from './SkeletonRateBlock';

export interface HeaderProps {
    exchangeRates: ExchangeRates | null;
}

const Header: FC<HeaderProps> = ({ exchangeRates }) => {
    return (
        <header className="relative bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-white py-6 px-8 flex flex-col md:flex-row md:justify-between items-center shadow-lg">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 800 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="150"
                        cy="150"
                        r="200"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <circle
                        cx="650"
                        cy="50"
                        r="150"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                </svg>
            </div>

            {/* Logo and Title */}
            <div className="relative z-10 flex items-center gap-4 mb-4 md:mb-0">
                <div className="rounded-3xl bg-white/80 p-3 w-14 h-14 flex justify-center items-center shadow-lg">
                    <Image src="/logo.png" alt="Logo" width={28} height={28} />
                </div>
                <h1 className="text-2xl font-bold tracking-wide drop-shadow-md">
                    Currency Converter
                </h1>
            </div>

            {/* Exchange Rates */}
            <div className="relative z-10 flex gap-6 items-center">
                {exchangeRates ? (
                    <RateBlock
                        currencyCode="USD"
                        rateValue={1 / exchangeRates?.usd}
                    />
                ) : (
                    <SkeletonRateBlock />
                )}
                {exchangeRates ? (
                    <RateBlock
                        currencyCode="EUR"
                        rateValue={1 / exchangeRates?.eur}
                    />
                ) : (
                    <SkeletonRateBlock />
                )}
            </div>
        </header>
    );
};

export default Header;
