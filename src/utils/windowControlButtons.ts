import { ControlButton, ControlButtonType } from "@/types/windowControlTypes";

export const windowControlButtons: ControlButton[] = [
  {
    type: "close",
    fillColor: "#FD5B5B",
    borderColor: "#BD5F57",
    hover: null,
    buttonBehaviour: "close"
  },
  {
    type: "minimize",
    fillColor: "#FFBB31",
    borderColor: "#D8AD55",
    hover: null,
    buttonBehaviour: "minimize"
  },
  {
    type: "fullscreen",
    fillColor: "#28C941",
    borderColor: "#50AA6C",
    hover: null,
    buttonBehaviour: "fullscreen"
  },
];

export type ButtonBehaviourMap = {
  [key in ControlButtonType]?: (application_name: string) => void;
};


