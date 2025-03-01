import IMessage from "@/components/applications/IMessage";
import { Application, TrashCan } from "@/types/applicationTypes";

import IMessageImage from "../../public/assets/imessage-logo.jpg"
import TrashCanImage from "../../public/assets/trash-empty.png"
import SafariImage from "../../public/assets/safari-icon.jpg"

export const applications: Application[] = [
  {
    application_name: "iMessage",
    component: IMessage,
    image_src: IMessageImage
  },
  {
    application_name: "safari",
    image_src: SafariImage
  }
];

export const trashCan: TrashCan = {
  application_name: "trash",
  component: null,
  image_src: TrashCanImage
}