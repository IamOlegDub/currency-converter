export interface ActiveCurrencies {
    usd: number;
    eur: number;
    gbp: number;
    uah: number;
    pln: number;
}

export interface ExchangeRates extends ActiveCurrencies {
    [currencyCode: string]: number;
}

// TheSelect
export interface Option {
    label: string;
    value: string;
}
