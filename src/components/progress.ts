/**
 * ProgressBar – animated progress bar with percentage, ETA, and custom styling.
 *
 * Usage:
 *   const bar = new ProgressBar({ total: 100, width: 40 });
 *   bar.start();
 *   bar.update(50);  // 50%
 *   bar.finish("All done!");
 */

import { colorize, fg, style, erase } from "../core/ansi.js";
import { Renderer } from "../core/renderer.js";

export interface ProgressBarOptions {
  total?: number;
  width?: number;
  completeChar?: string;
  incompleteChar?: string;
  title?: string;
  showPercentage?: boolean;
  showCount?: boolean;
  showETA?: boolean;
  gradient?: boolean;
  barColor?: string;
}

export class ProgressBar {
  private total: number;
  private current = 0;
  private width: number;
  private completeChar: string;
  private incompleteChar: string;
  private title: string;
  private showPercentage: boolean;
  private showCount: boolean;
  private showETA: boolean;
  private gradient: boolean;
  private barColor: string;
  private renderer: Renderer;
  private startTime = 0;

  constructor(options: ProgressBarOptions = {}) {
    this.total = options.total ?? 100;
    this.width = options.width ?? 40;
    this.completeChar = options.completeChar ?? "█";
    this.incompleteChar = options.incompleteChar ?? "░";
    this.title = options.title ?? "";
    this.showPercentage = options.showPercentage ?? true;
    this.showCount = options.showCount ?? true;
    this.showETA = options.showETA ?? true;
    this.gradient = options.gradient ?? true;
    this.barColor = options.barColor ?? fg.cyan;
    this.renderer = new Renderer();
  }

  start(title?: string): this {
    if (title) this.title = title;
    this.startTime = Date.now();
    this.current = 0;
    this.renderer.hideCursor();
    this.draw();
    return this;
  }

  update(value: number): this {
    this.current = Math.min(value, this.total);
    this.draw();
    return this;
  }

  increment(delta = 1): this {
    return this.update(this.current + delta);
  }

  finish(text?: string): void {
    this.current = this.total;
    this.draw();
    process.stdout.write("\n");
    if (text) {
      process.stdout.write(
        `${colorize("✔", fg.green)} ${text}\n`
      );
    }
    this.renderer.showCursor();
  }

  private draw(): void {
    const ratio = Math.min(this.current / this.total, 1);
    const filled = Math.round(this.width * ratio);
    const empty = this.width - filled;

    // Build the bar with optional gradient
    let bar: string;
    if (this.gradient && filled > 0) {
      bar = this.buildGradientBar(filled, empty);
    } else {
      bar =
        this.barColor +
        this.completeChar.repeat(filled) +
        style.reset +
        colorize(this.incompleteChar.repeat(empty), fg.gray);
    }

    // Build info parts
    const parts: string[] = [];

    if (this.title) {
      parts.push(colorize(this.title, style.bold));
    }

    parts.push(`${bar}`);

    if (this.showPercentage) {
      const pct = (ratio * 100).toFixed(0).padStart(3);
      parts.push(colorize(`${pct}%`, fg.brightWhite, style.bold));
    }

    if (this.showCount) {
      parts.push(colorize(`${this.current}/${this.total}`, fg.gray));
    }

    if (this.showETA && this.current > 0 && this.current < this.total) {
      const elapsed = (Date.now() - this.startTime) / 1000;
      const rate = this.current / elapsed;
      const remaining = (this.total - this.current) / rate;
      parts.push(colorize(`ETA ${remaining.toFixed(1)}s`, fg.yellow));
    }

    process.stdout.write(`\r${erase.line}${parts.join(" ")}`);
  }

  private buildGradientBar(filled: number, empty: number): string {
    // Gradient from red → yellow → green as progress increases
    let bar = "";
    for (let i = 0; i < filled; i++) {
      const t = filled > 1 ? i / (filled - 1) : 1;
      const r = Math.round(255 * (1 - t));
      const g = Math.round(255 * t);
      bar += fg.rgb(r, g, 50) + this.completeChar;
    }
    bar += style.reset;
    bar += colorize(this.incompleteChar.repeat(empty), fg.gray);
    return bar;
  }
}
