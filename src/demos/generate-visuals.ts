/**
 * Generates static visual previews of components for README.
 * Run: npx tsx src/demos/generate-visuals.ts
 */

import {
  fg, bg, style, colorize, stripAnsi,
  Box,
  Table,
  Toast, toast,
  List,
  Badge,
} from "../index.js";

function section(title: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${"=".repeat(60)}\n`);
}

// ── Box ──────────────────────────────────────────────────────
section("Box Component");

const box = new Box({
  title: "Server Status",
  borderStyle: "round",
  borderColor: fg.cyan,
  padding: 1,
  paddingY: 1,
});
console.log(box.render(
  "Status:  Online" + "\n" +
  "Uptime:  12d 4h 32m" + "\n" +
  "CPU:     23%" + "\n" +
  "Memory:  4.2 GB / 16 GB"
));

// ── Table ────────────────────────────────────────────────────
section("Table Component");

const table = new Table({
  headers: ["Name", "Role", "Status"],
  rows: [
    ["Alice", "Engineer", "Active"],
    ["Bob", "Designer", "Away"],
    ["Charlie", "Manager", "Active"],
  ],
});
console.log(table.render());

// ── Toast ────────────────────────────────────────────────────
section("Toast Component");

console.log(toast.success("Build completed successfully!"));
console.log();
console.log(toast.error("Connection refused on port 5432"));
console.log();
console.log(toast.warn("Deprecated API: use v2 endpoint"));
console.log();
console.log(toast.info("Server listening on port 3000"));

// ── List ─────────────────────────────────────────────────────
section("List Component");

const bulletList = new List({ style: "bullet" });
console.log(bulletList.render([
  "First item",
  { text: "Second with children", children: [
    { text: "Child A" },
    { text: "Child B" },
  ]},
  "Third item",
]));

console.log();

const taskList = new List({ style: "task" });
console.log(taskList.render([
  { text: "Set up project", checked: true },
  { text: "Write components", checked: true },
  { text: "Add tests", checked: false },
  { text: "Deploy", checked: false },
]));

// ── Badge ────────────────────────────────────────────────────
section("Badge Component");

console.log(Badge.success("PASS") + "  " + Badge.error("FAIL") + "  " + Badge.warning("WARN") + "  " + Badge.info("INFO"));
console.log();
console.log(Badge.outline("typescript", fg.blue) + "  " + Badge.outline("v1.0.0", fg.yellow) + "  " + Badge.outline("MIT", fg.green));
console.log();
console.log(Badge.status("Production", fg.green) + "   " + Badge.status("Staging", fg.yellow) + "   " + Badge.status("Offline", fg.red));
