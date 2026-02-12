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


// ── Sticker definitions ──────────────────────────────────────────────
export type StickerType =
  | "heartSolid"
  | "heartOutline"
  | "starSolid"
  | "starOutline"
  | "heartSolidGold"
  | "heartOutlineGold"
  | "starSolidGold"
  | "starOutlineGold";

export interface StickerElement {
  type: "path" | "circle";
  d?: string;
  r?: number;
  cx?: number;
  cy?: number;
  fill: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface NailSticker {
  id: StickerType;
  label: string;
  iconPath: string; // For picker button (24x24 viewBox)
  elements: StickerElement[];
  stickerScale: number;
  bounds: { x: number; y: number };
  offset: { x: number; y: number };
}

export interface PlacedSticker {
  id: string;
  type: StickerType;
  nailId: string;
  localX: number;
  localY: number;
}

const SILVER = "#C0C0C0";
const GOLD = "#FFD700";

export const nailStickers: NailSticker[] = [
  {
    id: "heartSolid",
    label: "Heart",
    iconPath:
      "M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z",
    elements: [
      {
        type: "path",
        d: "M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z",
        fill: SILVER,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "starSolid",
    label: "Star",
    iconPath:
      "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z",
    elements: [
      {
        type: "path",
        d: "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z",
        fill: SILVER,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "heartOutline",
    label: "Heart",
    iconPath:
      "M12,23.462l-.866-.612C9.994,22.044,0,14.783,0,8.15A7.036,7.036,0,0,1,6.75.875,6.57,6.57,0,0,1,12,3.582,6.57,6.57,0,0,1,17.25.875,7.036,7.036,0,0,1,24,8.15c0,6.633-9.994,13.894-11.134,14.7ZM6.75,3.875A4.043,4.043,0,0,0,3,8.15c0,3.916,5.863,9.21,9,11.611,3.137-2.4,9-7.695,9-11.611a4.043,4.043,0,0,0-3.75-4.275A4.043,4.043,0,0,0,13.5,8.15h-3A4.043,4.043,0,0,0,6.75,3.875Z",
    elements: [
      {
        type: "path",
        d: "M12,23.462l-.866-.612C9.994,22.044,0,14.783,0,8.15A7.036,7.036,0,0,1,6.75.875,6.57,6.57,0,0,1,12,3.582,6.57,6.57,0,0,1,17.25.875,7.036,7.036,0,0,1,24,8.15c0,6.633-9.994,13.894-11.134,14.7ZM6.75,3.875A4.043,4.043,0,0,0,3,8.15c0,3.916,5.863,9.21,9,11.611,3.137-2.4,9-7.695,9-11.611a4.043,4.043,0,0,0-3.75-4.275A4.043,4.043,0,0,0,13.5,8.15h-3A4.043,4.043,0,0,0,6.75,3.875Z",
        fill: SILVER,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "starOutline",
    label: "Star",
    iconPath:
      "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z",
    elements: [
      {
        type: "path",
        d: "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z",
        fill: SILVER,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "heartSolidGold",
    label: "Heart",
    iconPath:
      "M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z",
    elements: [
      {
        type: "path",
        d: "M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z",
        fill: GOLD,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "starSolidGold",
    label: "Star",
    iconPath:
      "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z",
    elements: [
      {
        type: "path",
        d: "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z",
        fill: GOLD,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "heartOutlineGold",
    label: "Heart",
    iconPath:
      "M12,23.462l-.866-.612C9.994,22.044,0,14.783,0,8.15A7.036,7.036,0,0,1,6.75.875,6.57,6.57,0,0,1,12,3.582,6.57,6.57,0,0,1,17.25.875,7.036,7.036,0,0,1,24,8.15c0,6.633-9.994,13.894-11.134,14.7ZM6.75,3.875A4.043,4.043,0,0,0,3,8.15c0,3.916,5.863,9.21,9,11.611,3.137-2.4,9-7.695,9-11.611a4.043,4.043,0,0,0-3.75-4.275A4.043,4.043,0,0,0,13.5,8.15h-3A4.043,4.043,0,0,0,6.75,3.875Z",
    elements: [
      {
        type: "path",
        d: "M12,23.462l-.866-.612C9.994,22.044,0,14.783,0,8.15A7.036,7.036,0,0,1,6.75.875,6.57,6.57,0,0,1,12,3.582,6.57,6.57,0,0,1,17.25.875,7.036,7.036,0,0,1,24,8.15c0,6.633-9.994,13.894-11.134,14.7ZM6.75,3.875A4.043,4.043,0,0,0,3,8.15c0,3.916,5.863,9.21,9,11.611,3.137-2.4,9-7.695,9-11.611a4.043,4.043,0,0,0-3.75-4.275A4.043,4.043,0,0,0,13.5,8.15h-3A4.043,4.043,0,0,0,6.75,3.875Z",
        fill: GOLD,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
  {
    id: "starOutlineGold",
    label: "Star",
    iconPath:
      "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z",
    elements: [
      {
        type: "path",
        d: "M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453ZM12,15.346l3.658,2.689-1.4-4.344L17.937,11H13.39L12,6.669,10.61,11H6.062l3.683,2.691-1.4,4.344Z",
        fill: GOLD,
        fillOpacity: 0.92,
      },
    ],
    stickerScale: 0.5,
    bounds: { x: 12, y: 12 },
    offset: { x: -12, y: -12 },
  },
];

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
