import { ContactId } from "./contactTypes"

export type MessageSender = "user" | "system"

export type Message = {
  role: MessageSender,
  content: string,
}

export type MessageFeed = Message[] | undefined

export type MessageInput = {
  message: string | null,
  contact_id: ContactId
}