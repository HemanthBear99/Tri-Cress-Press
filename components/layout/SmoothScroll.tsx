"use client";

import { ReactLenis as ReactLenisOriginal } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

// Cast to any to bypass React 19 type incompatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactLenis = ReactLenisOriginal as any;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const wantsReduced = useReducedMotion();
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    // disable on studio or when reduced motion is preferred
    if (isStudio || wantsReduced) {
      setEnable(false);
      return;
    }

    // Disable on small screens or non-fine pointers
    const supportsFinePointer = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(pointer: fine)").matches : true;
    const isSmall = typeof window !== "undefined" ? window.innerWidth < 768 : false;

    setEnable(supportsFinePointer && !isSmall);
  }, [isStudio, wantsReduced]);

  if (!enable) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
