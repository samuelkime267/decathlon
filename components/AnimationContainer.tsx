import React from "react";

type AnimationContainerProps = { show?: boolean };

export default function AnimationContainer({ show }: AnimationContainerProps) {
  return (
    show && (
      <div
        id="animation-container"
        className="fixed bottom-0 left-0 w-full h-20 z-[100]"
      ></div>
    )
  );
}
