'use client';

import { Bell, Search, Calendar, BookOpen, Users, MessageSquare, Phone, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { mockDoulas, quickActions } from '@/lib/mock-data';

export function HomeScreen() {
  const { setCurrentScreen, setSelectedDoula, user } = useApp();
  const assignedDoula = mockDoulas[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'search': return Search;
      case 'calendar': return Calendar;
      case 'book': return BookOpen;
      case 'users': return Users;
      default: return Search;
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-6 pb-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tuesday, Oct 24</p>
            <h1 className="text-2xl font-bold text-foreground">
              Hello, {user?.name || 'Sarah'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="h-6 w-6 text-foreground" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#F97316]">
              <img
                src={user?.image || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Pregnancy Tracker Card */}
        <div className="rounded-2xl bg-gradient-to-r from-[#EDE9FE] to-[#F3E8FF] p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">
                Trimester {user?.trimester || 3}
              </span>
              <div className="mt-3">
                <span className="text-4xl font-bold text-foreground">{user?.daysUntilDue || 32}</span>
                <span className="ml-2 text-lg text-muted-foreground">days</span>
              </div>
              <p className="text-muted-foreground">Until your due date</p>
            </div>
            <div className="relative h-24 w-24">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="50"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Doula Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your Doula</h2>
            <button 
              onClick={() => {
                setSelectedDoula(assignedDoula);
                setCurrentScreen('doula-profile');
              }}
              className="text-sm font-semibold text-secondary"
            >
              View Profile
            </button>
          </div>

          <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={assignedDoula.image}
                  alt={assignedDoula.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{assignedDoula.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  <span className="text-sm text-foreground">{assignedDoula.rating}</span>
                  <span className="text-sm text-muted-foreground">({assignedDoula.reviews} reviews)</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>Tomorrow, 2:00 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentScreen('chat')}
                className="flex-1 h-12 rounded-xl border-secondary text-secondary hover:bg-secondary/10"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-secondary text-white hover:bg-secondary/90"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = getIcon(action.icon);
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (action.icon === 'search') setCurrentScreen('search');
                    else if (action.icon === 'calendar') setCurrentScreen('booking');
                    else if (action.icon === 'book') setCurrentScreen('library');
                    else if (action.icon === 'users') setCurrentScreen('community');
                  }}
                  className="flex flex-col items-start rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      action.icon === 'search' ? 'bg-[#EDE9FE]' :
                      action.icon === 'calendar' ? 'bg-[#FEF3C7]' :
                      action.icon === 'book' ? 'bg-[#D1FAE5]' :
                      'bg-[#FFF7ED]'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        action.icon === 'search' ? 'text-secondary' :
                        action.icon === 'calendar' ? 'text-[#F59E0B]' :
                        action.icon === 'book' ? 'text-[#10B981]' :
                        'text-[#F97316]'
                      }`} />
                    </div>
                    {action.badge && (
                      <span className="text-xs font-semibold text-primary">{action.badge}</span>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setCurrentScreen('search')}
        className="absolute bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
