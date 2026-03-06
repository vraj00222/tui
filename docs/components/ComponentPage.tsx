import { CodeBlock } from "./CodeBlock";
import { TerminalPreview } from "./TerminalPreview";

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

interface ComponentPageProps {
  title: string;
  description: string;
  badges?: { label: string; variant: "green" | "blue" | "yellow" | "purple" }[];
  code: string;
  codeFilename?: string;
  apiTable?: ApiRow[];
  preview: React.ReactNode;
  previewTitle?: string;
  children?: React.ReactNode;
}

const BADGE_COLORS = {
  green: "text-term-green border-term-green/30",
  blue: "text-term-accent border-term-accent/30",
  yellow: "text-term-yellow border-term-yellow/30",
  purple: "text-term-magenta border-term-magenta/30",
};

export function ComponentPage({
  title, description, badges, code, codeFilename,
  apiTable, preview, previewTitle, children,
}: ComponentPageProps) {
  return (
    <article>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-mono text-term-text mb-2">
          <span className="text-term-green">$</span> {title}
        </h1>
        {badges && (
          <div className="flex gap-2 mb-3">
            {badges.map((b) => (
              <span key={b.label} className={`text-xs px-2 py-0.5 rounded font-mono border ${BADGE_COLORS[b.variant]}`}>
                {b.label}
              </span>
            ))}
          </div>
        )}
        <p className="text-term-muted text-lg leading-relaxed">{description}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold font-mono text-term-text mb-3 flex items-center gap-2">
          <span className="text-term-cyan">#</span> Preview
        </h2>
        <TerminalPreview title={previewTitle ?? `${title.toLowerCase()} demo`}>
          {preview}
        </TerminalPreview>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold font-mono text-term-text mb-3 flex items-center gap-2">
          <span className="text-term-cyan">#</span> Usage
        </h2>
        <CodeBlock code={code} filename={codeFilename ?? "example.ts"} />
      </section>

      {apiTable && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold font-mono text-term-text mb-3 flex items-center gap-2">
            <span className="text-term-cyan">#</span> API
          </h2>
          <div className="overflow-x-auto rounded-lg border border-term-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-term-surface text-term-cyan font-mono">
                  <th className="text-left px-4 py-2 border-b border-term-border">Prop</th>
                  <th className="text-left px-4 py-2 border-b border-term-border">Type</th>
                  <th className="text-left px-4 py-2 border-b border-term-border">Default</th>
                  <th className="text-left px-4 py-2 border-b border-term-border">Description</th>
                </tr>
              </thead>
              <tbody>
                {apiTable.map((row, i) => (
                  <tr key={row.prop} className={i % 2 === 1 ? "bg-term-surface/50" : ""}>
                    <td className="px-4 py-2 font-mono text-term-yellow border-b border-term-border">{row.prop}</td>
                    <td className="px-4 py-2 font-mono text-term-magenta border-b border-term-border">{row.type}</td>
                    <td className="px-4 py-2 font-mono text-term-muted border-b border-term-border">{row.default}</td>
                    <td className="px-4 py-2 text-term-text border-b border-term-border">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {children}
    </article>
  );
}
