"use client;"

import { motion as m } from "framer-motion";

export default function LoadingScreen() {
  return (
    <m.main
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 2 }}
      className="w-screen h-screen bg-black flex flex-col justify-center items-center space-y-20">
      <svg width="92" height="112" viewBox="0 0 92 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M89.0618 38.1846C88.4063 38.6887 76.8343 45.1517 76.8343 59.5228C76.8343 76.1452 91.5593 82.0258 92 82.1714C91.9322 82.5299 89.6607 90.225 84.2363 98.0658C79.3996 104.966 74.3481 111.854 66.6636 111.854C58.979 111.854 57.0014 107.43 48.1302 107.43C39.4851 107.43 36.4113 112 29.3821 112C22.353 112 17.4485 105.615 11.8094 97.7746C5.27748 88.5673 0 74.2634 0 60.6877C0 38.9127 14.2842 27.3643 28.3425 27.3643C35.8123 27.3643 42.0391 32.2256 46.7289 32.2256C51.1927 32.2256 58.154 27.0731 66.6523 27.0731C69.873 27.0731 81.445 27.3643 89.0618 38.1846ZM62.6179 17.8546C66.1324 13.7214 68.6186 7.9864 68.6186 2.25143C68.6186 1.45615 68.5508 0.649665 68.4039 0C62.6857 0.212821 55.8826 3.77478 51.7804 8.49045C48.5596 12.1196 45.5536 17.8546 45.5536 23.668C45.5536 24.5417 45.7005 25.4153 45.7683 25.6954C46.13 25.7626 46.7176 25.841 47.3052 25.841C52.4358 25.841 58.8886 22.4358 62.6179 17.8546Z" fill="white" />
      </svg>
      <div className="relative w-[332px] h-2 bg-[#222222] rounded-full overflow-hidden">
        <m.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
          className="absolute h-full top-0 left-0 bg-[#C6C6C6]" />
      </div>
    </m.main>
  )
}