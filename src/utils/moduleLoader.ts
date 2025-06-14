
// Utility functions for loading remote modules
export const loadRemoteModule = async (url: string, scope: string, module: string) => {
  try {
    // Check if the remote is already loaded
    if (!(window as any)[scope]) {
      // Load the remote entry
      await loadScript(url);
    }

    // Initialize the container
    const container = (window as any)[scope];
    await container.init((window as any).__webpack_share_scopes__.default);

    // Load the module
    const factory = await container.get(module);
    return factory();
  } catch (error) {
    console.error(`Failed to load remote module ${scope}/${module} from ${url}:`, error);
    throw error;
  }
};

const loadScript = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

export const isRemoteAvailable = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
