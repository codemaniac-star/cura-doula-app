import { AppProvider } from '@/lib/app-context';
import { CuraApp } from '@/components/cura-app';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <AppProvider>
        <CuraApp />
      </AppProvider>
    </main>
  );
}
