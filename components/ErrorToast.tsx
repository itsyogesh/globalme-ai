
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorToastProps {
    message: string | null;
    onDismiss: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, onDismiss }) => {
    if (!message) return null;

    return (
        <div className="fixed top-5 right-5 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 flex items-center animate-fade-in-down">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-4 text-white font-bold">&times;</button>
        </div>
    );
};

export default ErrorToast;