import { MessageFeed } from "@/types/messageTypes";

export function getLastMessage(feed: MessageFeed) {
  if (!feed) return null;

  const length = feed.length;

  const message = feed[length - 1].content;

  if (message.length > 79) {
    return `${message.slice(0, 80).trim()}...`
  }

  return message
}