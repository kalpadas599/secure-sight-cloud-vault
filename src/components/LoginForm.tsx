
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  onSwitchToSignup: () => void;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="glass-card border-white/10 overflow-hidden">
          <CardHeader className="text-center space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-t-2xl"></div>
            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold gradient-text">CCTV Security Portal</CardTitle>
              <CardDescription className="text-slate-300 text-base">
                Secure access to your premium cloud backup system
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200 font-medium">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-card-light border-white/20 text-white placeholder:text-slate-400 h-12 focus:border-cyan-400 transition-all duration-300"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-card-light border-white/20 text-white placeholder:text-slate-400 pr-12 h-12 focus:border-cyan-400 transition-all duration-300"
                    placeholder="Enter password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-cyan-300 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
              {error && (
                <div className="text-red-400 text-sm text-center p-3 glass-card-light border border-red-500/30 rounded-lg">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-12 premium-button text-white font-semibold text-base">
                Access Security System
              </Button>
            </form>
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-slate-400">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors duration-300"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
