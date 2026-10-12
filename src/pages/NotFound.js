import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../translations";
import { useLanguage } from "../contexts/LanguageContext";

const NotFound = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const homePath = language === "en" ? "/en/about-me" : "/nl/over-mij";

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = `${t("notfound.title")} | Kyan Bosman`;

    let meta = document.querySelector('meta[name="robots"]');
    let created = false;
    let previousContent = null;
    if (meta) {
      previousContent = meta.getAttribute("content");
      meta.setAttribute("content", "noindex");
    } else {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      meta.setAttribute("content", "noindex");
      document.head.appendChild(meta);
      created = true;
    }

    return () => {
      document.title = previousTitle;
      if (created) {
        meta.remove();
      } else if (previousContent !== null) {
        meta.setAttribute("content", previousContent);
      }
    };
  }, [t]);

  return (
    <section className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-10 md:py-16 flex flex-col items-center text-center">
      <h1 className="page-heading font-bold text-black font-dancing-script">
        {t("notfound.title")}
      </h1>
      <div className="panel-surface p-6 md:p-8 max-w-3xl w-full">
        <p className="text-6xl font-bold text-black mb-4" aria-hidden="true">
          404
        </p>
        <p className="text-lg text-neutral-700 leading-relaxed mb-6">
          {t("notfound.text")}
        </p>
        <Link
          to={homePath}
          className="inline-block bg-accent text-white font-semibold px-7 py-3 rounded-full hover:scale-105 transition-transform duration-300"
        >
          {t("notfound.home")}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
