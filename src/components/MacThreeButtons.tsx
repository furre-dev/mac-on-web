"use client";
import { ButtonBehaviourMap, windowControlButtons } from "@/utils/windowControlButtons";
import WindowControlButton from "./svgs/controls/WindowControlButton";
import { memo, useState } from "react";
import { useApplications } from "./context/ApplicationsContext";

function MacThreeButtons({ application_name }: { application_name: string }) {
  const { closeApp } = useApplications()
  const [hovering, setHovering] = useState<boolean | null>(null);

  const buttonBehaviourMap: ButtonBehaviourMap = {
    close: closeApp,
  }

  return (
    <div className="space-x-2">
      {windowControlButtons.map((btn, i) => {

        return (
          <button
            onClick={() => buttonBehaviourMap[btn.buttonBehaviour]?.(application_name)}
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            key={i}
          >
            <WindowControlButton
              type={btn.type}
              fillColor={btn.fillColor}
              borderColor={btn.borderColor}
              hover={hovering}
              buttonBehaviour={btn.buttonBehaviour}
            />
          </button>
        )
      })}
    </div>
  )
}

export default memo(MacThreeButtons);