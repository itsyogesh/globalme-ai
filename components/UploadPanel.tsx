import React from 'react';
import { COUNTRIES } from '../constants';
import { UploadCloud } from 'lucide-react';

interface UploadPanelProps {
    originCountry: string;
    setOriginCountry: (country: string) => void;
    uploadedImage: File | null;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ originCountry, setOriginCountry, uploadedImage, onImageUpload }) => {
    const uploadedImageUrl = uploadedImage ? URL.createObjectURL(uploadedImage) : null;

    return (
        <div className="lg:col-span-1 space-y-8">
             <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
                <h2 className="text-2xl font-bold mb-2">1. Your Details</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-4">Select your country and upload a clear selfie.</p>
                <label htmlFor="country-select" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">I am from...</label>
                <select
                    id="country-select"
                    value={originCountry}
                    onChange={(e) => setOriginCountry(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-700 p-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                </select>
            </div>

             <div className="p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 dark:border-slate-700/50">
                {uploadedImage && uploadedImageUrl ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Your Selfie</h2>
                        <div className="aspect-square w-full rounded-xl overflow-hidden ring-2 ring-indigo-500/50">
                            <img src={uploadedImageUrl} alt="User upload" className="w-full h-full object-cover" />
                        </div>
                        <label htmlFor="image-upload" className="w-full text-center cursor-pointer block bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold py-3 px-4 rounded-lg transition-colors">
                            Upload a different photo
                        </label>
                        <input type="file" id="image-upload" accept="image/png, image/jpeg" className="hidden" onChange={onImageUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
                        <UploadCloud className="h-16 w-16 text-slate-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Upload your Selfie</h2>
                        <label htmlFor="image-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-colors">
                            Choose File
                        </label>
                        <input type="file" id="image-upload" accept="image/png, image/jpeg" className="hidden" onChange={onImageUpload} />
                        <p className="text-slate-500 mt-2 text-sm">PNG or JPG, max 4MB.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPanel;