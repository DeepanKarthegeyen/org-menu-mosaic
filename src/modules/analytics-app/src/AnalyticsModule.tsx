
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RemoteModuleProps {
  menuItem: { id: string; label: string; path: string };
  appName: string;
  basePath: string;
}

const AnalyticsModule: React.FC<RemoteModuleProps> = ({ menuItem, appName }) => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            {menuItem.label} - {appName}
          </CardTitle>
          <CardDescription>HR Analytics Module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              HR Analytics System - Advanced reporting and insights
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Avg Performance</h3>
                <p className="text-2xl font-bold text-green-600">8.7/10</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Retention Rate</h3>
                <p className="text-2xl font-bold text-blue-600">94%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Satisfaction</h3>
                <p className="text-2xl font-bold text-purple-600">4.2/5</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Current Route: {menuItem.path}</h4>
              <p className="text-sm text-muted-foreground">
                Independent deployment ready - Analytics Module
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsModule;
