import { AppProvider } from '@/lib/app-context';
import { CuraApp } from '@/components/cura-app';

export default function Page() {
  return (
    <main className="phone-desktop-bg flex min-h-screen flex-col items-center justify-center p-8">
      {/* Phone emulator shell */}
      <div className="phone-shell-wrapper">
      <div className="phone-shell">
        {/* Status bar notch */}
        <div className="phone-notch-bar">
          <span className="phone-time">9:41</span>
          <div className="phone-notch" />
          <div className="phone-status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="0.5"/><rect x="4.5" y="2" width="3" height="10" rx="0.5"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3"/></svg>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="currentColor"/><path d="M23 4.5v3a1.5 1.5 0 0 0 0-3z"/></svg>
          </div>
        </div>

        {/* App content */}
        <div className="phone-screen">
          <AppProvider>
            <CuraApp />
          </AppProvider>
        </div>

        {/* Home indicator */}
        <div className="phone-home-bar">
          <div className="phone-home-indicator" />
        </div>
      </div>
      </div>
    </main>
  );
}
