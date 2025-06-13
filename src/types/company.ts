
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface RemoteApp {
  name: string;
  url: string;
  scope: string;
  module: string;
  menus: MenuItem[];
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  remoteApps: RemoteApp[];
}
