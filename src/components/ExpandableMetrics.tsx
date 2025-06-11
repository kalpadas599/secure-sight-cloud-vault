
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, X } from 'lucide-react';

interface ExpandableMetricsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExpandableMetrics: React.FC<ExpandableMetricsProps> = ({ 
  title, 
  value, 
  icon, 
  isExpanded, 
  onToggle 
}) => {
  const mockChartData = [
    { time: '00:00', value: 95.2 },
    { time: '04:00', value: 97.8 },
    { time: '08:00', value: 98.7 },
    { time: '12:00', value: 96.1 },
    { time: '16:00', value: 99.2 },
    { time: '20:00', value: 98.7 },
    { time: '24:00', value: 98.9 }
  ];

  if (isExpanded) {
    return (
      <Card className="glass-card border-white/10 col-span-2 transform transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-3">
              {icon}
              <span className="text-white">{title} - Detailed View</span>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-cyan-300">{value}</span>
            <div className="flex items-center space-x-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+2.3% from yesterday</span>
            </div>
          </div>
          
          {/* Mini Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300">24-Hour Trend</h4>
            <div className="h-24 flex items-end justify-between space-x-1">
              {mockChartData.map((point, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div 
                    className="w-6 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t transition-all duration-300 hover:from-cyan-400 hover:to-blue-300"
                    style={{ height: `${(point.value / 100) * 80}px` }}
                  />
                  <span className="text-xs text-slate-400">{point.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <span className="text-2xl font-bold text-emerald-300">99.2%</span>
              <p className="text-xs text-slate-400">Peak Today</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-orange-300">95.2%</span>
              <p className="text-xs text-slate-400">Lowest Today</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-sky-300">97.8%</span>
              <p className="text-xs text-slate-400">Average</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="glass-card-light border-white/10 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-cyan-400/30"
      onClick={onToggle}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <span className="text-2xl font-bold text-cyan-300">{value}</span>
            <p className="text-sm text-slate-400">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
