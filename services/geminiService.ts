import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Initialize the Gemini AI model.
// The API key is automatically provided by the environment.
// FIX: Removed 'as string' type assertion for API key, as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

/**
 * Generates an image using the Gemini API based on a user's photo and prompts.
 * @param originalImageFile The user's uploaded selfie.
 * @param originCountry The user's country of origin.
 * @param targetCountry The country to reimagine the user in.
 * @returns A promise that resolves with the base64 URL of the generated image.
 */
export const generateImage = async (
    originalImageFile: File,
    originCountry: string,
    targetCountry: string
): Promise<string> => {
    try {
        const base64Data = await fileToBase64(originalImageFile);
        const mimeType = originalImageFile.type;

        const prompt = `A high-quality, realistic portrait photo. The person in the provided image, who is from ${originCountry}, is reimagined as being from ${targetCountry}. Retain their core facial structure, expression, and essence, but adapt their perceived ethnicity, skin tone, and typical hairstyle to plausibly match the new heritage. The background should be a neutral, soft-focus studio setting.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Data,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        // FIX: Refactored image data extraction to be more robust for multi-part responses.
        // It now iterates through response parts to find image data and provides better error details if an image isn't returned.
        let generatedBase64Data: string | undefined;
        let generatedMimeType: string | undefined;
        let refusalText = "";

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    generatedBase64Data = part.inlineData.data;
                    generatedMimeType = part.inlineData.mimeType;
                    break; 
                } else if (part.text) {
                    // Capture text part in case it's a refusal message
                    refusalText = part.text;
                }
            }
        }

        if (!generatedBase64Data || !generatedMimeType) {
             const baseError = "The AI model did not return an image. This can happen due to its safety filters or if the request was unclear.";
             throw new Error(refusalText ? `${baseError} Model response: "${refusalText}"` : baseError);
        }

        return `data:${generatedMimeType};base64,${generatedBase64Data}`;
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Re-throw a more user-friendly error
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image generation.");
    }
};
