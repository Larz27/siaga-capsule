"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import type { Testimonial } from "@/lib/types";

export function TestimonialSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (!testimonials.length) return null;
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials.map((testimonial) => ({
          quote: testimonial.quote,
          name: testimonial.occupation,
          title: testimonial.sector,
        }))}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
