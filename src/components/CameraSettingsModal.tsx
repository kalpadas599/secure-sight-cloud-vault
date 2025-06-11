
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Save, RotateCcw } from 'lucide-react';

interface CameraSettingsModalProps {
  camera: {
    id: number;
    name: string;
    location: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const CameraSettingsModal: React.FC<CameraSettingsModalProps> = ({ camera, isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    resolution: '1080p',
    frameRate: '30',
    quality: 'High',
    nightVision: true,
    motionDetection: true,
    audioRecording: false,
    backupFrequency: 'Real-time'
  });

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving camera settings:', settings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      resolution: '1080p',
      frameRate: '30',
      quality: 'High',
      nightVision: true,
      motionDetection: true,
      audioRecording: false,
      backupFrequency: 'Real-time'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-3">
            <Settings className="w-6 h-6 text-orange-400" />
            <span>{camera.name} Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Settings */}
          <Card className="glass-card-light border-white/10">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Video Configuration</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Resolution</label>
                  <select 
                    value={settings.resolution}
                    onChange={(e) => setSettings({...settings, resolution: e.target.value})}
                    className="w-full p-2 rounded bg-slate-700/50 border border-white/20 text-white"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="4K">4K Ultra HD</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Frame Rate</label>
                  <select 
                    value={settings.frameRate}
                    onChange={(e) => setSettings({...settings, frameRate: e.target.value})}
                    className="w-full p-2 rounded bg-slate-700/50 border border-white/20 text-white"
                  >
                    <option value="15">15 FPS</option>
                    <option value="30">30 FPS</option>
                    <option value="60">60 FPS</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card className="glass-card-light border-white/10">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Features</h3>
              
              <div className="space-y-3">
                {[
                  { key: 'nightVision', label: 'Night Vision', description: 'Automatic low-light enhancement' },
                  { key: 'motionDetection', label: 'Motion Detection', description: 'Trigger recording on movement' },
                  { key: 'audioRecording', label: 'Audio Recording', description: 'Include audio in recordings' }
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <div>
                      <span className="text-white font-medium">{feature.label}</span>
                      <p className="text-xs text-slate-400">{feature.description}</p>
                    </div>
                    <button
                      onClick={() => setSettings({...settings, [feature.key]: !settings[feature.key as keyof typeof settings]})}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        settings[feature.key as keyof typeof settings] 
                          ? 'bg-emerald-500' 
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        settings[feature.key as keyof typeof settings] 
                          ? 'translate-x-6' 
                          : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button onClick={handleSave} className="flex-1 premium-button">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
