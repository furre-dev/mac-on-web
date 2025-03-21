import { Contact } from "@/types/contactTypes"
import ContactCard from "./ContactCard"
import { memo, useMemo } from "react";
import { useContact } from "../context/ContactContext";

function ContactCards({ contacts, mobile }: { contacts: Contact[] | null, mobile?: boolean }) {
  const { setActive, isActiveContact } = useContact();

  if (!contacts) return null;

  return contacts.map((contact) => {
    const isActive = isActiveContact(contact)

    return (
      <ContactCard
        contactAction={{ setActive, isActive: mobile ? false : isActive }}
        mobile={mobile ?? false}
        key={contact.id}
        contact={contact}
      />
    )
  })
}

export default memo(ContactCards)