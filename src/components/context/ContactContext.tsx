import { createContext, useContext, useState } from "react";
import { contacts } from "@/utils/database/contacts/contacts";
import { Contact, ContactId } from "@/types/contactTypes";
import { MessageInput } from "@/types/messageTypes";

type ContactContextType = {
  setActive: (id: ContactId) => void;
  isActiveContact: (contact: Contact) => boolean
  currentContact: Contact | undefined;
  initialMessageInputs: MessageInput[] | undefined;
  removeActiveContact: () => void;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [activeContactId, setActiveContact] = useState<ContactId | null>(null);

  const setActive = (contactId: ContactId) => {
    setActiveContact((prev) => (prev === contactId ? prev : contactId));
  }

  const removeActiveContact = () => {
    console.log("ebem")
    setActiveContact(null);
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
      setActive,
      isActiveContact,
      currentContact,
      initialMessageInputs,
      removeActiveContact
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
