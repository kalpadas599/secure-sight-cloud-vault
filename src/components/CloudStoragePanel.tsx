
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Cloud, Download, Trash2, Shield, Lock } from 'lucide-react';
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
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-blue-500" />
              <span>Total Storage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Used</span>
                <span>{usedStorage} GB / {totalStorage} GB</span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
              <p className="text-xs text-slate-400">
                {(totalStorage - usedStorage).toFixed(1)} GB remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Backup Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">All cameras backed up</span>
              </div>
              <div className="text-xs text-slate-400">
                Last sync: 2 minutes ago
              </div>
              <Badge className="bg-green-600 text-white">
                Protected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Lock className="w-5 h-5 text-yellow-500" />
              <span>Retention</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">30</div>
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
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Daily Storage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storageData.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium">{day.date}</div>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {day.files} files
                  </Badge>
                  <div className="text-sm text-slate-400">{day.size}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-600">
                    Backed Up
                  </Badge>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
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
