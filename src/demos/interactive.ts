/**
 * Interactive Demo – showcases the select component and combines
 * multiple components for an interactive experience.
 *
 * Run:  npx tsx src/demos/interactive.ts
 */

import {
  fg, style, colorize,
  Spinner, ProgressBar, Box, Table, select,
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
          { label: "🔄 Spinner Demo", value: "spinner", description: "Animated loading indicators" },
          { label: "📊 Progress Bar Demo", value: "progress", description: "Animated progress bars" },
          { label: "📦 Box Styles Demo", value: "boxes", description: "Different border styles" },
          { label: "📋 Table Demo", value: "table", description: "Formatted data table" },
          { label: "✨ Animated Text", value: "animated", description: "Text animation effects" },
          { label: "🚪 Exit", value: "exit", description: "Quit the demo" },
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
              ["Spinner", colorize("✔", fg.green), "9 built-in styles"],
              ["Progress", colorize("✔", fg.green), "Gradient & ETA support"],
              ["Box", colorize("✔", fg.green), "6 border styles"],
              ["Select", colorize("✔", fg.green), "Keyboard navigation"],
              ["Text FX", colorize("✔", fg.green), "4 animation types"],
              ["Table", colorize("✔", fg.green), "This component!"],
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
                text: "★ Rainbow colors flowing through text ★",
                duration: 4000,
              });
              break;
            case "shimmer":
              await shimmer({
                text: "✨ Watch the sparkles dance across the text ✨",
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

        case "exit":
          running = false;
          console.log(colorize("👋 Goodbye!", fg.brightCyan, style.bold));
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
