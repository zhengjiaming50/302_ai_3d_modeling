import { useEffect, useState } from "react";

const SUPPORT_WINDOW_SIZE = 300;

export function useWindowSize() {
  const [isSupportWindowSize, setIsSupportWindowSize] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SUPPORT_WINDOW_SIZE - 1}px)`);
    const onChange = () => {
      setIsSupportWindowSize(window.innerWidth < SUPPORT_WINDOW_SIZE);
    };
    mql.addEventListener("change", onChange);
    setIsSupportWindowSize(window.innerWidth < SUPPORT_WINDOW_SIZE);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSupportWindowSize;
}
