import React, { FC } from 'react';

interface RateStringProps {
    rateValue: number;
    currencyCode: 'USD' | 'EUR';
}

const RateBlock: FC<RateStringProps> = ({ rateValue, currencyCode }) => (
    <div className="bg-white/30 text-white rounded-3xl p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] flex flex-col items-center">
        <p className="font-bold text-base tracking-wide">
            1 {currencyCode.toUpperCase()}
        </p>
        <p className="text-sm font-medium opacity-90">
            = {rateValue.toFixed(2)} UAH
        </p>
    </div>
);

export default RateBlock;
