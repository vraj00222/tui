/**
 * Render engine – handles writing to stdout with proper cursor management.
 * Components use this to render themselves without flickering.
 */

import { cursor, erase } from "./ansi.js";

export class Renderer {
  private lastLineCount = 0;
  private stream: NodeJS.WriteStream;

  constructor(stream: NodeJS.WriteStream = process.stdout) {
    this.stream = stream;
  }

  /** Write raw string */
  write(data: string): void {
    this.stream.write(data);
  }

  /** Clear previous render and write new content */
  render(content: string): void {
    const lines = content.split("\n");

    // Clear previous output
    if (this.lastLineCount > 0) {
      this.write(
        cursor.up(this.lastLineCount) + `\r` + erase.down
      );
    }

    this.write(content);
    this.lastLineCount = lines.length - 1; // -1 because last line doesn't need a newline after
  }

  /** Clear the rendered area completely */
  clear(): void {
    if (this.lastLineCount > 0) {
      this.write(cursor.up(this.lastLineCount) + `\r` + erase.down);
      this.lastLineCount = 0;
    }
  }

  /** Hide cursor */
  hideCursor(): void {
    this.write(cursor.hide);
  }

  /** Show cursor */
  showCursor(): void {
    this.write(cursor.show);
  }
}

/**
 * Simple timer helper for animations - returns a cleanup function.
 */
export function createAnimationLoop(
  callback: () => void,
  intervalMs: number
): () => void {
  const id = setInterval(callback, intervalMs);
  return () => clearInterval(id);
}
