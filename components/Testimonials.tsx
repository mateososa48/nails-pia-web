"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="relative">
      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="text-4xl text-pink/30 font-serif leading-none mb-3">
              &ldquo;
            </div>
            <p className="text-black/70 mb-4 leading-relaxed">{t.quote}</p>
            <p className="font-semibold text-sm text-black/80">&mdash; {t.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm"
              style={{ width: "280px" }}
            >
              <div className="text-4xl text-pink/30 font-serif leading-none mb-3">
                &ldquo;
              </div>
              <p className="text-black/70 mb-4 leading-relaxed">{t.quote}</p>
              <p className="font-semibold text-sm text-black/80">
                &mdash; {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
