import IMessage from "@/components/applications/IMessage";
import { Application, TrashCan } from "@/types/applicationTypes";

import IMessageImage from "../../public/assets/imessage-logo.jpg"
import TrashCanImage from "../../public/assets/trash-empty.png"

export const applications: Application[] = [
  {
    application_name: "iMessage",
    component: IMessage,
    image_src: IMessageImage
  }
]

export const trashCan: TrashCan = {
  application_name: "trash",
  component: null,
  image_src: TrashCanImage
}