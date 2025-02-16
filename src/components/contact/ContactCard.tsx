import { Contact, ContactId } from "@/types/contactTypes";
import ContactInfo from "./ContactInfo";
import { memo } from "react";


function ContactCard({ contact, contactAction }: { contact: Contact, contactAction: { setActive: (id: ContactId) => void, isActive: boolean } }) {
  const { isActive, setActive } = contactAction;

  return (
    <button
      onClick={() => setActive(contact.id)}
      className={`w-full h-[66px] rounded-[6.75px] relative flex items-center justify-between pl-4 pr-2 py-[6px] ${isActive ? "bg-gradient-to-br from-[#0478FB] to-[#087AF6]" : "relative"}`}>
      <ContactInfo contact={contact} isActive={isActive} />
      <p className={`${isActive ? "text-[#D3E5FF]" : "text-[#636F76]"} text-[13px] self-start font-medium absolute right-2`}>19:30</p>
      {!isActive && <hr className="absolute bottom-0 right-0 w-[82%] h-[1px] !bg-[#a7adb6] border-none rounded-full" />}
    </button>
  )
}

export default memo(ContactCard);