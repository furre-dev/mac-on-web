import { Message } from "@/types/messageTypes";
import { v4 as uuidv4 } from 'uuid';

type ApiResponse = {
  response: string
}

type ReturnType = {
  newMessage: Message,
  error: null
} | {
  newMessage: null,
  error: string
}

const api_url = `${process.env.NEXT_PUBLIC_MACOS_API_URL}/api/get-message-response`

export async function getResponseMessageFromApi(messages: Message[] | undefined): Promise<ReturnType> {
  if (!messages) {
    return { error: "There was an error while getting the new message from the API.", newMessage: null };
  }

  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages
      }),
    });
    const data: ApiResponse = await response.json();

    const message_uuid = uuidv4();
    const message: Message = {
      role: "system",
      content: data.response,
      message_id: message_uuid
    };
    return { newMessage: message, error: null };
  } catch (e) {
    console.error(e);
    return { error: "There was an error while getting the new message from the API.", newMessage: null };
  }
}