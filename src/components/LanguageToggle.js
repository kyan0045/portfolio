import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLanguage = language === "nl" ? "en" : "nl";
    setLanguage(newLanguage);

    const currentPath = location.pathname;
    const pathWithoutLang =
      currentPath.replace(/^\/(nl|en)/, "") || "/over-mij";
    navigate(`/${newLanguage}${pathWithoutLang}`);
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
