
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveFeedGrid } from '@/components/LiveFeedGrid';
import { CloudStoragePanel } from '@/components/CloudStoragePanel';
import { RecordingTimeline } from '@/components/RecordingTimeline';
import { SecurityAlerts } from '@/components/SecurityAlerts';
import { SystemStatusDropdown } from '@/components/SystemStatusDropdown';
import { Shield, Cloud, Camera, Bell, User, LogOut, Menu, X } from 'lucide-react';

interface CCTVDashboardProps {
  onLogout: () => void;
}

export const CCTVDashboard: React.FC<CCTVDashboardProps> = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [systemOnline, setSystemOnline] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu when clicking outside or when system status is toggled
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element)?.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    setTimeout(() => {
      onLogout();
    }, 300);
  };

  const toggleSystemStatus = () => {
    setSystemOnline(!systemOnline);
    setTimeout(() => setSystemOnline(true), 5000);
  };

  const handleSystemStatusToggle = () => {
    setShowSystemStatus(!showSystemStatus);
    // On mobile, close the mobile menu when system status is opened
    if (!showSystemStatus && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white">
      {/* Mobile-Responsive Header */}
      <header className="glass-card border-b border-white/10 px-4 sm:px-6 py-4 m-2 sm:m-4 mb-0 rounded-t-2xl relative z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold gradient-text truncate">SecureWatch Cloud</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Premium Security Management</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-3 text-slate-300">
              <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{currentTime.toLocaleString()}</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg glass-card-light hover:bg-white/10 transition-colors mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative z-50">
              <div 
                className={`flex items-center space-x-3 px-4 py-2 glass-card-light rounded-full cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  systemOnline ? 'hover:bg-emerald-500/20' : 'hover:bg-red-500/20'
                }`}
                onClick={handleSystemStatusToggle}
              >
                <div className={`w-2 h-2 rounded-full animate-glow ${
                  systemOnline ? 'neon-indicator' : 'bg-red-500'
                }`}></div>
                <span className={`text-sm font-medium whitespace-nowrap ${
                  systemOnline ? 'text-emerald-300' : 'text-red-300'
                }`}>
                  System {systemOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <SystemStatusDropdown 
                isOpen={showSystemStatus}
                onToggle={handleSystemStatusToggle}
                isMobile={false}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="premium-button border-white/20 text-white hover:text-white transform transition-all duration-300 hover:scale-105 group min-h-[48px] min-w-[48px]"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden mobile-menu-container">
            <div className="absolute top-full left-0 right-0 mt-2 mx-2 glass-card border-white/20 rounded-xl z-50 overflow-hidden">
              <div className="p-4 space-y-4">
                {/* Mobile Time Display */}
                <div className="flex items-center space-x-2 text-slate-300 pb-2 border-b border-white/10">
                  <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{currentTime.toLocaleString()}</span>
                </div>

                {/* Mobile System Status */}
                <div className="relative">
                  <div 
                    className={`flex items-center justify-between p-3 glass-card-light rounded-lg cursor-pointer transition-all duration-300 ${
                      systemOnline ? 'hover:bg-emerald-500/20' : 'hover:bg-red-500/20'
                    }`}
                    onClick={handleSystemStatusToggle}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-2 h-2 rounded-full animate-glow flex-shrink-0 ${
                        systemOnline ? 'neon-indicator' : 'bg-red-500'
                      }`}></div>
                      <span className={`text-sm font-medium truncate ${
                        systemOnline ? 'text-emerald-300' : 'text-red-300'
                      }`}>
                        System {systemOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Logout */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full premium-button border-white/20 text-white hover:text-white transform transition-all duration-300 hover:scale-105 group min-h-[48px]"
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile System Status Dropdown - Full Width Overlay */}
        {showSystemStatus && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={handleSystemStatusToggle}>
            <div className="absolute top-20 left-4 right-4 max-h-[calc(100vh-6rem)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <SystemStatusDropdown 
                isOpen={showSystemStatus}
                onToggle={handleSystemStatusToggle}
                isMobile={true}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-2 sm:p-6 pt-0">
        <div className="glass-card rounded-2xl">
          <Tabs defaultValue="live" className="space-y-4 sm:space-y-6 p-3 sm:p-6">
            {/* Mobile-Responsive Tab List */}
            <TabsList className="glass-card-light border border-white/10 p-1 w-full overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                <TabsTrigger 
                  value="live" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[48px] whitespace-nowrap"
                >
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Live Feeds</span>
                  <span className="sm:hidden">Live</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="storage" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[48px] whitespace-nowrap"
                >
                  <Cloud className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Cloud Storage</span>
                  <span className="sm:hidden">Storage</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="recordings" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[48px] whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Recordings</span>
                  <span className="sm:hidden">Rec</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="alerts" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2 min-h-[48px] whitespace-nowrap"
                >
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Alerts</span>
                  <span className="sm:hidden">Alerts</span>
                </TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="live" className="space-y-4 sm:space-y-6 animate-fade-in">
              <LiveFeedGrid />
            </TabsContent>

            <TabsContent value="storage" className="space-y-4 sm:space-y-6 animate-fade-in">
              <CloudStoragePanel />
            </TabsContent>

            <TabsContent value="recordings" className="space-y-4 sm:space-y-6 animate-fade-in">
              <RecordingTimeline />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 sm:space-y-6 animate-fade-in">
              <SecurityAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
