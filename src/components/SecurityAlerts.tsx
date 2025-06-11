
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Camera, Shield, Cloud, Eye } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    type: 'motion',
    camera: 'Front Door',
    time: '2024-06-11 14:23:15',
    severity: 'medium',
    description: 'Motion detected in restricted area',
    status: 'active'
  },
  {
    id: 2,
    type: 'system',
    camera: 'System',
    time: '2024-06-11 12:45:00',
    severity: 'low',
    description: 'Cloud backup completed successfully',
    status: 'resolved'
  },
  {
    id: 3,
    type: 'security',
    camera: 'Back Exit',
    time: '2024-06-11 09:15:30',
    severity: 'high',
    description: 'Camera offline - potential tampering',
    status: 'active'
  },
  {
    id: 4,
    type: 'motion',
    camera: 'Parking Lot',
    time: '2024-06-11 08:30:22',
    severity: 'low',
    description: 'Vehicle movement detected',
    status: 'resolved'
  }
];

export const SecurityAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const [newAlertCount, setNewAlertCount] = useState(0);

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of new alert
        setNewAlertCount(prev => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'motion': return <Camera className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'system': return <Cloud className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleResolveAlert = (alertId: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, status: 'resolved' } : alert
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-red-500" />
              <span className="font-semibold">{activeAlerts.length}</span>
              <span className="text-slate-400">Active Alerts</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{activeAlerts.filter(a => a.severity === 'high').length}</span>
              <span className="text-slate-400">High Priority</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">{activeAlerts.filter(a => a.type === 'motion').length}</span>
              <span className="text-slate-400">Motion Events</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-green-500" />
              <span className="font-semibold">99.8%</span>
              <span className="text-slate-400">System Health</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {newAlertCount > 0 && (
        <Alert className="border-yellow-600 bg-yellow-900/20">
          <Bell className="w-4 h-4" />
          <AlertDescription className="text-yellow-200">
            {newAlertCount} new alert{newAlertCount > 1 ? 's' : ''} received. Refresh to view.
          </AlertDescription>
        </Alert>
      )}

      {/* Active Alerts */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-red-500" />
            <span>Active Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No active alerts</p>
            ) : (
              activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getAlertIcon(alert.type)}
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-medium">{alert.description}</div>
                      <div className="text-sm text-slate-400">
                        {alert.camera} • {alert.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resolvedAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getAlertIcon(alert.type)}
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      resolved
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm">{alert.description}</div>
                    <div className="text-xs text-slate-400">
                      {alert.camera} • {alert.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
