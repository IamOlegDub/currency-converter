'use client';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface Option {
    label: string;
    value: string;
}

interface TheSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const TheSelect: React.FC<TheSelectProps> = ({
    options,
    value,
    onChange,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldOpenUp, setShouldOpenUp] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        ref: selectRef,
        onOutsideClick: () => setIsOpen(false),
    });

    const toggleDropdown = () => {
        if (!isOpen && selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            const windowHeight =
                window.innerHeight || document.documentElement.clientHeight;
            setShouldOpenUp(rect.bottom + 216 > windowHeight);
        }
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div
            ref={selectRef}
            className={`relative inline-block text-left w-full ${className}`}
        >
            {/* Selected value */}
            <div
                className={`p-4 rounded-3xl w-full bg-gray-100 border border-gray-200 outline-none cursor-pointer
                            
                            focus:ring-2 focus:ring-gray-200 flex justify-between items-center gap-2
                            transition-all duration-300 ${
                                isOpen
                                    ? 'shadow-inner-shadow text-gray-300'
                                    : 'shadow-outer-shadow'
                            }`}
                onClick={toggleDropdown}
            >
                {options.find((option) => option.value === value)?.label ||
                    'Select'}
                <div
                    className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
                    <IoIosArrowDown />
                </div>
            </div>

            {/* Dropdown */}
            <div
                ref={dropdownRef}
                className={`absolute z-10 w-full mt-2 bg-gray-100 border border-gray-200 rounded-3xl shadow-inner-shadow
                            overflow-hidden transition-all duration-300 ease-in-out text-center py-2 ${
                                isOpen
                                    ? 'opacity-100'
                                    : 'opacity-0 pointer-events-none'
                            }`}
                style={{
                    top: shouldOpenUp ? 'auto' : '100%',
                    bottom: shouldOpenUp ? '100%' : 'auto',
                    transformOrigin: shouldOpenUp ? 'bottom' : 'top',
                    maxHeight: isOpen ? '216px' : '0px',
                }}
            >
                <ul>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className="px-4 py-2 hover:bg-gradient-to-r hover:from-gray-200 hover:via-white hover:to-gray-200 cursor-pointer transition-all duration-200 ease-in-out"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TheSelect;
