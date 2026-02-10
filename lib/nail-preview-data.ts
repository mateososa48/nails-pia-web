export interface NailColor {
  id: string;
  label: string;
  hex: string;
}

export interface NailShape {
  id: "round" | "square" | "almond" | "oval";
  label: string;
  iconPath: string; // Small SVG path for the shape icon
}

export interface FingerNail {
  id: string;
  cx: number; // Center X position in SVG viewBox
  cy: number; // Center Y position in SVG viewBox
  rotation: number; // Degrees
  scaleX: number; // Width scale relative to base nail
  scaleY: number; // Height scale relative to base nail
  shape: NailShape["id"]; // Per-finger nail shape
}

// Available nail colors
export const nailColors: NailColor[] = [
  { id: "purple", label: "Purple", hex: "#8100D1" },
  { id: "magenta", label: "Magenta", hex: "#B500B2" },
  { id: "hotpink", label: "Hot Pink", hex: "#FF52A0" },
  { id: "coral", label: "Coral", hex: "#FFA47F" },
];

// Shape icon paths (drawn in a 24x32 viewBox for the selector icons)
export const nailShapes: NailShape[] = [
  {
    id: "round",
    label: "Round",
    iconPath: "M 4 28 L 4 10 Q 4 0 12 0 Q 20 0 20 10 L 20 28 Z",
  },
  {
    id: "square",
    label: "Square",
    iconPath: "M 4 28 L 4 2 Q 4 0 6 0 L 18 0 Q 20 0 20 2 L 20 28 Z",
  },
  {
    id: "almond",
    label: "Almond",
    iconPath: "M 4 28 L 4 12 Q 4 2 12 -2 Q 20 2 20 12 L 20 28 Z",
  },
  {
    id: "oval",
    label: "Oval",
    iconPath: "M 4 28 L 4 16 Q 4 12 12 10 Q 20 12 20 16 L 20 28 Z",
  },
];

// Base nail shape paths (drawn in local coordinates, roughly 30x38)
// The "top" of the nail (free edge) is at negative Y, cuticle at positive Y
export const nailShapePaths: Record<NailShape["id"], string> = {
  round:
    "M 0 -19 Q 16 -19 15 0 Q 15.5 19 0 19 Q -16 21 -15 0 Q -15 -19 0 -19 Z",
  square:
    "M -15 19 L -15 -16 Q -15 -19 -12 -19 L 12 -19 Q 15 -19 15 -16 L 15 19 Z",
  almond:
    "M -15 19 L -15 -3 Q -15 -16 0 -22 Q 15 -16 15 -3 L 15 19 Z",
  oval:
    "M 0 -19 Q 18 -19 15 0 Q 18 17 0 19 Q -15 20 -16 0 Q -18 -19 0 -19 Z",
};

// Finger nail positions overlaid on the hand photo
// ViewBox is 800x1037 (matching the final_hands.webp image)
// This image shows 4 nails (index, middle, ring, pinky) — thumb nail is not visible
// Adjust cx/cy to move nails, rotation to angle them, scaleX/Y to resize
export const fingerNails: FingerNail[] = [
  {
    id: "index",
    cx: 291.3,
    cy: 205,
    rotation: 29.3,
    scaleX: 2.38,
    scaleY: 3.05,
    shape: "round",
  },
  {
    id: "middle",
    cx: 513.8,
    cy: 228,
    rotation: 34,
    scaleX: 2.6,
    scaleY: 2.9,
    shape: "round",
  },
  {
    id: "ring",
    cx: 621.5,
    cy: 371.5,
    rotation: 31,
    scaleX: 2.4,
    scaleY: 2.9,
    shape: "round",
  },
  {
    id: "pinky",
    cx: 655.5,
    cy: 613,
    rotation: 30,
    scaleX: 1.85,
    scaleY: 2.9,
    shape: "oval",
  },
];
