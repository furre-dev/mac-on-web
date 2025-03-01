import { memo, MouseEvent, useState } from "react";
import ContactCard from "../contact/ContactCard";
import InputField from "../InputField";
import MacThreeButtons from "../MacThreeButtons";
import SquareAndPencil from "../svgs/SquareAndPencil";
import { contacts } from "@/utils/database/contacts/contacts";
import ContactCards from "../contact/ContactCards";

function ContactSection({ handleMouseClick }: { handleMouseClick: (e: MouseEvent<HTMLDivElement>) => void }) {
  return (
    <div className={`backdrop-blur-[150px] w-2/4 h-full bg-gradient-to-r from-[#c8d4dde5] to-[#e2e6e9a8] flex flex-col items-center border-r-[2px] border-[#C5C1C4] box-border`}>
      <nav
        onMouseDown={handleMouseClick}
        className="w-full h-14 pl-8 pr-4 flex items-center justify-between">
        <MacThreeButtons application_name="iMessage" />
        <SquareAndPencil />
      </nav>
      <div className="w-[93%]">
        <InputField />
        <div className="mt-4 w-full space-y-1">
          <ContactCards contacts={contacts} />
        </div>
      </div>
    </div>
  )
}

export default memo(ContactSection);