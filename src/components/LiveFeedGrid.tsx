
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Cloud, Activity, Wifi } from 'lucide-react';
import { CameraDetailsModal } from '@/components/CameraDetailsModal';
import { CameraSettingsModal } from '@/components/CameraSettingsModal';
import { ExpandableMetrics } from '@/components/ExpandableMetrics';
import { SystemStatusDropdown } from '@/components/SystemStatusDropdown';

const initialCameras = [
  { id: 1, name: 'Front Door', location: 'Main Entrance', status: 'online' },
  { id: 2, name: 'Parking Lot', location: 'Outdoor Area', status: 'online' },
  { id: 3, name: 'Reception', location: 'Indoor Lobby', status: 'online' },
  { id: 4, name: 'Back Exit', location: 'Rear Entrance', status: 'offline' },
];

export const LiveFeedGrid: React.FC = () => {
  const [cameras, setCameras] = useState(initialCameras);
  const [uploadStats, setUploadStats] = useState<Record<number, number>>({});
  const [selectedCamera, setSelectedCamera] = useState<typeof initialCameras[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [successRate, setSuccessRate] = useState(98.7);

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

      // Simulate changing success rate
      setSuccessRate(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
    }, 2000);

    return () => clearInterval(interval);
  }, [cameras]);

  const toggleCameraStatus = (cameraId: number) => {
    setCameras(prev => prev.map(camera => 
      camera.id === cameraId 
        ? { ...camera, status: camera.status === 'online' ? 'offline' : 'online' }
        : camera
    ));
  };

  const handleDetailsClick = (camera: typeof initialCameras[0]) => {
    setSelectedCamera(camera);
    setShowDetails(true);
  };

  const handleSettingsClick = (camera: typeof initialCameras[0]) => {
    setSelectedCamera(camera);
    setShowSettings(true);
  };

  const onlineCount = cameras.filter(c => c.status === 'online').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExpandableMetrics
          title="Cameras Online"
          value={`${onlineCount}`}
          icon={<div className="p-2 rounded-lg turquoise-indicator"><Camera className="w-5 h-5" /></div>}
          isExpanded={expandedMetric === 'cameras'}
          onToggle={() => setExpandedMetric(expandedMetric === 'cameras' ? null : 'cameras')}
        />
        
        <ExpandableMetrics
          title="Upload Success Rate"
          value={`${successRate.toFixed(1)}%`}
          icon={<div className="p-2 rounded-lg sunset-accent"><Cloud className="w-5 h-5" /></div>}
          isExpanded={expandedMetric === 'upload'}
          onToggle={() => setExpandedMetric(expandedMetric === 'upload' ? null : 'upload')}
        />
        
        {expandedMetric !== 'upload' && expandedMetric !== 'cameras' && (
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
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="glass-card border-white/10 overflow-hidden group hover:border-cyan-400/30 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">{camera.name}</CardTitle>
                  <p className="text-sm text-slate-400">{camera.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={`cursor-pointer transition-all duration-300 ${
                      camera.status === 'online' 
                        ? 'neon-indicator hover:bg-emerald-300' 
                        : 'bg-red-500/80 text-red-100 hover:bg-red-400'
                    }`}
                    onClick={() => toggleCameraStatus(camera.id)}
                  >
                    {camera.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Feed Placeholder with Animation */}
              <div className="aspect-video rounded-xl overflow-hidden relative group/video">
                {camera.status === 'online' ? (
                  <>
                    <div className="video-overlay absolute inset-0 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-cyan-300 mx-auto mb-3 group-hover/video:scale-110 transition-transform duration-300" />
                        <p className="text-cyan-200 font-medium">Live Feed Simulation</p>
                        <div className="mt-3 flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-red-400 font-semibold tracking-wider animate-pulse">REC</span>
                        </div>
                      </div>
                    </div>
                    {/* Enhanced grid overlay with animation */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-12 grid-rows-8 h-full">
                        {Array.from({ length: 96 }).map((_, i) => (
                          <div key={i} className="border border-cyan-400/10 animate-pulse" style={{ animationDelay: `${i * 10}ms` }}></div>
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
                  className="flex-1 premium-button transform transition-all duration-200 hover:scale-105" 
                  disabled={camera.status === 'offline'}
                  onClick={() => handleDetailsClick(camera)}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 border-white/20 text-slate-300 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  disabled={camera.status === 'offline'}
                  onClick={() => handleSettingsClick(camera)}
                >
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      {selectedCamera && (
        <>
          <CameraDetailsModal
            camera={selectedCamera}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
          />
          <CameraSettingsModal
            camera={selectedCamera}
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        </>
      )}
    </div>
  );
};
