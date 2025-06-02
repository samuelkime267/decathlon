import { useStore } from "@/store/loader.store";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import trackingImg from "@/assets/imgs/others/Image-tracking.webp";
import { Play } from "./icons";

export default function Hero() {
  const [startLoader, setStartLoader] = useState(false);
  const heroContainer = useRef<HTMLDivElement>(null);
  const { isLoaderDone } = useStore((state) => state.loader);

  useEffect(() => {
    if (
      !isLoaderDone
      //|| !startLoader
    )
      return;

    const ctx = gsap.context(() => {
      if (
        !heroContainer.current ||
        !isLoaderDone
        // || !startLoader
      )
        return;

      const q = gsap.utils.selector(heroContainer.current);
      const heroVideoContainer = q(".hero-video-container");
      const heroContainerHolder = q(".hero-container-holder");
      const tl = gsap.timeline();

      tl.to(heroContainerHolder, {
        clipPath: "inset(1% round 20px)",
        rotate: 0,
        duration: 1,
      }).to(heroContainerHolder, {
        clipPath: "inset(0% round 0px)",
        duration: 0.35,
      });
    });

    return () => ctx.revert();
  }, [isLoaderDone, startLoader]);

  return (
    <section
      id="hero"
      ref={heroContainer}
      className="relative z-40 w-full h-screen overflow-hidden"
    >
      <div className="hero-container-holder relative w-full h-full rotate-12">
        <div className="hero-video-container w-full h-full">
          <video
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement;
              if (video.readyState >= 3) setStartLoader(true);
            }}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src={"/videos/hero-loop.mp4"} type="video/mp4" />
          </video>
        </div>

        <div className="absolute top-0 left-0 w-full h-full p-4">
          <div className="w-full h-full relative flex items-center justify-center flex-col">
            <div className="">
              <h1 className="text-pri text-9xl max-w-[20pc] lg:max-w-[40pc] text-center">
                Feel alive in every footstep
              </h1>
            </div>

            <div className="absolute bottom-0 left-0 mt-auto w-full hidden lg:flex items-end justify-between ">
              <p
                data-text="scroll to see full collection"
                className="!font-casey text-nowrap text-sm text-pri wiggle"
              >
                scroll to see full collection
              </p>

              <div className="bg-pri grid grid-cols-[1fr_auto] gap-1.5 p-1 rounded-[0.8rem] cursor-pointer group">
                <div className="w-32 h-auto aspect-[1.6] overflow-hidden rounded-lg">
                  <Image
                    src={trackingImg}
                    alt="tracking image"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="h-full flex items-start justify-start flex-col p-1.5">
                  <p className="text-xs tracking-tighter text-sec w-[3.1pc] leading-[1.15] mb-auto">
                    Discover full video
                  </p>
                  <div className="relative size-8 ml-auto">
                    <div className="bg-sec p-2.5 rounded-full w-fit transition-all duration-300 group-hover:p-3 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                      <Play className="size-2.5 text-pri" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
