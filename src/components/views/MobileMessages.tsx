import { contacts } from "@/utils/database/contacts/contacts";
import ContactCards from "../contact/ContactCards";
import MicIcon from "../svgs/MicIcon";
import SmallMagnifyingGlass from "../svgs/SmallMagnifyingGlass";
import { useContact } from "../context/ContactContext";
import LeftArrow from "../svgs/LeftArrow";
import ContactInitials from "../contact/ContactInitials";
import FacetimeIcon from "../svgs/FacetimeIcon";
import Messages from "../messages/Messages";
import { useMessage } from "../context/MessagesContext";
import { useRef } from "react";
import MessageInput from "../messages/MessageInput";
import MobileMessageFeed from "../messages/MobileMessageFeed";
import { AnimatePresence } from "framer-motion";

export default function MobileMessages() {
  const { currentContact } = useContact();

  return (
    <main className="w-full min-h-screen bg-white pt-5 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentContact && (
          <MobileMessageFeed key={"mobileMessageFeed"} currentContact={currentContact} />
        )}
      </AnimatePresence>
      <nav className="px-4">
        <section className="flex justify-center relative pr-4">
          <button className="absolute top-0 left-0 text-base font-medium text-[#3478F6]">Edit</button>
          <h1 className="text-[17px] text-black font-semibold">Messages</h1>
        </section>
        <div className="w-full py-2 rounded-[10px] bg-[#EEEEEF] border flex items-center px-[8px] mt-3">
          <SmallMagnifyingGlass />
          <input
            maxLength={20}
            className="ml-[6px] w-full h-full bg-transparent outline-none tex-[17px] font-normal placeholder:text-[#6E646D]"
            placeholder="Search" />
          <MicIcon />
        </div>
      </nav>
      <section className="w-full flex flex-col mt-4">
        <ContactCards mobile contacts={contacts} />
      </section>
    </main>
  )
}