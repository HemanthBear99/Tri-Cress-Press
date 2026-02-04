"use client";

import { ReactLenis as ReactLenisOriginal } from "@studio-freight/react-lenis";

import { usePathname } from "next/navigation";

// Cast to any to bypass React 19 type incompatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactLenis = ReactLenisOriginal as any;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
