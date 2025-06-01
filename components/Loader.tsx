import React, { useEffect, useRef, useState } from "react";
import { loaderImgs } from "@/data/loader-imgs.data";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/utils";

export default function Loader() {
  const loaderImgContainer = useRef<HTMLDivElement>(null);
  const progressContainer = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!loaderImgContainer.current || !progressContainer.current) return;

      const loaderImgs = [...loaderImgContainer.current.children];

      const tl = gsap.timeline({
        onUpdate: () => {
          setProgress(Math.round(tl.progress() * 100));
        },
      });
      loaderImgs.forEach((img, i) => {
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

      tl.to(progressContainer.current, {
        opacity: 0,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] bg-bg">
      <div className="relative w-full h-full flex items-center justify-center">
        <div ref={loaderImgContainer} className="relative w-full h-full">
          {loaderImgs.map((img, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[1.15] w-60 h-auto overflow-hidden rounded-2xl scale-0",
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

        <div className="absolute top-1/2 left-1/2 -rotate-12 -translate-x-[20rem] translate-y-[1.5rem]">
          <p className="!font-casey text-nowrap text-sm">
            Our new collections 2025
          </p>
        </div>
        <div className="absolute top-1/2 right-1/2 rotate-12 translate-x-[16rem] -translate-y-[8rem] animate-pulse">
          <p className="!font-casey text-nowrap text-sm">quechua spirit</p>
        </div>

        <div
          ref={progressContainer}
          className="absolute bottom-0 left-0 w-full flex items-center justify-center p-4"
        >
          <p>{progress}%</p>
        </div>
      </div>
    </div>
  );
}
