'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Array of hero images - you can replace these paths with your uploaded images
const heroImages = [
  {
    src: '/images/hero-teacher-1.jpg',
    alt: 'Happy teacher with students in classroom'
  },
  {
    src: '/images/hero-teacher-2.jpg', 
    alt: 'Teacher helping students with their work'
  },
  {
    src: '/images/hero-teacher-3.jpg',
    alt: 'Smiling teacher in classroom environment'
  }
];

// Fallback to current working image if local images aren't available yet
const fallbackImage = {
  src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=600&fit=crop&crop=faces',
  alt: 'Happy teacher with students in classroom'
};

export function RotatingHeroImage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if local images exist, otherwise use fallback
    const img = new window.Image();
    img.onload = () => setImageError(false);
    img.onerror = () => setImageError(true);
    img.src = heroImages[0].src;

    // Set up rotation timer (4 seconds per image)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = imageError ? fallbackImage : heroImages[currentImageIndex];

  return (
    <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
      <Image
        key={currentImageIndex} // Forces re-render for smooth transitions
        src={currentImage.src}
        alt={currentImage.alt}
        width={600}
        height={600}
        priority
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        onError={() => setImageError(true)}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Optional: Image indicators */}
      {!imageError && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}