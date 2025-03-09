
import { Contact } from "@/types/contactTypes";
import ContactInitials from "./ContactInitials";
import { getLastMessage } from "@/utils/getLastMessage";
import { useMessage } from "../context/MessagesContext";
import IsWriting from "../svgs/IsWriting";
import { currentContactIsWriting } from "@/utils/currentContactIsWriting";

export default function ContactInfo({ contact, isActive }: { contact: Contact, isActive: boolean }) {
  const { findMessageFeedByID, loading, isWriting } = useMessage();

  const feed = findMessageFeedByID(contact.id);
  const lastMessage = getLastMessage(feed);

  const currentIsWriting = currentContactIsWriting(contact.id, isWriting);

  return (
    <div className="flex h-full w-full">
      <ContactInitials contact_name={contact.contact_name} />
      <div className="h-full aspect-square pl-2 text-left flex-1">
        <h4 className={`text-sm font-bold  ${isActive ? "text-white" : "text-[#414344]"}`}>
          {contact.contact_name}
        </h4>
        {currentIsWriting ? <IsWriting invertColor animate /> : !loading ? (
          <p className={`text-xs mt-0.5 font-medium ${isActive ? "text-[#D3E5FF]" : "text-[#636F76]"}`}>
            {lastMessage}
          </p>
        ) : null}
      </div>
    </div>
  )
}