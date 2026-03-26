'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

export function DueDateScreen() {
  const { setCurrentScreen, updateOnboardingData } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9)); // October 2023
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2023, 9, 14));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleContinue = () => {
    if (selectedDate) {
      updateOnboardingData({ dueDate: selectedDate });
    }
    setCurrentScreen('location');
  };

  const isSelected = (day: number) => {
    if (!selectedDate || !day) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setCurrentScreen('role-selection')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
        <div />
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-6">
        <span className="text-sm font-semibold text-primary">STEP 1 OF 5</span>
        <span className="text-sm text-muted-foreground">20% completed</span>
      </div>
      <div className="mt-2 px-6">
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div className="h-1.5 w-1/5 rounded-full bg-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            When is your
          </h1>
          <h1 className="text-2xl font-bold text-primary">
            due date?
          </h1>
          <p className="mt-2 text-muted-foreground">
            This helps us find doulas available around your estimated delivery.
          </p>
        </div>

        {/* Date Picker Button */}
        <button className="mx-auto mt-6 flex items-center gap-3 rounded-full border border-border bg-white px-6 py-3">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">
            {selectedDate
              ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
              : 'Select date'}
          </span>
        </button>

        {/* Calendar */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm border border-border">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="font-semibold text-foreground">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={handleNextMonth} className="p-2">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day, i) => (
              <div key={i} className="flex h-8 items-center justify-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((day, i) => (
              <button
                key={i}
                onClick={() => day && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                disabled={!day}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors ${
                  isSelected(day!)
                    ? 'bg-primary text-white font-semibold'
                    : isToday(day!)
                    ? 'text-primary font-semibold'
                    : day
                    ? 'text-foreground hover:bg-muted'
                    : ''
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* I don't know */}
        <button className="mt-4 w-full text-center text-primary font-medium">
          {"I don't know exactly"}
        </button>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={handleContinue}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
        >
          Next Step
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
