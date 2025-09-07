import React from 'react';
import type { Country, GeneratedImage } from '../types';
import { Download, RefreshCw, AlertTriangle } from 'lucide-react';

interface ImageCardProps {
    country: Country;
    generatedImage: GeneratedImage;
    onRegenerate: (countryName: string) => void;
    isGenerating: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ country, generatedImage, onRegenerate, isGenerating }) => {
    
    const handleDownload = () => {
        if (generatedImage.url) {
            const link = document.createElement('a');
            link.href = generatedImage.url;
            link.download = `GlobalMe_AI_${country.name.replace(/\s/g, '_')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const cardContent = () => {
        switch (generatedImage.status) {
            case 'loading':
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Generating...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-red-100 dark:bg-red-900/20 p-4 text-center">
                        <AlertTriangle className="w-10 h-10 text-red-500 mb-2" />
                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Generation Failed</p>
                        <p className="text-xs text-red-600 dark:text-red-500 mt-1 line-clamp-2" title={generatedImage.error}>{generatedImage.error}</p>
                    </div>
                );
            case 'done':
                return (
                    <img src={generatedImage.url} alt={`Generated image for ${country.name}`} className="w-full h-full object-cover" />
                );
            default:
                return null;
        }
    };

    const canRegenerate = !isGenerating && (generatedImage.status === 'error' || generatedImage.status === 'done');

    return (
        <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group">
            {cardContent()}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                 {generatedImage.status === 'done' && (
                    <button
                        onClick={handleDownload}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors"
                        title="Download Image"
                    >
                        <Download className="w-6 h-6" />
                    </button>
                )}
                 {(generatedImage.status === 'done' || generatedImage.status === 'error') && (
                    <button
                        onClick={() => onRegenerate(country.name)}
                        disabled={!canRegenerate}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Regenerate Image"
                    >
                        <RefreshCw className="w-6 h-6" />
                    </button>
                 )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-lg font-bold text-white shadow-black/50 [text-shadow:0_1px_3px_var(--tw-shadow-color)]">{country.emoji} {country.name}</h3>
            </div>
        </div>
    );
};

export default ImageCard;