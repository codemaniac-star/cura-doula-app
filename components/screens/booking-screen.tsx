'use client';

import { useState } from 'react';
import { ArrowLeft, Star, Check, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { mockDoulas } from '@/lib/mock-data';

const days = [
  { day: 'Mon', date: 11 },
  { day: 'Tue', date: 12 },
  { day: 'Wed', date: 13 },
  { day: 'Thu', date: 14 },
  { day: 'Fri', date: 15 },
];

const times = ['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

export function BookingScreen() {
  const { setCurrentScreen, selectedDoula } = useApp();
  const [selectedDay, setSelectedDay] = useState(12);
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('712 345 678');

  const doula = selectedDoula || mockDoulas[0];
  const subtotal = 40000;
  const subsidy = 30000;
  const total = subtotal - subsidy;

  const handlePayment = () => {
    setCurrentScreen('payment-success');
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('doula-profile')}
            className="flex h-10 w-10 items-center justify-center"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">Confirm Booking</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Doula Card */}
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={doula.image}
                alt={doula.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Check className="h-3 w-3" />
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{doula.name.split(' ')[0]} Mwangi</h3>
              <p className="text-sm text-muted-foreground">Certified Birth Doula</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm text-foreground">{doula.rating}</span>
                <span className="text-sm text-muted-foreground">({doula.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Full Birth Support Package</span>
              <button className="text-sm font-semibold text-primary">View Details</button>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  Cura Subsidy (75%)
                </span>
                <span className="text-green-600">- KES {subsidy.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-muted-foreground">Total Due</span>
                <span className="text-2xl font-bold text-foreground">KES {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-4 rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Select First Prenatal Visit</h3>
            <span className="text-sm font-medium text-primary">September 2023</span>
          </div>
          <div className="mt-4 flex gap-2">
            {days.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className={`flex flex-1 flex-col items-center rounded-xl py-3 transition-all ${
                  selectedDay === d.date
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <span className="text-xs opacity-70">{d.day}</span>
                <span className="mt-1 text-lg font-semibold">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={time === '06:00 PM'}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                  selectedTime === time
                    ? 'bg-[#FCE7EF] text-primary border-2 border-primary'
                    : time === '06:00 PM'
                    ? 'bg-muted text-muted-foreground line-through'
                    : 'bg-muted text-foreground'
                }`}
              >
                {selectedTime === time && <Check className="h-4 w-4" />}
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4 rounded-2xl bg-white p-4">
          <h3 className="font-semibold text-foreground">Payment Method</h3>

          {/* M-Pesa */}
          <button
            onClick={() => setPaymentMethod('mpesa')}
            className={`mt-3 flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              paymentMethod === 'mpesa'
                ? 'border-primary bg-[#FCE7EF]'
                : 'border-border'
            }`}
          >
            <div className={`h-5 w-5 rounded-full border-2 ${
              paymentMethod === 'mpesa' ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {paymentMethod === 'mpesa' && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <span className="font-medium text-foreground">M-Pesa</span>
              <p className="text-sm text-muted-foreground">Pay securely with your M-Pesa mobile number.</p>
            </div>
            <div className="flex h-8 w-12 items-center justify-center rounded bg-green-600 text-xs font-bold text-white">
              M-Pesa
            </div>
          </button>

          {/* M-Pesa Number Input */}
          {paymentMethod === 'mpesa' && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border px-4 py-3">
              <span className="text-muted-foreground">+254</span>
              <div className="h-6 w-px bg-border" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 bg-transparent text-foreground outline-none"
                placeholder="7XX XXX XXX"
              />
            </div>
          )}

          {/* Card */}
          <button
            onClick={() => setPaymentMethod('card')}
            className={`mt-3 flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              paymentMethod === 'card'
                ? 'border-primary bg-[#FCE7EF]'
                : 'border-border'
            }`}
          >
            <div className={`h-5 w-5 rounded-full border-2 ${
              paymentMethod === 'card' ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {paymentMethod === 'card' && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <span className="font-medium text-foreground">Credit or Debit Card</span>
              <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
            </div>
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </button>

          {/* Security Note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Payments are secure and encrypted</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          onClick={handlePayment}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
        >
          <Lock className="mr-2 h-5 w-5" />
          Pay KES {total.toLocaleString()} via M-Pesa
        </Button>
      </div>
    </div>
  );
}
