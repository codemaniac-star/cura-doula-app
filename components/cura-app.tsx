'use client';

import { useApp } from '@/lib/app-context';
import { SplashScreen } from './screens/splash-screen';
import { OnboardingScreen } from './screens/onboarding-screen';
import { LoginScreen } from './screens/login-screen';
import { RoleSelectionScreen } from './screens/role-selection-screen';
import { DueDateScreen } from './screens/due-date-screen';
import { LocationScreen } from './screens/location-screen';
import { BudgetScreen } from './screens/budget-screen';
import { PreferencesScreen } from './screens/preferences-screen';
import { HomeScreen } from './screens/home-screen';
import { DoulaHomeScreen } from './screens/doula-home-screen';
import { SearchScreen } from './screens/search-screen';
import { DoulaProfileScreen } from './screens/doula-profile-screen';
import { BookingScreen } from './screens/booking-screen';
import { PaymentSuccessScreen } from './screens/payment-success-screen';
import { CommunityScreen } from './screens/community-screen';
import { ChatScreen } from './screens/chat-screen';
import { ProfileScreen } from './screens/profile-screen';
import { LibraryScreen } from './screens/library-screen';
import { BottomNav } from './bottom-nav';

export function CuraApp() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'role-selection':
        return <RoleSelectionScreen />;
      case 'due-date':
        return <DueDateScreen />;
      case 'location':
        return <LocationScreen />;
      case 'budget':
        return <BudgetScreen />;
      case 'preferences':
        return <PreferencesScreen />;
      case 'home':
        return <HomeScreen />;
      case 'doula-home':
        return <DoulaHomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'doula-profile':
        return <DoulaProfileScreen />;
      case 'booking':
        return <BookingScreen />;
      case 'payment-success':
        return <PaymentSuccessScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'library':
        return <LibraryScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="h-full overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      <BottomNav />
    </div>
  );
}
