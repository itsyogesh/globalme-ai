import React from 'react';
import { Github, Twitter, CodeXml } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full mt-16 py-6 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>
                    Built with 🍌 by{' '}
                    <a 
                        href="https://github.com/itsyogesh" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                        itsyogesh
                    </a>
                </p>
                <div className="flex items-center gap-6">
                    <a 
                        href="https://x.com/itsyogesh18" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Yogesh's Twitter profile"
                        className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                        href="https://github.com/itsyogesh" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Yogesh's GitHub profile"
                        className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a 
                        href="https://github.com/itsyogesh/globalme-ai" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Project source code on GitHub"
                        className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    >
                        <CodeXml className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
