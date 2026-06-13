import * as React from "react";

/** Renders JSON-LD structured data into the server HTML. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // escape "<" to avoid breaking out of the script tag; data is trusted
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
