/**
 * Spinner – an animated loading indicator, like the one in Claude Code.
 * 
 * Usage:
 *   const spinner = new Spinner({ text: "Loading..." });
 *   spinner.start();
 *   // ... do work ...
 *   spinner.stop("Done!");
 */

import { colorize, fg, style, erase } from "../core/ansi.js";
import { Renderer, createAnimationLoop } from "../core/renderer.js";

export interface SpinnerStyle {
  frames: string[];
  interval: number;
}

export const spinnerStyles: Record<string, SpinnerStyle> = {
  dots: {
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    interval: 80,
  },
  line: {
    frames: ["-", "\\", "|", "/"],
    interval: 130,
  },
  arc: {
    frames: ["◜", "◠", "◝", "◞", "◡", "◟"],
    interval: 100,
  },
  bouncingBar: {
    frames: [
      "[    ]", "[=   ]", "[==  ]", "[=== ]", "[ ===]", "[  ==]",
      "[   =]", "[    ]", "[   =]", "[  ==]", "[ ===]", "[====]",
      "[=== ]", "[==  ]", "[=   ]",
    ],
    interval: 80,
  },
  pulse: {
    frames: ["█", "▓", "▒", "░", "▒", "▓"],
    interval: 120,
  },
  earth: {
    frames: ["🌍", "🌎", "🌏"],
    interval: 200,
  },
  moon: {
    frames: ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"],
    interval: 150,
  },
  arrows: {
    frames: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
    interval: 100,
  },
  braille: {
    frames: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"],
    interval: 80,
  },
};

export interface SpinnerOptions {
  text?: string;
  style?: string | SpinnerStyle;
  color?: string;
  successMark?: string;
  failMark?: string;
}

export class Spinner {
  private text: string;
  private spinnerStyle: SpinnerStyle;
  private color: string;
  private successMark: string;
  private failMark: string;
  private frame = 0;
  private stopAnimation: (() => void) | null = null;
  private renderer: Renderer;
  private startTime = 0;

  constructor(options: SpinnerOptions = {}) {
    this.text = options.text ?? "Loading...";
    this.color = options.color ?? fg.cyan;
    this.successMark = options.successMark ?? colorize("✔", fg.green);
    this.failMark = options.failMark ?? colorize("✖", fg.red);
    this.renderer = new Renderer();

    if (typeof options.style === "string") {
      this.spinnerStyle = spinnerStyles[options.style] ?? spinnerStyles.dots;
    } else {
      this.spinnerStyle = options.style ?? spinnerStyles.dots;
    }
  }

  start(text?: string): this {
    if (text) this.text = text;
    this.startTime = Date.now();
    this.frame = 0;
    this.renderer.hideCursor();

    this.stopAnimation = createAnimationLoop(() => {
      const frames = this.spinnerStyle.frames;
      const spinner = this.color + frames[this.frame % frames.length] + style.reset;
      const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
      const timeStr = colorize(` (${elapsed}s)`, fg.gray);
      
      process.stdout.write(
        `\r${erase.line}${spinner} ${this.text}${timeStr}`
      );
      this.frame++;
    }, this.spinnerStyle.interval);

    return this;
  }

  /** Update the spinner text while it's running */
  update(text: string): this {
    this.text = text;
    return this;
  }

  /** Stop with success */
  stop(finalText?: string): void {
    this.finish(this.successMark, finalText ?? this.text);
  }

  /** Stop with failure */
  fail(finalText?: string): void {
    this.finish(this.failMark, finalText ?? this.text);
  }

  /** Stop with a custom symbol */
  info(finalText?: string): void {
    this.finish(colorize("ℹ", fg.blue), finalText ?? this.text);
  }

  /** Stop with warning */
  warn(finalText?: string): void {
    this.finish(colorize("⚠", fg.yellow), finalText ?? this.text);
  }

  private finish(symbol: string, text: string): void {
    if (this.stopAnimation) {
      this.stopAnimation();
      this.stopAnimation = null;
    }
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const timeStr = colorize(` (${elapsed}s)`, fg.gray);
    process.stdout.write(`\r${erase.line}${symbol} ${text}${timeStr}\n`);
    this.renderer.showCursor();
  }
}
