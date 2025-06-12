
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, Server, RefreshCw, Eye, Power } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemStatusDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export const SystemStatusDropdown: React.FC<SystemStatusDropdownProps> = ({ isOpen, onToggle, isMobile = false }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const systemLogs = [
    { time: '14:35:22', status: 'success', message: 'All cameras synchronized successfully' },
    { time: '14:32:15', status: 'info', message: 'Backup server connected' },
    { time: '14:28:09', status: 'warning', message: 'Camera 4 signal restored' },
    { time: '14:25:44', status: 'success', message: 'Cloud storage optimization complete' },
    { time: '14:20:12', status: 'info', message: 'System health check passed' }
  ];

  const handleViewSystemLog = () => {
    toast({
      title: "System Log",
      description: "Opening detailed system logs...",
      duration: 2000,
    });
    onToggle();
  };

  const handleRefreshConnection = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Connection Refreshed",
        description: "All systems synchronized successfully",
        duration: 3000,
      });
    }, 2000);
  };

  const handleToggleSystemStatus = () => {
    toast({
      title: "System Status Changed",
      description: "System status will be updated in 5 seconds",
      duration: 2000,
    });
    onToggle();
  };

  if (!isOpen) return null;

  return (
    <div className={`absolute z-50 ${
      isMobile 
        ? 'top-0 left-0 right-0 mt-0 mx-0' 
        : 'top-full right-0 mt-2 w-full sm:w-96 max-w-[calc(100vw-2rem)]'
    }`}>
      <Card className="glass-card border-white/20 shadow-2xl">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">System Status</h3>
            <Badge className="neon-indicator text-xs whitespace-nowrap">All Systems Operational</Badge>
          </div>
          
          <div className="space-y-3">
            {/* Status Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 glass-card-light rounded-lg">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white">Servers</span>
                </div>
                <span className="text-lg font-bold text-emerald-300">Online</span>
              </div>
              
              <div className="p-3 glass-card-light rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-white">Cameras</span>
                </div>
                <span className="text-lg font-bold text-cyan-300">3/4</span>
              </div>
            </div>

            {/* Action Buttons - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewSystemLog}
                className="border-white/20 text-white hover:bg-white/10 text-xs min-h-[40px] w-full"
              >
                <Eye className="w-3 h-3 mr-1" />
                View Log
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefreshConnection}
                disabled={isRefreshing}
                className="border-white/20 text-white hover:bg-white/10 text-xs min-h-[40px] w-full"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    Refreshing
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Refresh
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleToggleSystemStatus}
                className="border-white/20 text-white hover:bg-white/10 text-xs min-h-[40px] w-full"
              >
                <Power className="w-3 h-3 mr-1" />
                Toggle
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Recent Activity</h4>
              <div className="max-h-32 sm:max-h-48 overflow-y-auto space-y-2 overscroll-contain">
                {systemLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 glass-card-light rounded text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      {log.status === 'success' && <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                      {log.status === 'warning' && <AlertTriangle className="w-3 h-3 text-orange-400 flex-shrink-0" />}
                      {log.status === 'info' && <Clock className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                      <span className="text-white truncate">{log.message}</span>
                    </div>
                    <span className="text-slate-400 flex-shrink-0 text-xs">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
