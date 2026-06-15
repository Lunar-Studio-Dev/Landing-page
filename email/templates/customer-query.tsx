import * as React from "react";
import { Text } from "@react-email/components";

import { EmailLayout } from "./_layout";

/** Customer Query - the greeting that goes to the person who reached out. */
export function CustomerQuery({
  firstName,
  reason,
}: {
  firstName: string;
  reason: string;
}) {
  return (
    <EmailLayout preview="Thanks for reaching out to Lunar Studio">
      <Text style={{ fontSize: "20px", color: "#ffffff", margin: "0 0 14px" }}>
        Hi {firstName}, thanks for reaching out 👋
      </Text>
      <Text
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#9c9c9d",
          margin: "0 0 12px",
        }}
      >
        We&apos;ve received your message about{" "}
        <strong style={{ color: "#cdcece" }}>{reason}</strong>. A member of our
        team will get back to you within one business day.
      </Text>
      <Text
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#9c9c9d",
          margin: 0,
        }}
      >
        In the meantime, feel free to reply to this email with any extra details
        about your project.
      </Text>
      <Text style={{ fontSize: "13px", color: "#6a6b6c", margin: "26px 0 0" }}>
        - The Lunar Studio team
      </Text>
    </EmailLayout>
  );
}
