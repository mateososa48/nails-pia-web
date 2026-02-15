"use client";

import { useState, useEffect, useCallback } from "react";
import { Testimonial } from "@/lib/types";
import { testimonials as hardcodedTestimonials, reviewSheetUrl } from "@/lib/config";
import Testimonials from "@/components/Testimonials";
import ReviewForm from "@/components/ReviewForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

function mergeTestimonials(fetched: Testimonial[]): Testimonial[] {
  if (fetched.length >= 5) return fetched.slice(0, 5);
  const remaining = 5 - fetched.length;
  return [...fetched, ...hardcodedTestimonials.slice(0, remaining)];
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(hardcodedTestimonials);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${reviewSheetUrl}?action=getApproved`);
      if (res.ok) {
        const data: Testimonial[] = await res.json();
        if (data.length > 0) {
          setTestimonials(mergeTestimonials(data));
        }
      }
    } catch {
      // Silently fall back to hardcoded testimonials
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <>
      <Testimonials testimonials={testimonials} />

      <AnimatedSection className="mt-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">
              Leave a Review
            </h3>
            <p className="text-black/60 text-sm mt-2">
              Had your nails done? Share your experience!
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ReviewForm onReviewSubmitted={fetchReviews} />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
