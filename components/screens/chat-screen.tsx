'use client';

import { useState } from 'react';
import { ChevronLeft, Phone, Video, Calendar, Clock, Hand, Plus, Mic, Send, Check } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { mockMessages, mockDoulas } from '@/lib/mock-data';

export function ChatScreen() {
  const { setCurrentScreen, selectedDoula } = useApp();
  const [message, setMessage] = useState('');
  const doula = selectedDoula || mockDoulas[0];

  const quickReplies = ['Confirm Appointment', 'Request Reschedule', 'Thank you!'];

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen('home')}
              className="flex h-10 w-10 items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={doula.image}
                  alt={doula.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{doula.name}</h2>
                <p className="text-xs text-green-600">Active now</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE7EF]">
              <Video className="h-5 w-5 text-primary" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FCE7EF]">
              <Phone className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-center text-sm text-primary font-medium">TODAY, 9:41 AM</p>

        {mockMessages.map((msg) => (
          <div key={msg.id} className={`mb-4 flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            {!msg.isMe && msg.type !== 'appointment' && (
              <div className="mr-2 mt-auto">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-300 to-orange-400" />
              </div>
            )}
            
            {msg.type === 'appointment' ? (
              <div className="w-full max-w-[320px] rounded-2xl border-l-4 border-primary bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE7EF]">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{msg.appointment?.title}</h4>
                    <p className="text-sm text-muted-foreground">{"You're all set with Grace"}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{msg.appointment?.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{msg.appointment?.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Hand className="h-4 w-4 text-muted-foreground" />
                    <span>{msg.appointment?.service}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[280px] rounded-2xl px-4 py-3 ${
                  msg.isMe
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                  msg.isMe ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  <span>{msg.time}</span>
                  {msg.isMe && (
                    <div className="flex -space-x-1">
                      <Check className="h-3 w-3" />
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm text-foreground"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-border bg-white px-4 py-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
          <Plus className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex flex-1 items-center rounded-full border border-border bg-muted px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button>
            <Mic className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Send className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
