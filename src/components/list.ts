/**
 * List – styled list renderer for terminal output.
 * Supports ordered, unordered, and task list styles.
 *
 * Usage:
 *   const list = new List({ style: "bullet" });
 *   console.log(list.render(["First item", "Second item", "Third item"]));
 */

import { colorize, fg, style } from "../core/ansi.js";

export type ListStyle = "bullet" | "dash" | "arrow" | "star" | "numbered" | "letter" | "task";

export interface ListItem {
  text: string;
  checked?: boolean; // only for task style
  children?: ListItem[];
}

export interface ListOptions {
  style?: ListStyle;
  indent?: number;
  bulletColor?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  dimUnchecked?: boolean;
}

const BULLETS: Record<string, string> = {
  bullet: "●",
  dash: "─",
  arrow: "▸",
  star: "★",
};

export class List {
  private listStyle: ListStyle;
  private indent: number;
  private bulletColor: string;
  private checkedColor: string;
  private uncheckedColor: string;
  private dimUnchecked: boolean;

  constructor(options: ListOptions = {}) {
    this.listStyle = options.style ?? "bullet";
    this.indent = options.indent ?? 2;
    this.bulletColor = options.bulletColor ?? fg.cyan;
    this.checkedColor = options.checkedColor ?? fg.green;
    this.uncheckedColor = options.uncheckedColor ?? fg.gray;
    this.dimUnchecked = options.dimUnchecked ?? true;
  }

  render(items: (string | ListItem)[]): string {
    return this.renderItems(items, 0);
  }

  private renderItems(items: (string | ListItem)[], depth: number): string {
    const lines: string[] = [];
    const indentStr = " ".repeat(this.indent * depth);

    items.forEach((item, index) => {
      const isObj = typeof item === "object";
      const text = isObj ? item.text : item;
      const children = isObj ? item.children : undefined;

      const bullet = this.getBullet(index, depth, isObj ? item : undefined);
      lines.push(`${indentStr}${bullet} ${text}`);

      if (children && children.length > 0) {
        lines.push(this.renderItems(children, depth + 1));
      }
    });

    return lines.join("\n");
  }

  private getBullet(index: number, depth: number, item?: ListItem): string {
    switch (this.listStyle) {
      case "numbered":
        return colorize(`${index + 1}.`, this.bulletColor);

      case "letter": {
        const letter = String.fromCharCode(97 + (index % 26)); // a-z
        return colorize(`${letter})`, this.bulletColor);
      }

      case "task": {
        const checked = item?.checked ?? false;
        if (checked) {
          return colorize("✔", this.checkedColor, style.bold);
        }
        return colorize("○", this.uncheckedColor);
      }

      default: {
        // Cycle through bullet styles for nested levels
        const bullets = ["●", "○", "■", "□"];
        const bulletChar = depth === 0
          ? (BULLETS[this.listStyle] ?? "●")
          : bullets[depth % bullets.length];
        return colorize(bulletChar, this.bulletColor);
      }
    }
  }
}
