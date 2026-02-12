"use client";

import { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[300px] shrink-0">
      <div className="rounded-[2rem] p-6 h-full flex flex-col bg-gradient-to-r from-pink/20 to-lavender/20">
        {/* Quote */}
        <p className="text-black/80 leading-relaxed flex-grow text-[15px]">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-lavender flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {t.name.charAt(0)}
            </span>
          </div>
          <p className="font-semibold text-sm text-black/70">{t.name}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="testimonial-fade overflow-hidden -mx-6 group">
      <div className="testimonial-marquee flex gap-6 px-6">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
        {testimonials.map((t, i) => (
          <TestimonialCard key={`dup-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
