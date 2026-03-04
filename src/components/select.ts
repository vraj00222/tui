/**
 * Select – interactive menu/list selector with keyboard navigation.
 * Arrow keys to move, Enter to select, like Claude Code's menus.
 *
 * Usage:
 *   const choice = await select({
 *     message: "Pick a framework:",
 *     options: [
 *       { label: "React", value: "react" },
 *       { label: "Vue", value: "vue" },
 *       { label: "Svelte", value: "svelte" },
 *     ],
 *   });
 */

import { colorize, fg, style, cursor, erase } from "../core/ansi.js";
import { Renderer } from "../core/renderer.js";

export interface SelectOption<T = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
}

export interface SelectConfig<T = string> {
  message: string;
  options: SelectOption<T>[];
  initialIndex?: number;
  pointer?: string;
  activeColor?: string;
  maxVisible?: number;
}

export function select<T = string>(config: SelectConfig<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const {
      message,
      options,
      initialIndex = 0,
      pointer = "❯",
      activeColor = fg.cyan,
      maxVisible = 10,
    } = config;

    let selectedIndex = initialIndex;
    let scrollOffset = 0;
    const renderer = new Renderer();

    const draw = () => {
      const lines: string[] = [];
      lines.push(colorize("? ", fg.green, style.bold) + colorize(message, style.bold));

      const visibleCount = Math.min(options.length, maxVisible);
      
      // Adjust scroll offset
      if (selectedIndex >= scrollOffset + visibleCount) {
        scrollOffset = selectedIndex - visibleCount + 1;
      }
      if (selectedIndex < scrollOffset) {
        scrollOffset = selectedIndex;
      }

      if (scrollOffset > 0) {
        lines.push(colorize("  ↑ more", fg.gray));
      }

      for (let i = scrollOffset; i < scrollOffset + visibleCount && i < options.length; i++) {
        const opt = options[i];
        const isActive = i === selectedIndex;

        if (opt.disabled) {
          lines.push(colorize(`  - ${opt.label} (disabled)`, fg.gray));
          continue;
        }

        const prefix = isActive
          ? colorize(`  ${pointer} `, activeColor, style.bold)
          : "    ";
        const label = isActive
          ? colorize(opt.label, activeColor, style.bold)
          : opt.label;
        const desc = opt.description
          ? colorize(` - ${opt.description}`, fg.gray)
          : "";

        lines.push(`${prefix}${label}${desc}`);
      }

      if (scrollOffset + visibleCount < options.length) {
        lines.push(colorize("  ↓ more", fg.gray));
      }

      lines.push(colorize("\n  ↑↓ to navigate, Enter to select, Ctrl+C to cancel", fg.gray, style.dim));

      renderer.render(lines.join("\n") + "\n");
    };

    renderer.hideCursor();
    draw();

    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onKeypress);
      renderer.showCursor();
    };

    const onKeypress = (key: string) => {
      // Ctrl+C
      if (key === "\x03") {
        cleanup();
        renderer.clear();
        process.stdout.write(colorize("✖ Cancelled\n", fg.red));
        reject(new Error("Cancelled"));
        return;
      }

      // Enter
      if (key === "\r" || key === "\n") {
        const chosen = options[selectedIndex];
        if (chosen.disabled) return;

        cleanup();
        renderer.clear();
        process.stdout.write(
          colorize("✔ ", fg.green) +
            colorize(message, style.bold) +
            colorize(` → ${chosen.label}\n`, fg.cyan)
        );
        resolve(chosen.value);
        return;
      }

      // Arrow keys (escape sequences)
      if (key === "\x1b[A" || key === "k") {
        // Up
        do {
          selectedIndex = (selectedIndex - 1 + options.length) % options.length;
        } while (options[selectedIndex].disabled);
        draw();
      }
      if (key === "\x1b[B" || key === "j") {
        // Down
        do {
          selectedIndex = (selectedIndex + 1) % options.length;
        } while (options[selectedIndex].disabled);
        draw();
      }
    };

    stdin.on("data", onKeypress);
  });
}
