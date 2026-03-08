# @vr_patel/tui

A **zero-dependency** TypeScript Terminal UI component library built entirely on ANSI escape codes. Inspired by the sleek terminal interfaces of modern CLI tools like Claude Code.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Dependencies-0-brightgreen" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/Components-11-purple" />
  <img src="https://img.shields.io/badge/Tests-61%20passing-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
  <img src="https://img.shields.io/npm/v/@vr_patel/tui?color=red&label=npm" />
</p>

---

## Components

| Component | Description |
|-----------|-------------|
| **Spinner** | 9 built-in animation styles (dots, braille, arc, bouncing bar, pulse, arrows, earth, moon, line) with live text updates and elapsed time |
| **Progress Bar** | Gradient or flat color bars with percentage, ETA, and item counts |
| **Box / Panel** | 6 border styles (round, single, double, heavy, dashed, ascii) with titles and padding |
| **Select / Menu** | Interactive keyboard-navigated list with scrolling, descriptions, and vim keys |
| **Table** | Formatted data tables with headers, colored rows, and auto-sized columns |
| **Animated Text** | Typewriter, gradient wave, shimmer/sparkle, and bouncing text effects |
| **Toast** | Styled notification messages — success, error, warning, info |
| **Input** | Interactive text input with validation, placeholder, and password masking |
| **Confirm** | Yes/No confirmation prompt with keyboard toggle |
| **List** | 6 list styles (bullet, dash, arrow, star, numbered, task) with nesting support |
| **Badge** | Colored inline labels — presets, outline, dot indicators, custom colors |

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

# Run tests
npm test
```

## Visual Previews

### Spinner

```
⠋ Loading...                     (0.0s)
⠙ Authenticating...              (1.2s)
⠹ Fetching data...               (2.4s)
✔ All tasks completed!            (3.6s)
```

9 built-in styles: `dots` `braille` `arc` `bouncingBar` `pulse` `arrows` `earth` `moon` `line`

### Progress Bar

```
  Installing ██████████████████████████████████████░░  95% 95/100 ETA 0.2s
```

Gradient mode transitions red → yellow → green as progress increases:

```
  Building   █████████████████████████████████████████ 100% 100/100
  ✔ Build complete!
```

### Box / Panel

```
╭─ Server Status ──────────────────╮
│                                  │
│   Status:  ● Online              │
│   Uptime:  12d 4h 32m           │
│   CPU:     23%                   │
│   Memory:  4.2 GB / 16 GB       │
│   Latency: 12ms                  │
│                                  │
╰──────────────────────────────────╯
```

6 border styles:

```
╭──────╮  ┌──────┐  ╔══════╗  ┏━━━━━━┓  ┌┄┄┄┄┄┄┐  +------+
│ round│  │single│  ║double║  ┃ heavy┃  ┆dashed┆  |ascii |
╰──────╯  └──────┘  ╚══════╝  ┗━━━━━━┛  └┄┄┄┄┄┄┘  +------+
```

### Select / Menu

```
? Pick a framework:
  ❯ React    - Meta's UI library
    Vue      - Progressive framework
    Svelte   - Compiled framework
    Angular  - Google's framework (disabled)

  ↑↓ to navigate, Enter to select, Ctrl+C to cancel
```

### Table

```
┌───────────┬──────────┬─────────┐
│ Name      │ Role     │ Status  │
├───────────┼──────────┼─────────┤
│ Alice     │ Engineer │ Active  │
│ Bob       │ Designer │ Away    │
│ Charlie   │ Manager  │ Active  │
└───────────┴──────────┴─────────┘
```

### Toast Notifications

```
──────────────────────────────────────
✔ SUCCESS
│ Build completed successfully!
──────────────────────────────────────

──────────────────────────────────────
✖ ERROR
│ Connection refused on port 5432
──────────────────────────────────────

──────────────────────────────────────
⚠ WARNING
│ Deprecated API: use v2 endpoint
──────────────────────────────────────

──────────────────────────────────────
ℹ INFO
│ Server listening on port 3000
──────────────────────────────────────
```

### Input

```
? What is your name? Enter your name...
? What is your name? Alice
✔ What is your name? Alice

? Enter a secret (masked): ****
✔ Enter a secret (masked): ****
```

Supports validation:

```
? Email: foo
  ✖ Must be a valid email
```

### Confirm

```
? Delete all files? Yes / No
✔ Delete all files? Yes
```

### List

**Bullet list with nesting:**
```
● First item
● Second with children
  ○ Child A
  ○ Child B
● Third item
```

**Task list:**
```
✔ Set up project
✔ Write components
○ Add tests
○ Deploy
```

**Numbered list:**
```
1. Clone the repository
2. Install dependencies
3. Run the showcase
4. Start building!
```

### Badge

**Preset badges:**
```
 PASS   FAIL   WARN   INFO   N/A
```
(colored backgrounds: green, red, yellow, blue, gray)

**Outline badges:**
```
[typescript]  [v1.0.0]  [MIT]
```

**Status indicators:**
```
● Production   ● Staging   ● Offline
```

### Animated Text Effects

**Typewriter** — characters appear one by one with cursor blink:
```
Hello! I'm typ▌
Hello! I'm typing this cha▌
Hello! I'm typing this character by character...
```

**Gradient Wave** — rainbow colors flow through text (animated):
```
★ This text flows through a rainbow of colors ★
```

**Shimmer** — sparkle effect dances across text (animated):
```
✦par✧lin✦ ma⋆ical ✧ext ✦ffect
```

**Bouncing Text** — text bounces left and right with trail:
```
         >>> BOUNCE <<<
              >>> BOUNCE <<<
                   >>> BOUNCE <<<
```

---

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
│   ├── animated-text.ts # Text animation effects
│   ├── toast.ts         # Styled notification messages
│   ├── input.ts         # Interactive text input
│   ├── confirm.ts       # Yes/No confirmation prompt
│   ├── list.ts          # Styled list renderer
│   └── badge.ts         # Colored inline labels
├── tests/
│   ├── ansi.test.ts     # Core ANSI utility tests
│   ├── renderer.test.ts # Renderer & animation loop tests
│   └── components.test.ts # Component tests (Box, Table, Toast, List, Badge)
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
- **Testable** — 61 tests using Node's built-in test runner

## Usage Examples

### Spinner

```typescript
import { Spinner } from "@vr_patel/tui";

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
import { ProgressBar } from "@vr_patel/tui";

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
import { Box, fg, style, colorize } from "@vr_patel/tui";

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
import { select } from "@vr_patel/tui";

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
import { Table, fg, colorize } from "@vr_patel/tui";

const table = new Table({
  headers: ["Name", "Role", "Status"],
  rows: [
    ["Alice", "Engineer", colorize("Active", fg.green)],
    ["Bob",   "Designer", colorize("Away", fg.yellow)],
  ],
});

console.log(table.render());
```

### Toast Notifications

```typescript
import { toast, Toast } from "@vr_patel/tui";

// Quick one-liners
console.log(toast.success("Build completed!"));
console.log(toast.error("Connection failed"));
console.log(toast.warn("Deprecated API"));
console.log(toast.info("Server running on port 3000"));

// With options
const t = new Toast({ timestamp: true });
console.log(t.success("Deployed to production"));
```

### Input

```typescript
import { input } from "@vr_patel/tui";

const name = await input({ message: "What is your name?" });

const email = await input({
  message: "Email:",
  validate: (v) => v.includes("@") || "Must be a valid email",
});

const password = await input({
  message: "Password:",
  mask: "*",
  validate: (v) => v.length >= 8 || "Must be at least 8 characters",
});
```

### Confirm

```typescript
import { confirm } from "@vr_patel/tui";

const ok = await confirm({
  message: "Delete all files?",
  defaultValue: false,
});

if (ok) {
  console.log("Deleted!");
}
```

### List

```typescript
import { List } from "@vr_patel/tui";

// Bullet list with nesting
const list = new List({ style: "bullet" });
console.log(list.render([
  "First item",
  { text: "Second", children: [
    { text: "Child A" },
    { text: "Child B" },
  ]},
]));

// Task list
const tasks = new List({ style: "task" });
console.log(tasks.render([
  { text: "Setup", checked: true },
  { text: "Build", checked: false },
]));

// Also: "numbered", "letter", "arrow", "star", "dash"
```

### Badge

```typescript
import { Badge, badge, fg, bg } from "@vr_patel/tui";

// Preset badges
console.log(Badge.success("PASS"));
console.log(Badge.error("FAIL"));
console.log(Badge.warning("WARN"));
console.log(Badge.info("INFO"));

// Outline style
console.log(Badge.outline("v2.1.0", fg.blue));

// Status dot indicator
console.log(Badge.status("Online", fg.green));

// Custom colors
console.log(Badge.custom("DEPLOY", fg.black, bg.brightMagenta));
```

### Animated Text

```typescript
import { typewriter, gradientWave, shimmer, bouncingText } from "@vr_patel/tui";

// Typewriter — characters appear one by one
await typewriter({ text: "Hello, world!", speed: 40 });

// Gradient wave — rainbow colors flow through text
await gradientWave({ text: "Rainbow text!", duration: 3000 });

// Shimmer — sparkle effect across text
await shimmer({ text: "Sparkle!", duration: 3000 });

// Bouncing text — text bounces side to side
await bouncingText({ text: "BOUNCE", duration: 4000 });
```

### Low-level ANSI Utilities

```typescript
import { fg, bg, style, colorize, cursor, erase } from "@vr_patel/tui";

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
| `npm run showcase` | Auto-playing demo of all 11 components |
| `npm run interactive` | Interactive menu to try components individually |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Watch mode for development |
| `npm test` | Run the test suite (61 tests) |

## Requirements

- **Node.js** 18+ (for modern ES2022 features)
- A terminal that supports **ANSI escape codes** and **Unicode** (most modern terminals)

## License

ISC
