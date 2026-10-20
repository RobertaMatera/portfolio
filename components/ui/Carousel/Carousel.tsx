"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

import Icon from "@/components/ui/Icon/Icon";

interface CarouselProps {
  label: string;
  /** Localized "carousel" and "slide" role descriptions. */
  roleDescription: string;
  slideRoleDescription: string;
  previousLabel: string;
  nextLabel: string;
  /** Per slide: its position ("2 of 6") and the label of its dot button. */
  slides: { key: string; position: string; goToLabel: string; content: ReactNode }[];
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Horizontal scroll-snap carousel with the centred slide highlighted.
 * Native scrolling keeps swipe and trackpad gestures; arrows and dots are
 * buttons, and focusing anything inside a slide brings that slide to the centre.
 */
export default function Carousel({
  label,
  roleDescription,
  slideRoleDescription,
  previousLabel,
  nextLabel,
  slides,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !(slide instanceof HTMLElement)) return;
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // The active slide is whichever one is closest to the centre of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        const gap = Math.abs(child.offsetLeft + child.offsetWidth / 2 - centre);
        if (gap < distance) {
          distance = gap;
          closest = index;
        }
      });
      setActive(closest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // A pointer click on a side slide centres it instead of activating its link.
  const onSlideClick = (index: number) => (event: MouseEvent) => {
    if (index === active || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  const last = slides.length - 1;

  return (
    <div className="carousel" role="region" aria-roledescription={roleDescription} aria-label={label}>
      <div ref={trackRef} className="carousel__track">
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className={index === active ? "carousel__slide is-active" : "carousel__slide"}
            role="group"
            aria-roledescription={slideRoleDescription}
            aria-label={slide.position}
            onClickCapture={onSlideClick(index)}
            onFocus={() => goTo(index)}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--previous"
        aria-label={previousLabel}
        // aria-disabled rather than disabled, so focus stays on the button at the ends.
        aria-disabled={active === 0}
        onClick={() => active > 0 && goTo(active - 1)}
      >
        <Icon name="chevronLeft" />
      </button>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        aria-label={nextLabel}
        aria-disabled={active === last}
        onClick={() => active < last && goTo(active + 1)}
      >
        <Icon name="chevronRight" />
      </button>

      <div className="carousel__dots">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            className="carousel__dot"
            aria-label={slide.goToLabel}
            aria-current={index === active || undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
