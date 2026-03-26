'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

const languages = ['English', 'Swahili', 'Kikuyu', 'French', 'Sign Language', 'Spanish'];

export function PreferencesScreen() {
  const { setCurrentScreen, updateOnboardingData, setUser } = useApp();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English', 'Swahili']);
  const [philosophy, setPhilosophy] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleContinue = () => {
    updateOnboardingData({
      languages: selectedLanguages,
      philosophy,
      specialRequests,
    });
    
    // Create user and go to home
    setUser({
      id: '1',
      name: 'Sarah',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'mother',
      trimester: 3,
      daysUntilDue: 32,
    });
    
    setCurrentScreen('home');
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setCurrentScreen('budget')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <span className="font-semibold text-foreground">Preferences</span>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-6">
        <span className="text-sm text-muted-foreground">Step 4 of 5</span>
        <span className="text-sm font-semibold text-primary">80%</span>
      </div>
      <div className="mt-2 flex gap-1 px-6">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-8">
        <h1 className="text-2xl font-bold text-foreground">
          {"Let's find your match"}
        </h1>

        {/* Languages */}
        <div className="mt-8">
          <h2 className="font-semibold text-foreground">Preferred Languages</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedLanguages.includes(lang)
                    ? 'bg-[#FCE7EF] text-primary'
                    : 'bg-muted text-foreground'
                }`}
              >
                {lang}
                {selectedLanguages.includes(lang) && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Birth Philosophy */}
        <div className="mt-8">
          <h2 className="font-semibold text-foreground">Birth Philosophy</h2>
          <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-4">
            <span className={philosophy ? 'text-foreground' : 'text-muted-foreground'}>
              {philosophy || 'Select a philosophy'}
            </span>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Special Requests */}
        <div className="mt-8">
          <h2 className="font-semibold text-foreground">Any special needs or requests?</h2>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g., I have mobility issues or specific dietary requirements..."
            className="mt-3 h-32 w-full resize-none rounded-xl border border-border bg-white p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
