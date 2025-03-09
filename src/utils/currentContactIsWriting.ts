import { IsWriting } from "@/components/context/MessagesContext";
import { ContactId } from "@/types/contactTypes";

export function currentContactIsWriting(id: ContactId | undefined, isWriting: IsWriting | null) {
  if (!id) {
    return false
  }

  const currentIsWriting = isWriting?.isTrue && isWriting.contact_id === id;
  return currentIsWriting;
}