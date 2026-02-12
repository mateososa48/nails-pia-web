"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GalleryImage } from "@/lib/types";

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  masonry?: boolean;
}

const categoryLabels: Record<string, string> = {
  gel: "Gel Polish",
  polish: "Classic Polish",
  custom: "Custom Art",
};

export default function GalleryGrid({
  images,
  columns = 3,
  masonry = false,
}: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const colClass = {
    2: "grid-cols-2 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  const handleClick = (image: GalleryImage) => {
    const idx = images.findIndex((img) => img.src === image.src);
    setLightboxIndex(idx);
  };

  if (masonry) {
    return (
      <>
        <LayoutGroup>
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {images.map((image) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-3 sm:mb-5 break-inside-avoid rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer group"
                  onClick={() => handleClick(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={500}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 w-full">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                        {categoryLabels[image.category] || image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
        />
      </>
    );
  }

  return (
    <>
      <div className={`grid ${colClass[columns]} gap-5`}>
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.015 }}
            className="relative aspect-square rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="p-6 w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                  {categoryLabels[image.category] || image.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </>
  );
}
