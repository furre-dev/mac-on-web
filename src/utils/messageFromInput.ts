import { FormEvent } from "react";

export function messageFromInput(e: FormEvent<HTMLFormElement>) {
  const form = e.currentTarget;
  const formData = new FormData(form);
  const message = formData.get("message") as string;

  const messageIsEmpty = message.trim() === "";

  return { message, messageIsEmpty }
}