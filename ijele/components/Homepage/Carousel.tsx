"use client";

import React, { useEffect, useRef } from 'react';

const images = [
  '/Images/Banff.jpg',
  '/Images/cathedral.jpg',
  '/Images/japan.jpg',
  '/Images/russia.jpg',
  '/Images/paris.jpg',
  '/Images/NY.jpg',
  // Add more images as needed
];

const AutoScrollCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = carouselRef.current;
        const isEnd = scrollLeft + offsetWidth >= scrollWidth;

        carouselRef.current.scrollBy({ left: offsetWidth, behavior: 'smooth' });

        if (isEnd) {
          setTimeout(() => {
            carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
          }, 500); // Adjust delay to match the transition duration
        }
      }
    }, 3000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
        {images.concat(images).map((src, index) => (
          <div key={index} className="relative flex-shrink-0 w-full snap-center">
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex items-center justify-center text-black font-junge text-2xl font-bold">
              Travel the World
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
