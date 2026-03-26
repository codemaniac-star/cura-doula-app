'use client';

import { ArrowLeft, SlidersHorizontal, Heart, Star, MessageSquare, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { mockDoulas } from '@/lib/mock-data';

export function SearchScreen() {
  const { setCurrentScreen, setSelectedDoula } = useApp();

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex h-10 w-10 items-center justify-center"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Doula Match Results</h1>
          <button className="flex h-10 w-10 items-center justify-center">
            <SlidersHorizontal className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col items-center bg-white px-6 pb-6 pt-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FCE7EF]">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">
          We found {mockDoulas.length} perfect
        </h2>
        <h2 className="text-xl font-bold text-foreground">matches for you!</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on your preferences and location.
        </p>
      </div>

      {/* Doula List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {mockDoulas.map((doula) => (
            <div
              key={doula.id}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={doula.image}
                    alt={doula.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  {doula.available && (
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{doula.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doula.experience} years exp • {doula.births} births
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      <Heart className="h-3 w-3" fill="currentColor" />
                      {doula.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-medium text-foreground">{doula.rating}</span>
                    <span className="text-sm text-muted-foreground">({doula.reviews} reviews)</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {doula.languages.map((lang) => (
                      <span key={lang} className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                        {lang}
                      </span>
                    ))}
                    {doula.specialties.slice(0, 1).map((spec) => (
                      <span key={spec} className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-4 rounded-xl bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground line-through">
                    KES {doula.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">
                    KES {doula.subsidizedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-600">after subsidy</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDoula(doula);
                    setCurrentScreen('doula-profile');
                  }}
                  className="flex-1 h-11 rounded-xl border-primary text-primary hover:bg-primary/10"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => setCurrentScreen('chat')}
                  className="flex-1 h-11 rounded-xl bg-primary text-white hover:bg-primary/90"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare Button */}
      <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          variant="outline"
          className="h-12 w-full rounded-full border-foreground bg-foreground text-white hover:bg-foreground/90"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Compare Selected
        </Button>
      </div>
    </div>
  );
}
