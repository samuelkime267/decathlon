"use client";

import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import AnimationContainer from "@/components/AnimationContainer";

export default function Home() {
  return (
    <>
      <main>
        <AnimationContainer />
        <Loader />
        <Header />
        <Hero />
      </main>
    </>
  );
}
