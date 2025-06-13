
import React, { useState, useEffect } from 'react';
import { Company, MenuItem, RemoteApp } from '../types/company';
import { companies } from '../data/companies';
import LoginForm from '../components/LoginForm';
import DynamicNavigation from '../components/DynamicNavigation';
import RemoteAppLoader from '../components/RemoteAppLoader';
import { Button } from '@/components/ui/button';
import { saveSession, getSession, clearSession, isSessionValid } from '../utils/sessionManager';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [currentRemoteApp, setCurrentRemoteApp] = useState<RemoteApp | null>(null);

  useEffect(() => {
    // Check for existing valid session on component mount
    const session = getSession();
    if (session) {
      setSelectedCompany(session.company);
      setIsLoggedIn(true);
      console.log(`Restored session for ${session.company.name}`);
    }
  }, []);

  const handleLogin = (company: Company, credentials: { username: string; password: string }) => {
    // Save session for 24 hours
    saveSession(company, credentials);
    setSelectedCompany(company);
    setIsLoggedIn(true);
    console.log(`Logged in to ${company.name} for 24 hours`);
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setSelectedCompany(null);
    setSelectedApp(null);
    setSelectedMenuItem(null);
    setCurrentRemoteApp(null);
    console.log('Logged out and session cleared');
  };

  const handleAppSelect = (appName: string) => {
    if (selectedApp === appName) {
      setSelectedApp(null);
      setSelectedMenuItem(null);
      setCurrentRemoteApp(null);
    } else {
      setSelectedApp(appName);
      setSelectedMenuItem(null);
      const app = selectedCompany?.remoteApps.find(a => a.name === appName);
      setCurrentRemoteApp(app || null);
    }
  };

  const handleMenuItemClick = (appName: string, menuItem: MenuItem) => {
    const app = selectedCompany?.remoteApps.find(a => a.name === appName);
    if (app) {
      setCurrentRemoteApp(app);
      setSelectedMenuItem(menuItem);
      console.log(`Loading ${menuItem.label} from ${app.name} app`);
    }
  };

  // Show login form if not logged in or session expired
  if (!isLoggedIn || !selectedCompany) {
    return <LoginForm companies={companies} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <DynamicNavigation
        company={selectedCompany}
        selectedApp={selectedApp}
        onAppSelect={handleAppSelect}
        onMenuItemClick={handleMenuItemClick}
        onBackToSelection={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-semibold">
            {selectedCompany.name} Workspace
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {currentRemoteApp ? (
          <RemoteAppLoader app={currentRemoteApp} selectedMenuItem={selectedMenuItem} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to {selectedCompany.name}</h2>
              <p className="text-muted-foreground">Select an application from the sidebar to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
