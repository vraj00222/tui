/**
 * Interactive Demo – showcases interactive components and combines
 * multiple components for an interactive experience.
 *
 * Run:  npx tsx src/demos/interactive.ts
 */

import {
  fg, bg, style, colorize,
  Spinner, ProgressBar, Box, Table, select,
  Toast, toast, List, Badge,
  input, confirm,
  typewriter, gradientWave, shimmer, bouncingText,
} from "../index.js";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.clear();

  const welcome = new Box({
    title: "Interactive TUI Demo",
    titleAlignment: "center",
    borderStyle: "double",
    borderColor: fg.brightCyan,
    titleColor: fg.brightYellow + style.bold,
    padding: 1,
    paddingY: 1,
  });

  console.log(welcome.render(
    colorize("Use arrow keys to navigate and Enter to select.", fg.white) + "\n" +
    colorize("Press Ctrl+C at any time to exit.", fg.gray)
  ));
  console.log();

  let running = true;

  while (running) {
    try {
      const choice = await select({
        message: "What would you like to see?",
        options: [
          { label: "Spinner Demo", value: "spinner", description: "Animated loading indicators" },
          { label: "Progress Bar Demo", value: "progress", description: "Animated progress bars" },
          { label: "Box Styles Demo", value: "boxes", description: "Different border styles" },
          { label: "Table Demo", value: "table", description: "Formatted data table" },
          { label: "Animated Text", value: "animated", description: "Text animation effects" },
          { label: "Toast Notifications", value: "toast", description: "Styled notification messages" },
          { label: "Lists", value: "list", description: "Styled list rendering" },
          { label: "Badges", value: "badge", description: "Colored inline labels" },
          { label: "Input & Confirm", value: "input", description: "Interactive text input" },
          { label: "Exit", value: "exit", description: "Quit the demo" },
        ],
      });

      console.log();

      switch (choice) {
        case "spinner": {
          const spinnerStyle = await select({
            message: "Choose a spinner style:",
            options: [
              { label: "Dots", value: "dots" },
              { label: "Braille", value: "braille" },
              { label: "Arc", value: "arc" },
              { label: "Bouncing Bar", value: "bouncingBar" },
              { label: "Pulse", value: "pulse" },
              { label: "Arrows", value: "arrows" },
              { label: "Moon", value: "moon" },
              { label: "Earth", value: "earth" },
            ],
          });
          console.log();
          const spinner = new Spinner({ text: "Working on something...", style: spinnerStyle });
          spinner.start();
          await sleep(1000);
          spinner.update("Almost there...");
          await sleep(1000);
          spinner.update("Wrapping up...");
          await sleep(1000);
          spinner.stop("Task completed!");
          break;
        }

        case "progress": {
          console.log();
          const bar = new ProgressBar({
            total: 100,
            width: 40,
            title: "  Processing",
            gradient: true,
          });
          bar.start();
          for (let i = 0; i <= 100; i++) {
            bar.update(i);
            await sleep(25 + Math.random() * 30);
          }
          bar.finish("Processing complete!");
          break;
        }

        case "boxes": {
          const styles = ["round", "single", "double", "heavy", "dashed", "ascii"];
          const colors = [fg.cyan, fg.green, fg.yellow, fg.brightRed, fg.magenta, fg.gray];
          for (let i = 0; i < styles.length; i++) {
            const box = new Box({
              title: styles[i].charAt(0).toUpperCase() + styles[i].slice(1),
              borderStyle: styles[i],
              borderColor: colors[i],
              padding: 1,
            });
            console.log(box.render(`Border style: ${colorize(styles[i], style.bold)}`));
            console.log();
          }
          break;
        }

        case "table": {
          const table = new Table({
            headers: ["Feature", "Status", "Description"],
            rows: [
              ["Spinner", colorize("Done", fg.green), "9 built-in styles"],
              ["Progress", colorize("Done", fg.green), "Gradient & ETA"],
              ["Box", colorize("Done", fg.green), "6 border styles"],
              ["Select", colorize("Done", fg.green), "Keyboard navigation"],
              ["Text FX", colorize("Done", fg.green), "4 animation types"],
              ["Table", colorize("Done", fg.green), "This component!"],
              ["Toast", colorize("Done", fg.green), "4 notification types"],
              ["Input", colorize("Done", fg.green), "Validation support"],
              ["Confirm", colorize("Done", fg.green), "Yes/No prompt"],
              ["List", colorize("Done", fg.green), "6 list styles"],
              ["Badge", colorize("Done", fg.green), "Presets & custom"],
            ],
          });
          console.log(table.render());
          console.log();
          break;
        }

        case "animated": {
          const effect = await select({
            message: "Choose an animation:",
            options: [
              { label: "Typewriter", value: "typewriter" },
              { label: "Gradient Wave", value: "gradient" },
              { label: "Shimmer/Sparkle", value: "shimmer" },
              { label: "Bouncing Text", value: "bounce" },
            ],
          });
          console.log();

          switch (effect) {
            case "typewriter":
              await typewriter({
                text: "This text appears one character at a time, like real typing!",
                speed: 35,
                color: fg.brightGreen,
              });
              break;
            case "gradient":
              await gradientWave({
                text: "Rainbow colors flowing through text",
                duration: 4000,
              });
              break;
            case "shimmer":
              await shimmer({
                text: "Watch the sparkles dance across the text",
                duration: 4000,
                baseColor: fg.brightCyan,
              });
              break;
            case "bounce":
              await bouncingText({
                text: ">>> BOUNCE <<<",
                duration: 4000,
                color: fg.brightYellow + style.bold,
                width: 50,
              });
              break;
          }
          break;
        }

        case "toast": {
          console.log(toast.success("Deployment completed successfully!"));
          console.log();
          console.log(toast.error("Failed to connect to database"));
          console.log();
          console.log(toast.warn("Rate limit approaching (90%)"));
          console.log();
          console.log(toast.info("New version available: v2.0.0"));
          console.log();
          break;
        }

        case "list": {
          const listStyle = await select({
            message: "Choose a list style:",
            options: [
              { label: "Bullet", value: "bullet" },
              { label: "Arrow", value: "arrow" },
              { label: "Numbered", value: "numbered" },
              { label: "Task", value: "task" },
            ],
          });
          console.log();

          if (listStyle === "task") {
            const list = new List({ style: "task" });
            console.log(list.render([
              { text: "Initialize project", checked: true },
              { text: "Install dependencies", checked: true },
              { text: "Write components", checked: true },
              { text: "Add tests", checked: false },
              { text: "Deploy to production", checked: false },
            ]));
          } else {
            const list = new List({ style: listStyle as any });
            console.log(list.render([
              "First item",
              { text: "Second item with children", children: [
                { text: "Sub-item A" },
                { text: "Sub-item B" },
              ]},
              "Third item",
              "Fourth item",
            ]));
          }
          console.log();
          break;
        }

        case "badge": {
          console.log("  Preset badges:");
          console.log("  " + Badge.success("PASS") + "  " + Badge.error("FAIL") + "  " + Badge.warning("WARN") + "  " + Badge.info("INFO"));
          console.log();
          console.log("  Outline badges:");
          console.log("  " + Badge.outline("typescript", fg.blue) + "  " + Badge.outline("v1.0.0", fg.yellow) + "  " + Badge.outline("MIT", fg.green));
          console.log();
          console.log("  Status indicators:");
          console.log("  " + Badge.status("Online", fg.green) + "   " + Badge.status("Degraded", fg.yellow) + "   " + Badge.status("Offline", fg.red));
          console.log();
          break;
        }

        case "input": {
          try {
            const name = await input({
              message: "What is your name?",
              placeholder: "Enter your name...",
            });

            const proceed = await confirm({
              message: `Hello ${name}! Continue the demo?`,
              defaultValue: true,
            });

            if (proceed) {
              const secret = await input({
                message: "Enter a secret (masked):",
                mask: "*",
                validate: (v) => v.length >= 3 || "Must be at least 3 characters",
              });
              console.log(toast.success(`Got it! Your secret is ${secret.length} characters long.`));
            } else {
              console.log(toast.info("No problem!"));
            }
          } catch {
            // cancelled
          }
          console.log();
          break;
        }

        case "exit":
          running = false;
          console.log(colorize("Goodbye!", fg.brightCyan, style.bold));
          console.log();
          break;
      }
    } catch {
      // User cancelled with Ctrl+C
      running = false;
      console.log();
    }
  }
}

main().catch(console.error);
