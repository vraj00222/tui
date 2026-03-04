/**
 * ANSI escape code utilities for terminal styling and cursor control.
 * This is the foundation layer - all components use these primitives.
 */

// ── Escape sequences ──────────────────────────────────────────────
export const ESC = "\x1b";
export const CSI = `${ESC}[`; // Control Sequence Introducer

// ── Cursor control ────────────────────────────────────────────────
export const cursor = {
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  up: (n = 1) => `${CSI}${n}A`,
  down: (n = 1) => `${CSI}${n}B`,
  forward: (n = 1) => `${CSI}${n}C`,
  back: (n = 1) => `${CSI}${n}D`,
  to: (x: number, y: number) => `${CSI}${y + 1};${x + 1}H`,
  toColumn: (x: number) => `${CSI}${x + 1}G`,
  save: `${ESC}7`,
  restore: `${ESC}8`,
};

// ── Line/screen clearing ──────────────────────────────────────────
export const erase = {
  line: `${CSI}2K`,
  lineEnd: `${CSI}0K`,
  lineStart: `${CSI}1K`,
  screen: `${CSI}2J`,
  down: `${CSI}0J`,
  up: `${CSI}1J`,
  lines: (count: number) => {
    let seq = "";
    for (let i = 0; i < count; i++) {
      seq += `${CSI}2K` + (i < count - 1 ? cursor.up() : "");
    }
    return seq + `\r`;
  },
};

// ── Color helpers (SGR - Select Graphic Rendition) ────────────────
const sgr = (code: number) => `${CSI}${code}m`;
const sgrRgb = (r: number, g: number, b: number, bg = false) =>
  `${CSI}${bg ? 48 : 38};2;${r};${g};${b}m`;

export const style = {
  reset: sgr(0),
  bold: sgr(1),
  dim: sgr(2),
  italic: sgr(3),
  underline: sgr(4),
  blink: sgr(5),
  inverse: sgr(7),
  strikethrough: sgr(9),
};

export const fg = {
  black: sgr(30),
  red: sgr(31),
  green: sgr(32),
  yellow: sgr(33),
  blue: sgr(34),
  magenta: sgr(35),
  cyan: sgr(36),
  white: sgr(37),
  gray: sgr(90),
  brightRed: sgr(91),
  brightGreen: sgr(92),
  brightYellow: sgr(93),
  brightBlue: sgr(94),
  brightMagenta: sgr(95),
  brightCyan: sgr(96),
  brightWhite: sgr(97),
  rgb: (r: number, g: number, b: number) => sgrRgb(r, g, b),
};

export const bg = {
  black: sgr(40),
  red: sgr(41),
  green: sgr(42),
  yellow: sgr(43),
  blue: sgr(44),
  magenta: sgr(45),
  cyan: sgr(46),
  white: sgr(47),
  gray: sgr(100),
  brightRed: sgr(101),
  brightGreen: sgr(102),
  brightYellow: sgr(103),
  brightBlue: sgr(104),
  brightMagenta: sgr(105),
  brightCyan: sgr(106),
  brightWhite: sgr(107),
  rgb: (r: number, g: number, b: number) => sgrRgb(r, g, b, true),
};

// ── Chainable color/style builder ─────────────────────────────────
export function colorize(text: string, ...codes: string[]): string {
  return codes.join("") + text + style.reset;
}

// ── Strip ANSI codes (for measuring visible string length) ────────
const ANSI_REGEX = /\x1b\[[0-9;]*m|\x1b\[[\d;]*[A-HJKSTf]|\x1b[78]/g;
export function stripAnsi(text: string): string {
  return text.replace(ANSI_REGEX, "");
}

export function visibleLength(text: string): number {
  return stripAnsi(text).length;
}

// ── Terminal size ─────────────────────────────────────────────────
export function getTerminalSize(): { columns: number; rows: number } {
  return {
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
  };
}
