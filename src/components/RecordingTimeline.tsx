import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Download, Eye, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const recordings = [
  { time: '00:15:30', camera: 'Front Door', duration: '02:45', type: 'motion' },
  { time: '03:22:15', camera: 'Parking Lot', duration: '01:20', type: 'continuous' },
  { time: '07:45:00', camera: 'Reception', duration: '15:30', type: 'motion' },
  { time: '12:30:45', camera: 'Front Door', duration: '03:15', type: 'motion' },
  { time: '15:18:22', camera: 'Back Exit', duration: '00:45', type: 'motion' },
  { time: '18:55:10', camera: 'Parking Lot', duration: '08:20', type: 'continuous' },
];

export const RecordingTimeline: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<typeof recordings[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleView = (recording: typeof recordings[0]) => {
    setSelectedRecording(recording);
    setShowVideoModal(true);
    setIsPlaying(false);
  };

  const handleDownload = (recording: typeof recordings[0]) => {
    const recordingId = `${recording.time}-${recording.camera}`;
    setDownloadingItems(prev => new Set(prev).add(recordingId));
    
    // Simulate download
    setTimeout(() => {
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(recordingId);
        return newSet;
      });
      
      toast({
        title: "Download Complete",
        description: `Recording from ${recording.camera} at ${recording.time} downloaded successfully`,
        duration: 3000,
      });
    }, 2000);
    
    toast({
      title: "Download Started",
      description: `Downloading recording from ${recording.camera}`,
      duration: 2000,
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="glass-card border-white/10 transform transition-all duration-300 hover:scale-105">
        <CardHeader>
          <CardTitle className="text-white">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-slate-700 text-white"
          />
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              Recordings for {selectedDate?.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recordings.map((recording, index) => {
                const recordingId = `${recording.time}-${recording.camera}`;
                const isDownloading = downloadingItems.has(recordingId);
                
                return (
                  <div key={index} className="glass-card-light rounded-lg transform transition-all duration-300 hover:scale-102 hover:border-cyan-400/20 border border-transparent">
                    {/* Mobile-first responsive layout */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Content section */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <div className="text-sm font-mono text-cyan-300">{recording.time}</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm text-white">{recording.camera}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`border-slate-600 text-xs ${
                              recording.type === 'motion' 
                                ? 'text-yellow-400 border-yellow-600 bg-yellow-500/10' 
                                : 'text-blue-400 border-blue-600 bg-blue-500/10'
                            }`}
                          >
                            {recording.type}
                          </Badge>
                          <span className="text-sm text-slate-400">{recording.duration}</span>
                        </div>
                      </div>
                      
                      {/* Action buttons section - responsive layout */}
                      <div className="flex gap-2 justify-end sm:justify-start sm:flex-shrink-0">
                        <Button 
                          size="sm" 
                          className="premium-button transform transition-all duration-200 hover:scale-105 flex-1 sm:flex-initial min-h-[36px]"
                          onClick={() => handleView(recording)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="hidden xs:inline">View</span>
                          <span className="xs:hidden">View</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-slate-600 text-slate-300 hover:bg-white/10 transform transition-all duration-200 hover:scale-105 flex-1 sm:flex-initial min-h-[36px]"
                          onClick={() => handleDownload(recording)}
                          disabled={isDownloading}
                        >
                          {isDownloading ? (
                            <>
                              <div className="w-4 h-4 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                              <span className="hidden xs:inline">Downloading</span>
                              <span className="xs:hidden">...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              <span className="hidden xs:inline">Download</span>
                              <span className="xs:hidden">DL</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Visualization */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">24-Hour Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-20 bg-slate-700/50 rounded-lg overflow-hidden">
              {/* Hour markers */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div key={hour} className="flex-1 border-r border-slate-600 last:border-r-0 relative">
                    <div className="absolute bottom-0 left-1 text-xs text-slate-400">
                      {hour.toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recording blocks */}
              {recordings.map((recording, index) => {
                const [hours, minutes] = recording.time.split(':').map(Number);
                const startPercent = (hours + minutes / 60) / 24 * 100;
                const [durationMins] = recording.duration.split(':').map(Number);
                const widthPercent = (durationMins / 60) / 24 * 100;
                
                return (
                  <div
                    key={index}
                    className={`absolute top-2 h-4 rounded cursor-pointer transform transition-all duration-300 hover:scale-y-125 ${
                      recording.type === 'motion' 
                        ? 'bg-yellow-500/70 hover:bg-yellow-400' 
                        : 'bg-blue-500/70 hover:bg-blue-400'
                    }`}
                    style={{
                      left: `${startPercent}%`,
                      width: `${Math.max(widthPercent, 0.5)}%`
                    }}
                    title={`${recording.camera} - ${recording.time}`}
                    onClick={() => handleView(recording)}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Modal */}
      {selectedRecording && (
        <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
          <DialogContent className="glass-card border-white/20 max-w-4xl max-w-[95vw] sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center space-x-3">
                <Camera className="w-6 h-6 text-cyan-400" />
                <span>Recording Playback - {selectedRecording.camera}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Video Player Simulation */}
              <div className="aspect-video rounded-xl overflow-hidden relative">
                <div className="video-overlay absolute inset-0 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-cyan-900/20"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-24 h-24 text-cyan-300 mx-auto mb-4" />
                    <p className="text-cyan-200 font-medium text-lg">Recording Playback Simulation</p>
                    <p className="text-slate-400 text-sm">{selectedRecording.time} - {selectedRecording.duration}</p>
                    
                    <Button
                      onClick={togglePlayback}
                      className="mt-4 premium-button"
                      size="lg"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-6 h-6 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-6 h-6 mr-2" />
                          Play
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Play indicator */}
                {isPlaying && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-semibold">PLAYING</span>
                  </div>
                )}
              </div>

              {/* Recording Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="glass-card-light border-white/10">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-300">Recording Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Camera:</span>
                          <span className="text-white">{selectedRecording.camera}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Time:</span>
                          <span className="text-white">{selectedRecording.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white">{selectedRecording.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Type:</span>
                          <Badge className={selectedRecording.type === 'motion' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}>
                            {selectedRecording.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card-light border-white/10">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-slate-300">Actions</h4>
                      <div className="space-y-2">
                        <Button 
                          className="w-full premium-button" 
                          size="sm"
                          onClick={() => handleDownload(selectedRecording)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Recording
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20 text-white hover:bg-white/10" 
                          size="sm"
                        >
                          Export Segment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
