
# Module Federation Development Guide

This application uses Module Federation to load remote applications dynamically. Each company's apps run on separate URLs and are loaded on-demand.

## Remote App URLs

- **ADP Employee Management**: http://localhost:3001
- **ADP HR Analytics**: http://localhost:3002
- **Ford Vehicle Production**: http://localhost:3003
- **Ford Design Studio**: http://localhost:3004
- **KCF Machine Operations**: http://localhost:3005
- **KCF Safety Systems**: http://localhost:3006

## Setting Up Remote Apps

Each remote app should be configured with Module Federation to expose its components:

### Example Remote App Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'employeeApp', // Must match the scope in menuConfig.ts
      filename: 'remoteEntry.js',
      exposes: {
        './EmployeeModule': './src/EmployeeModule.tsx', // Must match module path
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 3001, // Must match URL in menuConfig.ts
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
```

### Example Remote Component

```typescript
// src/EmployeeModule.tsx
import React from 'react';

interface RemoteModuleProps {
  menuItem: { id: string; label: string; path: string };
  appName: string;
  basePath: string;
}

const EmployeeModule: React.FC<RemoteModuleProps> = ({ menuItem, appName }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{menuItem.label}</h1>
      <p>This is the {appName} remote application.</p>
      {/* Your remote app content here */}
    </div>
  );
};

export default EmployeeModule;
```

## Development Workflow

1. **Start the host application** (this app):
   ```bash
   npm run dev
   ```

2. **Start each remote application** on their respective ports:
   ```bash
   # Terminal 1 - Employee App
   cd employee-app && npm run dev

   # Terminal 2 - Analytics App  
   cd analytics-app && npm run dev

   # And so on for each remote app...
   ```

3. **Access the application**: Navigate to http://localhost:8080

## Troubleshooting

- Ensure all remote apps are running on their configured ports
- Check that remote apps expose the correct module paths
- Verify that the `remoteEntry.js` files are accessible
- Use browser dev tools to check for CORS issues
- Check console for Module Federation loading errors

## Adding New Remote Apps

1. Update `src/config/menuConfig.ts` with the new app configuration
2. Add the remote entry to `vite.config.ts` remotes section
3. Create and start the new remote application
4. Test the integration

```

All necessary files have been created and configured for Module Federation. The application now supports loading remote modules from separate URLs.
