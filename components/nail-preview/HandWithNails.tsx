"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  fingerNails,
  nailShapePaths,
  nailStickers,
  type PlacedSticker,
} from "@/lib/nail-preview-data";

interface HandWithNailsProps {
  color?: string;
  image?: string;
  placedStickers: PlacedSticker[];
  svgRef?: React.Ref<SVGSVGElement>;
  hoverNailId?: string | null;
  selectedStickerId?: string | null;
  onStickerPointerDown?: (e: React.PointerEvent, stickerId: string) => void;
  tapMode?: boolean;
}

const ZOOM_SCALE = 1.35;

export default function HandWithNails({
  color,
  image,
  placedStickers,
  svgRef,
  hoverNailId,
  selectedStickerId,
  onStickerPointerDown,
}: HandWithNailsProps) {
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
          className="object-contain object-left"
          priority
        />

        {/* SVG nail overlay — matches image exactly via same aspect ratio */}
        <svg
          ref={svgRef}
          viewBox="0 0 800 1037"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMinYMid meet"
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
            {/* Metallic sticker gradients */}
            <linearGradient id="metallic-silver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0F0F0" />
              <stop offset="20%" stopColor="#D8D8D8" />
              <stop offset="45%" stopColor="#A8A8A8" />
              <stop offset="60%" stopColor="#C8C8C8" />
              <stop offset="80%" stopColor="#E8E8E8" />
              <stop offset="100%" stopColor="#B0B0B0" />
            </linearGradient>
            <linearGradient id="metallic-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF1A8" />
              <stop offset="20%" stopColor="#FFD700" />
              <stop offset="45%" stopColor="#B8860B" />
              <stop offset="60%" stopColor="#DAA520" />
              <stop offset="80%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#C5941A" />
            </linearGradient>
            {image && (
              <pattern id="nail-image" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
                <image href={image} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            )}
          </defs>

          {fingerNails.map((nail) => {
            const pathData = nailShapePaths[nail.shape];
            const nailStickersPlaced = placedStickers.filter(
              (s) => s.nailId === nail.id
            );
            const isHovered = hoverNailId === nail.id;
            return (
              // Outer group: translate + zoom via CSS transform (animatable)
              <g
                key={nail.id}
                style={{
                  transform: isHovered
                    ? `translate(${nail.cx}px, ${nail.cy}px) scale(${ZOOM_SCALE})`
                    : `translate(${nail.cx}px, ${nail.cy}px) scale(1)`,
                  transformOrigin: "0px 0px",
                  transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                  {/* Inner group: rotation + nail scale */}
                  <g transform={`rotate(${nail.rotation}) scale(${nail.scaleX}, ${nail.scaleY})`}>
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

                    {/* Placed stickers (between color and shine for realistic look) */}
                    <AnimatePresence>
                      {nailStickersPlaced.map((placed) => {
                        const def = nailStickers.find((s) => s.id === placed.type);
                        if (!def) return null;
                        // Counter-scale to fix aspect ratio distortion from nail's non-uniform scale
                        const uniformScale = def.stickerScale;
                        const sx = uniformScale / nail.scaleX;
                        const sy = uniformScale / nail.scaleY;
                        const avgScale = (nail.scaleX + nail.scaleY) / 2;
                        const isSelected = selectedStickerId === placed.id;
                        return (
                          <motion.g
                            key={placed.id}
                            transform={`translate(${placed.localX}, ${placed.localY}) scale(${sx * avgScale}, ${sy * avgScale}) translate(${def.offset.x}, ${def.offset.y})`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              cursor: "grab",
                              touchAction: "none",
                              filter: isSelected
                                ? "drop-shadow(0 2px 6px rgba(0,0,0,0.2))"
                                : "none",
                            }}
                            onPointerDown={(e) =>
                              onStickerPointerDown?.(e, placed.id)
                            }
                          >
                            {def.elements.map((el, i) =>
                              el.type === "path" ? (
                                <path
                                  key={i}
                                  d={el.d}
                                  fill={el.fill}
                                  fillOpacity={el.fillOpacity ?? 1}
                                  stroke={el.stroke ?? "none"}
                                  strokeWidth={el.strokeWidth ?? 0}
                                />
                              ) : (
                                <circle
                                  key={i}
                                  cx={el.cx ?? 0}
                                  cy={el.cy ?? 0}
                                  r={el.r ?? 3}
                                  fill={el.fill}
                                  fillOpacity={el.fillOpacity ?? 1}
                                  stroke={el.stroke ?? "none"}
                                  strokeWidth={el.strokeWidth ?? 0}
                                />
                              )
                            )}
                          </motion.g>
                        );
                      })}
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
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
