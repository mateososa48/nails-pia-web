"use client";

import { motion } from "framer-motion";

interface FloatingDecorationProps {
  color?: "pink" | "lavender";
  size?: number;
  className?: string;
  delay?: number;
}

export default function FloatingDecoration({
  color = "pink",
  size = 24,
  className = "",
  delay = 0,
}: FloatingDecorationProps) {
  const colorClass = color === "pink" ? "bg-pink/25" : "bg-lavender/25";

  return (
    <motion.div
      className={`absolute rounded-full ${colorClass} blur-sm pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -12, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
