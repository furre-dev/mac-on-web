import { Contact } from "@/types/contactTypes";
import { memo } from "react";

function NavWithContactName({ currentContact }: { currentContact: Contact | undefined }) {
  return (
    <nav className="shadow-sm bg-gradient-to-r from-[#F6F5F6] to-[#f6f5f685] border-b border-[#DCDCDC] backdrop-blur-[150px] w-full h-14 pl-4 flex items-center">
      <p className="text-[13px] text-[#808080]">
        To:&nbsp;&nbsp;{currentContact && <span className="text-[#272727] font-medium">{currentContact.contact_name}</span>}
      </p>
    </nav>
  )
}

export default memo(NavWithContactName)