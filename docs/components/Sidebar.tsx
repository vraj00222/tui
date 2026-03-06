"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: "~" },
  { type: "divider" as const, label: "Components" },
  { href: "/components/spinner", label: "Spinner", icon: "⠋" },
  { href: "/components/progress", label: "ProgressBar", icon: "█" },
  { href: "/components/box", label: "Box", icon: "╭" },
  { href: "/components/select", label: "Select", icon: "❯" },
  { href: "/components/table", label: "Table", icon: "┌" },
  { href: "/components/animated-text", label: "Animated Text", icon: "✦" },
  { href: "/components/toast", label: "Toast", icon: "✔" },
  { href: "/components/input", label: "Input", icon: ">" },
  { href: "/components/confirm", label: "Confirm", icon: "?" },
  { href: "/components/list", label: "List", icon: "●" },
  { href: "/components/badge", label: "Badge", icon: "◆" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-term-surface border-r border-term-border flex flex-col z-50">
      <div className="px-5 py-6 border-b border-term-border">
        <Link href="/" className="block">
          <div className="font-mono text-lg font-bold">
            <span className="text-term-green">$</span>{" "}
            <span className="text-term-text">tui</span>
          </div>
          <div className="text-xs text-term-muted mt-1">Terminal UI Components</div>
        </Link>
        <div className="mt-2">
          <span className="text-xs font-mono text-term-muted border border-term-border rounded px-1.5 py-0.5">
            v1.0.0
          </span>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} className="px-5 py-2 mt-2 text-xs text-term-muted uppercase tracking-wider font-semibold">
                {item.label}
              </div>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`
                flex items-center gap-3 px-5 py-2 text-sm font-mono transition-all duration-150
                border-l-2
                ${isActive
                  ? "bg-term-accent/10 text-term-accent border-term-accent"
                  : "text-term-muted hover:text-term-text hover:bg-term-bg/50 border-transparent"
                }
              `}
            >
              <span className="w-5 text-center opacity-70">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-term-border text-xs text-term-muted font-mono">
        <a
          href="https://github.com/vraj00222/tui"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-term-text transition-colors"
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
