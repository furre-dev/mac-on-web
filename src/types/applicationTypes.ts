import { StaticImageData } from "next/image"
import { ComponentType, JSX, ReactElement } from "react"

type Component = ComponentType | null

export type Application = {
  component: Component,
  image_src: StaticImageData,
  application_name: string,
}

export type TrashCan = {
  component: null,
  image_src: StaticImageData,
  application_name: "trash"
}