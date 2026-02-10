"use client";

import { useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import GalleryFilter from "@/components/GalleryFilter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryImages, galleryCategories } from "@/lib/config";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Gallery"
            subtitle="Browse my latest nail designs"
            gradient
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <GalleryFilter
            categories={galleryCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </AnimatedSection>

        <GalleryGrid images={filteredImages} columns={3} masonry />
      </div>
    </div>
  );
}
