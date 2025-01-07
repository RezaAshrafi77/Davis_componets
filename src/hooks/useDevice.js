import { useEffect, useState } from "react";

export default function useDevice() {
  const [device, setDevice] = useState("mobile");
  const checkDevice = () => {
    const width = window.innerWidth;
    if (width < 672) {
      setDevice("mobile");
    } else if (width >= 672 && width < 952) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }
  };
  useEffect(() => {
    checkDevice();
    window.addEventListener("resize", () => {
      checkDevice();
    });
  }, []);
  return [device];
}
