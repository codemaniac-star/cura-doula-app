'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { testUsers } from '@/lib/mock-data';

export function LoginScreen() {
  const { setCurrentScreen, setUser, updateOnboardingData } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = testUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser(foundUser.user);
      updateOnboardingData({ role: foundUser.user.role });
      
      // Navigate based on role
      if (foundUser.user.role === 'doula') {
        setCurrentScreen('doula-home');
      } else {
        setCurrentScreen('home');
      }
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F8F9FA] px-6 py-8">
      {/* Header */}
      <div className="flex items-center">
        <button
          onClick={() => setCurrentScreen('role-selection')}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to continue your journey
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-foreground">Email</label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-foreground">Password</label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Forgot Password */}
        <button className="self-end text-sm font-medium text-primary">
          Forgot Password?
        </button>
      </div>

      {/* Test Credentials */}
      <div className="mt-6 rounded-xl bg-[#EDE9FE] p-4">
        <p className="text-sm font-medium text-secondary">Test Credentials:</p>
        <div className="mt-2 space-y-1 text-sm text-foreground">
          <p><span className="font-medium">Mother:</span> mother@test.com / password123</p>
          <p><span className="font-medium">Doula:</span> doula@test.com / password123</p>
        </div>
      </div>

      {/* Login Button */}
      <div className="mt-auto flex flex-col items-center gap-4 pt-8">
        <Button
          onClick={handleLogin}
          disabled={!email || !password || isLoading}
          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
        <p className="text-muted-foreground">
          {"Don't have an account?"}{' '}
          <button 
            onClick={() => setCurrentScreen('role-selection')}
            className="font-semibold text-primary"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
