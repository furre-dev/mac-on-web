
import { Message } from "@/types/messageTypes";
import MessageEdge from "./svgs/MessageEdge";
import { motion as m, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMessage } from "./context/MessagesContext";
import { RefObject, useEffect, useRef } from "react";
import LinkPreviewWithImage from "./messages/LinkPreviewWithImage";

type ChatBubbleProps = {
  message: Message,
  isLast: boolean | null,
  animateChat: boolean,
  sameSenderAsPrev: boolean | null,
  container: RefObject<HTMLDivElement | null>
}

export default function ChatBubble({ message, isLast, animateChat, sameSenderAsPrev, container }: ChatBubbleProps) {
  const messageBubbleRef = useRef<HTMLLIElement>(null);
  const { setMessageHasBeenRead } = useMessage();
  const isInView = useInView(messageBubbleRef, { root: container, margin: "100px" })

  useEffect(() => {
    if (isInView) {
      setMessageHasBeenRead(message.message_id)
    }
  }, [isInView, messageBubbleRef]);


  const messageIsFromUser = message.role === "user";
  const chatColor = messageIsFromUser ? "#278EFF" : "#E9E8EB";
  const textColor = messageIsFromUser ? "#FFFFFF" : "#242424";



  if (message.isLink?.image) {
    return (
      <m.li
        ref={messageBubbleRef}
        initial={animateChat ? { opacity: "0%", y: 10 } : false}
        animate={animateChat ? { opacity: "100%", y: 0 } : false}
        style={{
          color: textColor,
          background: chatColor,
          marginLeft: messageIsFromUser ? "auto" : 0,
        }}
        className={`${sameSenderAsPrev ? "" : "!mt-[10px]"} max-w-[64.92%] w-full min-h-40 rounded-[16.25px] text-[13px] relative ml-auto pb-[6.5px] font-semibold`}>
        <Link href={message.content} target="_blank">
          <LinkPreviewWithImage isLink={message.isLink} />
          {isLast && <MessageEdge sender={message.role} />}
        </Link>
      </m.li>
    )
  }

  return (
    <m.li
      ref={messageBubbleRef}
      initial={animateChat ? { opacity: "0%", y: 10 } : false}
      animate={animateChat ? { opacity: "100%", y: 0 } : false}
      style={{
        color: textColor,
        background: chatColor,
        marginLeft: messageIsFromUser ? "auto" : 0,
      }}
      className={`${sameSenderAsPrev ? "" : "!mt-[10px]"} max-w-[64.92%] w-max rounded-[16.25px] text-[13px] relative ml-auto py-[6.5px] px-[11px] font-medium`}>
      {message.isLink?.webpage_url ? (
        <Link
          className="text-blue-600"
          target="_blank"
          href={message.content}>
          {message.isLink.webpage_url}
        </Link>)
        :
        (<p className="break-words">
          {message.content}
        </p>)
      }
      {isLast && <MessageEdge sender={message.role} />}
    </m.li>
  )
}