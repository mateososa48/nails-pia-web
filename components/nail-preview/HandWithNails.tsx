"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  fingerNails,
  nailShapePaths,
} from "@/lib/nail-preview-data";

interface HandWithNailsProps {
  color?: string;
  image?: string;
}

export default function HandWithNails({ color, image }: HandWithNailsProps) {
  const fill = image ? "url(#nail-image)" : color;

  return (
    <div className="relative w-full h-full flex items-center justify-start">
      {/* Wrapper that constrains both image and SVG to same bounds */}
      <div className="relative w-full h-full" style={{ aspectRatio: "800 / 1037" }}>
        {/* Hand photo */}
        <Image
          src="/images/featured/hand-stock.webp"
          alt="Hand preview"
          fill
          className="object-contain"
          priority
        />

        {/* SVG nail overlay — matches image exactly via same aspect ratio */}
        <svg
          viewBox="0 0 800 1037"
          className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shine gradient for nail depth */}
          <linearGradient
            id="nail-shine"
            x1="0"
            y1="0"
            x2="0.3"
            y2="1"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="35%" stopColor="white" stopOpacity="0.1" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.12" />
          </linearGradient>
          {/* Specular highlight for glossy hot-spot */}
          <radialGradient
            id="nail-specular"
            cx="0.35"
            cy="0.25"
            r="0.4"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {image && (
            <pattern id="nail-image" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
              <image href={image} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          )}
        </defs>

        {fingerNails.map((nail) => {
          const pathData = nailShapePaths[nail.shape];
          return (
            <g
              key={nail.id}
              transform={`translate(${nail.cx}, ${nail.cy}) rotate(${nail.rotation}) scale(${nail.scaleX}, ${nail.scaleY})`}
            >
              {/* Nail color layer */}
              <AnimatePresence mode="wait">
                <motion.path
                  key={`${nail.id}-${nail.shape}`}
                  d={pathData}
                  fill={fill}
                  fillOpacity={0.85}
                  stroke={fill}
                  strokeWidth={0.5}
                  strokeOpacity={0.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              {/* Shine overlay (always present) */}
              <path
                d={pathData}
                fill="url(#nail-shine)"
                pointerEvents="none"
              />
              {/* Specular highlight */}
              <path
                d={pathData}
                fill="url(#nail-specular)"
                pointerEvents="none"
              />
            </g>
          );
        })}
        </svg>
      </div>
    </div>
  );
}
