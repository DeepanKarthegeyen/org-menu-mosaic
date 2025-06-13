
# Menu Configuration

This directory contains the configuration files for the micro-frontend menu system.

## Editing Menu Configuration

To modify the menu structure for different companies, edit `menuConfig.ts`.

### Structure

Each company configuration includes:
- `id`: Unique identifier for the company
- `name`: Display name of the company
- `domain`: Business domain description
- `remoteApps`: Array of remote applications

Each remote app includes:
- `name`: Application name
- `url`: URL where the remote app is hosted
- `scope`: Module federation scope
- `module`: Module federation module path
- `menus`: Array of menu items

Each menu item includes:
- `id`: Unique identifier for the menu item
- `label`: Display text for the menu
- `path`: Route path for the menu item
- `icon`: Icon name from Lucide React icons

### Available Icons

The system supports the following Lucide React icons:
- Users, DollarSign, Heart, TrendingUp, UserPlus
- BarChart3, FileText, Brain, Factory, CheckCircle
- Package, Wrench, Truck, Car, Cpu, TestTube
- Cog, Activity, AlertTriangle, Zap, Shield
- AlertCircle, GraduationCap

### Adding New Companies

1. Add a new company object to the `menuConfig` array
2. Define the remote applications for that company
3. Configure the menu items for each application
4. Ensure all icon names are from the available set

### Example

```typescript
{
  id: 'new-company',
  name: 'New Company',
  domain: 'Business Domain',
  remoteApps: [
    {
      name: 'App Name',
      url: 'http://localhost:3007',
      scope: 'appScope',
      module: './AppModule',
      menus: [
        { id: 'menu1', label: 'Menu Item', path: '/path', icon: 'Users' }
      ]
    }
  ]
}
```
