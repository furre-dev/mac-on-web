"use client";
import ChatSection from "@/components/sections/ChatSection";
import ContactSection from "@/components/sections/ContactSection";
import useDrag from "@/hooks/useDrag";

export default function IMessage() {
  //custom hook to handle the drag effect
  const { handleMouseClick, position } = useDrag();

  return (
    <div
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`
      }}
      className="w-[777px] h-[611px] rounded-[10px] flex overflow-hidden absolute shadow-[120px]">
      <ContactSection handleMouseClick={handleMouseClick} />
      <ChatSection />
    </div>
  );
}
