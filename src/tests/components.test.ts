import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Box, borderStyles } from "../components/box.js";
import { Table } from "../components/table.js";
import { Toast, toast } from "../components/toast.js";
import { List } from "../components/list.js";
import { Badge, badge } from "../components/badge.js";
import { stripAnsi, visibleLength, fg, style, colorize } from "../core/ansi.js";

describe("Box", () => {
  it("renders content inside borders", () => {
    const box = new Box({ borderStyle: "ascii" });
    const result = box.render("hello");
    const lines = result.split("\n");

    assert.ok(lines.length >= 3, "Should have at least 3 lines (top, content, bottom)");
    assert.ok(stripAnsi(lines[0]).startsWith("+"));
    assert.ok(stripAnsi(lines[lines.length - 1]).startsWith("+"));
  });

  it("renders with a title", () => {
    const box = new Box({ title: "Test", borderStyle: "ascii" });
    const result = box.render("content");
    assert.ok(stripAnsi(result).includes("Test"));
  });

  it("supports center-aligned title", () => {
    const box = new Box({ title: "Center", titleAlignment: "center", borderStyle: "ascii" });
    const result = box.render("content");
    assert.ok(stripAnsi(result).includes("Center"));
  });

  it("supports right-aligned title", () => {
    const box = new Box({ title: "Right", titleAlignment: "right", borderStyle: "ascii" });
    const result = box.render("content");
    assert.ok(stripAnsi(result).includes("Right"));
  });

  it("renders multi-line content", () => {
    const box = new Box({ borderStyle: "ascii" });
    const result = box.render("line1\nline2\nline3");
    const lines = result.split("\n");
    assert.ok(lines.length >= 5); // top + 3 content + bottom
  });

  it("supports fixed width", () => {
    const box = new Box({ borderStyle: "ascii", width: 30 });
    const result = box.render("hi");
    const lines = result.split("\n");
    assert.equal(stripAnsi(lines[0]).length, 30);
  });

  it("supports all border styles", () => {
    for (const name of Object.keys(borderStyles)) {
      const box = new Box({ borderStyle: name });
      const result = box.render("test");
      assert.ok(result.length > 0, `Border style "${name}" should render`);
    }
  });

  it("handles padding", () => {
    const box = new Box({ borderStyle: "ascii", paddingX: 2, paddingY: 0 });
    const result = box.render("x");
    const contentLine = result.split("\n")[1]; // first content line (no paddingY)
    const stripped = stripAnsi(contentLine);
    // Border char | + 2 spaces padding + x + 2 spaces padding + border char |
    assert.ok(stripped.startsWith("|"));
    assert.ok(stripped.endsWith("|"));
    assert.ok(stripped.includes("x"));
  });

  it("handles vertical padding", () => {
    const box = new Box({ borderStyle: "ascii", paddingY: 1 });
    const result = box.render("x");
    const lines = result.split("\n");
    // top border + 1 padY + content + 1 padY + bottom border = 5
    assert.equal(lines.length, 5);
  });
});

describe("Table", () => {
  it("renders a basic table", () => {
    const table = new Table({
      headers: ["Name", "Age"],
      rows: [["Alice", "30"], ["Bob", "25"]],
    });
    const result = table.render();
    const plain = stripAnsi(result);

    assert.ok(plain.includes("Name"));
    assert.ok(plain.includes("Age"));
    assert.ok(plain.includes("Alice"));
    assert.ok(plain.includes("Bob"));
  });

  it("has correct number of lines", () => {
    const table = new Table({
      headers: ["A", "B"],
      rows: [["1", "2"], ["3", "4"]],
    });
    const lines = table.render().split("\n");
    // top border + header + separator + 2 data rows + bottom border = 6
    assert.equal(lines.length, 6);
  });

  it("handles empty rows", () => {
    const table = new Table({
      headers: ["A", "B"],
      rows: [],
    });
    const result = table.render();
    assert.ok(result.length > 0);
  });

  it("auto-sizes columns based on content", () => {
    const table = new Table({
      headers: ["Short", "A Very Long Header"],
      rows: [["x", "y"]],
    });
    const result = table.render();
    const lines = result.split("\n");
    const headerLine = stripAnsi(lines[1]);
    assert.ok(headerLine.includes("A Very Long Header"));
  });

  it("handles colored cell content correctly", () => {
    const table = new Table({
      headers: ["Name", "Status"],
      rows: [[colorize("Alice", fg.cyan), colorize("Active", fg.green)]],
    });
    const result = table.render();
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Alice"));
    assert.ok(plain.includes("Active"));
  });
});

describe("Toast", () => {
  it("renders success toast", () => {
    const result = toast.success("Build done!");
    const plain = stripAnsi(result);
    assert.ok(plain.includes("SUCCESS"));
    assert.ok(plain.includes("Build done!"));
  });

  it("renders error toast", () => {
    const result = toast.error("Something failed");
    const plain = stripAnsi(result);
    assert.ok(plain.includes("ERROR"));
    assert.ok(plain.includes("Something failed"));
  });

  it("renders warning toast", () => {
    const result = toast.warn("Be careful");
    const plain = stripAnsi(result);
    assert.ok(plain.includes("WARNING"));
  });

  it("renders info toast", () => {
    const result = toast.info("FYI");
    const plain = stripAnsi(result);
    assert.ok(plain.includes("INFO"));
  });

  it("renders with timestamp", () => {
    const t = new Toast({ timestamp: true });
    const result = t.success("Done");
    const plain = stripAnsi(result);
    // Should contain time-like pattern
    assert.ok(plain.includes(":"), "Should contain timestamp with colons");
  });

  it("handles multi-line messages", () => {
    const result = toast.info("Line 1\nLine 2\nLine 3");
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Line 1"));
    assert.ok(plain.includes("Line 2"));
    assert.ok(plain.includes("Line 3"));
  });
});

describe("List", () => {
  it("renders bullet list", () => {
    const list = new List({ style: "bullet" });
    const result = list.render(["Item 1", "Item 2", "Item 3"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Item 1"));
    assert.ok(plain.includes("Item 2"));
    assert.ok(plain.includes("Item 3"));
  });

  it("renders numbered list", () => {
    const list = new List({ style: "numbered" });
    const result = list.render(["First", "Second", "Third"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("1."));
    assert.ok(plain.includes("2."));
    assert.ok(plain.includes("3."));
  });

  it("renders letter list", () => {
    const list = new List({ style: "letter" });
    const result = list.render(["One", "Two"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("a)"));
    assert.ok(plain.includes("b)"));
  });

  it("renders task list with checked/unchecked items", () => {
    const list = new List({ style: "task" });
    const result = list.render([
      { text: "Done", checked: true },
      { text: "Pending", checked: false },
    ]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Done"));
    assert.ok(plain.includes("Pending"));
  });

  it("renders nested items", () => {
    const list = new List({ style: "bullet" });
    const result = list.render([
      { text: "Parent", children: [
        { text: "Child" },
      ]},
    ]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Parent"));
    assert.ok(plain.includes("Child"));
    // Child should be indented more
    const lines = plain.split("\n");
    const parentLine = lines.find(l => l.includes("Parent"))!;
    const childLine = lines.find(l => l.includes("Child"))!;
    assert.ok(childLine.indexOf("Child") > parentLine.indexOf("Parent"));
  });

  it("renders arrow style", () => {
    const list = new List({ style: "arrow" });
    const result = list.render(["Test"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Test"));
  });

  it("renders star style", () => {
    const list = new List({ style: "star" });
    const result = list.render(["Starred"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Starred"));
  });

  it("renders dash style", () => {
    const list = new List({ style: "dash" });
    const result = list.render(["Dashed"]);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Dashed"));
  });
});

describe("Badge", () => {
  it("renders preset badges", () => {
    const success = Badge.success("PASS");
    assert.ok(stripAnsi(success).includes("PASS"));

    const error = Badge.error("FAIL");
    assert.ok(stripAnsi(error).includes("FAIL"));

    const warning = Badge.warning("WARN");
    assert.ok(stripAnsi(warning).includes("WARN"));

    const info = Badge.info("INFO");
    assert.ok(stripAnsi(info).includes("INFO"));

    const neutral = Badge.neutral("N/A");
    assert.ok(stripAnsi(neutral).includes("N/A"));
  });

  it("renders badge with padding when rounded", () => {
    const result = badge("TEST", "success", { rounded: true });
    const plain = stripAnsi(result);
    assert.equal(plain, " TEST ");
  });

  it("renders badge without padding when not rounded", () => {
    const result = badge("TEST", "success", { rounded: false });
    const plain = stripAnsi(result);
    assert.equal(plain, "TEST");
  });

  it("renders outline badge", () => {
    const result = Badge.outline("tag", fg.blue);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("["));
    assert.ok(plain.includes("tag"));
    assert.ok(plain.includes("]"));
  });

  it("renders status badge", () => {
    const result = Badge.status("Online", fg.green);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("Online"));
  });

  it("renders custom badge", () => {
    const result = Badge.custom("DEPLOY", fg.black, fg.green);
    const plain = stripAnsi(result);
    assert.ok(plain.includes("DEPLOY"));
  });
});
