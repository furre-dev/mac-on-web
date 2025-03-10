
import { isLastMessage } from "@/utils/isLastMessage";
import ChatBubble from "../ChatBubble";
import { MessageFeed } from "@/types/messageTypes";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { memo, RefObject, useRef } from "react";
import IsWriting from "../svgs/IsWriting";
import { AnimatePresence } from "framer-motion";
import { currentMessageData } from "@/utils/currentMessageData";
import { IsWriting as IsWritingType } from "../context/MessagesContext";
import { currentContactIsWriting } from "@/utils/currentContactIsWriting";
import { Conversation } from "@/utils/database/messages/messages";

type MessageProps = {
  conversation: Conversation | undefined,
  ref: RefObject<HTMLDivElement | null>,
  animateChat: boolean,
  isWriting: IsWritingType | null,
  messageContainer: RefObject<HTMLDivElement | null>
}

function Messages({ conversation, ref, animateChat, isWriting, messageContainer }: MessageProps) {
  const currentTime = getCurrentTime();

  const currentIsWriting = currentContactIsWriting(conversation?.contact_id, isWriting);
  const messageFeed = conversation?.messages;

  return (
    <div
      className="chat-section w-full h-full max-h-full overflow-y-scroll overflow-x-hidden p-4 pr-1 pt-1 flex flex-col">
      {messageFeed && (
        <>
          <p className="text-[#BBBBBB] text-[11px] text-center font-thin">iMessage</p>
          <p className="text-[#BBBBBB] text-[11px] text-center font-normal">Today <span className="font-medium">{currentTime}</span></p>
          <ul className="space-y-[3px] mt-3">
            {messageFeed.map((message, i) => {
              const { isLast, sameSenderAsPrev } = currentMessageData(messageFeed, i);
              return (
                <ChatBubble
                  message={message}
                  sameSenderAsPrev={sameSenderAsPrev}
                  animateChat={animateChat}
                  key={i}
                  isLast={isLast}
                  container={messageContainer}
                />
              )
            })}
            <AnimatePresence mode="wait">
              {currentIsWriting && (<IsWriting animate={animateChat} />)}
            </AnimatePresence>
            <div ref={ref} className="w-full h-[1px]"></div>
          </ul>
        </>)}
    </div>
  )
};

export default memo(Messages);