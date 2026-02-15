"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import { reviewSheetUrl } from "@/lib/config";

export default function ReviewForm({ onReviewSubmitted }: { onReviewSubmitted?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setLoading(true);
    setError(false);
    setRatingError(false);

    const formData = new FormData(e.currentTarget);

    // Honeypot — bots fill this, real users don't see it
    if (formData.get("website")) {
      setSubmitted(true);
      return;
    }

    try {
      await fetch(reviewSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          rating,
          comment: formData.get("comment"),
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      onReviewSubmitted?.();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-4xl mb-4">&#10024;</div>
        <h3 className="text-2xl font-bold mb-2">Review Submitted!</h3>
        <p className="text-black/60">
          Thank you for your review! It will appear once approved.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="review-name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="review-name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <StarRating value={rating} onChange={(val) => { setRating(val); setRatingError(false); }} size="lg" />
        {ratingError && (
          <p className="text-red-500 text-sm mt-1">Please select a rating.</p>
        )}
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <textarea
          id="review-comment"
          name="comment"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow resize-none"
          placeholder="Share your experience..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again!
        </p>
      )}

      <Button type="submit" className="w-full text-center" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
