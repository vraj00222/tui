/**
 * Animated text effects – typewriter, gradient wave, shimmer, etc.
 * These give the "moving thing" feel like Claude Code's terminal.
 */

import { fg, style, cursor, erase, colorize } from "../core/ansi.js";
import { Renderer, createAnimationLoop } from "../core/renderer.js";

// ── Typewriter Effect ─────────────────────────────────────────────
export interface TypewriterOptions {
  text: string;
  speed?: number;       // ms per character
  cursor?: string;
  cursorBlink?: boolean;
  color?: string;
  onComplete?: () => void;
}

export function typewriter(options: TypewriterOptions): Promise<void> {
  return new Promise((resolve) => {
    const {
      text,
      speed = 30,
      cursor: cursorChar = "▌",
      cursorBlink = true,
      color = "",
      onComplete,
    } = options;

    const renderer = new Renderer();
    let charIndex = 0;
    let blinkState = true;

    renderer.hideCursor();

    const stop = createAnimationLoop(() => {
      if (charIndex <= text.length) {
        const typed = text.slice(0, charIndex);
        const cursorDisplay =
          charIndex < text.length
            ? colorize(cursorChar, fg.gray)
            : cursorBlink && blinkState
            ? colorize(cursorChar, fg.gray)
            : " ";

        process.stdout.write(
          `\r${erase.line}${color}${typed}${style.reset}${cursorDisplay}`
        );
        charIndex++;
        blinkState = !blinkState;
      } else {
        // Finished typing, do a few cursor blinks then stop
        blinkState = !blinkState;
        const cursorDisplay = blinkState
          ? colorize(cursorChar, fg.gray)
          : " ";
        process.stdout.write(
          `\r${erase.line}${color}${text}${style.reset}${cursorDisplay}`
        );

        if (charIndex > text.length + 6) {
          stop();
          process.stdout.write(`\r${erase.line}${color}${text}${style.reset}\n`);
          renderer.showCursor();
          onComplete?.();
          resolve();
        }
        charIndex++;
      }
    }, speed);
  });
}

// ── Gradient Wave Animation ───────────────────────────────────────
export interface GradientWaveOptions {
  text: string;
  duration?: number;   // how long to animate (ms)
  speed?: number;      // animation frame interval
  colors?: Array<[number, number, number]>; // RGB tuples
}

export function gradientWave(options: GradientWaveOptions): Promise<void> {
  return new Promise((resolve) => {
    const {
      text,
      duration = 3000,
      speed = 50,
      colors = [
        [255, 0, 128],   // pink
        [0, 200, 255],   // cyan
        [128, 0, 255],   // purple
        [255, 200, 0],   // gold
        [0, 255, 128],   // mint
      ],
    } = options;

    const renderer = new Renderer();
    let frame = 0;
    const startTime = Date.now();

    renderer.hideCursor();

    const stop = createAnimationLoop(() => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        const t = ((frame + i * 3) % 360) / 360;
        const colorIdx = t * (colors.length - 1);
        const idx1 = Math.floor(colorIdx);
        const idx2 = Math.min(idx1 + 1, colors.length - 1);
        const mix = colorIdx - idx1;

        const r = Math.round(colors[idx1][0] * (1 - mix) + colors[idx2][0] * mix);
        const g = Math.round(colors[idx1][1] * (1 - mix) + colors[idx2][1] * mix);
        const b = Math.round(colors[idx1][2] * (1 - mix) + colors[idx2][2] * mix);

        output += fg.rgb(r, g, b) + text[i];
      }
      output += style.reset;

      process.stdout.write(`\r${erase.line}${output}`);
      frame += 4;

      if (Date.now() - startTime > duration) {
        stop();
        process.stdout.write(`\r${erase.line}${output}\n`);
        renderer.showCursor();
        resolve();
      }
    }, speed);
  });
}

// ── Shimmer/Sparkle Effect ────────────────────────────────────────
export interface ShimmerOptions {
  text: string;
  duration?: number;
  speed?: number;
  sparkleChars?: string[];
  baseColor?: string;
  sparkleColor?: string;
}

export function shimmer(options: ShimmerOptions): Promise<void> {
  return new Promise((resolve) => {
    const {
      text,
      duration = 3000,
      speed = 80,
      sparkleChars = ["✦", "✧", "⋆", "·"],
      baseColor = fg.white,
      sparkleColor = fg.brightYellow,
    } = options;

    const renderer = new Renderer();
    const startTime = Date.now();
    let frame = 0;

    renderer.hideCursor();

    const stop = createAnimationLoop(() => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        const sparklePhase = Math.sin((frame * 0.3 + i * 0.7)) * 0.5 + 0.5;
        if (sparklePhase > 0.85 && text[i] !== " ") {
          const sparkle = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
          output += sparkleColor + style.bold + sparkle + style.reset;
        } else if (sparklePhase > 0.6 && text[i] !== " ") {
          output += fg.brightWhite + style.bold + text[i] + style.reset;
        } else {
          output += baseColor + text[i] + style.reset;
        }
      }

      process.stdout.write(`\r${erase.line}${output}`);
      frame++;

      if (Date.now() - startTime > duration) {
        stop();
        process.stdout.write(`\r${erase.line}${baseColor}${text}${style.reset}\n`);
        renderer.showCursor();
        resolve();
      }
    }, speed);
  });
}

// ── Bouncing Text ─────────────────────────────────────────────────
export interface BouncingTextOptions {
  text: string;
  duration?: number;
  speed?: number;
  width?: number;
  color?: string;
  trailColor?: string;
}

export function bouncingText(options: BouncingTextOptions): Promise<void> {
  return new Promise((resolve) => {
    const {
      text,
      duration = 4000,
      speed = 40,
      width = process.stdout.columns || 80,
      color = fg.cyan + style.bold,
      trailColor = fg.gray + style.dim,
    } = options;

    const renderer = new Renderer();
    const maxPos = width - text.length - 2;
    let pos = 0;
    let direction = 1;
    const startTime = Date.now();
    let trail: number[] = [];

    renderer.hideCursor();

    const stop = createAnimationLoop(() => {
      // Build the line with trail effect
      let line = " ".repeat(width);
      const chars = line.split("");

      // Draw trail (fading)
      for (let t = 0; t < trail.length; t++) {
        const trailPos = trail[t];
        const fade = t / trail.length;
        for (let c = 0; c < text.length && trailPos + c < width; c++) {
          if (trailPos + c >= 0) {
            chars[trailPos + c] = text[c];
          }
        }
      }

      let output = "";
      for (let i = 0; i < chars.length; i++) {
        const isInCurrentText = i >= pos && i < pos + text.length;
        const trailIdx = trail.findIndex((tp) => i >= tp && i < tp + text.length);

        if (isInCurrentText) {
          output += color + chars[i];
        } else if (trailIdx >= 0) {
          output += trailColor + chars[i];
        } else {
          output += " ";
        }
      }
      output += style.reset;

      process.stdout.write(`\r${erase.line}${output}`);

      trail.push(pos);
      if (trail.length > 5) trail.shift();

      pos += direction;
      if (pos >= maxPos || pos <= 0) direction *= -1;

      if (Date.now() - startTime > duration) {
        stop();
        process.stdout.write(`\r${erase.line}\n`);
        renderer.showCursor();
        resolve();
      }
    }, speed);
  });
}
