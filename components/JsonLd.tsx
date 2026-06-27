/**
 * Renders a JSON-LD structured-data block in a <script type="application/ld+json">.
 *
 * `data` is a schema.org object (or array of objects). The serialized JSON has
 * "<" escaped to "<" so a value can never break out of the <script> element
 * (the standard safe-embedding guard for inline JSON-LD).
 *
 * Server-rendered, so the structured data is present in the initial HTML for
 * crawlers and answer engines.
 */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
