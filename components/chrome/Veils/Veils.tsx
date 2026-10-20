/**
 * Frosted fades at the top (and, on phones, the bottom) of the screen, so
 * content blurs out under the top bar and the dock instead of cutting off.
 */
export default function Veils() {
  return (
    <>
      <div className="veil veil--top" aria-hidden="true" />
      <div className="veil veil--bottom" aria-hidden="true" />
    </>
  );
}
