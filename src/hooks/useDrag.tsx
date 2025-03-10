import { MouseEvent, RefObject, useCallback, useEffect, useRef, useState } from "react";

export default function useDrag(positionMiddle?: boolean) {
  const positions = positionMiddle ? {
    x: window.innerWidth / 2 - 300,
    y: 200,
  } : { x: 120, y: 120 }

  const [position, setPosition] = useState(positions);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [dragging]);

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseRelase = () => {
    setDragging(false);
  };

  //adding mouse event listeners to the document.
  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseRelase);
      document.addEventListener("mouseleave", handleMouseRelase);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseRelase);
      document.removeEventListener("mouseleave", handleMouseRelase);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseRelase);
      document.removeEventListener("mouseleave", handleMouseRelase);
    };
  }, [dragging])

  return { handleMouseClick, position };
}