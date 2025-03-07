
import { Message } from "@/types/messageTypes";
import MessageEdge from "./svgs/MessageEdge";
import { motion as m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ChatBubbleProps = Message & {
  isLast: boolean | null,
  animateChat: boolean,
  sameSenderAsPrev: boolean | null
}

export default function ChatBubble({ role, content, isLast, animateChat, sameSenderAsPrev, isLink }: ChatBubbleProps) {
  const messageIsFromUser = role === "user";
  const chatColor = messageIsFromUser ? "#278EFF" : "#E9E8EB";
  const textColor = messageIsFromUser ? "#FFFFFF" : "#242424";

  if (isLink) {
    return (
      <m.li
        initial={animateChat ? { opacity: "0%", y: 10 } : false}
        animate={animateChat ? { opacity: "100%", y: 0 } : false}
        style={{
          color: textColor,
          background: chatColor,
          marginLeft: messageIsFromUser ? "auto" : 0,
        }}
        className={`${sameSenderAsPrev ? "" : "!mt-[10px]"} max-w-[64.92%] w-full min-h-40 rounded-[16.25px] text-[13px] relative ml-auto pb-[6.5px] font-semibold`}>
        <Link href={content} target="_blank">
          <div className="w-full relative rounded-t-[16.25px] overflow-hidden">
            <Image
              width={1000}
              height={1000}
              className="w-full bg-cover"
              alt={isLink.description}
              src={isLink.image} />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[3%]" />
          </div>
          <section className="break-words px-[11px] mt-[6.5px]">
            <p>{isLink.title}</p>
            <p className="text-[#7F7F81] font-medium pt-1">{isLink.webpage_url}</p>
          </section>
          {isLast && <MessageEdge sender={role} />}
        </Link>
      </m.li>
    )
  }


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
      {isLast && <MessageEdge sender={role} />}
    </m.li>
  )
}