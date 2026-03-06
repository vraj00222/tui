import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({ code, lang = "typescript", filename }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="relative group rounded-lg border border-term-border overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-term-surface border-b border-term-border">
        <span className="text-xs text-term-muted font-mono">
          {filename ?? lang}
        </span>
        <CopyButton code={code.trim()} />
      </div>
      <div
        className="[&>pre]:!bg-term-terminal [&>pre]:!p-4 [&>pre]:!m-0 [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
