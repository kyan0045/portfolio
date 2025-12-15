import React, { useState, useEffect } from "react";
import { useTranslation } from "../translations";

// Helper function to correctly parse dd-mm-yyyy format
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const Fotos = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/content/gallery.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateB - dateA; // Sort descending (newest first)
        });
        setImages(sortedData);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Helper to format date for display
  const formatDate = (dateString) => {
    const date = parseDate(dateString);
    return date.toLocaleDateString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-24 pt-32 pb-10 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-black font-dancing-script text-center">
        {t("photos.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.url} // Use unique URL for the key
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="font-semibold">{image.location}</h3>
              <p className="text-sm">{formatDate(image.date)}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.description}
              className="object-contain rounded-lg max-h-[90vh] max-w-[90vw] w-auto h-auto mx-auto"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-b-lg">
              <h3 className="font-bold text-lg">{selectedImage.location}</h3>
              <p className="text-sm mb-2">{formatDate(selectedImage.date)}</p>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fotos;
