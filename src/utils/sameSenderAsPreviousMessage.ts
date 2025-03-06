import { MessageFeed } from "@/types/messageTypes";

export function sameSenderAsPreviousMessage(messageFeed: MessageFeed, index: number) {
  if (!messageFeed) return null;

  const currentMessage = messageFeed[index];
  const previousMessage = messageFeed[index - 1];

  // if the message is the first message of the entire feed, return true.
  if (!previousMessage) return true;

  const sameSender = currentMessage.role === previousMessage.role;

  // if same sender return true, if different sender return false
  return sameSender;
}