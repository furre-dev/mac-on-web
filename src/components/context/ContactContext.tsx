import { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";
import { contacts } from "@/utils/database/contacts/contacts";
import { Contact, ContactId } from "@/types/contactTypes";
import { initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage } from "@/utils/localeStorageMessages";

type ContactContextType = {
  activeContact: ContactId | null;
  setActiveContact: (id: ContactId) => void;
  isActiveContact: (contact: Contact) => boolean;
  currentContact: Contact | undefined;
  contactsList: Contact[] | null;
  firstRender: RefObject<boolean>
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const firstRender = useRef(true);
  const [activeContact, setActiveContact] = useState<ContactId | null>(null);

  const isActiveContact = (contact: Contact) => {
    return contact.id === activeContact
  }

  const currentContact = contacts?.find((contact) => contact.id === activeContact);

  const contactsList = contacts;

  return (
    <ContactContext.Provider value={{
      activeContact,
      setActiveContact,
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
