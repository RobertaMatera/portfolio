"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollTrackerProps {
  /** Sections to mark on the track, in page order. */
  stops: { id: string; label: string }[];
}

/** Scroll progress at which the cat reaches the fish. */
const EAT_AT = 0.985;

/**
 * Reading progress: a thin bar across the top of the screen, and on wider
 * screens a vertical track where a cat walks down past one stop per section
 * towards a fish at the end. Purely decorative: the dock already offers the
 * same navigation to keyboard and screen reader users.
 */
export default function ScrollTracker({ stops }: ScrollTrackerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  // Where each section starts, as a fraction of the scrollable height.
  const [offsets, setOffsets] = useState<number[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let positions: number[] = [];

    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    // Progress is written straight to CSS custom properties: no re-render per frame.
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll()));
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
      root.classList.toggle("is-eating", progress > EAT_AT);
      root.querySelectorAll<HTMLElement>(".scroll-tracker__stop").forEach((stop, index) => {
        stop.classList.toggle("is-passed", progress >= (positions[index] ?? 1) - 0.002);
      });
    };

    const measure = () => {
      const max = maxScroll();
      positions = stops.map(({ id }) => {
        const section = document.getElementById(id);
        const top = section ? section.getBoundingClientRect().top + window.scrollY : 0;
        return Math.min(1, Math.max(0, top / max));
      });
      setOffsets(positions);
      update();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Section heights change as images and fonts load, so re-measure on resize.
    const observer = new ResizeObserver(() => measure());
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, [stops]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div ref={rootRef} className="scroll-tracker" aria-hidden="true">
        <span className="scroll-tracker__line" />
        <span className="scroll-tracker__fill" />
        {stops.map((stop, index) => (
          <a
            key={stop.id}
            className="scroll-tracker__stop"
            href={`#${stop.id}`}
            tabIndex={-1}
            data-label={stop.label}
            style={{ top: `${(offsets[index] ?? 0) * 100}%` }}
          />
        ))}
        <span className="scroll-tracker__cat">
          <svg viewBox="0 0 24 24">
            <path d="M5 10L4 3.5l5 3a8 8 0 0 1 6 0l5-3L19 10a7 7 0 0 1 1 3.5c0 4-3.8 6.5-8 6.5s-8-2.5-8-6.5A7 7 0 0 1 5 10z" />
            <circle className="scroll-tracker__ink" cx="9" cy="13" r=".9" />
            <circle className="scroll-tracker__ink" cx="15" cy="13" r=".9" />
            <path className="scroll-tracker__ink" d="M11 15.5h2l-1 1z" />
          </svg>
        </span>
        <span className="scroll-tracker__fish">
          <svg viewBox="0 0 24 24">
            <path d="M2 12c3-5 9-6 13-2l5-3v10l-5-3c-4 4-10 3-13-2z" />
            <circle className="scroll-tracker__ink" cx="7.5" cy="11" r=".9" />
          </svg>
        </span>
      </div>
    </>
  );
}
