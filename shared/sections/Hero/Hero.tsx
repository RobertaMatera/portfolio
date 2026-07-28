import Link from "next/link";

import { HERO_ACTIONS, HERO_CONTENT } from "./hero.constants";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="w-full py-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {HERO_CONTENT.eyebrow}
          </p>

          <div className="space-y-4">
            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            >
              {HERO_CONTENT.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
              {HERO_CONTENT.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/*  <Link
              href={HERO_ACTIONS.primary.href}
              className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              {HERO_ACTIONS.primary.label}
            </Link> */}
            <a
              href={HERO_ACTIONS.secondary.href}
              className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              {HERO_ACTIONS.secondary.label}
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex h-[360px] w-full max-w-md items-center justify-center lg:mx-0">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-neutral-200 via-white to-neutral-300" />
          <div className="relative flex h-[320px] w-[88%] items-center justify-center rounded-[2rem] border-2 border-dashed border-neutral-400 bg-neutral-100 text-center">
            <span className="px-8 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              {HERO_CONTENT.placeholderLabel}
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}