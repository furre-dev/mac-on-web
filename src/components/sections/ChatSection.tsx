import { memo, useRef } from "react";
import { useContact } from "../context/ContactContext";
import { useMessage } from "../context/MessagesContext";
import MessageInput from "../messages/MessageInput";
import Messages from "../messages/Messages";
import NavWithContactName from "../messages/NavWithContactName";

function ChatSection() {
  const { currentContact } = useContact();
  const {
    conversation,
    updateMessageInput,
    currentValue,
    sendMessage,
    scrollViewRef,
    firstRender,
    isWriting,
  } = useMessage();

  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={containerRef}
      className="w-2/4 h-full bg-white flex flex-col">
      <NavWithContactName currentContact={currentContact} />
      <Messages
        isWriting={isWriting}
        animateChat={!firstRender.current}
        ref={scrollViewRef}
        conversation={conversation}
        messageContainer={containerRef}
      />
      <MessageInput
        inputValue={currentValue}
        sendMessage={sendMessage}
        updateMessageInput={updateMessageInput}
      />
    </div>
  )
};

export default memo(ChatSection);