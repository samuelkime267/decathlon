import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import Dots from "./Dots";
import { languages } from "@/data/nav.data";
import gsap from "gsap";

export default function Languages() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [playDots, setPlayDots] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      if (!headerRef.current) return;
      const q = gsap.utils.selector(headerRef.current);
      const languageLinkName = q(".language-link-name");
      const linksContainer = q(".links-container")[0];
      const globalTl = gsap.timeline({ paused: true });
      const showNavTl = gsap.timeline({
        paused: true,
        defaults: { ease: "power1.inOut" },
      });

      const containerHeight = linksContainer.scrollHeight;

      showNavTl
        .fromTo(
          headerRef.current,
          { width: 80, borderRadius: 16 },
          {
            width: 132,
            borderRadius: 12,
          }
        )
        .to(
          linksContainer,
          {
            height: containerHeight,
          },
          "<"
        );

      globalTl.to(languageLinkName, {
        translateY: 0,
        stagger: 0.075,
      });

      const playTl = () => {
        showNavTl.play();
        globalTl.play();
        setPlayDots(true);
      };
      const reverseTl = () => {
        showNavTl.reverse();
        globalTl.reverse();
        setPlayDots(false);
      };

      headerRef.current.addEventListener("mouseenter", playTl);
      headerRef.current.addEventListener("mouseleave", reverseTl);

      return () => {
        headerRef.current?.removeEventListener("mouseenter", playTl);
        headerRef.current?.removeEventListener("mouseleave", reverseTl);
      };
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="fixed top-4 right-4 bg-sec/60 backdrop-blur-sm rounded-2xl w-20 flex flex-col items-start justify-start p-1"
    >
      <div className="w-full flex items-center justify-between gap-1 px-2 py-1">
        <div className="relative overflow-hidden">
          <p
            className={cn(
              "!font-dec-display text-xs text-pri capitalize font-medium"
            )}
          >
            english
          </p>
        </div>

        <Dots play={playDots} double />
      </div>

      <div className="links-container h-0 overflow-hidden w-full">
        <div className="w-full flex items-start justify-start gap-0.5 flex-col">
          {languages.map((language, i) => {
            if (i === 0) return;

            return (
              <div
                key={i}
                className="w-full hover:bg-pri/20 p-2 rounded-md overflow-hidden cursor-pointer"
              >
                <p className="!font-dec-display text-xs text-pri capitalize translate-y-[150%] text-nowrap language-link-name">
                  {language}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
