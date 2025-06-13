
import React, { useState } from 'react';
import { Company, MenuItem, RemoteApp } from '../types/company';
import { companies } from '../data/companies';
import CompanySelector from '../components/CompanySelector';
import DynamicNavigation from '../components/DynamicNavigation';
import RemoteAppLoader from '../components/RemoteAppLoader';

const Index = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [currentRemoteApp, setCurrentRemoteApp] = useState<RemoteApp | null>(null);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setSelectedApp(null);
    setSelectedMenuItem(null);
    setCurrentRemoteApp(null);
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

  const handleBackToSelection = () => {
    setSelectedCompany(null);
    setSelectedApp(null);
    setSelectedMenuItem(null);
    setCurrentRemoteApp(null);
  };

  if (!selectedCompany) {
    return <CompanySelector companies={companies} onCompanySelect={handleCompanySelect} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <DynamicNavigation
        company={selectedCompany}
        selectedApp={selectedApp}
        onAppSelect={handleAppSelect}
        onMenuItemClick={handleMenuItemClick}
        onBackToSelection={handleBackToSelection}
      />
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
  );
};

export default Index;
