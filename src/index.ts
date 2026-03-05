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

export { Toast, toast } from "./components/toast.js";
export type { ToastOptions, ToastType } from "./components/toast.js";

export { input } from "./components/input.js";
export type { InputConfig } from "./components/input.js";

export { confirm } from "./components/confirm.js";
export type { ConfirmConfig } from "./components/confirm.js";

export { List } from "./components/list.js";
export type { ListOptions, ListItem, ListStyle } from "./components/list.js";

export { Badge, badge } from "./components/badge.js";
export type { BadgeOptions, BadgePreset } from "./components/badge.js";

// ── Animated text effects ─────────────────────────────────────────
export { typewriter, gradientWave, shimmer, bouncingText } from "./components/animated-text.js";
export type { TypewriterOptions, GradientWaveOptions, ShimmerOptions, BouncingTextOptions } from "./components/animated-text.js";
