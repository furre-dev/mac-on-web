import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Function to update the width
    const updateWidth = () => setWidth(window.innerWidth);

    // Set initial width when component mounts
    updateWidth();

    // Attach event listener to resize event
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener when component unmounts
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const smallDevice = width < 800

  return { width, smallDevice };
}

export default useWindowWidth;
