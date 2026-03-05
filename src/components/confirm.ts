/**
 * Confirm – yes/no confirmation prompt.
 *
 * Usage:
 *   const ok = await confirm({ message: "Delete all files?" });
 *   if (ok) console.log("Deleted!");
 */

import { colorize, fg, style, cursor, erase } from "../core/ansi.js";

export interface ConfirmConfig {
  message: string;
  defaultValue?: boolean;
  activeColor?: string;
}

export function confirm(config: ConfirmConfig): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const {
      message,
      defaultValue = false,
      activeColor = fg.cyan,
    } = config;

    let value = defaultValue;

    const draw = () => {
      const prompt = colorize("? ", fg.green, style.bold) + colorize(message + " ", style.bold);

      const yesStyle = value
        ? colorize("Yes", activeColor, style.bold, style.underline)
        : colorize("Yes", fg.gray);
      const noStyle = !value
        ? colorize("No", activeColor, style.bold, style.underline)
        : colorize("No", fg.gray);

      const toggle = `${yesStyle} ${colorize("/", fg.gray)} ${noStyle}`;

      process.stdout.write(`\r${erase.line}${prompt}${toggle}`);
    };

    process.stdout.write(cursor.hide);
    draw();

    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onKeypress);
      process.stdout.write(cursor.show);
    };

    const onKeypress = (key: string) => {
      // Ctrl+C
      if (key === "\x03") {
        cleanup();
        process.stdout.write(`\r${erase.line}`);
        process.stdout.write(colorize("✖ Cancelled\n", fg.red));
        reject(new Error("Cancelled"));
        return;
      }

      // Enter
      if (key === "\r" || key === "\n") {
        cleanup();
        const answer = value ? colorize("Yes", fg.green) : colorize("No", fg.red);
        process.stdout.write(
          `\r${erase.line}` +
          colorize("✔ ", fg.green) +
          colorize(message + " ", style.bold) +
          answer + "\n"
        );
        resolve(value);
        return;
      }

      // y/Y
      if (key === "y" || key === "Y") {
        value = true;
        draw();
        return;
      }

      // n/N
      if (key === "n" || key === "N") {
        value = false;
        draw();
        return;
      }

      // Left/Right arrows or Tab to toggle
      if (key === "\x1b[D" || key === "\x1b[C" || key === "\t" ||
          key === "\x1b[A" || key === "\x1b[B" ||
          key === "h" || key === "l" || key === "j" || key === "k") {
        value = !value;
        draw();
        return;
      }
    };

    stdin.on("data", onKeypress);
  });
}
