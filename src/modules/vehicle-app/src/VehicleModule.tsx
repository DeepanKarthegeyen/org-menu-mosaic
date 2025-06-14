
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RemoteModuleProps {
  menuItem: { id: string; label: string; path: string };
  appName: string;
  basePath: string;
}

const VehicleModule: React.FC<RemoteModuleProps> = ({ menuItem, appName }) => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {menuItem.label} - {appName}
          </CardTitle>
          <CardDescription>Vehicle Production Module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Vehicle Production System - Manufacturing excellence
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Vehicles Produced Today</h3>
                <p className="text-2xl font-bold text-blue-600">847</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Production Efficiency</h3>
                <p className="text-2xl font-bold text-green-600">96.2%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Quality Score</h3>
                <p className="text-2xl font-bold text-purple-600">98.5%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Maintenance Status</h3>
                <p className="text-2xl font-bold text-orange-600">Good</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Current Route: {menuItem.path}</h4>
              <p className="text-sm text-muted-foreground">
                Independent deployment ready - Vehicle Production Module
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleModule;
