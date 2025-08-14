"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className="relative z-10 px-8 py-8 hover:shadow-2xl hover:scale-[1.05] transition-all duration-500 rounded-3xl shadow-xl">
              {/* Enhanced gradient border with stronger colors */}
              <div className="absolute -z-10 inset-0 rounded-3xl bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-purple-700/40 p-[2px]">
                <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900"></div>
              </div>

              <blockquote>
                {/* Quote icon */}
                <div className="mb-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center shadow-lg">
                    <svg
                      className="h-5 w-5 text-white drop-shadow-sm"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Quote text with enhanced prominence */}
                <div className="relative z-20 text-sm leading-[1.8] font-semibold text-gray-900 dark:text-white drop-shadow-sm">
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => (
                        <strong className="font-bold text-purple-700 dark:text-purple-300">
                          {children}
                        </strong>
                      ),
                      p: ({ children }) => (
                        <span className="inline">{children}</span>
                      ),
                    }}
                  >
                    {item.quote}
                  </ReactMarkdown>
                </div>

                {/* Author information with better layout */}
                <div className="relative z-20 mt-8 flex flex-row items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold leading-tight text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-sm font-medium leading-tight text-purple-700 dark:text-purple-300">
                      {item.title}
                    </span>
                  </div>

                  {/* Decorative accent */}
                  <div className="ml-auto h-2 w-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-700 opacity-80 shadow-md"></div>
                </div>
              </blockquote>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-purple-600/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
