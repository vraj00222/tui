import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cursor, erase, style, fg, bg, colorize, stripAnsi, visibleLength, getTerminalSize } from "../core/ansi.js";

describe("ANSI utilities", () => {
  describe("cursor", () => {
    it("generates hide/show sequences", () => {
      assert.equal(cursor.hide, "\x1b[?25l");
      assert.equal(cursor.show, "\x1b[?25h");
    });

    it("generates movement sequences", () => {
      assert.equal(cursor.up(), "\x1b[1A");
      assert.equal(cursor.up(3), "\x1b[3A");
      assert.equal(cursor.down(), "\x1b[1B");
      assert.equal(cursor.forward(5), "\x1b[5C");
      assert.equal(cursor.back(2), "\x1b[2D");
    });

    it("generates positioning sequences", () => {
      assert.equal(cursor.to(0, 0), "\x1b[1;1H");
      assert.equal(cursor.to(10, 5), "\x1b[6;11H");
      assert.equal(cursor.toColumn(0), "\x1b[1G");
    });

    it("generates save/restore sequences", () => {
      assert.equal(cursor.save, "\x1b7");
      assert.equal(cursor.restore, "\x1b8");
    });
  });

  describe("erase", () => {
    it("generates line erase sequences", () => {
      assert.equal(erase.line, "\x1b[2K");
      assert.equal(erase.lineEnd, "\x1b[0K");
      assert.equal(erase.lineStart, "\x1b[1K");
    });

    it("generates screen erase sequences", () => {
      assert.equal(erase.screen, "\x1b[2J");
      assert.equal(erase.down, "\x1b[0J");
      assert.equal(erase.up, "\x1b[1J");
    });

    it("generates multi-line erase sequences", () => {
      const seq = erase.lines(3);
      assert.ok(seq.includes("\x1b[2K"));
      assert.ok(seq.endsWith("\r"));
    });
  });

  describe("style", () => {
    it("has correct SGR codes", () => {
      assert.equal(style.reset, "\x1b[0m");
      assert.equal(style.bold, "\x1b[1m");
      assert.equal(style.dim, "\x1b[2m");
      assert.equal(style.italic, "\x1b[3m");
      assert.equal(style.underline, "\x1b[4m");
      assert.equal(style.inverse, "\x1b[7m");
      assert.equal(style.strikethrough, "\x1b[9m");
    });
  });

  describe("fg colors", () => {
    it("has correct standard color codes", () => {
      assert.equal(fg.red, "\x1b[31m");
      assert.equal(fg.green, "\x1b[32m");
      assert.equal(fg.blue, "\x1b[34m");
      assert.equal(fg.cyan, "\x1b[36m");
    });

    it("has correct bright color codes", () => {
      assert.equal(fg.brightRed, "\x1b[91m");
      assert.equal(fg.brightGreen, "\x1b[92m");
    });

    it("generates RGB color codes", () => {
      const code = fg.rgb(255, 128, 0);
      assert.equal(code, "\x1b[38;2;255;128;0m");
    });
  });

  describe("bg colors", () => {
    it("has correct background color codes", () => {
      assert.equal(bg.red, "\x1b[41m");
      assert.equal(bg.green, "\x1b[42m");
    });

    it("generates RGB background codes", () => {
      const code = bg.rgb(100, 200, 50);
      assert.equal(code, "\x1b[48;2;100;200;50m");
    });
  });

  describe("colorize", () => {
    it("wraps text with codes and reset", () => {
      const result = colorize("hello", fg.red);
      assert.equal(result, `${fg.red}hello${style.reset}`);
    });

    it("applies multiple codes", () => {
      const result = colorize("hello", fg.red, style.bold);
      assert.equal(result, `${fg.red}${style.bold}hello${style.reset}`);
    });
  });

  describe("stripAnsi", () => {
    it("removes ANSI codes from text", () => {
      const colored = colorize("hello", fg.red, style.bold);
      assert.equal(stripAnsi(colored), "hello");
    });

    it("returns plain text unchanged", () => {
      assert.equal(stripAnsi("hello"), "hello");
    });

    it("handles empty string", () => {
      assert.equal(stripAnsi(""), "");
    });

    it("strips cursor control sequences", () => {
      const text = cursor.hide + "hello" + cursor.show;
      assert.equal(stripAnsi(text), "hello");
    });
  });

  describe("visibleLength", () => {
    it("calculates visible length ignoring ANSI codes", () => {
      const colored = colorize("hello", fg.red);
      assert.equal(visibleLength(colored), 5);
    });

    it("returns correct length for plain text", () => {
      assert.equal(visibleLength("hello"), 5);
    });

    it("handles empty string", () => {
      assert.equal(visibleLength(""), 0);
    });
  });

  describe("getTerminalSize", () => {
    it("returns an object with columns and rows", () => {
      const size = getTerminalSize();
      assert.ok(typeof size.columns === "number");
      assert.ok(typeof size.rows === "number");
      assert.ok(size.columns > 0);
      assert.ok(size.rows > 0);
    });
  });
});
