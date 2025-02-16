import { MessageFeed } from "@/types/messageTypes";

// This checks if the current message is the last message a user has sent in a row.
export const isLastMessage = (messageFeed: MessageFeed, index: number) => {

  if (!messageFeed || messageFeed.length < 1) {
    return null
  }

  const currentMessage = messageFeed[index];
  const previousMessage = messageFeed[index - 1];
  const nextMessage = messageFeed[index + 1] ?? null;

  if (!previousMessage) {
    // if there is no previous message means this is the FIRST message in the feed.
    // return TRUE if this message is the ONLY message in the feed & return TRUE if the following message is a different sender.
    // return false if this message is the first message, but the next message is same sender.
    return messageFeed.length === 1 || currentMessage.sender !== nextMessage.sender
  }

  // no matter what, if next message is also from sender, return false.
  if (nextMessage) {
    const nextMessageFromSameSender = currentMessage.sender === nextMessage.sender;
    return !nextMessageFromSameSender
  }

  const lastMessageOfEntireFeed = index === messageFeed.length - 1;
  const previousMessageFromSameSender = currentMessage.sender === previousMessage.sender;

  const isLast = lastMessageOfEntireFeed || previousMessageFromSameSender;

  return isLast
} 