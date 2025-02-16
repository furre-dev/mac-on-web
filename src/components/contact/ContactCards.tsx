import { Contact } from "@/types/contactTypes"
import ContactCard from "./ContactCard"
import { memo, useMemo } from "react";
import { useContact } from "../context/ContactContext";

function ContactCards({ contacts }: { contacts: Contact[] | null }) {
  const { setActive, isActiveContact } = useContact();

  if (!contacts) return null;

  return contacts.map((contact) => {
    const isActive = isActiveContact(contact)

    return (
      <ContactCard
        contactAction={{ setActive, isActive }}
        key={contact.id}
        contact={contact}
      />
    )
  })
}

export default memo(ContactCards)