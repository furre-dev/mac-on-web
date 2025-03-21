import { Contact } from "@/types/contactTypes";
import FacetimeIcon from "../svgs/FacetimeIcon";
import LeftArrow from "../svgs/LeftArrow";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import ContactInitials from "../contact/ContactInitials";
import { useRef } from "react";
import { useContact } from "../context/ContactContext";
import { useMessage } from "../context/MessagesContext";
import { motion as m } from "framer-motion";

export default function MobileMessageFeed({ currentContact }: { currentContact: Contact }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { removeActiveContact } = useContact();

  const {
    conversation,
    updateMessageInput,
    currentValue,
    sendMessage,
    scrollViewRef,
    firstRender,
    isWriting,
  } = useMessage();

  return (
    <m.section
      style={{ position: "fixed" }}
      initial={{ left: "100%", position: "fixed" }}
      animate={{ left: "0%", position: "fixed" }}
      exit={{ left: "100%", position: "fixed" }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
      className="top-0 w-full h-full bg-white z-30 flex flex-col">
      <header className="w-full h-[120px] bg-[#F1F1F2] pt-11 pr-4 pb-6 flex items-center justify-between shadow-sm">
        <LeftArrow action={removeActiveContact} />
        <div className="flex flex-col items-center">
          <ContactInitials contact_name={currentContact.contact_name} />
          <p className="font-medium text-xs mt-1">{currentContact.contact_name}</p>
        </div>
        <FacetimeIcon />
      </header>
      <section className="grow overflow-hidden">
        <Messages
          isWriting={isWriting}
          animateChat={!firstRender.current}
          ref={scrollViewRef}
          conversation={conversation}
          messageContainer={containerRef}
        />
      </section>
      <section className="py-2 px-4 bg-white">
        <MessageInput
          inputValue={currentValue}
          sendMessage={sendMessage}
          updateMessageInput={updateMessageInput}
        />
      </section>
    </m.section>
  )
}