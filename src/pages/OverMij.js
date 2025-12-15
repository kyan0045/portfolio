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
    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-10 md:py-16 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-black font-dancing-script text-center">
        {t("about.title")}
      </h1>

      <ImageSlider images={images} />

      <p className="text-center text-lg max-w-2xl">
        {t("about.content")}
        <AgeCounter />
        {t("about.ageText")}
        <br />
        <br />
        {t("about.restOfContent")}
      </p>
    </div>
  );
};

export default OverMij;
