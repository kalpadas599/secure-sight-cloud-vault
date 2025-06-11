
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Cloud, Activity, Wifi } from 'lucide-react';

const cameras = [
  { id: 1, name: 'Front Door', location: 'Main Entrance', status: 'online' },
  { id: 2, name: 'Parking Lot', location: 'Outdoor Area', status: 'online' },
  { id: 3, name: 'Reception', location: 'Indoor Lobby', status: 'online' },
  { id: 4, name: 'Back Exit', location: 'Rear Entrance', status: 'offline' },
];

export const LiveFeedGrid: React.FC = () => {
  const [uploadStats, setUploadStats] = useState<Record<number, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadStats(prev => {
        const newStats = { ...prev };
        cameras.forEach(camera => {
          if (camera.status === 'online') {
            newStats[camera.id] = (prev[camera.id] || 0) + Math.random() * 10;
          }
        });
        return newStats;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card-light border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg turquoise-indicator">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-cyan-300">{cameras.filter(c => c.status === 'online').length}</span>
                <p className="text-sm text-slate-400">Cameras Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card-light border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg sunset-accent">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-orange-300">98.7%</span>
                <p className="text-sm text-slate-400">Upload Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card-light border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg neon-indicator animate-pulse-slow">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-emerald-300">Live</span>
                <p className="text-sm text-slate-400">Real-time Backup</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="glass-card border-white/10 overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">{camera.name}</CardTitle>
                  <p className="text-sm text-slate-400">{camera.location}</p>
                </div>
                <Badge 
                  className={camera.status === 'online' ? 'neon-indicator' : 'bg-red-500/80 text-red-100'}
                >
                  {camera.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Feed Placeholder */}
              <div className="aspect-video rounded-xl overflow-hidden relative group">
                {camera.status === 'online' ? (
                  <>
                    <div className="video-overlay absolute inset-0 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-cyan-300 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <p className="text-cyan-200 font-medium">Live Feed Simulation</p>
                        <div className="mt-3 flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-red-400 font-semibold tracking-wider">REC</span>
                        </div>
                      </div>
                    </div>
                    {/* Enhanced grid overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-12 grid-rows-8 h-full">
                        {Array.from({ length: 96 }).map((_, i) => (
                          <div key={i} className="border border-cyan-400/10"></div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <Wifi className="w-16 h-16 text-slate-500 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">Camera Offline</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cloud Upload Status */}
              {camera.status === 'online' && (
                <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-sky-400" />
                    <span className="text-slate-200 font-medium">Cloud Backup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sky-accent rounded-full animate-pulse"></div>
                    <span className="text-sky-300 font-semibold">
                      {(uploadStats[camera.id] || 0).toFixed(1)} MB/s
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 premium-button" 
                  disabled={camera.status === 'offline'}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 border-white/20 text-slate-300 hover:bg-white/10 transition-all duration-300"
                  disabled={camera.status === 'offline'}
                >
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
