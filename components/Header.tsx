import React from "react";
import { Logo } from "./icons";
import Nav from "./Nav";
import Languages from "./Languages";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between opacity-0 pointer-events-none">
      <Nav />
      <div className="lg:mx-auto pt-1">
        <Logo className="h-6 text-white" />
      </div>
      <Languages />
    </header>
  );
}
