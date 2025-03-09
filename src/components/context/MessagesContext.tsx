import { ChangeEvent, createContext, FormEvent, RefObject, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ContactId } from "@/types/contactTypes";
import { Conversation, initialConversations } from "@/utils/database/messages/messages";
import { Message, MessageFeed, MessageInput } from "@/types/messageTypes";
import { getMessagesFromLocaleStorage, sendMessagesToLocaleStorage } from "@/utils/localeStorageMessages";
import { useContact } from "./ContactContext";
import { ActionType, initialState, messageReducer, Status } from "@/utils/messageReducer";
import { messageFromInput } from "@/utils/messageFromInput";
import { getResponseMessageFromApi } from "@/utils/api/getResponseMessageFromApi";
import { isValidUrl } from "@/utils/isValidUrl";
import { getUrlMetadata } from "@/utils/api/getUrlMetadata";

export type IsWriting = {
  isTrue: boolean,
  contact_id: ContactId | null
}

type MessageContextType = {
  currentValue: string,
  updateMessageInput: (e: ChangeEvent<HTMLInputElement>) => null | undefined,
  sendMessage: (e: FormEvent<HTMLFormElement>) => Promise<null | undefined>,
  conversation: Conversation | undefined,
  scrollViewRef: RefObject<HTMLDivElement | null>,
  firstRender: RefObject<boolean>,
  isWriting: IsWriting | null,
  findMessageFeedByID: (id: ContactId | null) => MessageFeed,
  loading: boolean
};

const MessagesContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { initialMessageInputs, currentContact } = useContact();
  const [state, send] = useReducer(messageReducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [messageInputs, setMessageInputs] = useState<MessageInput[] | undefined>(initialMessageInputs);
  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [isWriting, setIsWriting] = useState<IsWriting | null>(null);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const linksValidated = useRef(false);

  const currentValue = messageInputs?.find((input) => input.contact_id === currentContact?.id)?.message ?? "";
  const conversation = conversations?.find((c) => c.contact_id === currentContact?.id);
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
    if (!currentContact?.id || !messageInputs) return null;

    const message = e.target.value;

    // only affect the input of the current contact.
    setMessageInputs((prevMessages) =>
      prevMessages?.map((input) =>
        input.contact_id === currentContact?.id
          ? { ...input, message }
          : input
      )
    );
  }

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!conversations || !currentContact?.id) return null;

    setMessageInputs((prev) => {
      return prev?.map((input) =>
        input.contact_id === currentContact?.id ? { ...input, message: "" } : input
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
        conv.contact_id === currentContact?.id ? { ...conv, messages: [...conv.messages, newMessage] } : conv
      );
    });

    if (currentContact?.canReply) {
      send({ type: ActionType.SEND_MESSAGE });
    }
  };

  useEffect(() => {
    if (!conversations) return;

    // here we go through ALL of the messages in each conversation.
    // We check each message if the message is a link, if already asigned it's link values we don't do anything.
    // If it's a new message we try to fetch it's Link Metadata and asign it. And then we save the message with it's correct values to our LocalStorage

    // ONLY if it's the initial render.
    if (linksValidated.current === false) {
      linksValidated.current = true;
      //async iife to fetch correct Link Metadata for each message with content of valid link.
      (async () => {
        const conversationsWithLinks: Conversation[] = await Promise.all(
          conversations.map(async (conversation) => {
            const messages: Message[] = await Promise.all(conversation.messages.map(async (message) => {
              // If message is a link and message.isLink is not defined yet.
              if (isValidUrl(message.content) && message.isLink === undefined) {
                const data = await getUrlMetadata(message.content);
                if (data) {
                  return { ...message, isLink: data }
                }
              }
              return message
            }));
            return { ...conversation, messages: messages }
          })
        )

        setConversations(conversationsWithLinks);
      })()
    }

    sendMessagesToLocaleStorage(conversations);
  }, [conversations]);

  // useEffect to render "partner is writing" icon
  useEffect(() => {
    if (state.status === Status.WAITING_FOR_RESPONSE) {
      if (!isWriting?.isTrue) {
        setIsWriting({
          isTrue: true,
          contact_id: currentContact?.id || null
        });
      }
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
                  conv.contact_id === currentContact?.id ? { ...conv, messages: [...conv.messages, newMessage] } : conv
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
      } else {
        scrollViewRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  }, [messageFeed?.length, isWriting, currentContact?.id]);

  useEffect(() => {
    firstRender.current = true;
    const messagesFromLocaleStorage = getMessagesFromLocaleStorage();

    let conversations = messagesFromLocaleStorage || initialConversations;

    const currentConversation = conversations.find((c) => c.contact_id === currentContact?.id);

    if (!currentConversation && currentContact?.id) {
      conversations.push({
        contact_id: currentContact?.id,
        messages: []
      })
    }

    setConversations(conversations);
  }, [currentContact?.id]);

  return (
    <MessagesContext.Provider value={{
      currentValue,
      updateMessageInput,
      sendMessage,
      conversation,
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
