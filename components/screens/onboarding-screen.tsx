'use client';

import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=1000&fit=crop',
    title: 'Find Your Perfect',
    highlight: 'Doula Match',
    description: 'Connect with certified birth support professionals in minutes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1000&fit=crop',
    title: 'Personalized',
    highlight: 'Support Journey',
    description: 'Get matched based on your needs, location, and preferences.',
  },
  {
    image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&h=1000&fit=crop',
    title: 'Join Our',
    highlight: 'Community',
    description: 'Connect with other mothers and share your pregnancy journey.',
  },
];

export function OnboardingScreen() {
  const { setCurrentScreen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentScreen('role-selection');
    }
  };

  const handleSkip = () => {
    setCurrentScreen('role-selection');
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative flex h-full min-h-screen flex-col bg-background">
      {/* Image Section */}
      <div className="relative h-[55%] w-full overflow-hidden bg-[#8B4513]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ 
            backgroundImage: `url(${slide.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <button
          onClick={handleSkip}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col items-center justify-between rounded-t-3xl bg-white px-6 pb-8 pt-10 -mt-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-foreground">
            {slide.title}
          </h2>
          <h2 className="text-2xl font-bold text-primary">
            {slide.highlight}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-[280px]">
            {slide.description}
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2 my-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col gap-3">
          <Button
            onClick={handleContinue}
            className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <button
            onClick={handleSkip}
            className="py-2 text-muted-foreground hover:text-foreground"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
