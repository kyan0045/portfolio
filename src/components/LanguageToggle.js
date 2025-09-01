import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // URL mapping from current language to target language
  const getUrlMapping = (currentLang, targetLang) => {
    const mappings = {
      "nl-to-en": {
        "/over-mij": "/about-me",
        "/muziek": "/music",
        "/bibliotheek": "/library",
        "/fotos": "/photos",
        "/portfolio": "/portfolio",
      },
      "en-to-nl": {
        "/about-me": "/over-mij",
        "/music": "/muziek",
        "/library": "/bibliotheek",
        "/photos": "/fotos",
        "/portfolio": "/portfolio",
      },
    };
    return mappings[`${currentLang}-to-${targetLang}`] || {};
  };

  const toggleLanguage = () => {
    const currentLanguage = language;
    const newLanguage = language === "nl" ? "en" : "nl";
    setLanguage(newLanguage);

    const currentPath = location.pathname;
    
    // Handle root path or paths without language prefix
    if (currentPath === "/" || (!currentPath.startsWith("/nl") && !currentPath.startsWith("/en"))) {
      const defaultPath = newLanguage === "nl" ? "/over-mij" : "/about-me";
      navigate(`/${newLanguage}${defaultPath}`);
      return;
    }
    
    const pathWithoutLang = currentPath.replace(/^\/(nl|en)/, "") || (newLanguage === "nl" ? "/over-mij" : "/about-me");
    
    // Get the appropriate URL mapping based on current and target language
    const urlMapping = getUrlMapping(currentLanguage, newLanguage);
    const mappedPath = urlMapping[pathWithoutLang] || pathWithoutLang;
    
    navigate(`/${newLanguage}${mappedPath}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-50 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-neutral-200 group"
      title={
        language === "nl" ? "Switch to English" : "Schakel naar Nederlands"
      }
    >
      {language === "nl" ? (
        <img
          src="/flag-uk.png"
          alt="UK Flag"
          className="inline-block align-middle"
          style={{ height: "2.25em", width: "auto", verticalAlign: "middle" }}
        />
      ) : (
        <img
          src="/flag-nl.png"
          alt="Dutch Flag"
          className="inline-block align-middle"
          style={{ height: "2.25em", width: "auto", verticalAlign: "middle" }}
        />
      )}
    </button>
  );
};

export default LanguageToggle;
