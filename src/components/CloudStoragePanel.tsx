
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Cloud, Download, Trash2, Shield, Lock, HardDrive } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

const storageData = [
  { date: '2024-06-11', size: '2.4 GB', files: 48, status: 'backed_up' },
  { date: '2024-06-10', size: '2.1 GB', files: 42, status: 'backed_up' },
  { date: '2024-06-09', size: '2.3 GB', files: 46, status: 'backed_up' },
  { date: '2024-06-08', size: '1.9 GB', files: 38, status: 'backed_up' },
  { date: '2024-06-07', size: '2.2 GB', files: 44, status: 'backed_up' },
];

export const CloudStoragePanel: React.FC = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const totalStorage = 45.2; // GB
  const usedStorage = 12.3; // GB
  const storagePercentage = (usedStorage / totalStorage) * 100;

  const handleDeleteClick = (date: string) => {
    setSelectedDate(date);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting footage for ${selectedDate}`);
    setShowDeleteDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-3">
              <div className="p-2 rounded-lg sky-accent">
                <HardDrive className="w-5 h-5" />
              </div>
              <span className="text-white">Total Storage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Used</span>
                <span className="text-sky-300 font-semibold">{usedStorage} GB / {totalStorage} GB</span>
              </div>
              <Progress value={storagePercentage} className="h-3 bg-slate-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${storagePercentage}%` }}
                />
              </Progress>
              <p className="text-xs text-slate-400">
                {(totalStorage - usedStorage).toFixed(1)} GB remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-3">
              <div className="p-2 rounded-lg neon-indicator animate-pulse-slow">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-white">Backup Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 neon-indicator rounded-full animate-glow"></div>
                <span className="text-sm text-emerald-300 font-medium">All cameras backed up</span>
              </div>
              <div className="text-xs text-slate-400">
                Last sync: 2 minutes ago
              </div>
              <Badge className="neon-indicator border-emerald-400/20">
                Protected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-3">
              <div className="p-2 rounded-lg sunset-accent">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-white">Retention</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-300">30</div>
              <div className="text-xs text-slate-400">
                Days auto-retention policy
              </div>
              <div className="text-xs text-slate-400">
                Oldest: 18 days ago
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Details */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Daily Storage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageData.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-4 glass-card-light rounded-xl border border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-white">{day.date}</div>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                    {day.files} files
                  </Badge>
                  <div className="text-sm text-sky-300 font-semibold">{day.size}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="neon-indicator">
                    Backed Up
                  </Badge>
                  <Button size="sm" className="premium-button">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
                    onClick={() => handleDeleteClick(day.date)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        date={selectedDate}
      />
    </div>
  );
};
