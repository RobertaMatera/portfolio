"use client";

import { useEffect } from "react";

// What rises into view, as in the mockup: headings and intros, then cards and
// list items one after another.
const TARGETS = [
  ".section .eyebrow",
  ".section h2",
  ".section .lead",
  ".about__tags",
  ".about__fact",
  ".about__principles-title",
  ".about__principle",
  ".service-card",
  ".timeline__item",
  ".carousel",
  ".reference",
  ".contact__channels li",
  ".contact-form",
  ".site-footer__row > *",
].join(",");

const MAX_STAGGER = 6;
const STAGGER_S = 0.09;

/**
 * Fades content up as it scrolls into view. Only content still below the
 * screen when the page loads is hidden, so nothing visible ever disappears,
 * and without JavaScript or with reduced motion everything is simply shown.
 * (The hero's own entrance is pure CSS; see _hero.scss.)
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );

    // Siblings appear one after another.
    targets.forEach((element) => {
      const siblings = targets.filter((other) => other.parentElement === element.parentElement);
      const order = Math.min(siblings.indexOf(element), MAX_STAGGER);
      element.style.setProperty("--reveal-delay", `${order * STAGGER_S}s`);
      element.classList.add("reveal");
    });

    // Once played, the reveal classes go, so hover effects work as normal.
    const finish = (event: AnimationEvent) => {
      const element = event.currentTarget;
      if (event.target !== element || !(element instanceof HTMLElement)) return;
      element.classList.remove("reveal", "is-revealed");
      element.style.removeProperty("--reveal-delay");
      element.removeEventListener("animationend", finish);
    };

    const reveal = (element: Element) => {
      observer.unobserve(element);
      element.addEventListener("animationend", finish as EventListener);
      element.classList.add("is-revealed");
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && reveal(entry.target)),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((element) => observer.observe(element));

    // The last lines of the footer can sit too low to ever cross the
    // threshold, so at the very bottom of the page everything left appears.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
      targets.filter((element) => !element.classList.contains("is-revealed")).forEach(reveal);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      targets.forEach((element) => {
        element.removeEventListener("animationend", finish as EventListener);
        element.classList.remove("reveal", "is-revealed");
      });
    };
  }, []);

  return null;
}
