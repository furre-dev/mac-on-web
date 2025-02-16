import { memo } from "react";
import { useContact } from "../context/ContactContext";
import { useMessage } from "../context/MessagesContext";
import MessageInput from "../messages/MessageInput";
import Messages from "../messages/Messages";
import NavWithContactName from "../messages/NavWithContactName";

function ChatSection() {
  const { currentContact } = useContact();
  const {
    messageFeed,
    updateMessageInput,
    currentValue,
    sendMessage,
    scrollViewRef,
    firstRender,
    isWriting } = useMessage();

  return (
    <div className="w-2/4 h-full bg-white flex flex-col">
      <NavWithContactName currentContact={currentContact} />
      <Messages
        isWriting={isWriting?.isTrue}
        animateChat={!firstRender.current}
        ref={scrollViewRef}
        messageFeed={messageFeed} />
      <MessageInput
        inputValue={currentValue}
        sendMessage={sendMessage}
        updateMessageInput={updateMessageInput}
      />
    </div>
  )
};

export default memo(ChatSection);