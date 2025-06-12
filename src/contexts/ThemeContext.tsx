import React, { createContext, useState, useMemo, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const preferDarkQuery = '(prefers-color-scheme: dark)';
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPreference = window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light';

    const [theme, setTheme] = useState<Theme>(storedTheme || systemPreference);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

     useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme); 
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const handleChange = () => {
            if (!localStorage.getItem('theme')) {
                setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);


    const value = useMemo(() => ({
        theme,
        toggleTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};