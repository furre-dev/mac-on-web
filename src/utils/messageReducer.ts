import { useReducer } from "react";
import { Conversation } from "./database/messages/messages";
import { ContactId } from "@/types/contactTypes";
import { Message } from "@/types/messageTypes";

export enum Status {
  IDLE = "idle",
  WAITING_FOR_RESPONSE = "waiting_for_response",
  SUCCESS = "success",
  ERROR = "error"
}

export enum ActionType {
  SET_IDLE = "SET_IDLE",
  SET_WAITING_FOR_RESPONSE = "SET_WAITING_FOR_RESPONSE",
  SET_ERROR = "SET_ERROR",
  SEND_MESSAGE = "SEND_MESSAGE"
}

export type State = {
  status: Status,
  error?: string,
}

export type Action = {
  type: ActionType,
  error?: string,
}

export const initialState: State = {
  status: Status.IDLE,
};

export const messageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_IDLE:
      return { ...state, status: Status.IDLE };
    case ActionType.SET_ERROR:
      return { ...state, status: Status.ERROR, error: action.error };
    case ActionType.SEND_MESSAGE:
      return { ...state, status: Status.WAITING_FOR_RESPONSE };
    default:
      throw new Error("Invalid action type");
  }
}
