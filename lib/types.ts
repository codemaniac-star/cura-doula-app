export type UserRole = 'mother' | 'doula' | null;

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'role-selection'
  | 'due-date'
  | 'location'
  | 'budget'
  | 'preferences'
  | 'home'
  | 'search'
  | 'doula-profile'
  | 'booking'
  | 'payment-success'
  | 'community'
  | 'profile'
  | 'chat'
  | 'library';

export interface Doula {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  experience: number;
  births: number;
  location: string;
  languages: string[];
  specialties: string[];
  price: number;
  subsidizedPrice: number;
  matchPercentage: number;
  available: boolean;
  certification: string;
  responseRate: number;
  bio: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  role: UserRole;
  dueDate?: Date;
  location?: string;
  budget?: number;
  languages?: string[];
  trimester?: number;
  daysUntilDue?: number;
}

export interface Post {
  id: string;
  author: {
    name: string;
    image: string;
    badge: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked?: boolean;
}

export interface Booking {
  id: string;
  doula: Doula;
  date: Date;
  time: string;
  service: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
  type?: 'text' | 'appointment';
  appointment?: {
    title: string;
    date: string;
    time: string;
    service: string;
  };
}
