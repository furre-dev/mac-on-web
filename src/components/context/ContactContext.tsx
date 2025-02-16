import { createContext, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { contacts } from "@/utils/database/contacts/contacts";
import { Contact, ContactId } from "@/types/contactTypes";
import { initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed, MessageInput } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage } from "@/utils/localeStorageMessages";

type ContactContextType = {
  activeContactId: ContactId | null;
  setActive: (id: ContactId) => void;
  isActiveContact: (contact: Contact) => boolean
  currentContact: Contact | undefined;
  initialMessageInputs: MessageInput[] | undefined;
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

  const initialMessageInputs: MessageInput[] | undefined = contactsList?.map((contact) => {
    return {
      contact_id: contact.id,
      message: null
    }
  });

  return (
    <ContactContext.Provider value={{
      activeContactId,
      setActive,
      isActiveContact,
      currentContact,
      initialMessageInputs,
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
