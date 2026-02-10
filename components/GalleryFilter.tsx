"use client";

import { motion } from "framer-motion";

interface GalleryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function GalleryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className="relative px-6 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer"
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-gradient-to-r from-pink to-lavender rounded-full"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span
            className={`relative z-10 ${
              activeCategory === cat.id ? "text-white" : "text-black/60 hover:text-black"
            }`}
          >
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}
