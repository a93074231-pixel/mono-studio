"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FluidBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const container = backgroundRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".fluid-pink", {
        x: 70, y: 45, scale: 1.12, rotation: 8,
        duration: 13, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".fluid-magenta", {
        x: -55, y: 50, scale: 1.1, rotation: -9,
        duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".fluid-soft", {
        x: 30, y: -45, scale: 1.08,
        duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={backgroundRef} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#EFEFEF]">
      <div className="fluid-pink absolute -left-[25%] -top-[35%] h-[100vh] w-[95vw] rounded-full bg-[#D253B6]/25 blur-[110px] md:blur-[150px]" />
      <div className="fluid-magenta absolute -right-[30%] top-[0%] h-[105vh] w-[90vw] rounded-full bg-[#A11882]/15 blur-[120px] md:blur-[170px]" />
      <div className="fluid-soft absolute -bottom-[65%] left-[5%] h-[105vh] w-[100vw] rounded-full bg-[#F3B8E4]/45 blur-[110px] md:blur-[160px]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#151515_0.55px,transparent_0.55px)] [background-size:7px_7px]" />
    </div>
  );
}
