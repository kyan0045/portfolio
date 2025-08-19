import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-40 h-40 mx-auto mb-8">
      {/* Image container */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-white">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white/70 rounded-full p-2 text-black hover:bg-white focus:outline-none shadow-md transition"
        aria-label="Previous image"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white/70 rounded-full p-2 text-black hover:bg-white focus:outline-none shadow-md transition"
        aria-label="Next image"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
