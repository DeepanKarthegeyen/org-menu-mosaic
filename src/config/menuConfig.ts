
import { Company } from '../types/company';
import { remoteUrls } from './environmentConfig';

export const menuConfig: Company[] = [
  {
    id: 'adp',
    name: 'ADP',
    domain: 'HCM (Human Capital Management)',
    remoteApps: [
      {
        name: 'Employee Management',
        url: remoteUrls.employeeApp.replace('/assets/remoteEntry.js', ''),
        scope: 'employeeApp',
        module: './EmployeeModule',
        menus: [
          { id: 'employees', label: 'Employees', path: '/employees', icon: 'Users' },
          { id: 'payroll', label: 'Payroll', path: '/payroll', icon: 'DollarSign' },
          { id: 'benefits', label: 'Benefits', path: '/benefits', icon: 'Heart' },
          { id: 'performance', label: 'Performance', path: '/performance', icon: 'TrendingUp' },
          { id: 'recruitment', label: 'Recruitment', path: '/recruitment', icon: 'UserPlus' }
        ]
      },
      {
        name: 'HR Analytics',
        url: remoteUrls.analyticsApp.replace('/assets/remoteEntry.js', ''),
        scope: 'analyticsApp',
        module: './AnalyticsModule',
        menus: [
          { id: 'dashboard', label: 'HR Dashboard', path: '/dashboard', icon: 'BarChart3' },
          { id: 'reports', label: 'Reports', path: '/reports', icon: 'FileText' },
          { id: 'insights', label: 'Insights', path: '/insights', icon: 'Brain' }
        ]
      }
    ]
  },
  {
    id: 'ford',
    name: 'Ford',
    domain: 'Vehicle Manufacturing',
    remoteApps: [
      {
        name: 'Vehicle Production',
        url: remoteUrls.vehicleApp.replace('/assets/remoteEntry.js', ''),
        scope: 'vehicleApp',
        module: './VehicleModule',
        menus: [
          { id: 'assembly', label: 'Assembly Line', path: '/assembly', icon: 'Factory' },
          { id: 'quality', label: 'Quality Control', path: '/quality', icon: 'CheckCircle' },
          { id: 'inventory', label: 'Parts Inventory', path: '/inventory', icon: 'Package' },
          { id: 'maintenance', label: 'Equipment Maintenance', path: '/maintenance', icon: 'Wrench' },
          { id: 'shipping', label: 'Shipping', path: '/shipping', icon: 'Truck' }
        ]
      },
      {
        name: 'Design Studio',
        url: remoteUrls.designApp.replace('/assets/remoteEntry.js', ''),
        scope: 'designApp',
        module: './DesignModule',
        menus: [
          { id: 'models', label: 'Vehicle Models', path: '/models', icon: 'Car' },
          { id: 'prototypes', label: 'Prototypes', path: '/prototypes', icon: 'Cpu' },
          { id: 'testing', label: 'Testing', path: '/testing', icon: 'TestTube' }
        ]
      }
    ]
  },
  {
    id: 'kcf',
    name: 'KCF',
    domain: 'Industrial Machinery',
    remoteApps: [
      {
        name: 'Machine Operations',
        url: remoteUrls.machineApp.replace('/assets/remoteEntry.js', ''),
        scope: 'machineApp',
        module: './MachineModule',
        menus: [
          { id: 'operations', label: 'Operations', path: '/operations', icon: 'Cog' },
          { id: 'monitoring', label: 'Machine Monitoring', path: '/monitoring', icon: 'Activity' },
          { id: 'predictive', label: 'Predictive Maintenance', path: '/predictive', icon: 'AlertTriangle' },
          { id: 'efficiency', label: 'Efficiency Analytics', path: '/efficiency', icon: 'Zap' }
        ]
      },
      {
        name: 'Safety Systems',
        url: remoteUrls.safetyApp.replace('/assets/remoteEntry.js', ''),
        scope: 'safetyApp',
        module: './SafetyModule',
        menus: [
          { id: 'protocols', label: 'Safety Protocols', path: '/protocols', icon: 'Shield' },
          { id: 'incidents', label: 'Incident Reports', path: '/incidents', icon: 'AlertCircle' },
          { id: 'training', label: 'Safety Training', path: '/training', icon: 'GraduationCap' }
        ]
      }
    ]
  }
];
