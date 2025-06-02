import React, { useEffect, useRef, useState } from "react";
import { loaderImgs } from "@/data/loader-imgs.data";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/utils";
import { Arrow, ArrowLeft } from "./icons";
import { useStore } from "@/store/loader.store";

export default function Loader() {
  const loaderContainer = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { setLoaderDone } = useStore((state) => state);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!loaderContainer.current) return;
      const q = gsap.utils.selector(loaderContainer.current);
      const loaderImgsContainer = q(".loader-img-container");
      const loaderProgressContainer = q(".loader-progress-container");
      const loaderTextContainer = q(".loader-text-container");

      const tl = gsap.timeline({
        onUpdate: () => {
          const progress = Math.round(tl.progress() * 100);
          if (progress > 65) setLoaderDone();
          setProgress(progress);
        },
      });
      tl.to(loaderTextContainer, {
        opacity: 1,
        duration: 1,
      });
      loaderImgsContainer.forEach((img, i) => {
        const rotate = i % 2 === 0 ? "4.5deg" : "-4.5deg";
        tl.to(
          img,
          {
            scale: 1,
            rotate,
            duration: 0.7,
            onStart: () => {
              setProgress((i + 1) / loaderImgs.length);
            },
          },
          "-=0.3"
        );
      });

      tl.to(loaderProgressContainer, {
        opacity: 0,
      });
    });

    return () => {
      ctx.revert();
    };
  }, [setLoaderDone]);

  return (
    <div
      ref={loaderContainer}
      className="fixed top-0 left-0 w-full h-full z-30 bg-bg"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {loaderImgs.map((img, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[1.15] w-60 h-auto overflow-hidden rounded-2xl scale-0 loader-img-container",
                  {
                    "rotate-[4.5deg]": i % 2 === 0,
                    "-rotate-[4.5deg]": i % 2 === 1,
                  }
                )}
              >
                <Image
                  src={img}
                  alt="loader"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-[20rem] translate-y-[1.5rem] hidden md:flex items-center justify-center flex-col loader-text-container opacity-0">
          <p
            data-text="our new collections 2025"
            className="!font-casey text-nowrap text-sm -rotate-12 wiggle"
          >
            Our new collections 2025
          </p>
          <div className="relative w-fit -rotate-[120deg]  ml-12">
            <Arrow className="size-8" />
            <Arrow className="absolute top-0 left-0 wiggle-animation w-full h-full" />
          </div>
        </div>
        <div className="absolute top-1/2 right-1/2 translate-x-[16rem] -translate-y-[8rem] hidden md:flex items-center justify-center flex-col gap-1.5 loader-text-container opacity-0">
          <p
            data-text="quechua spirit"
            className="!font-casey text-nowrap text-sm rotate-12 wiggle"
          >
            quechua spirit
          </p>
          <div className="relative w-fit rotate-[80deg] scale-x-[-1] mr-12">
            <ArrowLeft className="size-6" />
            <ArrowLeft className="absolute top-0 left-0 wiggle-animation w-full h-full" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full flex items-center justify-center p-4 loader-progress-container">
          <p>{progress}%</p>
        </div>
      </div>
    </div>
  );
}
