# tui

A **zero-dependency** TypeScript Terminal UI component library built entirely on ANSI escape codes. Inspired by the sleek terminal interfaces of modern CLI tools like Claude Code.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Dependencies-0-brightgreen" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/License-ISC-yellow" />
</p>

---

## Features

| Component | Description |
|-----------|-------------|
| **Spinner** | 9 built-in animation styles (dots, braille, arc, bouncing bar, pulse, arrows, earth, moon, line) with live text updates |
| **Progress Bar** | Gradient or flat color bars with percentage, ETA, and item counts |
| **Box / Panel** | 6 border styles (round, single, double, heavy, dashed, ascii) with titles and padding |
| **Select / Menu** | Interactive keyboard-navigated list with scrolling and descriptions |
| **Table** | Formatted data tables with headers, colored rows, and auto-sized columns |
| **Animated Text** | Typewriter, gradient wave, shimmer/sparkle, and bouncing text effects |

## Quick Start

```bash
# Clone & install
git clone git@github.com:vraj00222/tui.git
cd tui
npm install

# Run the showcase (auto-plays all components)
npm run showcase

# Run the interactive demo (keyboard-driven menu)
npm run interactive
```

## Architecture

```
src/
├── core/
│   ├── ansi.ts          # ANSI escape code primitives (cursor, colors, erase)
│   └── renderer.ts      # Flicker-free render engine & animation loop
├── components/
│   ├── spinner.ts       # Animated loading indicators
│   ├── progress.ts      # Progress bars with gradient & ETA
│   ├── box.ts           # Bordered panels / cards
│   ├── select.ts        # Interactive keyboard menus
│   ├── table.ts         # Formatted data tables
│   └── animated-text.ts # Text animation effects
├── demos/
│   ├── showcase.ts      # Auto-playing demo of all components
│   └── interactive.ts   # Interactive menu-driven demo
└── index.ts             # Barrel exports
```

### Design Principles

- **Zero dependencies** — only Node.js built-ins and raw ANSI escape sequences
- **Composable** — each component is self-contained, import only what you need
- **Type-safe** — full TypeScript with exported interfaces for all options
- **Flicker-free** — the `Renderer` class handles cursor management and redraws

## Usage Examples

### Spinner

```typescript
import { Spinner } from "./src/index.js";

const spinner = new Spinner({ text: "Loading...", style: "dots" });
spinner.start();

// Update text mid-spin
spinner.update("Almost there...");

// Finish with different states
spinner.stop("Done!");      // ✔ green
spinner.fail("Error!");     // ✖ red
spinner.warn("Warning!");   // ⚠ yellow
spinner.info("Note:");      // ℹ blue
```

### Progress Bar

```typescript
import { ProgressBar } from "./src/index.js";

const bar = new ProgressBar({
  total: 100,
  width: 40,
  title: "Downloading",
  gradient: true,      // red → yellow → green
  showETA: true,
});

bar.start();
for (let i = 0; i <= 100; i++) {
  bar.update(i);
  await sleep(30);
}
bar.finish("Download complete!");
```

### Box / Panel

```typescript
import { Box, fg, style, colorize } from "./src/index.js";

const box = new Box({
  title: "Server Status",
  borderStyle: "round",     // round | single | double | heavy | dashed | ascii
  borderColor: fg.cyan,
  padding: 1,
  paddingY: 1,
});

console.log(box.render(
  colorize("Status: ", fg.gray) + colorize("● Online", fg.green, style.bold) + "\n" +
  colorize("Uptime: ", fg.gray) + "12d 4h 32m"
));
```

### Interactive Select

```typescript
import { select } from "./src/index.js";

const choice = await select({
  message: "Pick a framework:",
  options: [
    { label: "React",   value: "react",   description: "Meta's UI library" },
    { label: "Vue",     value: "vue",     description: "Progressive framework" },
    { label: "Svelte",  value: "svelte",  description: "Compiled framework" },
  ],
});

console.log(`You chose: ${choice}`);
```

### Table

```typescript
import { Table, fg, colorize } from "./src/index.js";

const table = new Table({
  headers: ["Name", "Role", "Status"],
  rows: [
    ["Alice", "Engineer", colorize("Active", fg.green)],
    ["Bob",   "Designer", colorize("Away", fg.yellow)],
  ],
});

console.log(table.render());
```

### Animated Text

```typescript
import { typewriter, gradientWave, shimmer, bouncingText } from "./src/index.js";

// Typewriter — characters appear one by one
await typewriter({ text: "Hello, world!", speed: 40 });

// Gradient wave — rainbow colors flow through text
await gradientWave({ text: "Rainbow text!", duration: 3000 });

// Shimmer — sparkle effect across text
await shimmer({ text: "✨ Sparkle ✨", duration: 3000 });

// Bouncing text — text bounces side to side
await bouncingText({ text: "BOUNCE", duration: 4000 });
```

### Low-level ANSI Utilities

```typescript
import { fg, bg, style, colorize, cursor, erase } from "./src/index.js";

// Compose colors and styles
console.log(colorize("Bold cyan text", fg.cyan, style.bold));
console.log(fg.rgb(255, 100, 50) + "True color!" + style.reset);

// Cursor control
process.stdout.write(cursor.hide);
process.stdout.write(cursor.to(10, 5));  // move to column 10, row 5
process.stdout.write(erase.line);        // clear current line
process.stdout.write(cursor.show);
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run showcase` | Auto-playing demo of all components |
| `npm run interactive` | Interactive menu to try components individually |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Watch mode for development |

## Requirements

- **Node.js** 18+ (for modern ES2022 features)
- A terminal that supports **ANSI escape codes** and **Unicode** (most modern terminals)

## License

ISC
