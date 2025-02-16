import AppStore from "../svgs/AppStore";
import Smiley from "../svgs/Smiley";
import WaveForm from "../svgs/WaveForm";
import { ChangeEvent, FormEvent } from "react";


type MessageInputProps = {
  updateMessageInput: (e: ChangeEvent<HTMLInputElement>) => null | undefined;
  inputValue: string,
  sendMessage: (e: FormEvent<HTMLFormElement>) => void;
}

export default function MessageInput({ updateMessageInput, inputValue, sendMessage }: MessageInputProps) {

  return (
    <form
      onSubmit={sendMessage}
      className="w-full py-[16px] px-3 flex justify-between items-center">
      <AppStore />
      <div className="w-full h-[27px] border-[1.5px] border-[#BBBBBB] rounded-full pl-3 pr-1 mx-3 flex">
        <input
          autoComplete="off"
          name="message"
          value={inputValue}
          onChange={updateMessageInput}
          className="font-medium placeholder:text-[#BBBBBB] text-[13px] w-full outline-none bg-transparent" placeholder="iMessage" />
        <WaveForm />
      </div>
      <Smiley />
    </form>
  )
}