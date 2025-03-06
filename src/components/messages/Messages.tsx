
import { isLastMessage } from "@/utils/isLastMessage";
import ChatBubble from "../ChatBubble";
import { MessageFeed } from "@/types/messageTypes";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { memo, RefObject } from "react";
import IsWriting from "../svgs/IsWriting";
import { AnimatePresence } from "framer-motion";
import { currentMessageData } from "@/utils/currentMessageData";

type MessageProps = {
  messageFeed: MessageFeed | null,
  ref: RefObject<HTMLDivElement | null>,
  animateChat: boolean,
  isWriting?: boolean,
}

function Messages({ messageFeed, ref, animateChat, isWriting }: MessageProps) {
  const currentTime = getCurrentTime();

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
                  sameSenderAsPrev={sameSenderAsPrev}
                  animateChat={animateChat}
                  key={i}
                  content={message.content}
                  role={message.role}
                  isLast={isLast}
                />
              )
            })}
            <AnimatePresence mode="wait">
              {isWriting && (<IsWriting />)}
            </AnimatePresence>
            <div ref={ref} className="w-full h-[1px]"></div>
          </ul>
        </>)}
    </div>
  )
};

export default memo(Messages);