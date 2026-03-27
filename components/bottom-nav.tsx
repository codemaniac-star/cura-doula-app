'use client';

import { Home, Search, Calendar, MessageSquare, User, Plus, Users } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import type { Screen } from '@/lib/types';

const motherNavItems: { icon: React.ElementType; label: string; screen: Screen }[] = [
  { icon: Home, label: 'Home', screen: 'home' },
  { icon: Search, label: 'Search', screen: 'search' },
  { icon: Calendar, label: 'Calendar', screen: 'booking' },
  { icon: MessageSquare, label: 'Community', screen: 'community' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

const doulaNavItems: { icon: React.ElementType; label: string; screen: Screen }[] = [
  { icon: Home, label: 'Dashboard', screen: 'doula-home' },
  { icon: Calendar, label: 'Calendar', screen: 'booking' },
  { icon: Users, label: 'Clients', screen: 'search' },
  { icon: User, label: 'Profile', screen: 'profile' },
];

export function BottomNav() {
  const { currentScreen, setCurrentScreen, user } = useApp();

  // Don't show nav on certain screens
  const hiddenScreens: Screen[] = ['splash', 'onboarding', 'login', 'role-selection', 'due-date', 'location', 'budget', 'preferences', 'doula-profile', 'booking', 'payment-success', 'chat'];
  if (hiddenScreens.includes(currentScreen)) {
    return null;
  }

  const isDoula = user?.role === 'doula';
  const navItems = isDoula ? doulaNavItems : motherNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen || 
            (item.screen === 'search' && currentScreen === 'library') ||
            (item.screen === 'home' && currentScreen === 'home') ||
            (item.screen === 'doula-home' && currentScreen === 'doula-home');
          
          // Center FAB button
          if (index === 2) {
            return (
              <div key={item.label} className="relative -mt-6">
                <button
                  onClick={() => setCurrentScreen(item.screen)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg"
                >
                  <Plus className="h-6 w-6 text-white" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-2 h-1 w-6 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
