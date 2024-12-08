'use client';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Option } from '@/utils/shared/types';
import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

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
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        ref: selectRef,
        onOutsideClick: () => setIsOpen(false),
    });

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => {
            if (!prevIsOpen) {
                setHighlightedIndex(-1);

                if (selectRef.current) {
                    const rect = selectRef.current.getBoundingClientRect();
                    const windowHeight =
                        window.innerHeight ||
                        document.documentElement.clientHeight;
                    setShouldOpenUp(rect.bottom + 216 > windowHeight);
                }
            }

            return !prevIsOpen; // Toggle state
        });
    };

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    const onOptionKeyDown = (
        e: React.KeyboardEvent<HTMLLIElement>,
        value: string
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOptionClick(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
            if (e.key === 'Enter') {
                e.preventDefault();
                toggleDropdown();
            }
            return;
        }

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleOptionClick(options[highlightedIndex].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (isOpen && highlightedIndex >= 0) {
            const element = document.getElementById(
                `option-${highlightedIndex}`
            );
            element?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex, isOpen]);

    return (
        <div
            ref={selectRef}
            className={`navigated relative inline-block text-left w-full focus-visible:outline-none  ${className}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="dropdown-menu"
            aria-haspopup="listbox"
            aria-activedescendant={
                highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined
            }
        >
            {/* Selected value */}
            <div
                className={`focused p-4 rounded-3xl w-full bg-gray-100 border border-gray-200 outline-none cursor-pointer
                            
                             flex justify-between items-center gap-2 
                            transition-all duration-300 ${
                                isOpen
                                    ? 'shadow-inner-shadow text-gray-300'
                                    : 'shadow-outer-shadow'
                            }`}
                onClick={toggleDropdown}
                role="button"
                aria-label="Select an option"
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
                            overflow-hidden transition-all duration-300 ease-in-out text-center ${
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
                role="listbox"
            >
                <ul>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLLIElement>
                            ) => onOptionKeyDown(e, option.value)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gradient-to-r outline-none hover:from-gray-200 hover:via-white hover:to-gray-200 
           focus:outline-none focus:ring-0 focus:bg-gradient-to-r focus:from-gray-200 focus:via-white focus:to-gray-200
           cursor-pointer transition-all duration-200 ease-in-out first:pt-4 last:pb-4"
                            role="option"
                            aria-selected={value === option.value}
                            tabIndex={isOpen ? 0 : -1}
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
