'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { Bn } from './bn';
import { En } from './en';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  strings: typeof Bn;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('spondon-lang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('spondon-lang', lang);
  };

  const strings = language === 'bn' ? Bn : En;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, strings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useStrings() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useStrings must be used within a LanguageProvider');
  }
  return context;
}
