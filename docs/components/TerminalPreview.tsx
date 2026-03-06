interface TerminalPreviewProps {
  title?: string;
  children: React.ReactNode;
}

export function TerminalPreview({ title = "terminal", children }: TerminalPreviewProps) {
  return (
    <div className="rounded-lg border border-term-border overflow-hidden my-6">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-term-surface border-b border-term-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-xs text-term-muted font-mono">
          {title}
        </span>
        <div className="w-[52px]" />
      </div>
      <div className="bg-term-terminal p-4 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
