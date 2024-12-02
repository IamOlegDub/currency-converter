import axios from 'axios';

export interface ExchangeRates {
    [currencyCode: string]: number;
}

const BASE_API_URL =
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

export const fetchExchangeRates = async (
    base: string = 'uah'
): Promise<ExchangeRates | null> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/${base}.json`);
        return response.data[base];
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
};
