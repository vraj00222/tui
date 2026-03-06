"use client";

import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-term-muted hover:text-term-text transition-colors px-2 py-1 rounded border border-term-border hover:border-term-muted"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
