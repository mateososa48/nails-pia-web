"use client";

import { motion } from "framer-motion";
import { NailColor } from "@/lib/nail-preview-data";

interface ColorPickerProps {
  colors: NailColor[];
  selected: NailColor;
  onSelect: (color: NailColor) => void;
}

export default function ColorPicker({
  colors,
  selected,
  onSelect,
}: ColorPickerProps) {
  return (
    <div className="flex gap-5" role="radiogroup" aria-label="Nail color">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          aria-label={color.label}
          aria-checked={selected.id === color.id}
          role="radio"
          className="relative group flex flex-col items-center"
        >
          {/* Selection ring */}
          {selected.id === color.id && (
            <motion.div
              layoutId="color-ring"
              className="absolute -inset-1.5 rounded-full border-2 border-black/40"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          {/* Color circle */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full shadow-md cursor-pointer transition-shadow hover:shadow-lg"
            style={{ backgroundColor: color.hex }}
          />
          {/* Label */}
          <span className="block text-xs text-center mt-2 text-black/50 group-hover:text-black/80 transition-colors">
            {color.label}
          </span>
        </button>
      ))}
    </div>
  );
}
