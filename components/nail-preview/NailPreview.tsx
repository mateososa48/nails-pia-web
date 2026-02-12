"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HandWithNails from "./HandWithNails";
import { services } from "@/lib/config";
import { ServiceColor } from "@/lib/types";
import {
  nailStickers,
  fingerNails,
  type StickerType,
  type PlacedSticker,
} from "@/lib/nail-preview-data";

const colorServices = services.filter((s) => s.colors && s.colors.length > 0);
const MAX_STICKERS = 4;

/** Convert screen coordinates to SVG viewBox coordinates */
function screenToSvg(svg: SVGSVGElement, clientX: number, clientY: number) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  return pt.matrixTransform(ctm.inverse());
}

/** Convert SVG viewBox point to a nail's local coordinate space */
function svgToNailLocal(
  svgX: number,
  svgY: number,
  nail: (typeof fingerNails)[number]
) {
  const dx = svgX - nail.cx;
  const dy = svgY - nail.cy;
  const rad = (-nail.rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: (dx * cos - dy * sin) / nail.scaleX,
    y: (dx * sin + dy * cos) / nail.scaleY,
  };
}

/** Check if nail-local coordinates fall within the nail area */
function isOnNail(localX: number, localY: number) {
  return localX >= -14 && localX <= 14 && localY >= -18 && localY <= 18;
}

function clampToRange(value: number, min: number, max: number) {
  if (min > max) return (min + max) / 2;
  return Math.min(Math.max(value, min), max);
}

function getStickerHalfBounds(
  def: (typeof nailStickers)[number],
  nail: (typeof fingerNails)[number]
) {
  const avgScale = (nail.scaleX + nail.scaleY) / 2;
  return {
    halfW: (def.bounds.x * def.stickerScale * avgScale) / nail.scaleX,
    halfH: (def.bounds.y * def.stickerScale * avgScale) / nail.scaleY,
  };
}

/** Find which nail (if any) a screen point is over */
function hitTestNails(svg: SVGSVGElement, clientX: number, clientY: number) {
  const svgPt = screenToSvg(svg, clientX, clientY);
  if (!svgPt) return null;
  for (const nail of fingerNails) {
    const local = svgToNailLocal(svgPt.x, svgPt.y, nail);
    if (isOnNail(local.x, local.y)) return nail.id;
  }
  return null;
}

export default function NailPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = colorServices[activeTab];
  const [selectedColor, setSelectedColor] = useState<ServiceColor>(
    activeService.colors![0]
  );
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [dragging, setDragging] = useState<StickerType | null>(null);
  const [draggingStickerId, setDraggingStickerId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [selectedTraySticker, setSelectedTraySticker] = useState<StickerType | null>(null);
  const [pendingDrag, setPendingDrag] = useState<{ x: number; y: number; type: StickerType } | null>(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });
  const [hoverNailId, setHoverNailId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedColor(colorServices[index].colors![0]);
  };

  const getNailHit = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const svgPt = screenToSvg(svg, clientX, clientY);
    if (!svgPt) return null;
    for (const nail of fingerNails) {
      const local = svgToNailLocal(svgPt.x, svgPt.y, nail);
      if (isOnNail(local.x, local.y)) {
        return { nail, local };
      }
    }
    return null;
  }, []);

  const handleDrop = useCallback(
    (clientX: number, clientY: number, stickerType: StickerType) => {
      const hit = getNailHit(clientX, clientY);
      if (!hit) return;
      const def = nailStickers.find((s) => s.id === stickerType);
      if (!def) return;
      const { halfW, halfH } = getStickerHalfBounds(def, hit.nail);
      const clamped = {
        x: clampToRange(hit.local.x, -14 + halfW, 14 - halfW),
        y: clampToRange(hit.local.y, -18 + halfH, 18 - halfH),
      };

      setPlacedStickers((prev) => {
        if (prev.length >= MAX_STICKERS) return prev;
        return [
          ...prev,
          {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                type: stickerType,
                nailId: hit.nail.id,
                localX: clamped.x,
                localY: clamped.y,
              },
            ];
          });
    }, 
    [getNailHit]
  );

  // Document-level pointer listeners while dragging
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      setGhostPos({ x: e.clientX, y: e.clientY });

      // Detect which nail we're hovering over
      const svg = svgRef.current;
      if (svg) {
        setHoverNailId(hitTestNails(svg, e.clientX, e.clientY));
      }
    };

    const onUp = (e: PointerEvent) => {
      handleDrop(e.clientX, e.clientY, dragging);
      setDragging(null);
      setHoverNailId(null);
    };

    const onCancel = () => {
      setDragging(null);
      setHoverNailId(null);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onCancel);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, [dragging, handleDrop]);

  useEffect(() => {
    if (!selectedStickerId) return;
    const stillExists = placedStickers.some((s) => s.id === selectedStickerId);
    if (!stillExists) {
      setSelectedStickerId(null);
      setDraggingStickerId(null);
    }
  }, [placedStickers, selectedStickerId]);

  // Document-level pointer listeners while moving an existing sticker
  useEffect(() => {
    if (!draggingStickerId) return;

    const onMove = (e: PointerEvent) => {
      const hit = getNailHit(e.clientX, e.clientY);
      setHoverNailId(hit ? hit.nail.id : null);
      if (!hit) return;

      setPlacedStickers((prev) =>
        prev.map((sticker) =>
          sticker.id === draggingStickerId
            ? (() => {
                const def = nailStickers.find((s) => s.id === sticker.type);
                if (!def) return sticker;
                const { halfW, halfH } = getStickerHalfBounds(def, hit.nail);
                return {
                  ...sticker,
                  nailId: hit.nail.id,
                  localX: clampToRange(hit.local.x, -14 + halfW, 14 - halfW),
                  localY: clampToRange(hit.local.y, -18 + halfH, 18 - halfH),
                };
              })()
            : sticker
        )
      );
    };

    const onUp = () => {
      setDraggingStickerId(null);
      setHoverNailId(null);
    };

    const onCancel = () => {
      setDraggingStickerId(null);
      setHoverNailId(null);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onCancel);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, [draggingStickerId, getNailHit]);

  // Pending drag: pointerdown on tray sticker records position.
  // pointermove > threshold → real drag. pointerup without moving → tap-to-select.
  const handleTrayPointerDown = (e: React.PointerEvent, type: StickerType) => {
    if (placedStickers.length >= MAX_STICKERS) return;
    e.preventDefault();
    setPendingDrag({ x: e.clientX, y: e.clientY, type });
  };

  useEffect(() => {
    if (!pendingDrag) return;
    const DRAG_THRESHOLD = 8;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - pendingDrag.x;
      const dy = e.clientY - pendingDrag.y;
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        // Exceeded threshold → start real drag
        setDragging(pendingDrag.type);
        setGhostPos({ x: e.clientX, y: e.clientY });
        setSelectedTraySticker(null);
        setPendingDrag(null);
      }
    };

    const onUp = () => {
      // Didn't move → tap: toggle tray sticker selection
      setSelectedTraySticker((prev) =>
        prev === pendingDrag.type ? null : pendingDrag.type
      );
      setPendingDrag(null);
    };

    const onCancel = () => setPendingDrag(null);

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onCancel);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
    };
  }, [pendingDrag]);

  const startMoveSticker = (e: React.PointerEvent, stickerId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedStickerId(stickerId);
    setDraggingStickerId(stickerId);
  };

  // Clear tray selection when sticker limit reached
  useEffect(() => {
    if (placedStickers.length >= MAX_STICKERS) setSelectedTraySticker(null);
  }, [placedStickers.length]);

  // Tap a nail while a tray sticker is selected → place it
  const handleNailTap = useCallback(
    (e: React.MouseEvent) => {
      if (!selectedTraySticker) return;
      if (placedStickers.length >= MAX_STICKERS) return;
      handleDrop(e.clientX, e.clientY, selectedTraySticker);
    },
    [selectedTraySticker, placedStickers.length, handleDrop]
  );

  const isFull = placedStickers.length >= MAX_STICKERS;
  const tapMode = selectedTraySticker !== null && !isFull;
  const overNail = hoverNailId !== null;

  return (
    <div className="flex flex-col md:flex-row items-stretch md:min-h-[400px] md:max-h-[800px]">
      {/* Hand */}
      <div
        className="relative w-full md:w-1/2 shrink-0 bg-cream min-h-[300px] md:min-h-0"
        onClick={handleNailTap}
      >
        <HandWithNails
          color={selectedColor.hex}
          image={selectedColor.image}
          placedStickers={placedStickers}
          svgRef={svgRef}
          hoverNailId={dragging || draggingStickerId ? hoverNailId : null}
          selectedStickerId={selectedStickerId}
          onStickerPointerDown={startMoveSticker}
          tapMode={tapMode}
        />
      </div>

      {/* Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 px-6 py-8 lg:px-16">
        {/* Treatment Tabs */}
        <div>
          <h3 className="text-2xl lg:text-3xl mb-3 font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">Treatment</h3>
          <div className="flex flex-wrap gap-2">
            {colorServices.map((service, index) => (
              <button
                key={service.name}
                onClick={() => handleTabChange(index)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === index
                    ? "text-white"
                    : "text-black/60 bg-black/[0.04] hover:bg-black/[0.08]"
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[#E84393] via-pink to-lavender rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{service.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <h3 className="text-2xl lg:text-3xl mb-3 font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">Color</h3>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Nail color"
          >
            {activeService.colors!.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  aria-label={color.name}
                  aria-checked={isSelected}
                  role="radio"
                  className="group flex flex-col items-center cursor-pointer"
                >
                  {/* Circle + ring wrapper */}
                  <div className="relative">
                    <div
                      className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-black/40 scale-100 opacity-100"
                          : "border-transparent scale-90 opacity-0"
                      }`}
                    />
                    {color.image ? (
                      <Image
                        src={color.image}
                        alt={color.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full shadow-md border border-black/10 object-cover transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full shadow-md border border-black/10 transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
                        style={{ backgroundColor: color.hex }}
                      />
                    )}
                  </div>
                  <span className="block text-[10px] text-center mt-2 text-black/40 group-hover:text-black/70 transition-colors leading-tight max-w-[3rem]">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Sticker Tray — drag & drop */}
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-2xl lg:text-3xl font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">Stickers</h3>
            {placedStickers.length > 0 && (
              <button
                onClick={() => setPlacedStickers([])}
                className="text-[11px] text-black/40 hover:text-black/70 transition-colors underline underline-offset-2 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
          <p className="text-[11px] text-black/40 mb-2.5">
            Drag onto nails · {placedStickers.length}/{MAX_STICKERS}
          </p>
          <div className="flex flex-wrap gap-3">
            {nailStickers.map((sticker) => {
              const iconColor = sticker.elements[0].fill;
              return (
                <div
                  key={sticker.id}
                  onPointerDown={(e) => handleTrayPointerDown(e, sticker.id)}
                  className={`flex flex-col items-center gap-1 select-none touch-none ${
                    isFull
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-grab active:cursor-grabbing"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] active:scale-90 flex items-center justify-center transition-all">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={iconColor}>
                      <path d={sticker.iconPath} />
                    </svg>
                  </div>
                  <span className="text-[10px] text-black/40 leading-tight">
                    {sticker.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          key={`${activeTab}-${selectedColor.name}-${placedStickers.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-r from-pink/20 to-lavender/20 rounded-xl p-4"
        >
          <p className="text-black/60 text-sm">
            <span
              className="text-base font-display"
              style={selectedColor.hex ? { color: selectedColor.hex } : undefined}
            >
              {selectedColor.name}
            </span>{" "}
            — {activeService.name} ·{" "}
            {activeService.colorGroups
              ? (activeService.colorGroups.find((g) =>
                  g.colors.some((c) => c.name === selectedColor.name)
                )?.price ?? activeService.price)
              : activeService.price}
            {placedStickers.length > 0 && (
              <span className="text-pink font-medium">
                {" "}+ {placedStickers.length} Sticker{placedStickers.length !== 1 ? "s" : ""} $1
              </span>
            )}
          </p>
        </motion.div>
      </div>

      {/* Drag ghost — follows pointer, grows when over a nail */}
      {dragging && (() => {
        const def = nailStickers.find((s) => s.id === dragging)!;
        const ghostSize = overNail ? 52 : 40;
        const ghostOffset = ghostSize / 2;
        return (
          <motion.div
            className="fixed pointer-events-none z-50"
            animate={{
              left: ghostPos.x - ghostOffset,
              top: ghostPos.y - ghostOffset,
              width: ghostSize,
              height: ghostSize,
            }}
            transition={{ left: { duration: 0 }, top: { duration: 0 }, width: { type: "spring", stiffness: 300, damping: 25 }, height: { type: "spring", stiffness: 300, damping: 25 } }}
          >
            <motion.div
              className="w-full h-full rounded-full flex items-center justify-center"
              animate={{
                backgroundColor: overNail ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
                boxShadow: overNail
                  ? "0 8px 25px rgba(0,0,0,0.15), 0 0 0 2px rgba(232,67,147,0.3)"
                  : "0 4px 12px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill={def.elements[0].fill}
                animate={{ width: overNail ? 28 : 20, height: overNail ? 28 : 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <path d={def.iconPath} />
              </motion.svg>
            </motion.div>
          </motion.div>
        );
      })()}
    </div>
  );
}
