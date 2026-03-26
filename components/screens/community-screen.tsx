'use client';

import { useState } from 'react';
import { Search, Bell, MoreHorizontal, Heart, MessageSquare, Share, Plus, Baby, Droplet, Apple, HeartPulse } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { mockPosts, communityGroups } from '@/lib/mock-data';

const groupIcons: Record<string, React.ElementType> = {
  'baby': Baby,
  'droplet': Droplet,
  'apple': Apple,
  'heart': HeartPulse,
};

export function CommunityScreen() {
  const { setCurrentScreen } = useApp();
  const [posts, setPosts] = useState(mockPosts.map(p => ({ ...p, liked: false })));

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const getGroupIcon = (iconName: string) => {
    return groupIcons[iconName] || Baby;
  };

  const getGroupColor = (color: string) => {
    switch (color) {
      case '#EF4444': return 'bg-red-100';
      case '#3B82F6': return 'bg-blue-100';
      case '#10B981': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-6 pb-4 pt-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Community</h1>
          <div className="flex items-center gap-3">
            <button>
              <Search className="h-6 w-6 text-foreground" />
            </button>
            <button className="relative">
              <Bell className="h-6 w-6 text-foreground" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
            </button>
          </div>
        </div>

        {/* Groups */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Your Groups</h2>
            <button className="text-sm font-medium text-primary">View all</button>
          </div>
          <div className="mt-3 flex gap-4 overflow-x-auto pb-2">
            {communityGroups.map((group) => {
              const Icon = getGroupIcon(group.icon);
              return (
                <div key={group.id} className="flex flex-col items-center min-w-[70px]">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${getGroupColor(group.color)} border-2 border-white shadow-sm`}>
                    <Icon className="h-6 w-6" style={{ color: group.color }} />
                  </div>
                  <span className="mt-2 text-xs text-center text-foreground line-clamp-2">{group.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-2xl bg-white p-4 shadow-sm">
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{post.author.name}</span>
                      <span className="rounded bg-[#FCE7EF] px-2 py-0.5 text-xs font-medium text-primary">
                        {post.author.badge}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                  </div>
                </div>
                <button>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <p className="mt-3 text-foreground leading-relaxed">{post.content}</p>

              {/* Image */}
              {post.image && (
                <div className="mt-3 overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt="Post"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart
                      className={`h-5 w-5 ${post.liked ? 'text-red-500' : 'text-muted-foreground'}`}
                      fill={post.liked ? 'currentColor' : 'none'}
                    />
                    <span className="text-sm text-muted-foreground">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{post.comments}</span>
                  </button>
                </div>
                <button>
                  <Share className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-lg">
        <Plus className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
