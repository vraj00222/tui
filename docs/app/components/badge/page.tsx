import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { Badge, badge, fg, bg } from "tui";

// Preset badges
console.log(Badge.success("PASS"));
console.log(Badge.error("FAIL"));
console.log(Badge.warning("WARN"));
console.log(Badge.info("INFO"));
console.log(Badge.neutral("N/A"));

// Outline style
console.log(Badge.outline("v2.1.0", fg.blue));
console.log(Badge.outline("typescript", fg.cyan));

// Status dot indicator
console.log(Badge.status("Online", fg.green));
console.log(Badge.status("Offline", fg.red));

// Custom colors
console.log(Badge.custom("DEPLOY", fg.black, bg.brightMagenta));`;

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      description="Colored inline labels and tags for terminal output. Includes preset styles, outline badges, dot indicators, and fully custom colors."
      badges={[
        { label: "static output", variant: "green" },
        { label: "5 presets", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div>
          <div className="text-[#8b949e] mb-2">Preset badges:</div>
          <div className="mb-3">
            <span className="bg-[#3fb950] text-black font-bold px-1"> PASS </span>{" "}
            <span className="bg-[#f85149] text-white font-bold px-1"> FAIL </span>{" "}
            <span className="bg-[#d29922] text-black font-bold px-1"> WARN </span>{" "}
            <span className="bg-[#58a6ff] text-white font-bold px-1"> INFO </span>{" "}
            <span className="bg-[#8b949e] text-white font-bold px-1"> N/A </span>
          </div>

          <div className="text-[#8b949e] mb-2">Outline badges:</div>
          <div className="mb-3">
            <span className="text-[#58a6ff] opacity-60">[</span><span className="text-[#58a6ff]">typescript</span><span className="text-[#58a6ff] opacity-60">]</span>{" "}
            <span className="text-[#3fb950] opacity-60">[</span><span className="text-[#3fb950]">node.js</span><span className="text-[#3fb950] opacity-60">]</span>{" "}
            <span className="text-[#d29922] opacity-60">[</span><span className="text-[#d29922]">v1.0.0</span><span className="text-[#d29922] opacity-60">]</span>{" "}
            <span className="text-[#8b949e] opacity-60">[</span><span className="text-[#8b949e]">MIT</span><span className="text-[#8b949e] opacity-60">]</span>
          </div>

          <div className="text-[#8b949e] mb-2">Status indicators:</div>
          <div className="mb-3">
            <span className="text-[#3fb950]">●</span> Production{" "}&nbsp;&nbsp;
            <span className="text-[#d29922]">●</span> Staging{" "}&nbsp;&nbsp;
            <span className="text-[#58a6ff]">●</span> Development{" "}&nbsp;&nbsp;
            <span className="text-[#f85149]">●</span> Offline
          </div>

          <div className="text-[#8b949e] mb-2">Custom badges:</div>
          <div>
            <span className="bg-[#bc8cff] text-black font-bold px-1"> DEPLOY </span>{" "}
            <span className="bg-[#79c0ff] text-black font-bold px-1"> RELEASE </span>{" "}
            <span className="bg-[#f85149] text-white font-bold px-1"> HOTFIX </span>
          </div>
        </div>
      }
      apiTable={[
        { prop: "text", type: "string", default: "required", description: "Badge label text" },
        { prop: "preset", type: "BadgePreset", default: "required", description: "success | error | warning | info | neutral" },
        { prop: "bold", type: "boolean", default: "true", description: "Bold text style" },
        { prop: "rounded", type: "boolean", default: "true", description: "Add padding for pill-like appearance" },
      ]}
    />
  );
}
