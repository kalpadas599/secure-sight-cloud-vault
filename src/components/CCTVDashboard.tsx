
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveFeedGrid } from '@/components/LiveFeedGrid';
import { CloudStoragePanel } from '@/components/CloudStoragePanel';
import { RecordingTimeline } from '@/components/RecordingTimeline';
import { SecurityAlerts } from '@/components/SecurityAlerts';
import { SystemStatusDropdown } from '@/components/SystemStatusDropdown';
import { Shield, Cloud, Camera, Bell, User, LogOut } from 'lucide-react';

interface CCTVDashboardProps {
  onLogout: () => void;
}

export const CCTVDashboard: React.FC<CCTVDashboardProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [systemOnline, setSystemOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Add a small animation delay for better UX
    setTimeout(() => {
      onLogout();
    }, 300);
  };

  const toggleSystemStatus = () => {
    setSystemOnline(!systemOnline);
    setTimeout(() => setSystemOnline(true), 5000); // Auto-restore after 5 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white">
      {/* Header */}
      <header className="glass-card border-b border-white/10 px-6 py-4 m-4 mb-0 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform transition-transform duration-300 hover:scale-110">
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
            <div className="relative">
              <div 
                className={`flex items-center space-x-3 px-4 py-2 glass-card-light rounded-full cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  systemOnline ? 'hover:bg-emerald-500/20' : 'hover:bg-red-500/20'
                }`}
                onClick={() => setShowSystemStatus(!showSystemStatus)}
              >
                <div className={`w-2 h-2 rounded-full animate-glow ${
                  systemOnline ? 'neon-indicator' : 'bg-red-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  systemOnline ? 'text-emerald-300' : 'text-red-300'
                }`}>
                  System {systemOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <SystemStatusDropdown 
                isOpen={showSystemStatus}
                onToggle={() => setShowSystemStatus(!showSystemStatus)}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="premium-button border-white/20 text-white hover:text-white transform transition-all duration-300 hover:scale-105 group"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
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
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Camera className="w-4 h-4 mr-2" />
                Live Feeds
              </TabsTrigger>
              <TabsTrigger 
                value="storage" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Cloud Storage
              </TabsTrigger>
              <TabsTrigger 
                value="recordings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105"
              >
                Recordings
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-6 animate-fade-in">
              <LiveFeedGrid />
            </TabsContent>

            <TabsContent value="storage" className="space-y-6 animate-fade-in">
              <CloudStoragePanel />
            </TabsContent>

            <TabsContent value="recordings" className="space-y-6 animate-fade-in">
              <RecordingTimeline />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6 animate-fade-in">
              <SecurityAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
