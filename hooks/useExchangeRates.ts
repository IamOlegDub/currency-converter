import { ActiveCurrencies } from '@/utils/shared/types';
import { fetchExchangeRates } from '@/utils/api/api';
import { useState, useEffect } from 'react';

const useExchangeRates = (baseCurrency: keyof ActiveCurrencies) => {
    const [exchangeRates, setExchangeRates] = useState<ActiveCurrencies | null>(
        null
    );

    useEffect(() => {
        const fetchRates = async () => {
            const rates = await fetchExchangeRates(baseCurrency);
            if (rates) {
                setExchangeRates(rates);
            }
        };
        fetchRates();
    }, [baseCurrency]);

    return exchangeRates;
};

export default useExchangeRates;
