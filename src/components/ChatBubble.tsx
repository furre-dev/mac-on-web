
import { Message } from "@/types/messageTypes";
import MessageEdge from "./svgs/MessageEdge";
import { motion as m } from "framer-motion";

type ChatBubbleProps = Message & {
  isLast: boolean | null,
  animateChat: boolean,
  sameSenderAsPrev: boolean | null
}

export default function ChatBubble({ sender, content, isLast, animateChat, sameSenderAsPrev }: ChatBubbleProps) {
  const messageIsFromUser = sender === "user";
  const chatColor = messageIsFromUser ? "#278EFF" : "#E9E8EB";
  const textColor = messageIsFromUser ? "#FFFFFF" : "#242424";

  return (
    <m.li
      initial={animateChat ? { opacity: "0%", y: 10 } : false}
      animate={animateChat ? { opacity: "100%", y: 0 } : false}
      style={{
        color: textColor,
        background: chatColor,
        marginLeft: messageIsFromUser ? "auto" : 0,
      }}
      className={`${sameSenderAsPrev ? "" : "!mt-[10px]"} max-w-[64.92%] w-max rounded-[16.25px] text-[13px] relative ml-auto py-[6.5px] px-[11px] font-medium`}>
      <p className="break-words">{content}</p>
      {isLast && <MessageEdge sender={sender} />}
    </m.li>
  )
}