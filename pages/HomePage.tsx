import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { DEFAULT_TARGET_COUNTRIES, COUNTRIES } from '../constants';
import { generateImage } from '../services/geminiService';
import type { GeneratedImageMap } from '../types';

import CountryButton from '../components/CountryButton';
import ImageCard from '../components/ImageCard';
import ErrorToast from '../components/ErrorToast';
// FIX: Removed unused import for 'UploadIcon' which is not exported from '../components/icons'.
import UploadPanel from '../components/UploadPanel';
import Gallery from '../components/Gallery';

const HomePage: React.FC = () => {
    const [originCountry, setOriginCountry] = useState<string>('India');
    const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImageMap>({});
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                // FIX: Switched to a reliable, secure endpoint for IP lookup that doesn't require an API key
                // to resolve the 403 Forbidden error from the previous service.
                const response = await fetch('https://api.ip.sb/geoip');
                if (!response.ok) {
                    // Don't throw an error to the user, just log it
                    console.error('Failed to fetch IP data, status:', response.status);
                    return;
                }
                const data = await response.json();
                // Adjust logic for the new API response structure
                if (data && data.country) {
                    // Check if the fetched country is in our predefined list
                    const countryExists = COUNTRIES.some(c => c.name === data.country);
                    if (countryExists) {
                        setOriginCountry(data.country);
                    }
                }
            } catch (err) {
                console.error("Could not fetch user's country, defaulting to India.", err);
                // Silently fail and let the default 'India' remain
            }
        };

        fetchUserCountry();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const countriesToDisplay = useMemo(() => {
        const generated = Object.keys(generatedImages);
        return [...new Set([...DEFAULT_TARGET_COUNTRIES, ...generated])];
    }, [generatedImages]);
    
    // Filter out the origin country from the list of selectable target countries
    const availableCountriesForGeneration = useMemo(() => {
        return COUNTRIES.filter(country => country.name !== originCountry);
    }, [originCountry]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) { // 4MB limit
            setError("Image size should not exceed 4MB.");
            return;
        }
        
        event.target.value = ''; // Allow re-uploading the same file
        setUploadedImageFile(file);
        setGeneratedImages({}); // Reset on new image
        generateInitialImages(file);
    };

    const runGeneration = useCallback(async (imageFile: File, targetCountry: string) => {
        try {
            const url = await generateImage(imageFile, originCountry, targetCountry);
            return { country: targetCountry, status: 'done' as const, url };
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            console.error(`Generation failed for ${targetCountry}:`, err);
            return { country: targetCountry, status: 'error' as const, error: errorMessage };
        }
    }, [originCountry]);

    const generateInitialImages = useCallback(async (imageFile: File) => {
        setIsGenerating(true);
        setError(null);

        const initialLoadingState: GeneratedImageMap = {};
        DEFAULT_TARGET_COUNTRIES.forEach(country => {
            initialLoadingState[country] = { status: 'loading' };
        });
        setGeneratedImages(initialLoadingState);

        const promises = DEFAULT_TARGET_COUNTRIES.map(country => runGeneration(imageFile, country));
        const results = await Promise.all(promises);

        setGeneratedImages(prevState => {
            const newState = { ...prevState };
            let firstError: string | null = null;
            results.forEach(res => {
                newState[res.country] = res.status === 'done' 
                    ? { status: 'done', url: res.url } 
                    : { status: 'error', error: res.error };
                if (res.status === 'error' && !firstError) {
                    firstError = `Generation failed for ${res.country}. Please try again.`;
                }
            });
            if (firstError) setError(firstError);
            return newState;
        });

        setIsGenerating(false);
    }, [runGeneration]);

    const handleCountryClick = useCallback(async (targetCountry: string) => {
        if (!uploadedImageFile || isGenerating || generatedImages[targetCountry]?.status === 'loading') return;

        setIsGenerating(true);
        setError(null);
        setGeneratedImages(prev => ({ ...prev, [targetCountry]: { status: 'loading' } }));
        const result = await runGeneration(uploadedImageFile, targetCountry);
        setGeneratedImages(prev => ({ ...prev, [targetCountry]: result }));
        if (result.status === 'error') setError(result.error);
        setIsGenerating(false);
    }, [uploadedImageFile, isGenerating, generatedImages, runGeneration]);

    return (
        <>
            <ErrorToast message={error} onDismiss={() => setError(null)} />
            <div className="text-center py-10 sm:py-16">
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
                    See Yourself in a <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">New World</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Upload a selfie and our AI will create your portrait in different corners of the globe and beyond.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <UploadPanel
                    originCountry={originCountry}
                    setOriginCountry={setOriginCountry}
                    uploadedImage={uploadedImageFile}
                    onImageUpload={handleImageUpload}
                />
                
                <Gallery
                    uploadedImage={uploadedImageFile}
                    isGenerating={isGenerating}
                    generatedImages={generatedImages}
                    countriesToDisplay={countriesToDisplay}
                    availableCountries={availableCountriesForGeneration}
                    onCountryClick={handleCountryClick}
                />
            </div>
        </>
    );
}

export default HomePage;