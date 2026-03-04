/**
 * Table – renders data in a formatted table with borders and colors.
 *
 * Usage:
 *   const table = new Table({
 *     headers: ["Name", "Role", "Status"],
 *     rows: [
 *       ["Alice", "Engineer", "Active"],
 *       ["Bob", "Designer", "Away"],
 *     ],
 *   });
 *   console.log(table.render());
 */

import { colorize, fg, style, visibleLength } from "../core/ansi.js";

export interface TableOptions {
  headers: string[];
  rows: string[][];
  borderColor?: string;
  headerColor?: string;
  alternateRowColor?: boolean;
  padding?: number;
}

export class Table {
  private headers: string[];
  private rows: string[][];
  private borderColor: string;
  private headerColor: string;
  private alternateRowColor: boolean;
  private padding: number;

  constructor(options: TableOptions) {
    this.headers = options.headers;
    this.rows = options.rows;
    this.borderColor = options.borderColor ?? fg.gray;
    this.headerColor = options.headerColor ?? fg.cyan + style.bold;
    this.alternateRowColor = options.alternateRowColor ?? true;
    this.padding = options.padding ?? 1;
  }

  render(): string {
    const allRows = [this.headers, ...this.rows];
    const colCount = this.headers.length;
    const pad = " ".repeat(this.padding);

    // Calculate column widths
    const colWidths: number[] = [];
    for (let c = 0; c < colCount; c++) {
      colWidths[c] = allRows.reduce(
        (max, row) => Math.max(max, visibleLength(row[c] ?? "")),
        0
      );
    }

    const bc = this.borderColor;

    // Horizontal line builders
    const hLine = (left: string, mid: string, right: string, char = "─") =>
      colorize(
        left +
          colWidths
            .map((w) => char.repeat(w + this.padding * 2))
            .join(mid) +
          right,
        bc
      );

    const topBorder = hLine("┌", "┬", "┐");
    const headerSep = hLine("├", "┼", "┤");
    const bottomBorder = hLine("└", "┴", "┘");

    // Row builder
    const formatRow = (row: string[], color = "") => {
      const cells = row.map((cell, i) => {
        const visible = visibleLength(cell);
        const rightPad = " ".repeat(Math.max(0, colWidths[i] - visible));
        return `${pad}${color}${cell}${style.reset}${rightPad}${pad}`;
      });
      return (
        colorize("│", bc) +
        cells.join(colorize("│", bc)) +
        colorize("│", bc)
      );
    };

    // Build output
    const lines: string[] = [topBorder];

    // Header
    lines.push(formatRow(this.headers, this.headerColor));
    lines.push(headerSep);

    // Data rows
    this.rows.forEach((row, i) => {
      const rowColor =
        this.alternateRowColor && i % 2 === 1 ? fg.gray : "";
      lines.push(formatRow(row, rowColor));
    });

    lines.push(bottomBorder);
    return lines.join("\n");
  }
}
