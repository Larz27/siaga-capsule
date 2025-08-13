"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "group relative w-[350px] max-w-full shrink-0 rounded-3xl border-0 md:w-[450px]",
              "h-auto min-h-[200px]" // Auto height with minimum
            )}
            key={`${item.name}-${idx}`}
          >
            {/* Content container */}
            <div className="relative z-10 px-8 py-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl">
              {/* Decorative gradient border */}
              <div className="absolute -z-10 inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-600/20 p-[1px]">
                <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900"></div>
              </div>
              <blockquote>
                {/* Quote icon */}
                <div className="mb-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Quote text with improved typography */}
                <span className="relative z-20 text-base leading-[1.7] font-medium text-gray-800 dark:text-gray-100">
                  "{item.quote}"
                </span>

                {/* Author information with better layout */}
                <div className="relative z-20 mt-8 flex flex-row items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-tight text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-sm leading-tight text-gray-600 dark:text-gray-300">
                      {item.title}
                    </span>
                  </div>

                  {/* Decorative accent */}
                  <div className="ml-auto h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 opacity-60"></div>
                </div>
              </blockquote>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
