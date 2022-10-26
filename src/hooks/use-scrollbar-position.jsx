import { useEffect, useState } from "react";

export const useScrollbarPosition = () => {
  const [scrollbarPosition, setScrollbarPosition] = useState({
    scrollY: undefined,
    scrollX: undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollbarPosition({
        scrollY: window.scrollY,
        scrollX: window.scrollX,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, []);

  return scrollbarPosition;
};
