
import { Company } from '../types/company';

const SESSION_KEY = 'company_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface SessionData {
  company: Company;
  credentials: { username: string; password: string };
  timestamp: number;
}

export const saveSession = (company: Company, credentials: { username: string; password: string }) => {
  const sessionData: SessionData = {
    company,
    credentials,
    timestamp: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = (): SessionData | null => {
  try {
    const sessionJson = localStorage.getItem(SESSION_KEY);
    if (!sessionJson) return null;

    const sessionData: SessionData = JSON.parse(sessionJson);
    const now = Date.now();
    
    // Check if session has expired (24 hours)
    if (now - sessionData.timestamp > SESSION_DURATION) {
      clearSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error('Error reading session:', error);
    clearSession();
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const isSessionValid = (): boolean => {
  return getSession() !== null;
};
