
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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">SecureWatch Cloud</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-slate-400">
              <span>•</span>
              <span>{currentTime.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">System Online</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="border-slate-600 text-slate-300">
              <User className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="live" className="data-[state=active]:bg-blue-600">
              <Camera className="w-4 h-4 mr-2" />
              Live Feeds
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-blue-600">
              <Cloud className="w-4 h-4 mr-2" />
              Cloud Storage
            </TabsTrigger>
            <TabsTrigger value="recordings" className="data-[state=active]:bg-blue-600">
              Recordings
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600">
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
      </main>
    </div>
  );
};
