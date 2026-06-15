const TOKENS = [
  { name: "background", cssVar: "--background" },
  { name: "card", cssVar: "--card" },
  { name: "secondary", cssVar: "--secondary" },
  { name: "accent", cssVar: "--accent" },
  { name: "muted-foreground", cssVar: "--muted-foreground" },
  { name: "foreground", cssVar: "--foreground" },
  { name: "primary", cssVar: "--primary" },
  { name: "brand", cssVar: "--brand" },
  { name: "brand-muted", cssVar: "--brand-muted" },
  { name: "destructive", cssVar: "--destructive" },
];

function ColorPalette() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {TOKENS.map((token) => (
        <div key={token.name} className="flex flex-col gap-2">
          <div
            className="h-16 rounded-xl border"
            style={{ background: `var(${token.cssVar})` }}
          />
          <p className="font-mono text-xs text-muted-foreground">
            {token.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export { ColorPalette };
