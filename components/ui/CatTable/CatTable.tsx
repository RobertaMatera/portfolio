import Cat from "@/components/ui/Cat/Cat";

interface CatTableProps {
  /** Jokes shown one after another under the scene; none on the 404 page. */
  messages?: string[];
}

/**
 * Loader v2: the cat pushes the last bug off the table, then looks away.
 * Used when loading takes a while, and on the 404 page. Decorative only.
 */
export default function CatTable({ messages }: CatTableProps) {
  return (
    <div className="cat-table" aria-hidden="true">
      <div className="cat-table__scene">
        <span className="cat-table__leg cat-table__leg--left" />
        <span className="cat-table__leg cat-table__leg--right" />
        <span className="cat-table__top" />
        <Cat className="cat-table__cat" />
        <span className="cat-table__paw" />
        <span className="cat-table__bug">
          <svg viewBox="0 0 24 24">
            <path className="cat-table__bug-line" d="M12 8V5M9 6.5L7.5 4.5M15 6.5l1.5-2" />
            <ellipse className="cat-table__bug-body" cx="12" cy="14" rx="6.5" ry="6" />
            <path className="cat-table__bug-line" d="M12 8.5v11" />
            <circle className="cat-table__bug-spot" cx="9.3" cy="12.5" r="1.1" />
            <circle className="cat-table__bug-spot" cx="14.7" cy="12.5" r="1.1" />
            <circle className="cat-table__bug-spot" cx="9.6" cy="16.5" r="1" />
            <circle className="cat-table__bug-spot" cx="14.4" cy="16.5" r="1" />
          </svg>
        </span>
      </div>
      {messages && (
        <p className="loader-messages">
          {messages.map((message) => (
            <span key={message} className="loader-messages__item">
              {message}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
