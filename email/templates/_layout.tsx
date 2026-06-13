import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

const styles = {
  body: {
    backgroundColor: "#07080a",
    color: "#e6e6e6",
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "32px 0",
  },
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    backgroundColor: "#0c0d0f",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "32px",
  },
  brand: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
    letterSpacing: "0.2px",
  },
  hr: {
    borderColor: "rgba(255,255,255,0.08)",
    margin: "20px 0",
  },
} as const;

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.brand}>Lunar Studio</Text>
          <Hr style={styles.hr} />
          {children}
        </Container>
      </Body>
    </Html>
  );
}
