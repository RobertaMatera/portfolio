"use client";

import { useEffect, useState } from "react";

import Icon, { type IconName } from "@/components/ui/Icon/Icon";

export interface DockItem {
  id: string;
  label: string;
  icon: IconName;
}

interface DockProps {
  label: string;
  items: DockItem[];
}

// A section counts as current once its top passes this share of the viewport.
const ACTIVATION_LINE = 0.45;

/** Floating section navigation; the current section's icon rises into a bubble. */
export default function Dock({ label, items }: DockProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVATION_LINE;
      let current = 0;
      // Looked up on every frame (cheap) so sections that mount later are still tracked.
      // The first item is the top of the page, so it has no element to measure.
      items.forEach((item, index) => {
        const el = index === 0 ? null : document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < line) current = index;
      });
      setActive(current);
    };

    // Measure at most once per frame, however often scroll fires.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav className="dock" aria-label={label}>
      <ul className="dock__list">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.id}>
              <a
                className={isActive ? "dock__link is-active" : "dock__link"}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="dock__bubble">
                  <Icon name={item.icon} />
                </span>
                <span className="dock__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
