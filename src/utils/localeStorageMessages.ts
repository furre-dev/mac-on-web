import { Conversation } from "./database/messages/messages";

const VARIABLE_NAME = "messageFeedV3";

export function getMessagesFromLocaleStorage() {
  let parsedMessages: Conversation[] | null = null;

  try {
    const messagesFromLocalStorage = localStorage.getItem(VARIABLE_NAME);
    parsedMessages = messagesFromLocalStorage ? JSON.parse(messagesFromLocalStorage) : null;
  } catch (error) {
    console.error("Error parsing messages from localStorage:", error);
  }

  return parsedMessages
}

export function sendMessagesToLocaleStorage(messages: Conversation[]) {
  localStorage.setItem(VARIABLE_NAME, JSON.stringify(messages));
}