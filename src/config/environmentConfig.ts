
// Environment-based configuration for remote module URLs
export const getRemoteUrl = (appName: string, port: number): string => {
  const baseUrl = import.meta.env[`VITE_${appName.toUpperCase()}_APP_URL`];
  if (baseUrl) {
    return `${baseUrl}/assets/remoteEntry.js`;
  }
  
  // Fallback to localhost for development
  return `http://localhost:${port}/assets/remoteEntry.js`;
};

export const remoteUrls = {
  employeeApp: getRemoteUrl('employee', 3001),
  analyticsApp: getRemoteUrl('analytics', 3002),
  vehicleApp: getRemoteUrl('vehicle', 3003),
  designApp: getRemoteUrl('design', 3004),
  machineApp: getRemoteUrl('machine', 3005),
  safetyApp: getRemoteUrl('safety', 3006),
};
