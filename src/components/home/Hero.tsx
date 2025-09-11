'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: '/images/hero/teacher-sarah.jpg',
    alt: 'Sarah Johnson teaching in her elementary classroom',
    name: 'Sarah Johnson',
    role: 'Elementary Teacher',
    testimonial: 'Saved 6 hours per week with AI lesson planning'
  },
  {
    id: 2,
    image: '/images/hero/teacher-ms-kim.jpg',
    alt: 'Ms. Kim explaining math concepts to high school students',
    name: 'Ms. Kim',
    role: 'High School Math Teacher',
    testimonial: 'Student feedback that used to take hours now takes minutes'
  },
  {
    id: 3,
    image: '/images/hero/teacher-mr-harris.jpg',
    alt: 'Mr. Harris conducting a science experiment with middle school students',
    name: 'Mr. Harris',
    role: 'Middle School Science Teacher',
    testimonial: 'Parents love the thoughtful, personalized communication'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={index === 0} // Only preload first image
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
            quality={85}
            onLoad={() => index === 0 && setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Save 5+ Hours Every Week
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl">
                AI help for lesson planning, grading, and parent communication—built for K-12 teachers.
              </p>
            </div>

            {/* CTA Buttons - Primary, Secondary, Tertiary */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="https://teach.zazatechnologies.com"
                className="bg-white text-purple-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg text-center"
              >
                Start Free Trial
              </a>
              <button
                className="border-2 border-white text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center"
                onClick={() => {
                  // Scroll to demo section
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
            
            {/* Tertiary Link */}
            <div className="mb-8">
              <a
                href="/en/resources"
                className="text-purple-200 hover:text-white transition-colors underline underline-offset-4"
              >
                View Resources →
              </a>
            </div>

            {/* Trust Line */}
            <div className="text-purple-200 text-sm">
              Trusted by 10,000+ teachers
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mt-8">
              <blockquote className="text-lg italic mb-4">
                "{heroSlides[currentSlide].testimonial}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">
                    {heroSlides[currentSlide].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{heroSlides[currentSlide].name}</div>
                  <div className="text-purple-200">{heroSlides[currentSlide].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Teacher Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].alt}
                fill
                className="object-cover object-center transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Manual only, no auto-advance */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}