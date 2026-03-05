import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Renderer, createAnimationLoop } from "../core/renderer.js";
import { Writable } from "node:stream";

/** Create a mock writable stream that captures output */
function createMockStream(): NodeJS.WriteStream & { output: string } {
  let output = "";
  const stream = new Writable({
    write(chunk, _encoding, callback) {
      output += chunk.toString();
      callback();
    },
  }) as NodeJS.WriteStream & { output: string };

  Object.defineProperty(stream, "output", {
    get: () => output,
    set: (v: string) => { output = v; },
  });

  return stream;
}

describe("Renderer", () => {
  it("writes raw data to stream", () => {
    const stream = createMockStream();
    const renderer = new Renderer(stream);
    renderer.write("hello");
    assert.equal(stream.output, "hello");
  });

  it("renders content to stream", () => {
    const stream = createMockStream();
    const renderer = new Renderer(stream);
    renderer.render("line1\nline2\n");
    assert.ok(stream.output.includes("line1"));
    assert.ok(stream.output.includes("line2"));
  });

  it("hides and shows cursor", () => {
    const stream = createMockStream();
    const renderer = new Renderer(stream);
    renderer.hideCursor();
    assert.ok(stream.output.includes("\x1b[?25l"));
    renderer.showCursor();
    assert.ok(stream.output.includes("\x1b[?25h"));
  });
});

describe("createAnimationLoop", () => {
  it("calls callback at intervals and returns cleanup function", async () => {
    let count = 0;
    const stop = createAnimationLoop(() => { count++; }, 10);

    await new Promise((resolve) => setTimeout(resolve, 55));
    stop();
    const finalCount = count;
    assert.ok(finalCount >= 3, `Expected at least 3 calls, got ${finalCount}`);

    // Verify it stopped
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.equal(count, finalCount, "Should not call after stop");
  });
});
