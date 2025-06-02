import { useStore } from "@/store/loader.store";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function Hero() {
  const heroContainer = useRef<HTMLDivElement>(null);
  const { isLoaderDone } = useStore((state) => state.loader);

  useEffect(() => {
    if (!isLoaderDone) return;

    const ctx = gsap.context(() => {
      if (!heroContainer.current || !isLoaderDone) return;
      const q = gsap.utils.selector(heroContainer.current);
      const heroVideoContainer = q(".hero-video-container");
      const tl = gsap.timeline();

      tl.to(heroVideoContainer, {
        clipPath: "inset(1% round 20px)",
        rotate: 0,
        duration: 1,
      }).to(heroVideoContainer, {
        clipPath: "inset(0% round 0px)",
        duration: 0.35,
      });
    });

    return () => ctx.revert();
  }, [isLoaderDone]);

  return (
    <section
      ref={heroContainer}
      className="relative z-50 w-full h-screen overflow-hidden"
    >
      <div className="hero-video-container w-full h-full rotate-12">
        <video
          onLoadedData={() => console.log("loaded")}
          onPlay={() => console.log("play")}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src={"/videos/hero-loop.mp4"} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
