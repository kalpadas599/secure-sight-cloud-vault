
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveFeedGrid } from '@/components/LiveFeedGrid';
import { CloudStoragePanel } from '@/components/CloudStoragePanel';
import { RecordingTimeline } from '@/components/RecordingTimeline';
import { SecurityAlerts } from '@/components/SecurityAlerts';
import { Shield, Cloud, Camera, Bell, User } from 'lucide-react';

interface CCTVDashboardProps {
  onLogout: () => void;
}

export const CCTVDashboard: React.FC<CCTVDashboardProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white">
      {/* Header */}
      <header className="glass-card border-b border-white/10 px-6 py-4 m-4 mb-0 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">SecureWatch Cloud</h1>
                <p className="text-xs text-slate-400">Premium Security Management</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-slate-300">
              <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{currentTime.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 glass-card-light rounded-full">
              <div className="w-2 h-2 neon-indicator rounded-full animate-glow"></div>
              <span className="text-sm font-medium text-emerald-300">System Online</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout} 
              className="premium-button border-white/20 text-white hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 pt-0">
        <div className="glass-card rounded-2xl">
          <Tabs defaultValue="live" className="space-y-6 p-6">
            <TabsList className="glass-card-light border border-white/10 p-1">
              <TabsTrigger 
                value="live" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Live Feeds
              </TabsTrigger>
              <TabsTrigger 
                value="storage" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Cloud Storage
              </TabsTrigger>
              <TabsTrigger 
                value="recordings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
              >
                Recordings
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-6">
              <LiveFeedGrid />
            </TabsContent>

            <TabsContent value="storage" className="space-y-6">
              <CloudStoragePanel />
            </TabsContent>

            <TabsContent value="recordings" className="space-y-6">
              <RecordingTimeline />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <SecurityAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
