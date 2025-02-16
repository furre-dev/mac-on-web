import { ChangeEvent, createContext, FormEvent, RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Contact, ContactId } from "@/types/contactTypes";
import { Conversation, initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed, MessageInput } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage, sendMessagesToLocaleStorage } from "@/utils/localeStorageMessages";
import { useContact } from "./ContactContext";

type MessageContextType = {
  currentValue: string,
  updateMessageInput: (e: ChangeEvent<HTMLInputElement>) => null | undefined,
  sendMessage: (e: FormEvent<HTMLFormElement>) => null | undefined,
  messageFeed: MessageFeed | null,
  scrollViewRef: RefObject<HTMLDivElement | null>,
  firstRender: RefObject<boolean>,
  isWriting: {
    isTrue: boolean,
    contact_id: ContactId | null
  } | null,
  findMessageFeedByID: (id: ContactId | null) => Message[] | undefined,
  loading: boolean
};

const MessagesContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { contactsList, activeContact, firstRender } = useContact();

  const initialMessageInputs: MessageInput[] | undefined = contactsList?.map((contact) => {
    return {
      contact_id: contact.id,
      message: null
    }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [messageInputs, setMessageInputs] = useState<MessageInput[] | undefined>(initialMessageInputs);
  const [messageFeed, setMessageFeed] = useState<MessageFeed | null>(null);
  const [isWriting, setIsWriting] = useState<{
    isTrue: boolean,
    contact_id: ContactId | null
  } | null>(null);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const findMessageFeedByID = (id: ContactId | null) => {
    const messagesFromLocaleStorage = getMessagesFromLocaleStorage();

    const messageFeed = messagesFromLocaleStorage?.find((msg) => msg.contact_id === id)?.messages ?? initialConversations.find((msg) => msg.contact_id === id)?.messages;

    return messageFeed;
  }

  const updateMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!activeContact || !messageInputs) return null;

    const message = e.target.value;

    // only affect the input of the current contact.
    setMessageInputs((prevMessages) =>
      prevMessages?.map((input) =>
        input.contact_id === activeContact
          ? { ...input, message }
          : input
      )
    );
  }

  const sendMessage = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessageInputs((prev) => {
      return prev?.map((input) =>
        input.contact_id === activeContact ? { ...input, message: "" } : input
      );
    });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const message = formData.get("message") as string;

    if (message.trim() === "") {
      return null
    }

    const messagesFromLocaleStorage = getMessagesFromLocaleStorage();
    let updatedMessages = messagesFromLocaleStorage || initialConversations;

    const currentFeed = updatedMessages.find((conversation) => conversation.contact_id === activeContact);

    if (!currentFeed && activeContact) {
      const newConversation: Conversation = {
        contact_id: activeContact,
        messages: [{ content: message, sender: "user" }]
      };
      updatedMessages.push(newConversation);
    } else {
      currentFeed?.messages.push({ content: message, sender: "user" });
    }

    sendMessagesToLocaleStorage(updatedMessages);

    // **Update messageFeed state to trigger UI update**
    setMessageFeed([...updatedMessages.find((msg) => msg.contact_id === activeContact)?.messages ?? []]);
  }, [messageFeed]);

  const currentValue = messageInputs?.find((input) => input.contact_id === activeContact)?.message ?? "";

  // useEffect to update update the message feed to the correct contact, each time the contact is changed.
  useEffect(() => {
    if (loading) return;

    const messageFeed = findMessageFeedByID(activeContact)

    setMessageFeed(messageFeed);

    firstRender.current = true;
  }, [activeContact, loading]);

  // useEffect to render the "partner is writing" icon.
  useEffect(() => {
    if (firstRender.current === false) {
      //check if last message is sent from user
      if (messageFeed?.length) {
        const lastMessage = messageFeed[messageFeed.length - 1];

        if (lastMessage.sender === "user") {
          const randomTypingDelay = Math.random() * 1000 + 500; // 500ms to 1500ms delay
          const typingTimeout = setTimeout(() => {
            setIsWriting({
              isTrue: true,
              contact_id: activeContact
            });
          }, randomTypingDelay);

          const stopTypingTimeout = setTimeout(() => {
            setIsWriting({
              isTrue: false,
              contact_id: null
            });
          }, randomTypingDelay + 3000); // Ensure writing lasts for at least 1s

          return () => {
            clearTimeout(typingTimeout);
            clearTimeout(stopTypingTimeout);
          };
        }
      }
    }
  }, [messageFeed])

  // useEffect to scroll to the bottom each time
  useEffect(() => {
    if (scrollViewRef.current) {
      if (firstRender.current === true) {
        scrollViewRef.current.scrollIntoView({ behavior: "instant" });
        firstRender.current = false;
      } else {
        scrollViewRef.current.scrollIntoView({ behavior: "smooth" });

      }
    };
  }, [messageFeed?.length, isWriting]);

  return (
    <MessagesContext.Provider value={{
      currentValue,
      updateMessageInput,
      sendMessage,
      messageFeed,
      scrollViewRef,
      firstRender,
      isWriting,
      findMessageFeedByID,
      loading
    }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessagesContext);
  if (!context) throw new Error("useMessage must be used within a MessageProvider");
  return context;
}
