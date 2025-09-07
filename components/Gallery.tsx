import React from 'react';
import type { GeneratedImageMap, Country } from '../types';
import ImageCard from './ImageCard';
import CountryButton from './CountryButton';
import { COUNTRIES } from '../constants';

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

    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
                <h2 className="text-2xl font-bold mb-2">2. Your Global Portraits</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Here are your AI-generated portraits. Click a country below to generate more.</p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                <h2 className="text-2xl font-bold mb-2">3. Explore More</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Select another country to see a new version of yourself.</p>
                <div className="flex flex-wrap gap-3">
                    {availableCountries.map(country => (
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
    );
};

export default Gallery;
