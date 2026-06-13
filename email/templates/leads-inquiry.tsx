import * as React from "react";
import { Column, Row, Text } from "@react-email/components";

import { EmailLayout } from "./_layout";

/** Leads Inquiry — the lead notification that goes to the Lunar Studio team. */
export function LeadsInquiry({
  firstName,
  lastName,
  email,
  reason,
  submittedAt,
}: {
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  submittedAt: string;
}) {
  const rows: Array<[string, string]> = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Reason", reason],
    ["Submitted", submittedAt],
  ];

  return (
    <EmailLayout preview={`New lead: ${firstName} ${lastName} — ${reason}`}>
      <Text style={{ fontSize: "18px", color: "#ffffff", margin: "0 0 18px" }}>
        New contact submission
      </Text>
      {rows.map(([label, value]) => (
        <Row key={label} style={{ marginBottom: "10px" }}>
          <Column
            style={{
              width: "96px",
              verticalAlign: "top",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6a6b6c",
            }}
          >
            {label}
          </Column>
          <Column style={{ fontSize: "14px", color: "#e6e6e6" }}>{value}</Column>
        </Row>
      ))}
    </EmailLayout>
  );
}
