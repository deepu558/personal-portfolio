"use client";

import ScrollyImage from "@/components/ScrollyImage";
import Overlay from "@/components/Overlay";

export default function Hero() {
  return (
    <div className="relative" id="home">
      <ScrollyImage src="/manideep-hero.png" alt="Manideep Grandhe">
        {(progress) => <Overlay scrollYProgress={progress} />}
      </ScrollyImage>
    </div>
  );
}
