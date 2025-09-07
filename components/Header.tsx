import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <header className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">GlobalMe</span>
                <span className="text-slate-500">AI</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                {user ? (
                    <div className="flex items-center gap-4">
                         <span className="text-sm font-medium text-slate-500 hidden sm:block">Credits: {user.credits}</span>
                         <button onClick={logout} className="px-4 py-2 text-sm font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors">
                            Log Out
                        </button>
                    </div>
                ) : (
                    <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold bg-slate-700 text-white hover:bg-slate-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-full transition-colors">
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;