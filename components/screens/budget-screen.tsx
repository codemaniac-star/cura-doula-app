'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Wallet, Square, Diamond, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

const budgetTiers = [
  { id: 'subsidized', label: 'Subsidized', amount: '~10k', icon: Wallet },
  { id: 'moderate', label: 'Moderate', amount: '~50k', icon: Square },
  { id: 'full', label: 'Full Rate', amount: '~90k+', icon: Diamond },
];

export function BudgetScreen() {
  const { setCurrentScreen, updateOnboardingData } = useApp();
  const [budget, setBudget] = useState(50000);
  const [selectedTier, setSelectedTier] = useState('moderate');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBudget(value);
    if (value <= 20000) setSelectedTier('subsidized');
    else if (value <= 70000) setSelectedTier('moderate');
    else setSelectedTier('full');
  };

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    if (tier === 'subsidized') setBudget(10000);
    else if (tier === 'moderate') setBudget(50000);
    else setBudget(90000);
  };

  const handleContinue = () => {
    updateOnboardingData({ budget });
    setCurrentScreen('preferences');
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setCurrentScreen('location')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <span className="font-semibold text-foreground">Budget</span>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="text-center">
        <span className="text-sm font-semibold text-primary">STEP 3 OF 5</span>
      </div>
      <div className="mt-2 flex gap-1 px-6">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            What is your budget
          </h1>
          <h1 className="text-2xl font-bold text-foreground">
            per session?
          </h1>
          <p className="mt-2 text-muted-foreground">
            Set your preferred range to find the perfect doula.
          </p>
        </div>

        {/* Budget Display */}
        <div className="mt-10 text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-lg text-muted-foreground">KES</span>
            <span className="ml-2 text-5xl font-bold text-foreground">
              {budget.toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">per session</p>
        </div>

        {/* Slider */}
        <div className="mt-8 px-2">
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={budget}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #E34275 0%, #E34275 ${budget / 1000}%, #E2E8F0 ${budget / 1000}%, #E2E8F0 100%)`,
            }}
          />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>KES 0</span>
            <span>KES 100k+</span>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {budgetTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <button
                key={tier.id}
                onClick={() => handleTierSelect(tier.id)}
                className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                  selectedTier === tier.id
                    ? 'border-primary bg-[#FCE7EF]'
                    : 'border-border bg-white'
                }`}
              >
                <Icon className={`h-6 w-6 ${selectedTier === tier.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`mt-2 font-semibold ${selectedTier === tier.id ? 'text-primary' : 'text-foreground'}`}>
                  {tier.label}
                </span>
                <span className={`text-sm ${selectedTier === tier.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tier.amount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#FCE7EF] p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-foreground">
              Most mothers qualify for <span className="font-semibold">50-75% subsidy</span>.
            </p>
            <button className="mt-1 flex items-center text-primary font-semibold">
              Check Eligibility
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
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
