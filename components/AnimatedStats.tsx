"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 50, suffix: "+", label: "Designs Created" },
  { value: 1, suffix: "", label: "Year Experience" },
];

function AnimatedStat({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-pink to-lavender mb-2">
        {displayValue}
        {suffix}
      </div>
      <p className="text-black/60 text-sm md:text-base">{label}</p>
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
