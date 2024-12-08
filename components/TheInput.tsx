import React, { FC } from 'react';

interface TheInputProps {
    amount: string;
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const TheInput: FC<TheInputProps> = ({
    amount,
    handleAmountChange,
    placeholder,
}) => {
    return (
        <input
            type="string"
            value={amount}
            onChange={handleAmountChange}
            className="p-4 rounded-3xl flex-1 bg-gray-100 border outline-none border-gray-200
                       shadow-outer-shadow focus:shadow-inner-shadow focus:border-gray-200 
                       transition-all duration-300"
            placeholder={placeholder}
        />
    );
};

export default TheInput;
