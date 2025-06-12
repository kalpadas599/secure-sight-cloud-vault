import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Cloud, Download, Trash2, Shield, Lock, HardDrive, CheckCircle } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';

const initialStorageData = [
  { date: '2024-06-11', size: '2.4 GB', files: 48, status: 'backed_up' },
  { date: '2024-06-10', size: '2.1 GB', files: 42, status: 'backed_up' },
  { date: '2024-06-09', size: '2.3 GB', files: 46, status: 'backed_up' },
  { date: '2024-06-08', size: '1.9 GB', files: 38, status: 'backed_up' },
  { date: '2024-06-07', size: '2.2 GB', files: 44, status: 'backed_up' },
];

export const CloudStoragePanel: React.FC = () => {
  const [storageData, setStorageData] = useState(initialStorageData);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const totalStorage = 45.2; // GB
  const usedStorage = 12.3; // GB
  const storagePercentage = (usedStorage / totalStorage) * 100;

  const handleDeleteClick = (date: string) => {
    setSelectedDate(date);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setStorageData(prev => prev.filter(item => item.date !== selectedDate));
    setShowDeleteDialog(false);
    
    toast({
      title: "Footage Deleted",
      description: `Successfully deleted footage for ${selectedDate}`,
      duration: 3000,
    });
  };

  const handleDownload = (date: string, size: string) => {
    setDownloadingItems(prev => new Set(prev).add(date));
    
    // Simulate download progress
    setTimeout(() => {
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(date);
        return newSet;
      });
      
      toast({
        title: "Download Complete",
        description: `Downloaded ${size} of footage for ${date}`,
        duration: 3000,
      });
    }, 3000);
    
    toast({
      title: "Download Started",
      description: `Downloading ${size} of footage for ${date}`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/10 transform transition-all duration-300 hover:scale-105">
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

        <Card className="glass-card border-white/10 transform transition-all duration-300 hover:scale-105">
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

        <Card className="glass-card border-white/10 transform transition-all duration-300 hover:scale-105">
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
              <div key={day.date} className="glass-card-light rounded-xl border border-white/5 transform transition-all duration-300 hover:scale-102 hover:border-cyan-400/20">
                {/* Mobile-first responsive layout */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Content section */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className="text-sm font-medium text-white">{day.date}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-xs">
                        {day.files} files
                      </Badge>
                      <div className="text-sm text-sky-300 font-semibold">{day.size}</div>
                    </div>
                  </div>
                  
                  {/* Action buttons section - responsive layout */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 sm:flex-shrink-0">
                    <Badge className="neon-indicator text-center sm:text-left">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Backed Up
                    </Badge>
                    
                    <div className="flex gap-2 justify-end sm:justify-start">
                      <Button 
                        size="sm" 
                        className="premium-button transform transition-all duration-200 hover:scale-105 flex-1 sm:flex-initial min-h-[36px]"
                        onClick={() => handleDownload(day.date, day.size)}
                        disabled={downloadingItems.has(day.date)}
                      >
                        {downloadingItems.has(day.date) ? (
                          <>
                            <div className="w-4 h-4 mr-1 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span className="hidden xs:inline">Downloading...</span>
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300 transform hover:scale-105 flex-1 sm:flex-initial min-h-[36px]"
                        onClick={() => handleDeleteClick(day.date)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span className="hidden xs:inline">Delete</span>
                        <span className="xs:hidden">Del</span>
                      </Button>
                    </div>
                  </div>
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
