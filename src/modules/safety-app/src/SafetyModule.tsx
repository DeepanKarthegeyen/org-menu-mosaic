
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RemoteModuleProps {
  menuItem: { id: string; label: string; path: string };
  appName: string;
  basePath: string;
}

const SafetyModule: React.FC<RemoteModuleProps> = ({ menuItem, appName }) => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            {menuItem.label} - {appName}
          </CardTitle>
          <CardDescription>Safety Systems Module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Safety Systems - Comprehensive workplace safety
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Safety Score</h3>
                <p className="text-2xl font-bold text-green-600">9.8/10</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Incidents (Month)</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Training Completed</h3>
                <p className="text-2xl font-bold text-purple-600">98%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Compliance</h3>
                <p className="text-2xl font-bold text-orange-600">100%</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Current Route: {menuItem.path}</h4>
              <p className="text-sm text-muted-foreground">
                Independent deployment ready - Safety Systems Module
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyModule;
