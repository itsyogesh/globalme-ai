import React from 'react';
import type { Country } from '../types';

interface CountryButtonProps {
    country: Country;
    onClick: (countryName: string) => void;
    isSelected: boolean;
    isGenerating: boolean;
}

const CountryButton: React.FC<CountryButtonProps> = ({ country, onClick, isSelected, isGenerating }) => {
    return (
        <button
            onClick={() => onClick(country.name)}
            disabled={isGenerating || isSelected}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out flex items-center gap-2
            ${isSelected ? 'bg-indigo-500 text-white cursor-not-allowed shadow-indigo-400/30 shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}
            ${isGenerating ? 'opacity-50 cursor-wait' : ''}`}
        >
            <span className="text-lg">{country.emoji}</span>
            <span>{country.name}</span>
        </button>
    );
};

export default CountryButton;