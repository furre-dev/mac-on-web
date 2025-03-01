import { StaticImageData } from "next/image"
import { ComponentType, JSX, ReactElement } from "react"

export type Application = {
  component?: ComponentType,
  image_src: StaticImageData,
  application_name: string,
}

export type TrashCan = {
  component: null,
  image_src: StaticImageData,
  application_name: "trash"
}