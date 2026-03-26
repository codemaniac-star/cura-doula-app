'use client';

import { useState } from 'react';
import { ArrowRight, ChevronLeft, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

export function LocationScreen() {
  const { setCurrentScreen, updateOnboardingData } = useApp();
  const [location, setLocation] = useState('Nairobi, Kenya');

  const handleContinue = () => {
    updateOnboardingData({ location });
    setCurrentScreen('budget');
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setCurrentScreen('due-date')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <span className="text-sm text-muted-foreground">STEP 2 OF 5</span>
        <button
          onClick={() => setCurrentScreen('budget')}
          className="text-sm font-semibold text-primary"
        >
          Skip
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1 px-6">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <h1 className="text-3xl font-bold text-foreground">
          Where are you located?
        </h1>
        <p className="mt-2 text-lg text-primary">
          {"We'll match you with doulas near you."}
        </p>

        {/* Map Placeholder */}
        <div className="mt-6 h-[300px] rounded-2xl bg-[#E8F4E8] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7]">
            {/* Simple map representation */}
            <div className="absolute inset-0 opacity-30">
              <div className="h-full w-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50' stroke='%23666' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px',
              }} />
            </div>
            {/* Pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="flex flex-col items-center">
                <MapPin className="h-10 w-10 text-primary" fill="#E34275" />
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE7EF]">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Your Location</p>
                <p className="font-semibold text-foreground">{location}</p>
              </div>
              <button className="text-sm font-semibold text-primary">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your location is only used to find providers in your area and calculate travel fees.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={handleContinue}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
        >
          Next Step
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
