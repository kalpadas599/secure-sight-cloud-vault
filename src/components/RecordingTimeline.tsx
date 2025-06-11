
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Camera, Download, Eye } from 'lucide-react';

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-slate-700"
          />
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>
              Recordings for {selectedDate?.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recordings.map((recording, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-mono">{recording.time}</div>
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{recording.camera}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-slate-600 ${
                        recording.type === 'motion' 
                          ? 'text-yellow-400 border-yellow-600' 
                          : 'text-blue-400 border-blue-600'
                      }`}
                    >
                      {recording.type}
                    </Badge>
                    <span className="text-sm text-slate-400">{recording.duration}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Visualization */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>24-Hour Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-20 bg-slate-700 rounded-lg overflow-hidden">
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
                    className={`absolute top-2 h-4 rounded ${
                      recording.type === 'motion' 
                        ? 'bg-yellow-500/70' 
                        : 'bg-blue-500/70'
                    }`}
                    style={{
                      left: `${startPercent}%`,
                      width: `${Math.max(widthPercent, 0.5)}%`
                    }}
                    title={`${recording.camera} - ${recording.time}`}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
