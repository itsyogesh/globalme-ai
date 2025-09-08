import React, { useState } from 'react';
import Header from './components/Header';
import AuthModal from './components/auth/AuthModal';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

export default function App() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 md:p-8">
               <div 
                    className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 dark:from-indigo-900/[.15] dark:via-purple-900/[.15] dark:to-slate-900/[.15] opacity-50 dark:opacity-100"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' }}
                ></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <Header onLoginClick={() => setIsAuthModalOpen(true)} />
                    <main className="mt-8">
                        {/* Simple router can go here in the future */}
                        <HomePage />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}