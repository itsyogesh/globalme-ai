import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAuth } from '../../hooks/useAuth';
import { GoogleIcon } from '../icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthMode = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, signup, googleSignIn, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            onClose(); // Close modal on successful auth
        } catch (error) {
            console.error("Auth error:", error);
            // Here you would set an error state to display to the user
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? "Welcome Back" : "Create Account"}>
            <div className="flex mb-6 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                <button
                    onClick={() => setMode('login')}
                    className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${mode === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setMode('signup')}
                    className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                    Sign Up
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" disabled={loading} className="w-full p-3 font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
                </button>
            </form>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">OR</span>
                </div>
            </div>
            <button onClick={googleSignIn} disabled={loading} className="w-full flex justify-center items-center gap-3 p-3 font-semibold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50">
                <GoogleIcon />
                Sign in with Google
            </button>
        </Modal>
    );
};

export default AuthModal;
