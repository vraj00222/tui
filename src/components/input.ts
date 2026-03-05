/**
 * Input – interactive text input prompt with validation support.
 *
 * Usage:
 *   const name = await input({ message: "What is your name?" });
 *   const email = await input({
 *     message: "Email:",
 *     validate: (v) => v.includes("@") || "Must be a valid email",
 *   });
 */

import { colorize, fg, style, cursor, erase } from "../core/ansi.js";

export interface InputConfig {
  message: string;
  defaultValue?: string;
  placeholder?: string;
  validate?: (value: string) => true | string;
  mask?: string; // character to mask input (e.g., "*" for passwords)
}

export function input(config: InputConfig): Promise<string> {
  return new Promise((resolve, reject) => {
    const {
      message,
      defaultValue = "",
      placeholder = "",
      validate,
      mask,
    } = config;

    let value = "";
    let cursorPos = 0;
    let errorMsg = "";

    const draw = () => {
      const prompt = colorize("? ", fg.green, style.bold) + colorize(message + " ", style.bold);
      const displayValue = mask ? mask.repeat(value.length) : value;

      let display: string;
      if (value.length === 0 && placeholder) {
        display = colorize(placeholder, fg.gray, style.dim);
      } else if (value.length === 0 && defaultValue) {
        display = colorize(`(${defaultValue})`, fg.gray);
      } else {
        display = colorize(displayValue, fg.cyan);
      }

      let line = `\r${erase.line}${prompt}${display}`;
      if (errorMsg) {
        line += `\n${erase.line}  ${colorize("✖ " + errorMsg, fg.red)}`;
      }

      process.stdout.write(line);

      // Position cursor correctly
      const promptVisible = 2 + message.length + 1; // "? " + message + " "
      const displayCursorPos = mask ? cursorPos : cursorPos;
      process.stdout.write(`\r${cursor.forward(promptVisible + displayCursorPos)}`);
    };

    process.stdout.write(cursor.show);
    draw();

    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onKeypress);
    };

    const onKeypress = (key: string) => {
      // Ctrl+C
      if (key === "\x03") {
        cleanup();
        if (errorMsg) {
          process.stdout.write(cursor.up(1));
        }
        process.stdout.write(`\r${erase.line}${erase.down}`);
        process.stdout.write(colorize("✖ Cancelled\n", fg.red));
        reject(new Error("Cancelled"));
        return;
      }

      // Enter
      if (key === "\r" || key === "\n") {
        const finalValue = value || defaultValue;

        if (validate) {
          const result = validate(finalValue);
          if (result !== true) {
            errorMsg = result;
            draw();
            return;
          }
        }

        cleanup();
        if (errorMsg) {
          process.stdout.write(cursor.up(1));
        }
        const displayFinal = mask ? mask.repeat(finalValue.length) : finalValue;
        process.stdout.write(
          `\r${erase.line}${erase.down}` +
          colorize("✔ ", fg.green) +
          colorize(message + " ", style.bold) +
          colorize(displayFinal, fg.cyan) + "\n"
        );
        resolve(finalValue);
        return;
      }

      // Backspace
      if (key === "\x7f" || key === "\b") {
        if (cursorPos > 0) {
          value = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
          cursorPos--;
          errorMsg = "";
        }
        draw();
        return;
      }

      // Delete
      if (key === "\x1b[3~") {
        if (cursorPos < value.length) {
          value = value.slice(0, cursorPos) + value.slice(cursorPos + 1);
          errorMsg = "";
        }
        draw();
        return;
      }

      // Left arrow
      if (key === "\x1b[D") {
        if (cursorPos > 0) cursorPos--;
        draw();
        return;
      }

      // Right arrow
      if (key === "\x1b[C") {
        if (cursorPos < value.length) cursorPos++;
        draw();
        return;
      }

      // Home
      if (key === "\x1b[H" || key === "\x01") {
        cursorPos = 0;
        draw();
        return;
      }

      // End
      if (key === "\x1b[F" || key === "\x05") {
        cursorPos = value.length;
        draw();
        return;
      }

      // Regular character
      if (key.length === 1 && key >= " ") {
        value = value.slice(0, cursorPos) + key + value.slice(cursorPos);
        cursorPos++;
        errorMsg = "";
        draw();
      }
    };

    stdin.on("data", onKeypress);
  });
}
