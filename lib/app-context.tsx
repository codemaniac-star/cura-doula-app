'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Screen, UserRole, User, Doula } from './types';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  selectedDoula: Doula | null;
  setSelectedDoula: (doula: Doula | null) => void;
  onboardingData: {
    role: UserRole;
    dueDate: Date | null;
    location: string;
    budget: number;
    languages: string[];
    philosophy: string;
    specialRequests: string;
  };
  updateOnboardingData: (data: Partial<AppContextType['onboardingData']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [selectedDoula, setSelectedDoula] = useState<Doula | null>(null);
  const [onboardingData, setOnboardingData] = useState({
    role: null as UserRole,
    dueDate: null as Date | null,
    location: '',
    budget: 50000,
    languages: [] as string[],
    philosophy: '',
    specialRequests: '',
  });

  const updateOnboardingData = (data: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        selectedDoula,
        setSelectedDoula,
        onboardingData,
        updateOnboardingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
