// Multilingual Context Provider (NL / EN / FR)
// Fallback: If translation is missing, use default language (NL). Never generate on page load.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../data/translations';
import { store } from '../db/store';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (contentId: string, field: 'title' | 'subtitle' | 'shortDesc' | 'longDesc' | 'seoTitle' | 'seoDesc') => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('maison_milau_lang');
    if (saved === 'en' || saved === 'fr') return saved;
    return 'nl';
  });

  const [translations, setTranslations] = useState(store.getState().translations);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTranslations(store.getState().translations);
    });
    return unsubscribe;
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('maison_milau_lang', lang);
  };

  const t = (
    contentId: string,
    field: 'title' | 'subtitle' | 'shortDesc' | 'longDesc' | 'seoTitle' | 'seoDesc'
  ): string => {
    const item = translations[contentId];
    if (!item) return '';
    const langObj = item[language];
    if (langObj && langObj[field]) {
      return langObj[field] as string;
    }
    // Fallback to default (NL)
    return (item.nl[field] as string) || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
