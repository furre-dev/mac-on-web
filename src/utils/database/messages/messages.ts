import { Message } from "@/types/messageTypes"
import { ContactId } from "@/types/contactTypes";
import messagesData from "./messages.json"

export type Conversation = {
  contact_id: ContactId;
  messages: Message[];
};

export const initialConversations = messagesData as Conversation[];