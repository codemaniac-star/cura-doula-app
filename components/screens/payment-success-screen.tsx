'use client';

import { X, Check, Calendar, Clock, MapPin, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { mockDoulas } from '@/lib/mock-data';

export function PaymentSuccessScreen() {
  const { setCurrentScreen, selectedDoula } = useApp();
  const doula = selectedDoula || mockDoulas[0];

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-4">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>
      </div>

      {/* Success Icon */}
      <div className="flex flex-col items-center px-6">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-500">
          <Check className="h-14 w-14 text-white" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Payment Successful!</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Your booking with {doula.name.split(' ')[0]} is confirmed.
        </p>
        <p className="text-muted-foreground">Receipt #883920</p>
      </div>

      {/* Booking Card */}
      <div className="mx-6 mt-8 rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-green-600">
          <Check className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase">Added to Calendar</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative">
            <img
              src={doula.image}
              alt={doula.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary">
              <Heart className="h-3 w-3 text-white" fill="currentColor" />
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{doula.name.split(' ')[0]} Thompson</h3>
            <p className="text-sm font-medium text-green-600">Postpartum Care</p>
            <div className="mt-1 h-px bg-border" />
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Mon, Oct 24</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>10:00 AM - 11:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="mt-4 h-24 rounded-xl bg-[#E8F4E8] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7] opacity-50" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto p-6">
        <Button
          onClick={() => setCurrentScreen('chat')}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Message {doula.name.split(' ')[0]}
        </Button>
        <button
          onClick={() => setCurrentScreen('home')}
          className="mt-3 w-full py-2 text-center font-semibold text-foreground"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
