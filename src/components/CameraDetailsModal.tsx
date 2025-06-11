
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Wifi, Clock, HardDrive, Download } from 'lucide-react';

interface CameraDetailsModalProps {
  camera: {
    id: number;
    name: string;
    location: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const CameraDetailsModal: React.FC<CameraDetailsModalProps> = ({ camera, isOpen, onClose }) => {
  const mockData = {
    resolution: '1920x1080',
    fps: '30 FPS',
    bitrate: '2.5 Mbps',
    lastBackup: '2 minutes ago',
    storageUsed: '245 MB today',
    uptime: '99.8%',
    signalStrength: '-45 dBm'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-3">
            <Camera className="w-6 h-6 text-cyan-400" />
            <span>{camera.name} Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card-light border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Status</span>
                  <Badge className={camera.status === 'online' ? 'neon-indicator' : 'bg-red-500/80'}>
                    {camera.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-light border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Location</span>
                  <span className="text-cyan-300 font-medium">{camera.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Video Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Resolution</span>
                  <span className="text-white">{mockData.resolution}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Frame Rate</span>
                  <span className="text-white">{mockData.fps}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Bitrate</span>
                  <span className="text-white">{mockData.bitrate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-emerald-300">{mockData.uptime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Signal</span>
                  <span className="text-white">{mockData.signalStrength}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Backup</span>
                  <span className="text-sky-300">{mockData.lastBackup}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Info */}
          <Card className="glass-card-light border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-orange-400" />
                  <span className="text-white">Storage Usage Today</span>
                </div>
                <span className="text-orange-300 font-semibold">{mockData.storageUsed}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 premium-button">
              <Download className="w-4 h-4 mr-2" />
              Download Recordings
            </Button>
            <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <Wifi className="w-4 h-4 mr-2" />
              Network Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
