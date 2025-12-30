
import React, { useEffect, useRef, useState } from 'react';
import { SectionData } from '../types';

const InfoSection: React.FC<SectionData> = ({ title, description, subDescription, images }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      ref={sectionRef}
      className="reveal py-24 md:py-32 flex flex-col md:flex-row items-center gap-12 md:gap-24 max-w-7xl mx-auto px-6"
    >
      {/* Left side: Content */}
      <div className="flex-1 space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 whitespace-pre-line">
          {title}
        </h2>
        <div className="space-y-4">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal whitespace-pre-line">
            {description}
            {subDescription && `\n\n${subDescription}`}
          </p>
        </div>
      </div>

      {/* Right side: Mobile Device Frame with Slider */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="relative w-full aspect-[9/19] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-gray-800">
          {/* Speaker/Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
          
          {/* Inner Screen */}
          <div className="relative w-full h-full overflow-hidden rounded-[2.2rem] bg-gray-100">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${title} capture ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          {/* Navigation Overlay */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all z-30 border border-gray-100"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={nextImage}
                className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all z-30 border border-gray-100"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
        </div>

        {/* Paging Dots */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'bg-[#004a99] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
