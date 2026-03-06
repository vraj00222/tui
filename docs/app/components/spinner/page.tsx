import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { Spinner } from "tui";

const spinner = new Spinner({ text: "Loading...", style: "dots" });
spinner.start();

// Update text mid-spin
spinner.update("Almost there...");

// Finish with different states
spinner.stop("Done!");      // ✔ green checkmark
spinner.fail("Error!");     // ✖ red cross
spinner.warn("Warning!");   // ⚠ yellow warning
spinner.info("Note:");      // ℹ blue info`;

export default function SpinnerPage() {
  return (
    <ComponentPage
      title="Spinner"
      description="Animated loading indicators with 9 built-in styles, live text updates, and elapsed time display."
      badges={[
        { label: "animated", variant: "purple" },
        { label: "interactive", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div>
          <div><span className="text-[#79c0ff]">⠋</span> Loading... <span className="text-[#8b949e]">(0.0s)</span></div>
          <div><span className="text-[#79c0ff]">⠙</span> Authenticating... <span className="text-[#8b949e]">(1.2s)</span></div>
          <div><span className="text-[#79c0ff]">⠹</span> Fetching data... <span className="text-[#8b949e]">(2.4s)</span></div>
          <div><span className="text-[#3fb950] font-bold">✔</span> All tasks completed! <span className="text-[#8b949e]">(3.6s)</span></div>
          <div className="mt-4 text-[#8b949e]">Available styles:</div>
          <div className="mt-1">
            <span className="text-[#79c0ff]">⠋</span> dots &nbsp;&nbsp;
            <span className="text-[#79c0ff]">⣾</span> braille &nbsp;&nbsp;
            <span className="text-[#79c0ff]">◜</span> arc &nbsp;&nbsp;
            <span className="text-[#79c0ff]">[=== ]</span> bouncingBar
          </div>
          <div>
            <span className="text-[#79c0ff]">█</span> pulse &nbsp;&nbsp;
            <span className="text-[#79c0ff]">←</span> arrows &nbsp;&nbsp;
            <span className="text-[#79c0ff]">-</span> line &nbsp;&nbsp;
            🌍 earth &nbsp;&nbsp;
            🌑 moon
          </div>
        </div>
      }
      apiTable={[
        { prop: "text", type: "string", default: '"Loading..."', description: "Text shown next to the spinner" },
        { prop: "style", type: 'string | SpinnerStyle', default: '"dots"', description: "Animation style name or custom frames" },
        { prop: "color", type: "string", default: "fg.cyan", description: "ANSI color for the spinner character" },
        { prop: "successMark", type: "string", default: "✔ (green)", description: "Symbol shown on stop()" },
        { prop: "failMark", type: "string", default: "✖ (red)", description: "Symbol shown on fail()" },
      ]}
    />
  );
}
