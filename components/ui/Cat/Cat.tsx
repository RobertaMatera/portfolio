interface CatProps {
  className?: string;
}

/** The loaders' cat: a white face with a green outline. Decorative. */
export default function Cat({ className }: CatProps) {
  return (
    <svg className={["cat", className].filter(Boolean).join(" ")} viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="cat__face"
        d="M5 10L4 3.5l5 3a8 8 0 0 1 6 0l5-3L19 10a7 7 0 0 1 1 3.5c0 4-3.8 6.5-8 6.5s-8-2.5-8-6.5A7 7 0 0 1 5 10z"
      />
      <circle className="cat__ink" cx="9" cy="13" r=".9" />
      <circle className="cat__ink" cx="15" cy="13" r=".9" />
      <path className="cat__ink" d="M11 15.5h2l-1 1z" />
    </svg>
  );
}
