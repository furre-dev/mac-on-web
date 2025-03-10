import { UrlApiResponse } from "@/utils/api/getUrlMetadata"
import { ContactId } from "./contactTypes"

export type MessageSender = "user" | "system"

export type MessageUUID = string;

export type Message = {
  message_id: MessageUUID;
  role: MessageSender,
  content: string,
  isLink?: UrlApiResponse
  readAt?: number;
}

export type MessageFeed = Message[] | undefined

export type MessageInput = {
  message: string | null,
  contact_id: ContactId
}