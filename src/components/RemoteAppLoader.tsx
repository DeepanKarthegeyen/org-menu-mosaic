
import React, { useEffect, useState, Suspense } from 'react';
import { RemoteApp, MenuItem } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

// Import module components from their new locations
import EmployeeModule from '../modules/employee-app/src/EmployeeModule';
import AnalyticsModule from '../modules/analytics-app/src/AnalyticsModule';
import VehicleModule from '../modules/vehicle-app/src/VehicleModule';
import DesignModule from '../modules/design-app/src/DesignModule';
import MachineModule from '../modules/machine-app/src/MachineModule';
import SafetyModule from '../modules/safety-app/src/SafetyModule';

interface RemoteAppLoaderProps {
  app: RemoteApp;
  selectedMenuItem: MenuItem | null;
}

const RemoteAppLoader: React.FC<RemoteAppLoaderProps> = ({ app, selectedMenuItem }) => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingLocalModule, setUsingLocalModule] = useState(false);

  useEffect(() => {
    if (selectedMenuItem) {
      loadRemoteModule();
    }
  }, [selectedMenuItem, app]);

  const getLocalModule = (appName: string) => {
    const localModules: { [key: string]: React.ComponentType<any> } = {
      'Employee Management': EmployeeModule,
      'HR Analytics': AnalyticsModule,
      'Vehicle Production': VehicleModule,
      'Design Studio': DesignModule,
      'Machine Operations': MachineModule,
      'Safety Systems': SafetyModule,
    };
    
    return localModules[appName] || null;
  };

  const loadRemoteModule = async () => {
    setLoading(true);
    setError(null);
    setRemoteComponent(null);
    setUsingLocalModule(false);

    try {
      console.log(`Loading remote module: ${app.scope}/${app.module}`);
      
      // Try to load the remote module
      const module = await import(/* @vite-ignore */ `${app.scope}/${app.module}`);
      
      if (module && module.default) {
        setRemoteComponent(() => module.default);
        console.log(`Successfully loaded ${app.name} remote module`);
      } else {
        throw new Error(`No default export found in ${app.scope}/${app.module}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(`Failed to load remote module ${app.scope}/${app.module}:`, err);
      
      // Use local module as fallback
      const localModule = getLocalModule(app.name);
      if (localModule) {
        setRemoteComponent(() => localModule);
        setUsingLocalModule(true);
        console.log(`Using local module for ${app.name}`);
      } else {
        setError(`Failed to load ${app.name} module. Make sure the remote app is running on ${app.url}. Error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!selectedMenuItem) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Welcome to {app.name}</CardTitle>
            <CardDescription>Select a menu item from the sidebar to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Remote App URL: {app.url}</p>
              <p>Module: {app.scope}/{app.module}</p>
              <p>Build Target: Independent deployment ready</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading {selectedMenuItem.label} from {app.url}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <br />
            <br />
            <strong>Deployment Options:</strong>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Build and deploy each module separately for independent scaling</li>
              <li>Use environment variables to configure remote URLs</li>
              <li>Deploy to AWS/Azure with separate resource allocation</li>
              <li>Scale individual modules based on demand</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (RemoteComponent) {
    return (
      <div className="flex-1">
        {usingLocalModule && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 mx-6 mt-6">
            <p className="text-sm">
              <strong>Local Module:</strong> Using local module for development. This module is ready for independent deployment and scaling.
            </p>
          </div>
        )}
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }>
          <RemoteComponent 
            menuItem={selectedMenuItem}
            appName={app.name}
            basePath={selectedMenuItem.path}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <Card>
        <CardHeader>
          <CardTitle>{selectedMenuItem.label}</CardTitle>
          <CardDescription>
            {app.name} - {selectedMenuItem.path}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Module ready for independent deployment:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Build Target: {app.scope}</li>
              <li>Deployment URL: {app.url}</li>
              <li>Module Path: {app.module}</li>
              <li>Route: {selectedMenuItem.path}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoteAppLoader;
