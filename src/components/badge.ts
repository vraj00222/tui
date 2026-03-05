/**
 * Badge – colored inline labels/tags for terminal output.
 * Useful for status indicators, version tags, severity levels, etc.
 *
 * Usage:
 *   console.log(badge("PASS", "green"));
 *   console.log(badge("v2.1.0", "blue"));
 *   console.log(Badge.success("DEPLOYED"));
 */

import { colorize, fg, bg, style } from "../core/ansi.js";

export type BadgePreset = "success" | "error" | "warning" | "info" | "neutral";

export interface BadgeOptions {
  bold?: boolean;
  dim?: boolean;
  rounded?: boolean; // adds spaces for a pill-like appearance
}

const PRESET_COLORS: Record<BadgePreset, { fg: string; bg: string }> = {
  success: { fg: fg.black, bg: bg.green },
  error: { fg: fg.white, bg: bg.red },
  warning: { fg: fg.black, bg: bg.yellow },
  info: { fg: fg.white, bg: bg.blue },
  neutral: { fg: fg.white, bg: bg.gray },
};

export function badge(text: string, preset: BadgePreset, options: BadgeOptions = {}): string {
  const { bold = true, rounded = true } = options;
  const colors = PRESET_COLORS[preset];
  const pad = rounded ? " " : "";
  const styles = [colors.fg, colors.bg];
  if (bold) styles.push(style.bold);

  return colorize(`${pad}${text}${pad}`, ...styles);
}

/** Preset badge constructors */
export const Badge = {
  success: (text: string, opts?: BadgeOptions) => badge(text, "success", opts),
  error: (text: string, opts?: BadgeOptions) => badge(text, "error", opts),
  warning: (text: string, opts?: BadgeOptions) => badge(text, "warning", opts),
  info: (text: string, opts?: BadgeOptions) => badge(text, "info", opts),
  neutral: (text: string, opts?: BadgeOptions) => badge(text, "neutral", opts),

  /** Custom colored badge */
  custom(text: string, fgColor: string, bgColor: string, opts: BadgeOptions = {}): string {
    const { bold = true, rounded = true } = opts;
    const pad = rounded ? " " : "";
    const styles = [fgColor, bgColor];
    if (bold) styles.push(style.bold);
    return colorize(`${pad}${text}${pad}`, ...styles);
  },

  /** Outline style (no background, colored border feel) */
  outline(text: string, color: string, opts: BadgeOptions = {}): string {
    const { bold = false } = opts;
    const bracket = colorize("[", color, style.dim);
    const closeBracket = colorize("]", color, style.dim);
    const content = bold
      ? colorize(text, color, style.bold)
      : colorize(text, color);
    return `${bracket}${content}${closeBracket}`;
  },

  /** Dot indicator with label */
  dot(text: string, preset: BadgePreset): string {
    const colors = PRESET_COLORS[preset];
    const dot = colorize("●", colors.bg.replace(bg.green, fg.green)
      .replace(bg.red, fg.red)
      .replace(bg.yellow, fg.yellow)
      .replace(bg.blue, fg.blue)
      .replace(bg.gray, fg.gray));
    return `${dot} ${text}`;
  },

  /** Status dot with color */
  status(text: string, color: string): string {
    const dot = colorize("●", color);
    return `${dot} ${text}`;
  },
};
