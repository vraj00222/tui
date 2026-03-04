/**
 * @module tui
 * A zero-dependency TypeScript Terminal UI component library.
 * Built entirely on ANSI escape codes — no external packages required.
 */

// ── Core primitives ───────────────────────────────────────────────
export { cursor, erase, style, fg, bg, colorize, stripAnsi, visibleLength, getTerminalSize } from "./core/ansi.js";
export { Renderer, createAnimationLoop } from "./core/renderer.js";

// ── Components ────────────────────────────────────────────────────
export { Spinner, spinnerStyles } from "./components/spinner.js";
export type { SpinnerOptions, SpinnerStyle } from "./components/spinner.js";

export { ProgressBar } from "./components/progress.js";
export type { ProgressBarOptions } from "./components/progress.js";

export { Box, borderStyles } from "./components/box.js";
export type { BoxOptions, BorderStyle } from "./components/box.js";

export { select } from "./components/select.js";
export type { SelectOption, SelectConfig } from "./components/select.js";

export { Table } from "./components/table.js";
export type { TableOptions } from "./components/table.js";

// ── Animated text effects ─────────────────────────────────────────
export { typewriter, gradientWave, shimmer, bouncingText } from "./components/animated-text.js";
export type { TypewriterOptions, GradientWaveOptions, ShimmerOptions, BouncingTextOptions } from "./components/animated-text.js";
