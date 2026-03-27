'use client';

import { Bell, Calendar, Users, BookOpen, FileText, Star, Clock, ChevronRight, Check, TrendingUp } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { Button } from '@/components/ui/button';

const upcomingAppointments = [
  { id: '1', label: 'TODAY', time: '10:00 AM', title: 'Prenatal Visit', client: 'Sarah K.', color: 'text-primary' },
  { id: '2', label: 'TOMORROW', time: '2:00 PM', title: 'Postpartum Check', client: 'Amani J.', color: 'text-orange-500' },
  { id: '3', label: 'OCT 15', time: '9:30 AM', title: 'Lactation Consult', client: 'Fatima R.', color: 'text-muted-foreground' },
];

const recentActivity = [
  { id: '1', icon: Check, title: 'Payment Received', subtitle: 'KES 15,000 from Sarah K.', time: '2h ago', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { id: '2', icon: Star, title: 'New 5-Star Review', subtitle: '"Grace was amazing during..."', time: '1d ago', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
];

export function DoulaHomeScreen() {
  const { user, setCurrentScreen } = useApp();

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-6 pb-6 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.image || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face'}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Welcome back, {user?.name?.split(' ')[0] || 'Grace'}
              </h1>
              <span className="flex items-center gap-1 text-sm text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Available Now
              </span>
            </div>
          </div>
          <button className="relative">
            <Bell className="h-6 w-6 text-foreground" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9FE]">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="h-3 w-3" />
                12%
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Earnings</p>
            <p className="text-xl font-bold text-foreground">KES 45k</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF7ED]">
              <Calendar className="h-5 w-5 text-orange-500" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Active Bookings</p>
            <p className="text-xl font-bold text-foreground">3</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF3C7]">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <span className="text-xs text-muted-foreground">Top 5%</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Avg Rating</p>
            <p className="text-xl font-bold text-foreground">4.9</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBEAFE]">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Response Time</p>
            <p className="text-xl font-bold text-foreground">{'< 30m'}</p>
          </div>
        </div>
      </div>

      {/* New Opportunities Card */}
      <div className="mx-6 mt-4 rounded-2xl bg-secondary p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="text-xs font-semibold uppercase tracking-wide text-white/80">New Opportunities</span>
        </div>
        <h3 className="mt-2 text-lg font-bold text-white">2 New Potential Clients</h3>
        <p className="text-sm text-white/70">Latest match: Joy (Due Oct 12)</p>
        <Button
          variant="secondary"
          className="mt-3 h-10 w-full rounded-xl bg-white text-secondary hover:bg-white/90"
        >
          Review Matches
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 px-6">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">&#9889;</span>
          <h2 className="font-semibold text-foreground">Quick Actions</h2>
        </div>
        <div className="mt-3 flex gap-3">
          {[
            { icon: Calendar, label: 'Update', sublabel: 'Availability' },
            { icon: Users, label: 'View All', sublabel: 'Clients' },
            { icon: BookOpen, label: 'Training', sublabel: 'Resources' },
            { icon: FileText, label: 'Earnings', sublabel: 'Report' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-1 flex-col items-center rounded-xl bg-white p-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <action.icon className="h-5 w-5 text-foreground" />
              </div>
              <span className="mt-2 text-xs font-medium text-foreground">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.sublabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="mt-6 flex-1 px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Upcoming</h2>
          <button className="text-sm font-medium text-primary">See Calendar</button>
        </div>
        <div className="mt-3 space-y-3">
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
              <div className={`h-10 w-1 rounded-full ${apt.color === 'text-primary' ? 'bg-primary' : apt.color === 'text-orange-500' ? 'bg-orange-500' : 'bg-muted-foreground'}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${apt.color}`}>{apt.label}</span>
                  <span className="text-xs text-muted-foreground">• {apt.time}</span>
                </div>
                <p className="font-medium text-foreground">{apt.title}</p>
                <p className="text-sm text-muted-foreground">with {apt.client}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 px-6 pb-24">
        <h2 className="font-semibold text-foreground">Recent Activity</h2>
        <div className="mt-3 space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.iconBg}`}>
                <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
