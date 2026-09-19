/**
 * Renders a typing-animation heading so the full text is always in the DOM.
 * `shown` is the animated (partial) text for sighted users; `full` is exposed to
 * crawlers and screen readers, which otherwise only see an empty or half-typed heading.
 */
export default function TypedText({ full, shown }: { full: string; shown: string }) {
  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">{shown}</span>
    </>
  );
}
