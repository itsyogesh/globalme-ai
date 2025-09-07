import React, { useState } from 'react';
import type { GeneratedImageMap, Country } from '../types';
import ImageCard from './ImageCard';
import CountryButton from './CountryButton';
import { COUNTRIES } from '../constants';
import { ChevronDown } from 'lucide-react';

interface GalleryProps {
    uploadedImage: File | null;
    isGenerating: boolean;
    generatedImages: GeneratedImageMap;
    countriesToDisplay: string[];
    availableCountries: Country[];
    onCountryClick: (targetCountry: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({
    uploadedImage,
    isGenerating,
    generatedImages,
    countriesToDisplay,
    availableCountries,
    onCountryClick
}) => {
    const [isExploreMoreOpen, setIsExploreMoreOpen] = useState(false);

    if (!uploadedImage) {
        return (
            <div className="lg:col-span-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Your Gallery Awaits</h2>
                    <p className="text-slate-500 dark:text-slate-400">Upload your photo to start your global journey.</p>
                </div>
            </div>
        );
    }
    
    // Create a map for quick country lookup
    const countryMap = new Map(COUNTRIES.map(c => [c.name, c]));

    // Sort available countries: selected first, then alphabetically
    const sortedAvailableCountries = [...availableCountries].sort((a, b) => {
        const isASelected = !!generatedImages[a.name] && generatedImages[a.name].status !== 'error';
        const isBSelected = !!generatedImages[b.name] && generatedImages[b.name].status !== 'error';

        if (isASelected && !isBSelected) return -1;
        if (!isASelected && isBSelected) return 1;
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
                <h2 className="text-2xl font-bold mb-2">2. Your Global Portraits</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Here are your AI-generated portraits. Click a country below to generate more.</p>

                <div className="grid grid-cols-2 gap-6">
                    {countriesToDisplay.map(countryName => {
                        const country = countryMap.get(countryName);
                        if (!country) return null; // Should not happen
                        
                        const generatedImage = generatedImages[countryName] || { status: 'idle' };
                        
                        return (
                            <ImageCard 
                                key={country.name}
                                country={country}
                                generatedImage={generatedImage}
                                onRegenerate={onCountryClick}
                                isGenerating={isGenerating}
                            />
                        );
                    })}
                </div>
            </div>
            
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
                 <button 
                    className="w-full text-left flex justify-between items-center"
                    onClick={() => setIsExploreMoreOpen(!isExploreMoreOpen)}
                    aria-expanded={isExploreMoreOpen}
                >
                    <div>
                        <h2 className="text-2xl font-bold mb-2">3. Explore More</h2>
                        <p className="text-slate-500 dark:text-slate-400">Select another country to see a new version of yourself.</p>
                    </div>
                    <ChevronDown 
                        className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isExploreMoreOpen ? 'rotate-180' : ''}`} 
                    />
                </button>
                
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExploreMoreOpen ? 'max-h-[1000px] mt-6' : 'max-h-0'}`}>
                    <div className="flex flex-wrap gap-3">
                        {sortedAvailableCountries.map(country => (
                            <CountryButton
                                key={country.name}
                                country={country}
                                onClick={onCountryClick}
                                isSelected={!!generatedImages[country.name] && generatedImages[country.name].status !== 'error'}
                                isGenerating={isGenerating}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;