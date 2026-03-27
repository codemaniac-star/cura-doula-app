'use client';

import { useState } from 'react';
import { X, Smile, Heart, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import type { UserRole } from '@/lib/types';

export function RoleSelectionScreen() {
  const { setCurrentScreen, updateOnboardingData } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleContinue = () => {
    if (selectedRole) {
      updateOnboardingData({ role: selectedRole });
      if (selectedRole === 'mother') {
        setCurrentScreen('due-date');
      } else {
        // Skip to home for doulas
        setCurrentScreen('home');
      }
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA] px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div />
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-4 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {"Let's get started"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose the role that describes you best.
        </p>
      </div>

      {/* Role Cards */}
      <div className="mt-10 flex flex-col gap-4">
        {/* Expectant Mother */}
        <button
          onClick={() => setSelectedRole('mother')}
          className={`flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all ${
            selectedRole === 'mother'
              ? 'ring-2 ring-primary shadow-md'
              : 'hover:shadow-md'
          }`}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FCE7EF]">
            <Smile className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            {"I'm an Expectant Mother"}
          </h3>
          <p className="mt-2 text-center text-muted-foreground">
            Track your pregnancy journey and find the support you need.
          </p>
        </button>

        {/* Doula */}
        <button
          onClick={() => setSelectedRole('doula')}
          className={`flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all ${
            selectedRole === 'doula'
              ? 'ring-2 ring-secondary shadow-md'
              : 'hover:shadow-md'
          }`}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EDE9FE]">
            <span className="relative">
              <Hand className="h-10 w-10 text-secondary" />
              <Heart className="absolute -top-1 -right-1 h-5 w-5 text-secondary" fill="currentColor" />
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            {"I'm a Doula"}
          </h3>
          <p className="mt-2 text-center text-muted-foreground">
            Connect with mothers and manage your professional care services.
          </p>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col items-center gap-4 pt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
        </Button>
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <button 
            onClick={() => setCurrentScreen('login')}
            className="font-semibold text-primary"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
