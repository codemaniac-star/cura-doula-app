'use client';

import { Search, Bookmark, Play, FileText, Download, Baby, Heart } from 'lucide-react';
import { useApp } from '@/lib/app-context';

const categories = [
  { id: 'prenatal', label: 'Prenatal Care', icon: Baby, active: true },
  { id: 'labor', label: 'Labor & Birth', icon: Heart },
  { id: 'postpartum', label: 'Postpartum', icon: Heart },
];

const resources = [
  {
    id: '1',
    category: 'LABOR',
    title: 'Breathing Techniques for Pain Management',
    type: 'Video',
    duration: '8:24',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    category: 'NUTRITION',
    title: 'Superfoods for the Third Trimester',
    type: 'Article',
    duration: '3 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    category: 'POSTPARTUM',
    title: 'Gentle Yoga for Post-Birth Recovery',
    type: 'Video',
    duration: '15:00',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
  },
  {
    id: '4',
    category: 'PREP',
    title: 'Hospital Bag Checklist: Essentials Only',
    type: 'Guide',
    duration: 'Download',
    image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=300&h=200&fit=crop',
  },
];

export function LibraryScreen() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="flex h-full min-h-screen flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Library</h1>
        
        {/* Search */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles, videos, and guides"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Categories */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                  cat.active
                    ? 'bg-secondary text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured */}
      <div className="px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Featured for you</h2>
          <button className="text-sm font-medium text-primary">See All</button>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl">
          <div className="relative h-48 bg-gradient-to-br from-[#E8D5C4] to-[#D4C4B0]">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=300&fit=crop"
              alt="Featured"
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2">
                <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium">BIRTH PLAN</span>
                <span className="text-xs opacity-80">5 min read</span>
              </div>
              <h3 className="mt-2 text-lg font-bold">Understanding Your Birth Plan</h3>
              <p className="mt-1 text-sm opacity-80">
                Learn how to communicate your preferences effectively with your care team for a smoother...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Resources */}
      <div className="mt-6 flex-1 px-6">
        <h2 className="font-semibold text-foreground">Latest Resources</h2>
        <div className="mt-3 space-y-3">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="relative h-20 w-24 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="h-full w-full object-cover"
                />
                {resource.type === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                      <Play className="h-4 w-4 text-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-semibold ${
                  resource.category === 'LABOR' ? 'text-green-600' :
                  resource.category === 'NUTRITION' ? 'text-red-500' :
                  resource.category === 'POSTPARTUM' ? 'text-primary' :
                  'text-blue-500'
                }`}>
                  {resource.category}
                </span>
                <h4 className="mt-1 font-medium text-foreground line-clamp-2">{resource.title}</h4>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {resource.type === 'Video' && <Play className="h-3 w-3" />}
                  {resource.type === 'Article' && <FileText className="h-3 w-3" />}
                  {resource.type === 'Guide' && <Download className="h-3 w-3" />}
                  <span>{resource.type} • {resource.duration}</span>
                </div>
              </div>
              <button className="flex-shrink-0">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
