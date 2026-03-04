/**
 * Box – renders content inside a bordered box, like a panel/card.
 * Supports multiple border styles and title positioning.
 *
 * Usage:
 *   const box = new Box({ title: "Info", padding: 1, borderColor: fg.cyan });
 *   console.log(box.render("Hello, World!\nThis is a box."));
 */

import { colorize, fg, style, visibleLength } from "../core/ansi.js";

export interface BorderStyle {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
}

export const borderStyles: Record<string, BorderStyle> = {
  single: {
    topLeft: "┌", topRight: "┐",
    bottomLeft: "└", bottomRight: "┘",
    horizontal: "─", vertical: "│",
  },
  double: {
    topLeft: "╔", topRight: "╗",
    bottomLeft: "╚", bottomRight: "╝",
    horizontal: "═", vertical: "║",
  },
  round: {
    topLeft: "╭", topRight: "╮",
    bottomLeft: "╰", bottomRight: "╯",
    horizontal: "─", vertical: "│",
  },
  heavy: {
    topLeft: "┏", topRight: "┓",
    bottomLeft: "┗", bottomRight: "┛",
    horizontal: "━", vertical: "┃",
  },
  dashed: {
    topLeft: "┌", topRight: "┐",
    bottomLeft: "└", bottomRight: "┘",
    horizontal: "┄", vertical: "┆",
  },
  ascii: {
    topLeft: "+", topRight: "+",
    bottomLeft: "+", bottomRight: "+",
    horizontal: "-", vertical: "|",
  },
};

export interface BoxOptions {
  title?: string;
  titleAlignment?: "left" | "center" | "right";
  borderStyle?: string | BorderStyle;
  borderColor?: string;
  titleColor?: string;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  width?: number; // fixed width, or auto-sized
  dimBorder?: boolean;
}

export class Box {
  private title?: string;
  private titleAlignment: "left" | "center" | "right";
  private border: BorderStyle;
  private borderColor: string;
  private titleColor: string;
  private padX: number;
  private padY: number;
  private fixedWidth?: number;
  private dimBorder: boolean;

  constructor(options: BoxOptions = {}) {
    this.title = options.title;
    this.titleAlignment = options.titleAlignment ?? "left";
    this.borderColor = options.borderColor ?? fg.gray;
    this.titleColor = options.titleColor ?? fg.brightWhite + style.bold;
    this.padX = options.paddingX ?? options.padding ?? 1;
    this.padY = options.paddingY ?? options.padding ?? 0;
    this.fixedWidth = options.width;
    this.dimBorder = options.dimBorder ?? false;

    if (typeof options.borderStyle === "string") {
      this.border = borderStyles[options.borderStyle] ?? borderStyles.round;
    } else {
      this.border = options.borderStyle ?? borderStyles.round;
    }
  }

  render(content: string): string {
    const lines = content.split("\n");
    const b = this.border;
    const bc = this.dimBorder ? this.borderColor + style.dim : this.borderColor;

    // Calculate content width
    const maxContentWidth = lines.reduce(
      (max, line) => Math.max(max, visibleLength(line)),
      0
    );

    const innerWidth = this.fixedWidth
      ? this.fixedWidth - 2 - this.padX * 2
      : maxContentWidth;
    const totalWidth = innerWidth + this.padX * 2;

    // Build top border
    let topLine: string;
    if (this.title) {
      const titleText = ` ${this.title} `;
      const titleLen = visibleLength(titleText);
      let leftPad: number;
      
      if (this.titleAlignment === "center") {
        leftPad = Math.floor((totalWidth - titleLen) / 2);
      } else if (this.titleAlignment === "right") {
        leftPad = totalWidth - titleLen - 1;
      } else {
        leftPad = 1;
      }
      
      const rightPad = totalWidth - leftPad - titleLen;
      topLine =
        colorize(b.topLeft + b.horizontal.repeat(Math.max(0, leftPad)), bc) +
        colorize(titleText, this.titleColor) +
        colorize(b.horizontal.repeat(Math.max(0, rightPad)) + b.topRight, bc);
    } else {
      topLine = colorize(
        b.topLeft + b.horizontal.repeat(totalWidth) + b.topRight,
        bc
      );
    }

    // Build bottom border
    const bottomLine = colorize(
      b.bottomLeft + b.horizontal.repeat(totalWidth) + b.bottomRight,
      bc
    );

    // Build content lines with padding
    const pad = " ".repeat(this.padX);
    const emptyLine = colorize(b.vertical, bc) + " ".repeat(totalWidth) + colorize(b.vertical, bc);

    const contentLines = lines.map((line) => {
      const visible = visibleLength(line);
      const rightPad = " ".repeat(Math.max(0, innerWidth - visible));
      return (
        colorize(b.vertical, bc) +
        pad +
        line +
        rightPad +
        pad +
        colorize(b.vertical, bc)
      );
    });

    // Assemble
    const result: string[] = [topLine];
    for (let i = 0; i < this.padY; i++) result.push(emptyLine);
    result.push(...contentLines);
    for (let i = 0; i < this.padY; i++) result.push(emptyLine);
    result.push(bottomLine);

    return result.join("\n");
  }
}
