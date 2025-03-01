import { createContext, Dispatch, RefObject, SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { contacts } from "@/utils/database/contacts/contacts";
import { Contact, ContactId } from "@/types/contactTypes";
import { initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed, MessageInput } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage } from "@/utils/localeStorageMessages";
import { Application } from "@/types/applicationTypes";

type ApplicationsContextType = {
  appsOpen: Application["application_name"][] | null;
  openApp: (application_name: string) => void;
  closeApp: (application_name: string) => void
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [appsOpen, setAppsOpen] = useState<Application["application_name"][] | null>(null);

  const openApp = (application_name: string) => {
    setAppsOpen((prev) => [...(prev || []), application_name]);
  };

  const closeApp = (application_name: string) => {
    setAppsOpen((prev) => {
      if (!prev) return null;
      return prev.filter((app) => app !== application_name);
    });
  };

  return (
    <ApplicationsContext.Provider value={{
      appsOpen,
      closeApp,
      openApp
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
