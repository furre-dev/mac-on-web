export type ControlButtonType = "close" | "minimize" | "fullscreen";

export type ControlButton = {
  type: ControlButtonType,
  hover: boolean | null,
  fillColor: string,
  borderColor: string,
  buttonBehaviour: ControlButtonType;
}