import { createContext, useContext, useEffect, useState } from "react";
import { Application } from "@/types/applicationTypes";

type ApplicationsContextType = {
  appsOpen: ListApplicationType | null;
  openApp: (application_name: string) => void;
  closeApp: (application_name: string) => void;
  setNewTimestamp: (application_name: string) => void;
};

type ListApplicationType = { application_name: Application["application_name"]; timestamp: number }[];

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [appsOpen, setAppsOpen] = useState<ListApplicationType | null>(null);

  // useEffect to ensure we never have any duplicate maps.
  useEffect(() => {
    if (appsOpen?.length) {
      // Remove duplicates by creating a map based on application_name
      const uniqueApps = appsOpen.reduce((acc: ListApplicationType, app) => {
        // Check if app with the same application_name already exists
        if (!acc.some((existingApp) => existingApp.application_name === app.application_name)) {
          acc.push(app);
        }
        return acc;
      }, [] as ListApplicationType);

      // Update the state with the unique apps only
      setAppsOpen(uniqueApps);
    }
  }, [appsOpen?.length]);

  const setNewTimestamp = (application_name: string) => {
    const timestamp = Date.now();
    const app = appsOpen?.find(app => app.application_name === application_name);
    if (app) {
      setAppsOpen((prev) => {
        // Find if the app already exists
        const appIndex = prev?.findIndex((app) => app.application_name === application_name);

        // If the app exists, update its timestamp
        if (appIndex !== undefined && appIndex !== -1) {
          const updatedApps = [...(prev || [])];
          updatedApps[appIndex] = { ...updatedApps[appIndex], timestamp }; // Update the timestamp
          return updatedApps;
        }

        // If the app doesn't exist, add a new entry
        return [...(prev || []), { application_name, timestamp }];
      });
    }
  }

  const openApp = (application_name: string) => {
    const timestamp = Date.now();
    setAppsOpen((prev) => [...(prev || []), { application_name: application_name, timestamp: timestamp }]);
  };

  const closeApp = (application_name: string) => {
    setAppsOpen((prev) => {
      if (!prev) return null;
      return prev.filter((app) => app.application_name !== application_name);
    });
  };

  return (
    <ApplicationsContext.Provider value={{
      appsOpen,
      closeApp,
      openApp,
      setNewTimestamp
    }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) throw new Error("useApplications must be used within a ApplicationsProvider");
  return context;
}
