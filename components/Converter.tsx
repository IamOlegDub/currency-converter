'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchExchangeRates } from '../utils/api';
import TheInput from './TheInput';
import TheSelect from './TheSelect';

const currencies = [
    { label: 'USD', value: 'usd' },
    { label: 'EUR', value: 'eur' },
    { label: 'GBP', value: 'gbp' },
    { label: 'UAH', value: 'uah' },
    { label: 'PLN', value: 'pln' },
];

interface ActiveCurrencies {
    usd: number;
    eur: number;
    gbp: number;
    uah: number;
    pln: number;
}

const Converter: React.FC = () => {
    const [exchangeRates, setExchangeRates] = useState<ActiveCurrencies | null>(
        null
    );

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
    useEffect(() => {
        const fetchCurrencyRates = async () => {
            const baseCurrency =
                lastEditedInput === 'amount1' ? currency1 : currency2;
            const data = await fetchExchangeRates(baseCurrency);
            if (data) {
                setExchangeRates({
                    usd: data.usd,
                    eur: data.eur,
                    gbp: data.gbp,
                    uah: data.uah,
                    pln: data.pln,
                });
            }
        };

        fetchCurrencyRates();
    }, [currency1, currency2]);

    const stableExchangeRates = useMemo(() => exchangeRates, [exchangeRates]);

    // Calculate the converted amounts based on the exchange rates
    const calculateAmounts = () => {
        if (!stableExchangeRates) return;

        if (lastEditedInput === 'amount1') {
            const rate =
                stableExchangeRates[currency2] / stableExchangeRates[currency1];
            setAmount2((parseFloat(amount1) * rate).toFixed(2));
        } else if (lastEditedInput === 'amount2') {
            const rate =
                stableExchangeRates[currency1] / stableExchangeRates[currency2];
            setAmount1((parseFloat(amount2) * rate).toFixed(2));
        }
    };

    useEffect(() => {
        calculateAmounts();
    }, [currency1, currency2, stableExchangeRates]);

    const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setAmount1(value);
            setLastEditedInput('amount1');
            if (stableExchangeRates) {
                const rate =
                    stableExchangeRates[currency2] /
                    stableExchangeRates[currency1];
                setAmount2((parseFloat(value) * rate).toFixed(2));
            }
        }
    };

    const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setAmount2(value);
            setLastEditedInput('amount2');
            if (stableExchangeRates) {
                const rate =
                    stableExchangeRates[currency1] /
                    stableExchangeRates[currency2];
                setAmount1((parseFloat(value) * rate).toFixed(2));
            }
        }
    };

    const handleCurrency1Select = (value: string) => {
        setCurrency1(value as keyof ActiveCurrencies);
    };

    const handleCurrency2Select = (value: string) => {
        setCurrency2(value as keyof ActiveCurrencies);
    };

    return (
        <div className="p-6 xs:p-8 md:p-12 max-w-md mx-auto bg-gray-50 rounded-3xl shadow-outer-shadow space-y-6">
            <div className="flex items-center space-x-4">
                <TheInput
                    amount={amount1}
                    handleAmountChange={handleAmount1Change}
                    placeholder="Enter amount"
                />
                <TheSelect
                    options={currencies}
                    value={currency1}
                    onChange={handleCurrency1Select}
                    className="w-40"
                />
            </div>
            <div className="flex items-center space-x-4">
                <TheInput
                    amount={amount1 === '' ? '' : amount2}
                    handleAmountChange={handleAmount2Change}
                    placeholder="Converted amount"
                />
                <TheSelect
                    options={currencies}
                    value={currency2}
                    onChange={handleCurrency2Select}
                    className="w-40"
                />
            </div>
        </div>
    );
};

export default Converter;
