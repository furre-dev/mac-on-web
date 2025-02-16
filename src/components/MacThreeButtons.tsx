"use client";
import { windowControlButtons } from "@/utils/windowControlButtons";
import WindowControlButton from "./svgs/controls/WindowControlButton";
import { useState } from "react";

export default function MacThreeButtons() {
  const [hovering, setHovering] = useState<boolean | null>(null);


  return (
    <div className="space-x-2">
      {windowControlButtons.map((btn, i) => {
        return (
          <button
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            key={i}
          >
            <WindowControlButton
              type={btn.type}
              fillColor={btn.fillColor}
              borderColor={btn.borderColor}
              hover={hovering}
            />
          </button>
        )
      })}
    </div>
  )
}