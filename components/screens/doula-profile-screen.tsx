'use client';

import { useState } from 'react';
import { ArrowLeft, Share, Heart, Star, MapPin, Calendar, Smile, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

const tabs = ['About', 'Services', 'Reviews', 'Availability'];

export function DoulaProfileScreen() {
  const { setCurrentScreen, selectedDoula } = useApp();
  const [activeTab, setActiveTab] = useState('About');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!selectedDoula) {
    return null;
  }

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header Image */}
      <div className="relative h-[280px] bg-[#FDF5F3]">
        <img
          src="https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=800&h=400&fit=crop"
          alt="Background"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute left-4 top-4">
          <button
            onClick={() => setCurrentScreen('search')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="absolute right-4 top-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm">
            <Share className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Match Badge */}
        <div className="absolute right-4 bottom-20">
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-primary shadow-lg">
            <Heart className="h-4 w-4" fill="currentColor" />
            {selectedDoula.matchPercentage}% MATCH
          </span>
        </div>

        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="h-28 w-28 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
            <img
              src={selectedDoula.image}
              alt={selectedDoula.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 text-center px-6">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">{selectedDoula.name}</h1>
          <span className="rounded-full bg-[#FCE7EF] px-2 py-0.5 text-xs font-semibold text-primary">
            {selectedDoula.certification}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{selectedDoula.location}</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1">
          <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
          <span className="font-semibold text-foreground">{selectedDoula.rating}</span>
          <span className="text-muted-foreground">({selectedDoula.reviews} reviews)</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-center gap-4 px-6">
        <div className="flex flex-col items-center rounded-2xl bg-muted p-4 w-24">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="mt-2 text-2xl font-bold text-foreground">{selectedDoula.experience}</span>
          <span className="text-xs text-muted-foreground">Years Exp.</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-muted p-4 w-24">
          <Smile className="h-6 w-6 text-secondary" />
          <span className="mt-2 text-2xl font-bold text-foreground">{selectedDoula.births}</span>
          <span className="text-xs text-muted-foreground">Births</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-muted p-4 w-24">
          <Zap className="h-6 w-6 text-green-500" />
          <span className="mt-2 text-2xl font-bold text-foreground">{selectedDoula.responseRate}%</span>
          <span className="text-xs text-muted-foreground">Response</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-border">
        <div className="flex px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeTab === 'About' && (
          <div>
            <h3 className="font-semibold text-foreground">About {selectedDoula.name.split(' ')[0]}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {selectedDoula.bio}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-foreground">Languages</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedDoula.languages.map((lang) => (
                  <span key={lang} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-foreground">Specialties</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedDoula.specialties.map((spec) => (
                  <span key={spec} className="rounded-full bg-[#FCE7EF] px-3 py-1 text-sm text-primary">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm text-muted-foreground line-through">
              KES {selectedDoula.price.toLocaleString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">
                KES {selectedDoula.subsidizedPrice.toLocaleString()}
              </span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                75% OFF
              </span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">SUBSIDIZED PRICE</span>
        </div>
        <Button
          onClick={() => setCurrentScreen('booking')}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Book Consultation
        </Button>
      </div>
    </div>
  );
}
