"use client";

import { useState } from "react";
import { HiStar } from "react-icons/hi2";

interface StarRatingProps {
  value: number;
  onChange?: (val: number) => void;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-7 h-7" };

export default function StarRating({ value, onChange, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const interactive = !!onChange;
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const displayValue = interactive && hovered > 0 ? hovered : value;
        const filled = star <= Math.floor(displayValue);
        const halfFilled = !filled && star - 0.5 <= displayValue;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={`relative ${interactive ? "cursor-pointer" : "cursor-default"} disabled:opacity-100`}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => onChange?.(star)}
          >
            <HiStar className={`${iconSize} text-black/15`} />
            {(filled || halfFilled) && (
              <HiStar
                className={`${iconSize} text-pink absolute inset-0`}
                style={halfFilled ? { clipPath: "inset(0 50% 0 0)" } : undefined}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
