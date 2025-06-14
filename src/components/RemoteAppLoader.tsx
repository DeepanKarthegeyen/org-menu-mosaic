
import React, { useEffect, useState, Suspense } from 'react';
import { RemoteApp, MenuItem } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface RemoteAppLoaderProps {
  app: RemoteApp;
  selectedMenuItem: MenuItem | null;
}

const RemoteAppLoader: React.FC<RemoteAppLoaderProps> = ({ app, selectedMenuItem }) => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMenuItem) {
      loadRemoteModule();
    }
  }, [selectedMenuItem, app]);

  const loadRemoteModule = async () => {
    setLoading(true);
    setError(null);
    setRemoteComponent(null);

    try {
      console.log(`Loading remote module: ${app.scope}/${app.module}`);
      
      // Dynamic import of the remote module
      const module = await import(/* @vite-ignore */ `${app.scope}/${app.module}`);
      
      if (module.default) {
        setRemoteComponent(() => module.default);
        console.log(`Successfully loaded ${app.name} module`);
      } else {
        throw new Error(`No default export found in ${app.scope}/${app.module}`);
      }
    } catch (err) {
      console.error(`Failed to load remote module ${app.scope}/${app.module}:`, err);
      setError(`Failed to load ${app.name} module. Make sure the remote app is running on ${app.url}`);
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
            <strong>To set up remote apps:</strong>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Each remote app should run on its configured URL</li>
              <li>Remote apps should expose their modules via Module Federation</li>
              <li>Check that the remote app is running and accessible</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (RemoteComponent) {
    return (
      <div className="flex-1">
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
            <p>Remote module not loaded. This would normally load from:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>URL: {app.url}</li>
              <li>Module: {app.scope}/{app.module}</li>
              <li>Route: {selectedMenuItem.path}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoteAppLoader;
