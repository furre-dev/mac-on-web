import { createContext, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { contacts } from "@/utils/database/contacts/contacts";
import { Contact, ContactId } from "@/types/contactTypes";
import { initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage } from "@/utils/localeStorageMessages";

type ContactContextType = {
  activeContactId: ContactId | null;
  setActive: (id: ContactId) => void;
  isActiveContact: (contact: Contact) => boolean
  currentContact: Contact | undefined;
  contactsList: Contact[] | null;
  firstRender: RefObject<boolean>
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const firstRender = useRef(true);
  const [activeContactId, setActiveContact] = useState<ContactId | null>(null);

  const setActive = (contactId: ContactId) => {
    setActiveContact((prev) => (prev === contactId ? prev : contactId));
  }

  const isActiveContact = (contact: Contact) => activeContactId === contact.id;

  const currentContact = contacts?.find((contact) => contact.id === activeContactId);

  const contactsList = contacts;

  return (
    <ContactContext.Provider value={{
      activeContactId,
      setActive,
      isActiveContact,
      currentContact,
      contactsList,
      firstRender
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContact must be used within a ContactProvider");
  return context;
}
