"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const WEB3FORMS_KEY = "524280cb-a711-42c1-a6fe-21a1862a019a";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New message from Nails by Pia");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
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
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-black/60">
          Thanks for reaching out! I&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot spam protection */}
      <input type="checkbox" name="botcheck" className="hidden" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-2">
          Preferred Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-pink/50 transition-shadow resize-none"
          placeholder="Tell me about the nails you'd like..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again!
        </p>
      )}

      <Button type="submit" className="w-full text-center" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
