import { cn } from "@/utils";
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import GSDevTools from "gsap/dist/GSDevTools";

type DotsProps = {
  className?: string;
  play: boolean;
  double?: boolean;
};

export default function Dots({ className, play, double }: DotsProps) {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const tl = useMemo(() => gsap.timeline({ paused: true }), []);

  useEffect(() => {
    if (!dotsContainerRef.current) return;
    gsap.registerPlugin(GSDevTools);

    const ctx = gsap.context(() => {
      if (!dotsContainerRef.current) return;

      const q = gsap.utils.selector(dotsContainerRef.current);
      const dotTl = q(".dot-tl")[0];
      const dotTr = q(".dot-tr")[0];
      const dotBl = q(".dot-bl")[0];
      const dotBr = q(".dot-br")[0];

      tl.to(dotsContainerRef.current, { rotate: 135 })
        .to(dotTl, { top: 3, left: 3 }, "<")
        .to(dotTr, { top: 3, right: 3 }, "<")
        .to(dotBl, { bottom: 3, left: 3 }, "<")
        .to(dotBr, { bottom: 3, right: 3 }, "<")
        .set(dotTr, { opacity: 0 })
        .set(dotBl, { opacity: 0 }, "<")
        .to(dotTl, { top: 0, left: 0, duration: 0.15 })
        .to(dotBr, { bottom: 0, right: 0, duration: 0.15 }, "<");
    });

    return () => ctx.revert();
  }, [tl]);

  useEffect(() => {
    if (play) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [tl, play]);

  return (
    <div
      ref={dotsContainerRef}
      className={cn(
        "relative min-w-2 min-h-2 size-2",
        {
          "rotate-45": double,
        },
        className
      )}
    >
      <div
        className={cn(
          "dot dot-tl size-[2.5px] rounded-full bg-pri absolute top-0 left-0",
          { "top-1.25 left-1.25": double }
        )}
      />
      <div
        className={cn(
          "dot dot-tr size-[2.5px] rounded-full bg-pri absolute top-0 right-0",
          { hidden: double }
        )}
      />
      <div
        className={cn(
          "dot dot-bl size-[2.5px] rounded-full bg-pri absolute bottom-0 left-0",
          { hidden: double }
        )}
      />
      <div
        className={cn(
          "dot dot-br size-[2.5px] rounded-full bg-pri absolute bottom-0 right-0",
          { "bottom-1.25 right-1.25": double }
        )}
      />
    </div>
  );
}
