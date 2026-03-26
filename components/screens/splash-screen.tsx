'use client';

import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export function SplashScreen() {
  const { setCurrentScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setCurrentScreen]);

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#7C3AED] via-[#9F5AE5] to-[#E34275]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Heart className="h-12 w-12 text-white/80" fill="currentColor" />
        </div>
        <h1 className="text-5xl font-semibold tracking-tight text-white">Cura</h1>
        <p className="text-sm font-medium tracking-widest text-white/70 uppercase">
          Your Birth, Your Support
        </p>
      </div>
      <div className="absolute bottom-20 flex gap-2">
        <div className="h-2 w-2 rounded-full bg-white/40" />
        <div className="h-2 w-2 rounded-full bg-white/40" />
        <div className="h-2 w-2 rounded-full bg-white/40" />
      </div>
    </div>
  );
}
