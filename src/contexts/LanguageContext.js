import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage first
    const savedLanguage = localStorage.getItem("portfolioLanguage");
    if (savedLanguage) {
      return savedLanguage;
    }
    // Fallback to browser language detection
    const browserLanguage = navigator.language || navigator.userLanguage;
    const isDutch = browserLanguage.toLowerCase().startsWith("nl");
    return isDutch ? "nl" : "en";
  });

  useEffect(() => {
    // Save language preference and update HTML lang attribute
    localStorage.setItem("portfolioLanguage", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "nl" ? "en" : "nl"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === "en",
    isDutch: language === "nl",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
