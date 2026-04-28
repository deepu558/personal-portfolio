"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { type ReactNode, useRef } from "react";

interface ScrollyImageProps {
  src: string;
  alt: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

/** Full-bleed scrolly hero using a still (same scroll choreography as Fawaz’s video hero). */
export default function ScrollyImage({ src, alt, children }: ScrollyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const springScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  const scale = useTransform(springScroll, [0, 1], [1.06, 1.2]);
  const y = useTransform(springScroll, [0, 1], ["0%", "-5%"]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b1426]">
        <motion.div
          style={{ scale, y }}
          className="absolute inset-0 h-[112%] w-full -top-[6%] will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover object-[center_32%]"
            sizes="100vw"
            quality={92}
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
          aria-hidden
        />
        {children?.(springScroll)}
      </div>
    </div>
  );
}
