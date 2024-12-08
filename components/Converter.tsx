'use client';
import React, { useState, useEffect, useMemo } from 'react';
import TheInput from './TheInput';
import TheSelect from './TheSelect';
import { currencies } from '@/utils/shared/constants';
import { ActiveCurrencies } from '@/utils/shared/types';
import useExchangeRates from '@/hooks/useExchangeRates';

const Converter: React.FC = () => {
    // State for input amounts
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');

    // State for selected currencies
    const [currency1, setCurrency1] = useState<keyof ActiveCurrencies>('usd');
    const [currency2, setCurrency2] = useState<keyof ActiveCurrencies>('uah');

    const [lastEditedInput, setLastEditedInput] = useState<
        'amount1' | 'amount2'
    >('amount1');

    // Fetch exchange rates
    const exchangeRates = useExchangeRates(currency1);

    const stableExchangeRates = useMemo(() => exchangeRates, [exchangeRates]);

    // Calculate the converted amounts based on the exchange rates
    const calculateAmounts = () => {
        if (!stableExchangeRates) return;

        if (lastEditedInput === 'amount1' && amount1 === '') {
            setAmount2('');
            return;
        }

        if (lastEditedInput === 'amount2' && amount2 === '') {
            setAmount1('');
            return;
        }

        const rate =
            lastEditedInput === 'amount1'
                ? stableExchangeRates[currency2] /
                  stableExchangeRates[currency1]
                : stableExchangeRates[currency1] /
                  stableExchangeRates[currency2];

        if (lastEditedInput === 'amount1') {
            setAmount2((parseFloat(amount1) * rate).toFixed(2));
        } else {
            setAmount1((parseFloat(amount2) * rate).toFixed(2));
        }
    };

    useEffect(() => {
        calculateAmounts();
    }, [currency1, currency2, stableExchangeRates]);

    const handleAmountChange = (
        value: string,
        setSourceAmount: React.Dispatch<React.SetStateAction<string>>,
        setTargetAmount: React.Dispatch<React.SetStateAction<string>>,
        sourceCurrency: keyof ActiveCurrencies,
        targetCurrency: keyof ActiveCurrencies,
        lastEdited: 'amount1' | 'amount2'
    ) => {
        setSourceAmount(value);
        setLastEditedInput(lastEdited);

        if (value === '' || !stableExchangeRates) {
            setTargetAmount('');
            return;
        }

        const rate =
            stableExchangeRates[targetCurrency] /
            stableExchangeRates[sourceCurrency];
        setTargetAmount((parseFloat(value) * rate).toFixed(2));
    };

    const pairs = [
        {
            amount: amount1,
            handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleAmountChange(
                    e.target.value,
                    setAmount1,
                    setAmount2,
                    currency1,
                    currency2,
                    'amount1'
                ),
            currency: currency1,
            handleCurrencySelect: (value: string) =>
                setCurrency1(value as keyof ActiveCurrencies),
            placeholder: 'Enter amount',
        },
        {
            amount: amount2,
            handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleAmountChange(
                    e.target.value,
                    setAmount2,
                    setAmount1,
                    currency2,
                    currency1,
                    'amount2'
                ),
            currency: currency2,
            handleCurrencySelect: (value: string) =>
                setCurrency2(value as keyof ActiveCurrencies),
            placeholder: 'Converted amount',
        },
    ];

    return (
        <div className="p-6 xs:p-8 md:p-12 max-w-md mx-auto bg-gray-50 rounded-3xl shadow-outer-shadow space-y-6">
            {pairs.map((pair, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <TheInput
                        amount={pair.amount}
                        handleAmountChange={pair.handleAmountChange}
                        placeholder={pair.placeholder}
                    />
                    <TheSelect
                        options={currencies}
                        value={pair.currency}
                        onChange={pair.handleCurrencySelect}
                        className="w-40"
                    />
                </div>
            ))}
        </div>
    );
};

export default Converter;
