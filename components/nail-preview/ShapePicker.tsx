"use client";

import { NailShape } from "@/lib/nail-preview-data";

interface ShapePickerProps {
  shapes: NailShape[];
  selected: NailShape;
  onSelect: (shape: NailShape) => void;
}

export default function ShapePicker({
  shapes,
  selected,
  onSelect,
}: ShapePickerProps) {
  return (
    <div className="flex gap-4" role="radiogroup" aria-label="Nail shape">
      {shapes.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onSelect(shape)}
          aria-label={shape.label}
          aria-checked={selected.id === shape.id}
          role="radio"
          className={`flex flex-col items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            selected.id === shape.id
              ? "border-pink bg-pink/10 shadow-md"
              : "border-black/10 bg-white hover:border-pink/40 hover:shadow-sm"
          }`}
        >
          <svg viewBox="0 0 24 32" className="w-6 h-8" fill="none">
            <path
              d={shape.iconPath}
              fill={selected.id === shape.id ? "#EB90E4" : "#00000030"}
            />
          </svg>
          <span className="text-xs font-medium">{shape.label}</span>
        </button>
      ))}
    </div>
  );
}
