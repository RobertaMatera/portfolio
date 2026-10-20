import Cat from "@/components/ui/Cat/Cat";

interface CatChaseProps {
  /** Jokes shown one after another under the scene. */
  messages: string[];
}

/**
 * Loader v1: the cat chases a fish along a line and never catches it.
 * Decorative only; the surrounding Loader announces the loading state.
 */
export default function CatChase({ messages }: CatChaseProps) {
  return (
    <div className="cat-chase" aria-hidden="true">
      <div className="cat-chase__track">
        <span className="cat-chase__line" />
        <span className="cat-chase__runner">
          <Cat className="cat-chase__cat" />
        </span>
        <span className="cat-chase__fish">
          <svg viewBox="0 0 24 24">
            <path className="cat-chase__fish-body" d="M2 12c3-5 9-6 13-2l5-3v10l-5-3c-4 4-10 3-13-2z" />
            <circle className="cat-chase__fish-eye" cx="7.5" cy="11" r=".9" />
          </svg>
        </span>
      </div>
      <p className="loader-messages">
        {messages.map((message) => (
          <span key={message} className="loader-messages__item">
            {message}
          </span>
        ))}
      </p>
    </div>
  );
}
