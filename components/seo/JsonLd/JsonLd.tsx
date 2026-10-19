import type { JsonLdDocument } from "@/lib/structured-data";

interface JsonLdProps {
  data: JsonLdDocument;
}

/** Renders schema.org structured data. A plain <script> is correct here: it is data, not code. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" stops a value from closing the script tag early (XSS).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
