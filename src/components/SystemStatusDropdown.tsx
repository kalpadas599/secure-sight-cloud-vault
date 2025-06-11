
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, Server } from 'lucide-react';

interface SystemStatusDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SystemStatusDropdown: React.FC<SystemStatusDropdownProps> = ({ isOpen, onToggle }) => {
  const systemLogs = [
    { time: '14:35:22', status: 'success', message: 'All cameras synchronized successfully' },
    { time: '14:32:15', status: 'info', message: 'Backup server connected' },
    { time: '14:28:09', status: 'warning', message: 'Camera 4 signal restored' },
    { time: '14:25:44', status: 'success', message: 'Cloud storage optimization complete' },
    { time: '14:20:12', status: 'info', message: 'System health check passed' }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 z-50 w-96">
      <Card className="glass-card border-white/20 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">System Status</h3>
            <Badge className="neon-indicator">All Systems Operational</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 glass-card-light rounded-lg">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white">Servers</span>
                </div>
                <span className="text-lg font-bold text-emerald-300">Online</span>
              </div>
              
              <div className="p-3 glass-card-light rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white">Cameras</span>
                </div>
                <span className="text-lg font-bold text-cyan-300">3/4</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Recent Activity</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {systemLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 glass-card-light rounded">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      {log.status === 'success' && <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                      {log.status === 'warning' && <AlertTriangle className="w-3 h-3 text-orange-400 flex-shrink-0" />}
                      {log.status === 'info' && <Clock className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                      <span className="text-xs text-white">{log.message}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{log.time}</span>
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
