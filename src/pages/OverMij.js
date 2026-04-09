import React from "react";
import AgeCounter from "../components/AgeCounter";
import ImageSlider from "../components/ImageSlider";
import { useTranslation } from "../translations";
import { useLanguage } from "../contexts/LanguageContext";

const OverMij = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const imagesNL = [
    "/logo.gif",
    "/pfp-dark.jpg",
    "https://sautqtvgrek5crhl.public.blob.vercel-storage.com/pics-of-me/IMG_4896.jpg"
  ];

  const imagesEN = [
    "/pfp.jpg",
    "/logo.gif",
    "/pfp-dark.jpg",
    // Add English specific images here
  ];

  const images = language === "nl" ? imagesNL : imagesEN;

  return (
    <section className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-10 md:py-16 flex flex-col items-center">
      <h1 className="page-heading font-bold text-black font-dancing-script text-center">
        {t("about.title")}
      </h1>

      <ImageSlider images={images} />

      <div className="panel-surface p-6 md:p-8 max-w-3xl">
        <p className="text-center text-lg text-neutral-700 leading-relaxed">
          {t("about.content")}
          <AgeCounter />
          {t("about.ageText")}
          <br />
          <br />
          {t("about.restOfContent")}
        </p>
      </div>
    </section>
  );
};

export default OverMij;
