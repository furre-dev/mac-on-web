import { MessageSender } from "@/types/messageTypes"

export default function MessageEdge({ sender }: { sender: MessageSender }) {

  if (sender === "system") {
    return (
      <div className="absolute -left-[4.5px] bottom-0.5">
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.00269 4.45056C5.00269 7.94921 2.02364 9.75539 0.00461102 10.8489C7.50173 10.9481 10.4956 8.54035 12 6.96079V0.951904H5.00269V4.45056Z" fill="#E9E8EB" />
        </svg>
      </div>
    )
  }


  return (
    <div className="absolute -right-[4.8px] bottom-[2px]">
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 3.5C7 7 9.9802 8.80687 12 9.90084C4.5 10 1.50494 7.59136 0 6.01119V0H7V3.5Z" fill="#278EFF" />
      </svg>
    </div>
  )
}




