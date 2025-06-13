
import React, { useEffect, useState } from 'react';
import { RemoteApp, MenuItem } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface RemoteAppLoaderProps {
  app: RemoteApp;
  selectedMenuItem: MenuItem | null;
}

const RemoteAppLoader: React.FC<RemoteAppLoaderProps> = ({ app, selectedMenuItem }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMenuItem) {
      setLoading(true);
      setError(null);
      
      // Simulate loading a remote module (in real implementation, this would use Module Federation)
      const timer = setTimeout(() => {
        setLoading(false);
        // Simulate random error for demo
        if (Math.random() > 0.8) {
          setError(`Failed to load ${app.name} module`);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedMenuItem, app.name]);

  if (!selectedMenuItem) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Welcome to {app.name}</CardTitle>
            <CardDescription>Select a menu item from the sidebar to get started</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading {selectedMenuItem.label}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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
            <p>This is a simulated remote application content for <strong>{selectedMenuItem.label}</strong>.</p>
            <p>In a real implementation, this would be:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Loaded from: {app.url}</li>
              <li>Module: {app.scope}/{app.module}</li>
              <li>Route: {selectedMenuItem.path}</li>
            </ul>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Sample Content for {selectedMenuItem.label}</h4>
              <p className="text-sm">
                This would contain the actual functionality for {selectedMenuItem.label} 
                specific to the {app.name} domain. Each remote app would be independently 
                deployable and maintainable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemoteAppLoader;
