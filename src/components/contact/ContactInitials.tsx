import { Contact, ContactName } from "@/types/contactTypes";
import { getInitials } from "@/utils/getInitials";



export default function ContactInitials({ contact_name }: { contact_name: ContactName }) {
  const initials = getInitials(contact_name);

  return (
    <div className="w-[48px] h-[48px] md:w-[41px] md:h-[41px] my-auto rounded-full bg-gradient-to-b from-[#A4AAB7] to-[#818895] grid place-content-center pointer-events-none">
      <span className="text-[20px] md:text-[17px] font-bold text-white leading-none">{initials}</span>
    </div>
  )
}