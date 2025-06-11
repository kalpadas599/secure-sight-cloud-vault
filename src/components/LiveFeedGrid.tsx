
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Cloud } from 'lucide-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">{cameras.filter(c => c.status === 'online').length}</span>
              <span className="text-slate-400">Cameras Online</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-green-500" />
              <span className="font-semibold">98.7%</span>
              <span className="text-slate-400">Upload Success Rate</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live</span>
              <span className="text-slate-400">Real-time Backup</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{camera.name}</CardTitle>
                <Badge 
                  variant={camera.status === 'online' ? 'default' : 'destructive'}
                  className={camera.status === 'online' ? 'bg-green-600' : ''}
                >
                  {camera.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{camera.location}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Feed Placeholder */}
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                {camera.status === 'online' ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                    <div className="text-center z-10">
                      <Camera className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Live Feed Simulation</p>
                      <div className="mt-2 flex items-center justify-center space-x-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-red-500">REC</span>
                      </div>
                    </div>
                    {/* Animated grid overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-8 grid-rows-6 h-full">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div key={i} className="border border-blue-500/20"></div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-500">Camera Offline</p>
                  </div>
                )}
              </div>

              {/* Cloud Upload Status */}
              {camera.status === 'online' && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-300">Cloud Backup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500">
                      {(uploadStats[camera.id] || 0).toFixed(1)} MB/s
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-slate-300"
                  disabled={camera.status === 'offline'}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-slate-300"
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
