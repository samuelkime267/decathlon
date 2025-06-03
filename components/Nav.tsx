import React, { useEffect, useRef, useState } from "react";
import { navMenuLinks } from "@/data/nav.data";
import Image from "next/image";
import gsap from "gsap";
import Dots from "./Dots";
import { cn } from "@/utils";

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [playDots, setPlayDots] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      if (!navRef.current) return;
      const q = gsap.utils.selector(navRef.current);
      const navLinks = q(".nav-links");
      const linksContainer = q(".links-container")[0];
      const globalTl = gsap.timeline({ paused: true });
      const showNavTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power1.inOut" },
      });

      const containerHeight = linksContainer.scrollHeight;

      showNavTl
        .fromTo(
          navRef.current,
          { width: 106, borderRadius: 16 },
          {
            width: 192,
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

      navLinks.forEach((link, i) => {
        const qLink = gsap.utils.selector(link);
        const imgHolder = qLink(".img-holder");
        const navLinkName = qLink(".nav-link-name");

        const duration = 0.35;
        const startText = duration - duration / 5;
        const tl = gsap.timeline({ defaults: { duration } });

        tl.fromTo(
          imgHolder,
          {
            scale: 0,
            rotate: 30,
          },
          {
            scale: 1,
            rotate: 0,
          }
        );
        tl.to(
          navLinkName,
          {
            translateY: 0,
          },
          `-=${startText}`
        );

        globalTl.add(tl, i === 0 ? 0 : `-=${startText}`);
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

      navRef.current.addEventListener("mouseenter", playTl);
      navRef.current.addEventListener("mouseleave", reverseTl);

      return () => {
        navRef.current?.removeEventListener("mouseenter", playTl);
        navRef.current?.removeEventListener("mouseleave", reverseTl);
      };
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-4 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:top-4 lg:left-4 bg-sec/60 backdrop-blur-sm w-[6.625rem] rounded-2xl flex flex-col items-start justify-start p-1 h-fit"
    >
      <div className="w-full flex items-center justify-between gap-4 px-2 py-1">
        <div className="relative overflow-hidden">
          {navMenuLinks.map(({ name }, i) => (
            <p
              key={i}
              className={cn(
                "!font-dec-display text-xs text-pri capitalize font-medium",
                { "absolute top-0 left-0 translate-y-full": i !== 0 }
              )}
            >
              {name}
            </p>
          ))}
        </div>

        <Dots play={playDots} />
      </div>

      <div className="links-container h-0 overflow-hidden w-full">
        <div className="w-full flex items-start justify-start gap-0.5 flex-col pt-1">
          {navMenuLinks.map(({ img, name }, i) => (
            <div
              key={i}
              className="nav-links flex items-center justify-between gap-4 w-full hover:bg-pri/15 p-1 pr-2 rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-start gap-2">
                <div className="size-12 bg-pri rounded-md overflow-hidden img-holder scale-0 rotate-[30deg]">
                  <Image
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="!font-dec-display text-xs text-pri capitalize nav-link-name translate-y-full">
                    {name}
                  </p>
                </div>
              </div>

              <div className="size-[2.5px] rounded-full bg-pri/30" />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
