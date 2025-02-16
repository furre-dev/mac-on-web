import { MessageFeed } from "@/types/messageTypes";
import { isLastMessage } from "./isLastMessage";
import { sameSenderAsPreviousMessage } from "./sameSenderAsPreviousMessage";

export function currentMessageData(messageFeed: MessageFeed, index: number) {
  const isLast = isLastMessage(messageFeed, index);
  const sameSenderAsPrev = sameSenderAsPreviousMessage(messageFeed, index);

  return { isLast, sameSenderAsPrev }
}