
import React from 'react';
import { Company, MenuItem } from '../types/company';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Users, DollarSign, Heart, TrendingUp, UserPlus, BarChart3, FileText, Brain,
  Factory, CheckCircle, Package, Wrench, Truck, Car, Cpu, TestTube,
  Cog, Activity, AlertTriangle, Zap, Shield, AlertCircle, GraduationCap
} from 'lucide-react';

interface DynamicNavigationProps {
  company: Company;
  selectedApp: string | null;
  onAppSelect: (appName: string) => void;
  onMenuItemClick: (appName: string, menuItem: MenuItem) => void;
  onBackToSelection: () => void;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Users, DollarSign, Heart, TrendingUp, UserPlus, BarChart3, FileText, Brain,
  Factory, CheckCircle, Package, Wrench, Truck, Car, Cpu, TestTube,
  Cog, Activity, AlertTriangle, Zap, Shield, AlertCircle, GraduationCap
};

const DynamicNavigation: React.FC<DynamicNavigationProps> = ({
  company,
  selectedApp,
  onAppSelect,
  onMenuItemClick,
  onBackToSelection
}) => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="w-64 bg-sidebar border-r h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{company.name}</h2>
            <p className="text-sm text-muted-foreground">{company.domain}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onBackToSelection}>
            Back
          </Button>
        </div>
        
        <Separator className="mb-4" />
        
        <div className="space-y-4">
          {company.remoteApps.map((app) => (
            <div key={app.name}>
              <Button
                variant={selectedApp === app.name ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => onAppSelect(app.name)}
              >
                {app.name}
              </Button>
              
              {selectedApp === app.name && (
                <div className="ml-4 space-y-1">
                  {app.menus.map((menuItem) => (
                    <Button
                      key={menuItem.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => onMenuItemClick(app.name, menuItem)}
                    >
                      {getIcon(menuItem.icon)}
                      <span className="ml-2">{menuItem.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicNavigation;
