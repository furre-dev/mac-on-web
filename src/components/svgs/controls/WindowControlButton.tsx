import { ControlButton } from "@/types/windowControlTypes"


export default function WindowControlButton({ type, fillColor, borderColor, hover }: ControlButton) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" fill={fillColor} stroke={borderColor} />
      {hover && iconMap[type]}
    </svg>
  )
}

const close = () => {
  return (
    <>
      <path d="M3.30937 8.6156C3.07599 8.38222 3.07599 8.00384 3.30937 7.77046L7.77046 3.30938C8.00383 3.076 8.38221 3.076 8.61559 3.30937C8.84897 3.54275 8.84897 3.92113 8.61559 4.15451L4.15451 8.61559C3.92113 8.84897 3.54275 8.84897 3.30937 8.6156Z" fill="#68110A" />
      <path d="M3.30938 3.30937C3.54275 3.07599 3.92114 3.07599 4.15451 3.30937L8.6156 7.77046C8.84898 8.00383 8.84898 8.38221 8.6156 8.61559C8.38222 8.84897 8.00384 8.84897 7.77046 8.61559L3.30938 4.15451C3.076 3.92113 3.076 3.54275 3.30938 3.30937Z" fill="#68110A" />
    </>
  )
}

const minimize = () => {
  return (
    <>
      <path d="M2.32074 5.90566C2.32074 5.48884 2.65864 5.15094 3.07546 5.15094H8.92451C9.34133 5.15094 9.67923 5.48884 9.67923 5.90566C9.67923 6.32248 9.34133 6.66037 8.92451 6.66037H3.07546C2.65864 6.66037 2.32074 6.32248 2.32074 5.90566Z" fill="#8F591C" />
    </>
  )
}

const fullscreen = () => {
  return (
    <>
      <path d="M7.29307 8.71989L8.71993 7.29302L8.67657 4.63374L4.63379 8.67652L7.29307 8.71989Z" fill="#087606" />
      <path d="M8.73578 8.26496C8.74004 8.52671 8.52675 8.74 8.265 8.73573L5.72682 8.69435C5.31776 8.68768 5.1175 8.19281 5.40678 7.90353L7.90357 5.40674C8.19286 5.11745 8.68772 5.31772 8.69439 5.72678L8.73578 8.26496Z" fill="#087606" />
      <path d="M4.70692 3.28001L3.28005 4.70687L3.32342 7.36615L7.36619 3.32337L4.70692 3.28001Z" fill="#087606" />
      <path d="M3.2642 3.73494C3.25994 3.47319 3.47323 3.25989 3.73498 3.26416L6.27316 3.30555C6.68222 3.31222 6.88249 3.80708 6.5932 4.09637L4.09641 6.59316C3.80712 6.88244 3.31226 6.68218 3.30559 6.27312L3.2642 3.73494Z" fill="#087606" />
    </>
  )
}

// we pass in a string, and get a function in return.
const iconMap = {
  close: close(),
  minimize: minimize(),
  fullscreen: fullscreen()
}