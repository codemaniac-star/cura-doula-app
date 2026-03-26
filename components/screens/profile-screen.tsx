'use client';

import { Settings, ChevronRight, Heart, Calendar, FileText, CreditCard, Bell, Shield, HelpCircle, LogOut, Star, Users } from 'lucide-react';
import { useApp } from '@/lib/app-context';

const menuItems = [
  { icon: Heart, label: 'Saved Doulas', badge: '3' },
  { icon: Calendar, label: 'My Appointments' },
  { icon: FileText, label: 'Medical Records' },
  { icon: CreditCard, label: 'Payment History' },
  { icon: Bell, label: 'Notifications', toggle: true },
  { icon: Shield, label: 'Privacy & Security' },
  { icon: HelpCircle, label: 'Help & Support' },
];

export function ProfileScreen() {
  const { user, setCurrentScreen } = useApp();

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#7C3AED] to-[#E34275] px-6 pb-20 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Settings className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative mx-6 -mt-14 rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src={user?.image || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{user?.name || 'Sarah'} Johnson</h2>
            <p className="text-muted-foreground">Nairobi, Kenya</p>
            <div className="mt-1 flex items-center gap-1">
              <span className="rounded-full bg-[#EDE9FE] px-2 py-0.5 text-xs font-medium text-secondary">
                Trimester {user?.trimester || 3}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.daysUntilDue || 32} days to go
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center rounded-xl bg-muted p-3">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="mt-1 text-lg font-bold text-foreground">4</span>
            <span className="text-xs text-muted-foreground">Reviews</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-muted p-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="mt-1 text-lg font-bold text-foreground">8</span>
            <span className="text-xs text-muted-foreground">Sessions</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-muted p-3">
            <Users className="h-5 w-5 text-secondary" />
            <span className="mt-1 text-lg font-bold text-foreground">2</span>
            <span className="text-xs text-muted-foreground">Doulas</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 flex-1 px-6">
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-4 px-4 py-4 transition-colors hover:bg-muted ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
                {item.toggle ? (
                  <div className="h-6 w-11 rounded-full bg-primary p-0.5">
                    <div className="h-5 w-5 translate-x-5 rounded-full bg-white shadow-sm" />
                  </div>
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={() => setCurrentScreen('splash')}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-4 text-red-500"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      <div className="h-20" />
    </div>
  );
}
