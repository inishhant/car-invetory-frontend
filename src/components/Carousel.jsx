// components/Carousel.js
import { useState } from "react";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-192 h-64 overflow-hidden rounded-lg shadow-lg mx-auto bg-gray-900">
      {images.length > 0 && (
        <img
          src={images[currentIndex].image}
          alt={`Car Image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      )}
      <button
        onClick={prevImage}
        className="absolute left-0 top-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2 rounded-r-lg text-white"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-2 rounded-l-lg text-white"
      >
        &gt;
      </button>
    </div>
  );
}
