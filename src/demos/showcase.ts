/**
 * TUI Component Showcase
 *
 * Run:  npx tsx src/demos/showcase.ts
 *
 * Demonstrates all the terminal UI components in sequence.
 */

import {
  fg, bg, style, colorize,
  Spinner,
  ProgressBar,
  Box,
  Table,
  Toast, toast,
  List,
  Badge,
  typewriter, gradientWave, shimmer, bouncingText,
} from "../index.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function divider(title: string) {
  const width = process.stdout.columns || 80;
  const line = "─".repeat(width);
  console.log();
  console.log(colorize(line, fg.gray, style.dim));
  console.log(colorize(`  ${title}`, fg.brightMagenta, style.bold));
  console.log(colorize(line, fg.gray, style.dim));
  console.log();
}

async function main() {
  console.clear();

  // ── Welcome Banner ──────────────────────────────────────────────
  const banner = new Box({
    title: "TUI Components Showcase",
    titleAlignment: "center",
    borderStyle: "double",
    borderColor: fg.brightCyan,
    titleColor: fg.brightYellow + style.bold,
    padding: 1,
    paddingY: 1,
  });

  console.log(
    banner.render(
      colorize("  A TypeScript Terminal UI Component Library", fg.white) +
        "\n" +
        colorize("  Inspired by Claude Code's terminal interface", fg.gray) +
        "\n" +
        colorize("  Built with zero dependencies - pure ANSI escape codes", fg.gray)
    )
  );
  console.log();
  await sleep(1500);

  // ── 1. Animated Text Effects ────────────────────────────────────
  divider("1. ANIMATED TEXT EFFECTS");

  console.log(colorize("  Typewriter effect:", fg.yellow));
  process.stdout.write("  ");
  await typewriter({
    text: "Hello! I'm typing this character by character...",
    speed: 40,
    color: fg.brightGreen,
  });
  await sleep(500);

  console.log(colorize("\n  Gradient wave:", fg.yellow));
  process.stdout.write("  ");
  await gradientWave({
    text: "This text flows through a rainbow of colors",
    duration: 3000,
    speed: 40,
  });
  await sleep(500);

  console.log(colorize("\n  Shimmer/sparkle:", fg.yellow));
  process.stdout.write("  ");
  await shimmer({
    text: "Sparkling magical text effect",
    duration: 3000,
    baseColor: fg.brightCyan,
  });
  await sleep(500);

  console.log(colorize("\n  Bouncing text:", fg.yellow));
  await bouncingText({
    text: ">>> BOUNCE <<<",
    duration: 3500,
    color: fg.brightYellow + style.bold,
    width: 60,
  });
  await sleep(500);

  // ── 2. Spinners ─────────────────────────────────────────────────
  divider("2. SPINNER STYLES");

  const spinnerNames = ["dots", "braille", "arc", "bouncingBar", "pulse", "arrows", "line"];

  for (const name of spinnerNames) {
    const spinner = new Spinner({ text: `Spinner style: "${name}"`, style: name });
    spinner.start();
    await sleep(2000);
    spinner.stop(`Spinner "${name}" complete`);
    await sleep(200);
  }

  // Spinner that changes text
  const workSpinner = new Spinner({ text: "Connecting to server...", style: "dots", color: fg.brightCyan });
  workSpinner.start();
  await sleep(1500);
  workSpinner.update("Authenticating...");
  await sleep(1500);
  workSpinner.update("Fetching data...");
  await sleep(1500);
  workSpinner.update("Processing results...");
  await sleep(1500);
  workSpinner.stop("All tasks completed successfully!");
  await sleep(500);

  // ── 3. Progress Bar ─────────────────────────────────────────────
  divider("3. PROGRESS BARS");

  console.log(colorize("  Gradient progress bar:", fg.yellow));
  console.log();
  const bar1 = new ProgressBar({
    total: 100,
    width: 40,
    title: "  Installing",
    gradient: true,
  });
  bar1.start();
  for (let i = 0; i <= 100; i++) {
    bar1.update(i);
    await sleep(30);
  }
  bar1.finish("Installation complete!");

  await sleep(500);

  console.log(colorize("\n  Flat color progress bar:", fg.yellow));
  console.log();
  const bar2 = new ProgressBar({
    total: 50,
    width: 30,
    title: "  Downloading",
    gradient: false,
    barColor: fg.brightBlue,
    completeChar: "▓",
    incompleteChar: "▒",
  });
  bar2.start();
  for (let i = 0; i <= 50; i++) {
    bar2.update(i);
    await sleep(40);
  }
  bar2.finish("Download complete!");
  await sleep(500);

  // ── 4. Boxes ────────────────────────────────────────────────────
  divider("4. BOX / PANEL STYLES");

  const boxStyles: Array<{ name: string; style: string; color: string }> = [
    { name: "Round (default)", style: "round", color: fg.cyan },
    { name: "Single", style: "single", color: fg.green },
    { name: "Double", style: "double", color: fg.yellow },
    { name: "Heavy", style: "heavy", color: fg.brightRed },
    { name: "Dashed", style: "dashed", color: fg.magenta },
  ];

  for (const bs of boxStyles) {
    const box = new Box({
      title: bs.name,
      borderStyle: bs.style,
      borderColor: bs.color,
      padding: 1,
      paddingY: 0,
    });
    console.log(box.render(
      `This is a ${colorize(bs.name, style.bold)} border style` +
      "\n" +
      colorize("Supports multi-line content with auto-sizing", fg.gray)
    ));
    console.log();
  }

  // Info box
  const infoBox = new Box({
    title: "System Info",
    borderStyle: "round",
    borderColor: fg.brightCyan,
    padding: 1,
    paddingY: 1,
  });

  console.log(infoBox.render(
    colorize("  Status:  ", fg.gray) + colorize("Online", fg.brightGreen, style.bold) + "\n" +
    colorize("  Uptime:  ", fg.gray) + colorize("12d 4h 32m", fg.white) + "\n" +
    colorize("  CPU:     ", fg.gray) + colorize("23%", fg.brightYellow) + "\n" +
    colorize("  Memory:  ", fg.gray) + colorize("4.2 GB / 16 GB", fg.white) + "\n" +
    colorize("  Latency: ", fg.gray) + colorize("12ms", fg.brightGreen)
  ));
  await sleep(500);

  // ── 5. Table ────────────────────────────────────────────────────
  divider("5. TABLE");

  const table = new Table({
    headers: ["Component", "Status", "Description"],
    rows: [
      ["Spinner", colorize("Done", fg.green), "9 styles, live text updates, elapsed time"],
      ["Progress Bar", colorize("Done", fg.green), "Gradient, ETA, percentage, item counts"],
      ["Box / Panel", colorize("Done", fg.green), "6 border styles, titles, padding"],
      ["Select / Menu", colorize("Done", fg.green), "Keyboard nav, scrolling, vim keys"],
      ["Animated Text", colorize("Done", fg.green), "Typewriter, wave, shimmer, bounce"],
      ["Table", colorize("Done", fg.green), "Headers, alternating rows, auto-width"],
      ["Toast", colorize("Done", fg.green), "Success, error, warning, info notifications"],
      ["Input", colorize("Done", fg.green), "Validation, masking, placeholder support"],
      ["Confirm", colorize("Done", fg.green), "Yes/No toggle with keyboard control"],
      ["List", colorize("Done", fg.green), "6 styles, nesting, task checkboxes"],
      ["Badge", colorize("Done", fg.green), "Presets, outline, dot, custom colors"],
    ],
    borderColor: fg.gray,
    headerColor: fg.brightCyan + style.bold,
  });

  console.log(table.render());
  await sleep(500);

  // ── 6. Toast Notifications ─────────────────────────────────────
  divider("6. TOAST NOTIFICATIONS");

  console.log(toast.success("Build completed successfully!"));
  console.log();
  console.log(toast.error("Connection refused on port 5432"));
  console.log();
  console.log(toast.warn("Deprecated API: use v2 endpoint instead"));
  console.log();
  console.log(toast.info("Server listening on http://localhost:3000"));
  await sleep(500);

  // ── 7. Lists ───────────────────────────────────────────────────
  divider("7. LISTS");

  console.log(colorize("  Bullet list:", fg.yellow, style.bold));
  console.log();
  const bulletList = new List({ style: "bullet", bulletColor: fg.cyan });
  console.log(bulletList.render([
    "First item",
    "Second item with details",
    { text: "Nested items", children: [
      { text: "Child A" },
      { text: "Child B", children: [{ text: "Grandchild" }] },
    ]},
    "Fourth item",
  ]));

  console.log();
  console.log(colorize("  Task list:", fg.yellow, style.bold));
  console.log();
  const taskList = new List({ style: "task" });
  console.log(taskList.render([
    { text: colorize("Set up project structure", fg.gray, style.strikethrough), checked: true },
    { text: colorize("Write core components", fg.gray, style.strikethrough), checked: true },
    { text: colorize("Add new components", fg.gray, style.strikethrough), checked: true },
    { text: "Write tests", checked: false },
    { text: "Update documentation", checked: false },
  ]));

  console.log();
  console.log(colorize("  Numbered list:", fg.yellow, style.bold));
  console.log();
  const numList = new List({ style: "numbered", bulletColor: fg.brightYellow });
  console.log(numList.render([
    "Clone the repository",
    "Install dependencies",
    "Run the showcase demo",
    "Start building!",
  ]));
  await sleep(500);

  // ── 8. Badges ──────────────────────────────────────────────────
  divider("8. BADGES");

  console.log("  " + Badge.success("PASS") + "  " + Badge.error("FAIL") + "  " + Badge.warning("WARN") + "  " + Badge.info("INFO") + "  " + Badge.neutral("N/A"));
  console.log();
  console.log("  " + Badge.outline("typescript", fg.blue) + "  " + Badge.outline("node.js", fg.green) + "  " + Badge.outline("v1.0.0", fg.yellow) + "  " + Badge.outline("MIT", fg.gray));
  console.log();
  console.log("  " + Badge.status("Production", fg.green) + "   " + Badge.status("Staging", fg.yellow) + "   " + Badge.status("Development", fg.blue) + "   " + Badge.status("Offline", fg.red));
  console.log();
  console.log("  " + Badge.custom("DEPLOY", fg.black, bg.brightMagenta) + "  " + Badge.custom("RELEASE", fg.black, bg.brightCyan) + "  " + Badge.custom("HOTFIX", fg.white, bg.red));
  await sleep(500);

  // ── 9. Color Palette ──────────────────────────────────────────
  divider("9. COLOR PALETTE");

  console.log("  " + colorize("  Standard Colors  ", style.bold, style.underline));
  console.log();
  const colors = [
    ["black", fg.black + bg.white], ["red", fg.red], ["green", fg.green],
    ["yellow", fg.yellow], ["blue", fg.blue], ["magenta", fg.magenta],
    ["cyan", fg.cyan], ["white", fg.white],
  ];
  let colorLine = "  ";
  for (const [name, color] of colors) {
    colorLine += colorize(` ${name.padEnd(8)} `, color) + " ";
  }
  console.log(colorLine);

  console.log();
  console.log("  " + colorize("  Bright Colors  ", style.bold, style.underline));
  console.log();
  const brightColors = [
    ["gray", fg.gray], ["b.red", fg.brightRed], ["b.green", fg.brightGreen],
    ["b.yellow", fg.brightYellow], ["b.blue", fg.brightBlue], ["b.magenta", fg.brightMagenta],
    ["b.cyan", fg.brightCyan], ["b.white", fg.brightWhite],
  ];
  let brightLine = "  ";
  for (const [name, color] of brightColors) {
    brightLine += colorize(` ${name.padEnd(8)} `, color) + " ";
  }
  console.log(brightLine);

  console.log();
  console.log("  " + colorize("  Styles  ", style.bold, style.underline));
  console.log();
  console.log(
    "  " +
    colorize(" Bold ", style.bold) + "  " +
    colorize(" Dim ", style.dim) + "  " +
    colorize(" Italic ", style.italic) + "  " +
    colorize(" Underline ", style.underline) + "  " +
    colorize(" Strikethrough ", style.strikethrough) + "  " +
    colorize(" Inverse ", style.inverse)
  );

  console.log();
  console.log("  " + colorize("  RGB Gradient  ", style.bold, style.underline));
  console.log();
  let gradientLine = "  ";
  for (let i = 0; i < 60; i++) {
    const t = i / 60;
    const r = Math.round(255 * Math.sin(t * Math.PI));
    const g = Math.round(255 * Math.sin(t * Math.PI + 2));
    const b = Math.round(255 * Math.sin(t * Math.PI + 4));
    gradientLine += fg.rgb(r, g, b) + "█";
  }
  gradientLine += style.reset;
  console.log(gradientLine);

  // ── Final ───────────────────────────────────────────────────────
  console.log();
  const finalBox = new Box({
    title: "Showcase Complete",
    titleAlignment: "center",
    borderStyle: "double",
    borderColor: fg.brightGreen,
    titleColor: fg.brightGreen + style.bold,
    padding: 1,
  });

  console.log(finalBox.render(
    colorize("All 11 components rendered successfully!", fg.brightWhite, style.bold) + "\n" +
    colorize("Run the interactive demo with:", fg.gray) + "\n" +
    colorize("  npx tsx src/demos/interactive.ts", fg.brightCyan)
  ));
  console.log();
}

main().catch(console.error);
