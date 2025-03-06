import { ChangeEvent, createContext, FormEvent, RefObject, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ContactId } from "@/types/contactTypes";
import { Conversation, initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed, MessageInput } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage, sendMessagesToLocaleStorage } from "@/utils/localeStorageMessages";
import { useContact } from "./ContactContext";
import { ActionType, initialState, messageReducer, Status } from "@/utils/messageReducer";
import { messageFromInput } from "@/utils/messageFromInput";
import { getResponseMessageFromApi } from "@/utils/api/getResponseMessageFromApi";

type IsWriting = {
  isTrue: boolean,
  contact_id: ContactId | null
}

type MessageContextType = {
  currentValue: string,
  updateMessageInput: (e: ChangeEvent<HTMLInputElement>) => null | undefined,
  sendMessage: (e: FormEvent<HTMLFormElement>) => Promise<null | undefined>,
  messageFeed: MessageFeed | null,
  scrollViewRef: RefObject<HTMLDivElement | null>,
  firstRender: RefObject<boolean>,
  isWriting: IsWriting | null,
  findMessageFeedByID: (id: ContactId | null) => Message[] | undefined,
  loading: boolean
};

const MessagesContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { activeContactId, initialMessageInputs, currentContact } = useContact();
  const [state, send] = useReducer(messageReducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [messageInputs, setMessageInputs] = useState<MessageInput[] | undefined>(initialMessageInputs);
  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [isWriting, setIsWriting] = useState<IsWriting | null>(null);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);

  const currentValue = messageInputs?.find((input) => input.contact_id === activeContactId)?.message ?? "";
  const conversation = conversations?.find((c) => c.contact_id === activeContactId);
  const messageFeed = conversation?.messages;

  useEffect(() => {
    setLoading(false);
  }, []);

  const findMessageFeedByID = (id: ContactId | null) => {
    const messagesFromLocaleStorage = getMessagesFromLocaleStorage();

    const messageFeed = messagesFromLocaleStorage?.find((msg) => msg.contact_id === id)?.messages ?? initialConversations.find((msg) => msg.contact_id === id)?.messages;

    return messageFeed;
  }

  const updateMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!activeContactId || !messageInputs) return null;

    const message = e.target.value;

    // only affect the input of the current contact.
    setMessageInputs((prevMessages) =>
      prevMessages?.map((input) =>
        input.contact_id === activeContactId
          ? { ...input, message }
          : input
      )
    );
  }

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!conversations || !activeContactId) return null;

    setMessageInputs((prev) => {
      return prev?.map((input) =>
        input.contact_id === activeContactId ? { ...input, message: "" } : input
      );
    });

    const { message, messageIsEmpty } = messageFromInput(e);
    if (messageIsEmpty) {
      return null
    }

    const newMessage: Message = { role: "user", content: message }

    firstRender.current = false;

    setConversations((prev) => {
      if (!prev) return null;

      return prev.map((conv) =>
        conv.contact_id === activeContactId ? { ...conv, messages: [...conv.messages, newMessage] } : conv
      );
    });

    send({ type: ActionType.SEND_MESSAGE });
  };

  useEffect(() => {
    if (!conversations) return;

    sendMessagesToLocaleStorage(conversations);
  }, [conversations]);



  // useEffect to render "partner is writing" icon
  useEffect(() => {
    if (state.status === Status.WAITING_FOR_RESPONSE) {
      setIsWriting({
        isTrue: true,
        contact_id: activeContactId
      });
      //TODO: Handle AI chatbot response here.
      if (messageFeed && messageFeed[messageFeed.length - 1].role === "user") {
        (async () => {
          const { newMessage, error } = await getResponseMessageFromApi(conversation?.messages);

          if (error) {
            setIsWriting({
              isTrue: false,
              contact_id: null,
            });
          }

          if (newMessage) {
            setIsWriting({
              isTrue: false,
              contact_id: null
            });

            setTimeout(() => {
              setConversations((prev) => {
                if (!prev) return null;

                return prev.map((conv) =>
                  conv.contact_id === activeContactId ? { ...conv, messages: [...conv.messages, newMessage] } : conv
                );
              });
            }, 500);
          }

          send({ type: ActionType.SET_IDLE });
        }
        )();
      }
    } else {
      setIsWriting({
        isTrue: false,
        contact_id: null
      });
    }
  }, [state.status, messageFeed?.length]);

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

  useEffect(() => {
    firstRender.current = true;
    const messagesFromLocaleStorage = getMessagesFromLocaleStorage();
    let conversations = messagesFromLocaleStorage || initialConversations;
    const currentConversation = conversations.find((c) => c.contact_id === activeContactId);
    if (!currentConversation && activeContactId) {
      conversations.push({
        contact_id: activeContactId,
        messages: []
      })
    }

    setConversations(conversations);
  }, [activeContactId]);

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
