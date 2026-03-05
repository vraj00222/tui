/**
 * Toast – styled notification messages for terminal output.
 * Displays success, error, warning, and info messages with icons and colors.
 *
 * Usage:
 *   toast.success("Build completed!");
 *   toast.error("Connection failed");
 *   toast.warn("Deprecated API used");
 *   toast.info("Server running on port 3000");
 */

import { colorize, fg, style, visibleLength } from "../core/ansi.js";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  width?: number;
  padding?: number;
  timestamp?: boolean;
}

const TOAST_CONFIG: Record<ToastType, { icon: string; color: string; label: string }> = {
  success: { icon: "✔", color: fg.green, label: "SUCCESS" },
  error: { icon: "✖", color: fg.red, label: "ERROR" },
  warning: { icon: "⚠", color: fg.yellow, label: "WARNING" },
  info: { icon: "ℹ", color: fg.blue, label: "INFO" },
};

export class Toast {
  private width: number;
  private padding: number;
  private timestamp: boolean;

  constructor(options: ToastOptions = {}) {
    this.width = options.width ?? 0; // 0 = auto
    this.padding = options.padding ?? 1;
    this.timestamp = options.timestamp ?? false;
  }

  success(message: string): string {
    return this.render("success", message);
  }

  error(message: string): string {
    return this.render("error", message);
  }

  warn(message: string): string {
    return this.render("warning", message);
  }

  info(message: string): string {
    return this.render("info", message);
  }

  render(type: ToastType, message: string): string {
    const config = TOAST_CONFIG[type];
    const pad = " ".repeat(this.padding);

    const icon = colorize(config.icon, config.color, style.bold);
    const label = colorize(config.label, config.color, style.bold);
    const timeStr = this.timestamp
      ? colorize(` [${new Date().toLocaleTimeString()}]`, fg.gray)
      : "";

    const lines = message.split("\n");
    const maxLen = this.width > 0
      ? this.width
      : Math.max(...lines.map(l => visibleLength(l))) + this.padding * 2 + 4;

    const bar = colorize("│", config.color);
    const topBar = colorize("─".repeat(maxLen), config.color, style.dim);
    const bottomBar = colorize("─".repeat(maxLen), config.color, style.dim);

    const header = `${icon} ${label}${timeStr}`;
    const content = lines.map(l => `${bar}${pad}${l}`).join("\n");

    return `${topBar}\n${header}\n${content}\n${bottomBar}`;
  }
}

/** Convenience functions for quick one-off toasts */
export const toast = {
  success: (msg: string, opts?: ToastOptions) => new Toast(opts).success(msg),
  error: (msg: string, opts?: ToastOptions) => new Toast(opts).error(msg),
  warn: (msg: string, opts?: ToastOptions) => new Toast(opts).warn(msg),
  info: (msg: string, opts?: ToastOptions) => new Toast(opts).info(msg),
};
