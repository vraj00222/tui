import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";

const COMPONENTS = [
  { href: "/components/spinner", icon: "⠋", name: "Spinner", desc: "9 animated loading indicator styles" },
  { href: "/components/progress", icon: "█", name: "ProgressBar", desc: "Gradient bars with ETA & percentage" },
  { href: "/components/box", icon: "╭", name: "Box", desc: "6 border styles with titles & padding" },
  { href: "/components/select", icon: "❯", name: "Select", desc: "Interactive keyboard-navigated menus" },
  { href: "/components/table", icon: "┌", name: "Table", desc: "Formatted tables with auto-sizing" },
  { href: "/components/animated-text", icon: "✦", name: "Animated Text", desc: "Typewriter, wave, shimmer, bounce" },
  { href: "/components/toast", icon: "✔", name: "Toast", desc: "Success, error, warning, info messages" },
  { href: "/components/input", icon: ">", name: "Input", desc: "Text input with validation & masking" },
  { href: "/components/confirm", icon: "?", name: "Confirm", desc: "Yes/No confirmation prompt" },
  { href: "/components/list", icon: "●", name: "List", desc: "6 list styles with nesting support" },
  { href: "/components/badge", icon: "◆", name: "Badge", desc: "Colored labels, outlines & dot indicators" },
];

const QUICK_START = `import { Spinner, ProgressBar, Box, toast, Badge } from "@vr_patel/tui";

// Spinner with live updates
const spinner = new Spinner({ text: "Loading...", style: "dots" });
spinner.start();
spinner.update("Almost there...");
spinner.stop("Done!");

// Progress bar with gradient
const bar = new ProgressBar({ total: 100, gradient: true });
bar.start("Building");
bar.update(50);
bar.finish("Build complete!");

// Box panel
const box = new Box({ title: "Status", borderStyle: "round" });
console.log(box.render("All systems operational"));

// Toast notification
console.log(toast.success("Deployed to production!"));

// Badge
console.log(Badge.success("PASS") + " " + Badge.outline("v1.0.0", fg.blue));`;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold font-mono mb-4">
          <span className="text-term-green">$</span> tui
        </h1>
        <p className="text-xl text-term-muted mb-2 leading-relaxed">
          A zero-dependency TypeScript Terminal UI component library.
        </p>
        <p className="text-lg text-term-muted mb-8">
          Built entirely on ANSI escape codes. No external packages required.
        </p>

        <div className="inline-flex items-center gap-3 bg-term-surface border border-term-border rounded-lg px-4 py-3 font-mono text-sm">
          <span className="text-term-green">$</span>
          <span className="text-term-text">npm install @vr_patel/tui</span>
          <CopyButton code="npm install @vr_patel/tui" />
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {[
          { title: "Zero Dependencies", desc: "Pure ANSI escape codes. Only Node.js built-ins.", icon: "0" },
          { title: "11 Components", desc: "Spinners, progress bars, tables, inputs, and more.", icon: "11" },
          { title: "TypeScript Native", desc: "Full strict mode with exported types and interfaces.", icon: "TS" },
        ].map((f) => (
          <div key={f.title} className="p-5 bg-term-surface border border-term-border rounded-lg">
            <div className="text-2xl font-mono font-bold text-term-cyan mb-2">{f.icon}</div>
            <h3 className="font-semibold text-term-text mb-1">{f.title}</h3>
            <p className="text-sm text-term-muted">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Component grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold font-mono text-term-text mb-6">
          <span className="text-term-cyan">#</span> Components
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {COMPONENTS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block p-4 bg-term-surface border border-term-border rounded-lg hover:border-term-accent transition-colors"
            >
              <div className="text-xl mb-2 font-mono text-term-cyan">{c.icon}</div>
              <h3 className="font-mono font-semibold text-term-text group-hover:text-term-accent transition-colors text-sm">
                {c.name}
              </h3>
              <p className="text-xs text-term-muted mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold font-mono text-term-text mb-6">
          <span className="text-term-cyan">#</span> Quick Start
        </h2>
        <CodeBlock code={QUICK_START} filename="quickstart.ts" />
      </div>
    </div>
  );
}
